"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, PageFrame, AutoplayVideo } from "../components/PageShell";
import { assetItems, MediaAsset } from "../assetsData";
import { MediaModal } from "../components/MediaModal";

const BATCH_SIZE = 18;
const MEDIA_TYPES = ["2D Design", "Posters", "Thumbnails", "Reels"];
const AI_SOFTWARE_TYPES = ["Web", "Software"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<"Media" | "AI & Software" | null>(null);
  const [activeMediaFilter, setActiveMediaFilter] = useState<string>("All Media");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "Web" || tabParam === "Software" || tabParam === "AI & Software") {
        setActiveCategory("AI & Software");
      } else if (tabParam && MEDIA_TYPES.some((type) => type.toLowerCase() === tabParam.toLowerCase())) {
        setActiveCategory("Media");
        setActiveMediaFilter(tabParam.toLowerCase() === "2d" ? "2D Design" : tabParam);
      }
    }
  }, []);

  const filteredAssets = assetItems.filter((item) => {
    const matchesCategory =
      activeCategory === "Media"
        ? MEDIA_TYPES.includes(item.type)
        : AI_SOFTWARE_TYPES.includes(item.type);
    const matchesMediaFilter =
      activeCategory !== "Media" ||
      activeMediaFilter === "All Media" ||
      item.type === activeMediaFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.url && item.url.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesMediaFilter && matchesSearch;
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

  const mediaCount = assetItems.filter((a) => MEDIA_TYPES.includes(a.type)).length;
  const aiSoftwareCount = assetItems.filter((a) => AI_SOFTWARE_TYPES.includes(a.type)).length;
  const posterCount = assetItems.filter((a) => a.type === "Posters").length;
  const design2DCount = assetItems.filter((a) => a.type === "2D Design").length;
  const thumbCount = assetItems.filter((a) => a.type === "Thumbnails").length;
  const reelCount = assetItems.filter((a) => a.type === "Reels").length;

  return (
    <PageFrame active="Portfolio">
      <section className="route-section work-route shell">
        <div className="work-header">
          <span className="kicker">SELECTED WORK CATALOG</span>
          <h1>Work <em>Archive.</em></h1>
          <p>
            {activeCategory
              ? `Viewing our ${activeCategory} portfolio.`
              : "What would you like to explore? Choose a portfolio below to enter."}
          </p>
        </div>

        {!activeCategory ? (
          <motion.div
            className="portfolio-gateway"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="portfolio-gateway-heading">
              <span>CHOOSE YOUR PATH</span>
              <p>Two disciplines. One creative partner.</p>
            </div>
            <div className="portfolio-categories" role="group" aria-label="Choose portfolio category">
              <button onClick={() => { setActiveCategory("Media"); setVisibleCount(BATCH_SIZE); }}>
                <span>01</span>
                <strong>Media</strong>
                <p>2D design, posters, thumbnails and high-retention reels.</p>
                <small>{mediaCount} projects</small>
                <i><Arrow /></i>
              </button>
              <button onClick={() => { setActiveCategory("AI & Software"); setVisibleCount(BATCH_SIZE); }}>
                <span>02</span>
                <strong>AI &amp; Software</strong>
                <p>AI platforms, websites and custom software products.</p>
                <small>{aiSoftwareCount} projects</small>
                <i><Arrow /></i>
              </button>
            </div>
          </motion.div>
        ) : (
          <>
        <div className="work-toolbar">
          <div className="portfolio-categories" role="group" aria-label="Choose portfolio category">
            <button
              className={activeCategory === "Media" ? "active" : ""}
              aria-pressed={activeCategory === "Media"}
              onClick={() => { setActiveCategory("Media"); setVisibleCount(BATCH_SIZE); }}
            >
              <span>01</span>
              Media
              <small>{mediaCount} projects</small>
            </button>
            <button
              className={activeCategory === "AI & Software" ? "active" : ""}
              aria-pressed={activeCategory === "AI & Software"}
              onClick={() => { setActiveCategory("AI & Software"); setVisibleCount(BATCH_SIZE); }}
            >
              <span>02</span>
              AI &amp; Software
              <small>{aiSoftwareCount} projects</small>
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder={activeCategory === "Media" ? "Search media work..." : "Search AI & software work..."}
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

        {activeCategory === "Media" && (
          <div className="media-subfilters">
            <span>Browse media by</span>
            <div className="filters" role="group" aria-label="Filter media work">
              {[
                ["All Media", mediaCount],
                ["2D Design", design2DCount],
                ["Posters", posterCount],
                ["Thumbnails", thumbCount],
                ["Reels", reelCount],
              ].map(([label, count]) => (
                <button
                  key={label}
                  className={activeMediaFilter === label ? "active" : ""}
                  aria-pressed={activeMediaFilter === label}
                  onClick={() => { setActiveMediaFilter(String(label)); setVisibleCount(BATCH_SIZE); }}
                >
                  {label === "2D Design" ? "2D Design & Merch" : label} ({count})
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="asset-counter">
          {activeCategory} / Showing <span>{displayedAssets.length}</span> of <span>{filteredAssets.length}</span> items
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
          </>
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
