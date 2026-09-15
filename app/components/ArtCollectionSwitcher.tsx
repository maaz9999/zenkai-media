"use client";

export type ArtCollection = "4THRIVE" | "ARSLAN ASH";

const collections: Array<{
  value: ArtCollection;
  eyebrow: string;
  title: string;
  preview: string;
}> = [
  {
    value: "4THRIVE",
    eyebrow: "MERCH COLLECTION",
    title: "4THRIVE",
    preview: "/Assets/4thrive%20Merch/Artboard%2010.png",
  },
  {
    value: "ARSLAN ASH",
    eyebrow: "EMOTES & STICKERS",
    title: "ARSLAN ASH",
    preview: "/Assets/Twitch%20emote%20presentation/Frame%201.jpg",
  },
];

export function ArtCollectionSwitcher({
  value,
  onChange,
}: {
  value: ArtCollection;
  onChange: (value: ArtCollection) => void;
}) {
  return (
    <div className="art-collection-switcher" role="group" aria-label="Choose a 2D and art collection">
      {collections.map((collection) => {
        const isActive = value === collection.value;

        return (
          <button
            key={collection.value}
            type="button"
            className={`art-collection-option${isActive ? " active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onChange(collection.value)}
          >
            <img src={collection.preview} alt="" loading="lazy" />
            <span className="art-collection-shade" aria-hidden="true" />
            <span className="art-collection-copy">
              <small>{collection.eyebrow}</small>
              <strong>{collection.title}</strong>
            </span>
            <span className="art-collection-status" aria-hidden="true">
              {isActive ? "VIEWING" : "VIEW"} <i>↗</i>
            </span>
          </button>
        );
      })}
    </div>
  );
}
