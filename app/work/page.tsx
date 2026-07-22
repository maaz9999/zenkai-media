"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, PageFrame, PageHero, AutoplayVideo } from "../components/PageShell";
import { assetItems, getDisplayTitle, MediaAsset } from "../assetsData";
import { MediaModal } from "../components/MediaModal";

const BATCH_SIZE = 18;

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const filteredAssets = assetItems.filter((item) => {
    const matchesTab =
      activeTab === "All" ||
      item.type.toLowerCase() === activeTab.toLowerCase() ||
      ((activeTab.toLowerCase().includes("2d")) && item.type.toLowerCase() === "2d design") ||
      (activeTab === "Web" && (item.type.toLowerCase() === "web" || item.type.toLowerCase() === "software"));
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.url && item.url.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
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

  const webCount = assetItems.filter((a) => a.type === "Web" || a.type === "Software").length;
  const posterCount = assetItems.filter((a) => a.type === "Posters").length;
  const design2DCount = assetItems.filter((a) => a.type === "2D Design").length;
  const thumbCount = assetItems.filter((a) => a.type === "Thumbnails").length;
  const reelCount = assetItems.filter((a) => a.type === "Reels").length;

  return (
    <PageFrame active="Work">
      <PageHero
        eyebrow="SELECTED WORK CATALOG"
        title="Proof over"
        italic="promises."
        index="01"
        copy="Explore our curated archive of custom software platforms, esports graphics, high-CTR thumbnails, and short-form video edits engineered for creators and ambitious brands."
        bgImageSrc="/SERVICES.png"
      />

      <section className="route-section work-route shell">
        <div className="work-toolbar">
          <div className="filters" role="group" aria-label="Filter work folder">
            <button
              className={activeTab === "All" ? "active" : ""}
              onClick={() => { setActiveTab("All"); setVisibleCount(BATCH_SIZE); }}
            >
              All Work ({assetItems.length})
            </button>
            <button
              className={activeTab === "Web" ? "active" : ""}
              onClick={() => { setActiveTab("Web"); setVisibleCount(BATCH_SIZE); }}
            >
              Web & Software ({webCount})
            </button>
            <button
              className={activeTab === "2D Design" || activeTab === "2D" ? "active" : ""}
              onClick={() => { setActiveTab("2D Design"); setVisibleCount(BATCH_SIZE); }}
            >
              2D Design & Merch ({design2DCount})
            </button>
            <button
              className={activeTab === "Posters" ? "active" : ""}
              onClick={() => { setActiveTab("Posters"); setVisibleCount(BATCH_SIZE); }}
            >
              Posters ({posterCount})
            </button>
            <button
              className={activeTab === "Thumbnails" ? "active" : ""}
              onClick={() => { setActiveTab("Thumbnails"); setVisibleCount(BATCH_SIZE); }}
            >
              Thumbnails ({thumbCount})
            </button>
            <button
              className={activeTab === "Reels" ? "active" : ""}
              onClick={() => { setActiveTab("Reels"); setVisibleCount(BATCH_SIZE); }}
            >
              Reels ({reelCount})
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search assets (e.g. Arslan, Tekken, Tournament)..."
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

        <div className="asset-counter">
          Showing <span>{displayedAssets.length}</span> of <span>{filteredAssets.length}</span> items
        </div>

        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {displayedAssets.map((item, index) => {
              const typeClass =
                item.type.toLowerCase() === "web"
                  ? "web-card banner-card"
                  : item.type.toLowerCase() === "thumbnails"
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
                  <h3>{getDisplayTitle(item)}</h3>
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
          <div className="load-more-container">
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
