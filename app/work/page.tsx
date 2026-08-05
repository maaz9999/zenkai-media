"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, PageFrame, AutoplayVideo } from "../components/PageShell";
import { assetItems, MediaAsset } from "../assetsData";
import { MediaModal } from "../components/MediaModal";

const BATCH_SIZE = 18;
const WORK_TYPES = ["Reels", "Thumbnails", "Posters", "2D Design"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/#work");
    }
  }, []);

  const filteredAssets = assetItems.filter((item) => {
    // Filter out software assets if any remain
    if (item.type.toLowerCase() === "software" || item.type.toLowerCase() === "web") {
      return false;
    }
    const matchesFilter =
      activeFilter === "All" || item.type.toLowerCase() === activeFilter.toLowerCase();
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

  const reelCount = assetItems.filter((a) => a.type === "Reels").length;
  const thumbCount = assetItems.filter((a) => a.type === "Thumbnails").length;
  const posterCount = assetItems.filter((a) => a.type === "Posters").length;
  const design2DCount = assetItems.filter((a) => a.type === "2D Design").length;
  const totalCount = reelCount + thumbCount + posterCount + design2DCount;

  return (
    <PageFrame active="Portfolio">
      <section className="route-section work-route shell">
        <div className="work-header">
          <span className="kicker">SELECTED WORK CATALOG</span>
          <h1>Work <em>Archive.</em></h1>
          <p>Explore our high-retention video edits, short-form reels, click-tested thumbnails, and social graphics.</p>
        </div>

        <div className="work-toolbar">
          <div className="filters" role="group" aria-label="Filter portfolio work">
            {[
              ["All", totalCount],
              ["Reels", reelCount],
              ["Thumbnails", thumbCount],
              ["Posters", posterCount],
              ["2D Design", design2DCount],
            ].map(([label, count]) => (
              <button
                key={label as string}
                className={activeFilter === label ? "active" : ""}
                aria-pressed={activeFilter === label}
                onClick={() => { setActiveFilter(String(label)); setVisibleCount(BATCH_SIZE); }}
              >
                {label === "Reels" ? "Reels & Videos" : label === "2D Design" ? "Graphics & Merch" : (label as string)} ({count})
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search video edits & graphics..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(BATCH_SIZE); }}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="asset-counter" style={{ margin: "24px 0" }}>
          Showing <span>{displayedAssets.length}</span> of <span>{filteredAssets.length}</span> items
        </div>

        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {displayedAssets.map((item, index) => {
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
                  className={`project-card ${typeClass}`}
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
