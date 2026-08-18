"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, PageFrame, AutoplayVideo } from "../components/PageShell";
import { assetItems, MediaAsset } from "../assetsData";
import { MediaModal } from "../components/MediaModal";

const BATCH_SIZE = 18;
const WORK_TYPES = ["Reels", "Thumbnails", "Posters", "2D & Art"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [subFilter2D, setSubFilter2D] = useState<"4THRIVE" | "ARSLAN ASH">("4THRIVE");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/#work");
    }
  }, []);

  const filteredAssets = assetItems.filter((item) => {
    if (item.type.toLowerCase() === "software" || item.type.toLowerCase() === "web") {
      return false;
    }
    let matchesFilter = activeFilter === "All";
    if (activeFilter === "Reels") matchesFilter = item.type.toLowerCase() === "reels";
    else if (activeFilter === "Thumbnails") matchesFilter = item.type.toLowerCase() === "thumbnails";
    else if (activeFilter === "Posters") matchesFilter = item.type.toLowerCase() === "posters";
    else if (activeFilter === "Arslan Ash") {
      matchesFilter = item.folder.toLowerCase().includes("twitch emote presentation") || item.id.includes("twitch-emote") || item.id.includes("twitch-sticker");
    } else if (activeFilter === "4T") {
      matchesFilter = (item.folder.toLowerCase().includes("4thrive") || item.id.includes("merch-4thrive")) && item.type !== "Reels";
    } else if (activeFilter === "2D Design" || activeFilter === "2D & Art") {
      if (subFilter2D === "ARSLAN ASH") {
        matchesFilter = item.folder.toLowerCase().includes("twitch emote presentation") || item.id.includes("twitch-emote") || item.id.includes("twitch-sticker");
      } else {
        matchesFilter = (item.folder.toLowerCase().includes("4thrive") || item.id.includes("merch-4thrive")) && item.type !== "Reels";
      }
    } else matchesFilter = item.type.toLowerCase() === activeFilter.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.file.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayedAssets = filteredAssets.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAssets.length;

  const currentModalIndex = selectedAsset ? filteredAssets.findIndex((a) => a.id === selectedAsset.id) : -1;
  const hasPrev = currentModalIndex > 0;
  const hasNext = currentModalIndex >= 0 && currentModalIndex < filteredAssets.length - 1;

  function openNext() {
    if (hasNext) setSelectedAsset(filteredAssets[currentModalIndex + 1]);
  }

  function openPrev() {
    if (hasPrev) setSelectedAsset(filteredAssets[currentModalIndex - 1]);
  }

  return (
    <PageFrame active="Portfolio">
      <section className="route-section work-route shell">
        <div className="work-header">
          <span className="kicker">SELECTED WORK CATALOG</span>
          <h1>Work <em>Archive.</em></h1>
          <p>Explore our high-retention video edits, short-form reels, click-tested thumbnails, and social graphics.</p>
        </div>

        <div className="work-toolbar">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div className="filters" role="group" aria-label="Filter portfolio work">
              {["All", ...WORK_TYPES].map((item) => (
                <button
                  key={item}
                  className={activeFilter === item || (activeFilter === "2D Design" && item === "2D & Art") ? "active" : ""}
                  onClick={() => {
                    setActiveFilter(item);
                    setVisibleCount(BATCH_SIZE);
                  }}
                >
                  {item === "Reels" ? "Reels & Videos" : item}
                </button>
              ))}
            </div>

            {(activeFilter === "2D Design" || activeFilter === "2D & Art") && (
              <div className="sub-filters" role="group" aria-label="2D Art categories">
                <button
                  className={subFilter2D === "4THRIVE" ? "sub-active" : "sub-btn"}
                  onClick={() => setSubFilter2D("4THRIVE")}
                >
                  4THRIVE
                </button>
                <button
                  className={subFilter2D === "ARSLAN ASH" ? "sub-active" : "sub-btn"}
                  onClick={() => setSubFilter2D("ARSLAN ASH")}
                >
                  ARSLAN ASH
                </button>
              </div>
            )}
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search work..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(BATCH_SIZE);
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="catalog-meta">
          <span>Showing {displayedAssets.length} of {filteredAssets.length} projects</span>
        </div>

        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {displayedAssets.map((item, index) => {
              const isContain = item.type === "2D Design" || item.folder.toLowerCase().includes("4thrive") || item.id.includes("merch-4thrive");
              const typeClass =
                item.type.toLowerCase() === "thumbnails"
                  ? "thumbnail-card"
                  : item.type.toLowerCase() === "reels"
                  ? "reel-card video-card"
                  : item.type.toLowerCase() === "posters"
                  ? "poster-card"
                  : item.type.toLowerCase() === "2d design"
                  ? "merch-card"
                  : item.size || "normal";
              return (
                <motion.article
                  className={`project-card ${typeClass} ${isContain ? "contain-fit" : ""}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.35, delay: (index % 12) * 0.02 }}
                  onClick={() => setSelectedAsset(item)}
                >
                  {item.isVideo ? (
                    <AutoplayVideo src={item.src} ariaLabel={item.title} />
                  ) : (
                    <img src={item.src} alt={item.title} loading="lazy" />
                  )}

                  <div className="project-overlay">
                    <span className="type-tag">{item.type}</span>
                    <i>
                      {item.isVideo ? "▶" : <Arrow />}
                    </i>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="load-more-container" style={{ marginTop: "40px" }}>
            <button
              className="load-more-btn"
              onClick={() => setVisibleCount((prev) => prev + BATCH_SIZE)}
            >
              Load More Works ({filteredAssets.length - visibleCount} remaining) <Arrow />
            </button>
          </div>
        )}
      </section>

      <section className="work-quote shell">
        <span className="kicker">THE NEXT MOVE</span>
        <blockquote>
          “The best work in the portfolio should always be the project we’re about to make.”
        </blockquote>
        <a href="/contact">
          Start that project <Arrow />
        </a>
      </section>

      <MediaModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onPrev={openPrev}
        onNext={openNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </PageFrame>
  );
}
