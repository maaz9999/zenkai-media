import { readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTAINER_TYPES = new Set([
  "dinf",
  "edts",
  "mdia",
  "minf",
  "moov",
  "stbl",
  "trak",
]);

function readBoxHeader(buffer, offset, end = buffer.length) {
  if (offset + 8 > end) return null;

  const size32 = buffer.readUInt32BE(offset);
  const type = buffer.toString("ascii", offset + 4, offset + 8);
  let headerSize = 8;
  let size;

  if (size32 === 1) {
    if (offset + 16 > end) return null;
    const size64 = buffer.readBigUInt64BE(offset + 8);
    if (size64 > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new Error(`MP4 box ${type} is too large to process safely.`);
    }
    size = Number(size64);
    headerSize = 16;
  } else if (size32 === 0) {
    size = end - offset;
  } else {
    size = size32;
  }

  if (size < headerSize || offset + size > end) return null;
  return { type, offset, size, headerSize, end: offset + size };
}

function listTopLevelBoxes(buffer) {
  const boxes = [];
  let offset = 0;

  while (offset < buffer.length) {
    const box = readBoxHeader(buffer, offset);
    if (!box) throw new Error(`Invalid MP4 box at byte ${offset}.`);
    boxes.push(box);
    offset = box.end;
  }

  return boxes;
}

function adjustChunkOffsets(buffer, start, end, delta) {
  let offset = start;

  while (offset < end) {
    const box = readBoxHeader(buffer, offset, end);
    if (!box) throw new Error(`Invalid nested MP4 box at byte ${offset}.`);

    if (box.type === "stco" || box.type === "co64") {
      const countOffset = box.offset + box.headerSize + 4;
      if (countOffset + 4 > box.end) throw new Error(`Invalid ${box.type} box.`);

      const entryCount = buffer.readUInt32BE(countOffset);
      const entrySize = box.type === "stco" ? 4 : 8;
      const entriesOffset = countOffset + 4;

      if (entriesOffset + entryCount * entrySize > box.end) {
        throw new Error(`Invalid ${box.type} chunk-offset table.`);
      }

      for (let index = 0; index < entryCount; index += 1) {
        const entryOffset = entriesOffset + index * entrySize;
        if (box.type === "stco") {
          const nextOffset = buffer.readUInt32BE(entryOffset) + delta;
          if (nextOffset > 0xffffffff) {
            throw new Error("A 32-bit MP4 chunk offset overflowed during fast-start conversion.");
          }
          buffer.writeUInt32BE(nextOffset, entryOffset);
        } else {
          buffer.writeBigUInt64BE(buffer.readBigUInt64BE(entryOffset) + BigInt(delta), entryOffset);
        }
      }
    } else if (CONTAINER_TYPES.has(box.type)) {
      adjustChunkOffsets(buffer, box.offset + box.headerSize, box.end, delta);
    }

    offset = box.end;
  }
}

async function findMp4Files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findMp4Files(fullPath)
        : Promise.resolve(entry.name.toLowerCase().endsWith(".mp4") ? [fullPath] : []);
    }),
  );
  return nested.flat();
}

async function makeFastStart(filePath, checkOnly) {
  const source = await readFile(filePath);
  const boxes = listTopLevelBoxes(source);
  const moov = boxes.find((box) => box.type === "moov");
  const mdat = boxes.find((box) => box.type === "mdat");

  if (!moov || !mdat) return { status: "skipped", reason: "missing moov or mdat box" };
  if (moov.offset < mdat.offset) return { status: "ready" };
  if (checkOnly) return { status: "needs-optimization" };

  const optimizedMoov = Buffer.from(source.subarray(moov.offset, moov.end));
  adjustChunkOffsets(optimizedMoov, moov.headerSize, optimizedMoov.length, moov.size);

  const outputParts = [];
  for (const box of boxes) {
    if (box.offset === moov.offset) continue;
    if (box.offset === mdat.offset) outputParts.push(optimizedMoov);
    outputParts.push(source.subarray(box.offset, box.end));
  }

  const output = Buffer.concat(outputParts);
  if (output.length !== source.length) throw new Error("Fast-start output size changed unexpectedly.");

  const temporaryPath = `${filePath}.faststart.tmp`;
  try {
    await writeFile(temporaryPath, output);
    if ((await stat(temporaryPath)).size !== source.length) {
      throw new Error("Fast-start output did not write completely.");
    }
    await rename(temporaryPath, filePath);
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }

  return { status: "optimized" };
}

const checkOnly = process.argv.includes("--check");
const requestedFiles = process.argv.slice(2).filter((argument) => argument !== "--check");
const files = requestedFiles.length > 0
  ? requestedFiles.map((file) => path.resolve(file))
  : await findMp4Files(path.resolve("public"));

let pendingCount = 0;
for (const filePath of files.sort()) {
  const result = await makeFastStart(filePath, checkOnly);
  if (result.status === "needs-optimization") pendingCount += 1;
  console.log(`${result.status.padEnd(18)} ${path.relative(process.cwd(), filePath)}${result.reason ? ` (${result.reason})` : ""}`);
}

if (checkOnly && pendingCount > 0) process.exitCode = 1;
