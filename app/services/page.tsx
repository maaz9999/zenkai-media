"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageFrame, PageHero, Arrow, AutoplayVideo } from "../components/PageShell";
import { services } from "../content";
import { assetItems, MediaAsset } from "../assetsData";
import { MediaModal } from "../components/MediaModal";

export default function ServicesPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/#services");
    }
  }, []);

  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Helper to get matching work for each service
  function getServiceWork(serviceTitle: string): MediaAsset[] {
    const titleLower = serviceTitle.toLowerCase();
    if (titleLower.includes("video")) {
      return [
        assetItems.find((a) => a.id === "reels-1"),
        assetItems.find((a) => a.id === "reels-7"),
        assetItems.find((a) => a.id === "reels-3"),
      ].filter(Boolean) as MediaAsset[];
    }
    if (titleLower.includes("social") || titleLower.includes("management")) {
      return [
        assetItems.find((a) => a.id === "reel-growth-creative"),
        assetItems.find((a) => a.id === "reel-v2"),
        assetItems.find((a) => a.id === "reel-v3"),
      ].filter(Boolean) as MediaAsset[];
    }
    if (titleLower.includes("thumbnail")) {
      return assetItems.filter((a) => a.type.toLowerCase() === "thumbnails").slice(0, 4);
    }
    if (titleLower.includes("growth")) {
      return [
        assetItems.find((a) => a.id === "reel-growth-creative"),
        assetItems.find((a) => a.id === "reel-v2"),
      ].filter(Boolean) as MediaAsset[];
    }
    return assetItems.filter((a) => a.type.toLowerCase() === "posters" && a.id !== "posters-4").slice(0, 4);
  }

  function getServiceWorkLink(title: string): { href: string; label: string } {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("thumbnail")) {
      return { href: "/work?tab=Thumbnails", label: "Explore All Thumbnails" };
    }
    if (titleLower.includes("video")) {
      return { href: "/work?tab=Reels", label: "Explore Video Edits" };
    }
    if (titleLower.includes("social")) {
      return { href: "/work?tab=Reels", label: "Explore SMM Creative" };
    }
    return { href: "/work", label: "Explore Work Archive" };
  }

  return (
    <PageFrame active="Services">
      <PageHero
        eyebrow="CAPABILITIES"
        title="CORE"
        italic="Pillars."
        index="02"
        copy="High-retention video editing and strategic Social Media Management (SMM) engineered to scale viewer retention, CTR, and channel growth."
        videoSrc="/media/services-hero-landscape.mp4"
        mobileVideoSrc="/media/services-hero-portrait.mp4"
        posterSrc="/media/services-hero-landscape.png"
        singleLine={true}
      />
      <section className="route-section shell">
        <div className="route-service-list">
          {services.map((service) => {
            const relatedWork = getServiceWork(service.title);
            const workLinkInfo = getServiceWorkLink(service.title);
            const isThumbnail = service.title.toLowerCase().includes("thumbnail");

            return (
              <motion.article
                key={service.number}
                className="service-showcase-panel"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ "--accent": service.color } as React.CSSProperties}
              >
                {/* Left Column / Top Section: Capability Details */}
                <div className="service-showcase-info">
                  <div>
                    <div className="service-showcase-meta">
                      <span className="service-showcase-number">{service.number}</span>
                      <span>{service.tag}</span>
                    </div>
                    <h2>{service.title}</h2>
                    <p className="service-showcase-desc">{service.description}</p>
                    
                    <div className="service-showcase-deliverables">
                      {service.deliverables.map((item) => (
                        <span key={item} className="service-showcase-deliverable-pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="service-showcase-actions">
                    <a href="/contact" className="service-showcase-cta">
                      Discuss {service.title} <Arrow />
                    </a>
                    <a href={workLinkInfo.href} className="service-showcase-secondary-btn">
                      {workLinkInfo.label} <Arrow />
                    </a>
                  </div>
                </div>

                {/* Right Column: Featured Work Showcase */}
                <div className="service-showcase-gallery">
                  <div className="service-gallery-head">
                    <span>Selected Samples ({relatedWork.length})</span>
                    <a href={workLinkInfo.href}>
                      View tab <Arrow />
                    </a>
                  </div>
                  <div className={`service-gallery-grid ${isThumbnail ? "thumbnail-gallery-grid" : ""}`}>
                    {relatedWork.map((work) => (
                      <div
                        key={work.id}
                        className="service-work-thumbnail-card"
                        onClick={() => setSelectedAsset(work)}
                      >
                        {work.isVideo ? (
                          <AutoplayVideo src={work.src} className="service-work-media" />
                        ) : (
                          <img src={work.src} alt={work.title} className="service-work-media" loading="lazy" />
                        )}
                        <div className="service-work-hover-overlay">
                          <span>{work.type}</span>
                          <i>{work.isVideo ? "▶" : "↗"}</i>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section shell">
        <motion.div
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
          }}
        >
          <div>
            <span className="kicker">WHY ZENKAI MEDIA</span>
            <h2>
              Focused studio.<br />
              <em>Zero fluff.</em>
            </h2>
          </div>
          <p>How our dedicated Video & SMM team compares to generic traditional agencies.</p>
        </motion.div>

        <div className="comparison-table-wrapper">
          <div className="comparison-table">
            <div className="table-header">
              <div className="col-feature">Capability</div>
              <div className="col-zenkai">Zenkai Media</div>
              <div className="col-traditional">Traditional Agency</div>
            </div>
            {[
              {
                feature: "Collaboration Level",
                zenkai: "Direct senior team (1:1)",
                traditional: "Middlemen & junior account handlers",
              },
              {
                feature: "Disciplines Covered",
                zenkai: "Video Editing (Long/Short), SMM, Thumbnails, Growth Creative",
                traditional: "Siloed across 3–4 separate vendors",
              },
              {
                feature: "Execution Speed",
                zenkai: "Rapid weekly iterations & daily publishing",
                traditional: "Months of bloated meetings & decks",
              },
              {
                feature: "Technical Quality",
                zenkai: "4K 60fps Pipeline, High-Retention FX, Sound Design",
                traditional: "Outsourced generic template cuts",
              },
              {
                feature: "Focus & Outcome",
                zenkai: "High CTR, watch-time retention & channel growth",
                traditional: "Hourly billing & Scope bloat",
              },
            ].map((row, idx) => (
              <div className="table-row" key={idx}>
                <div className="col-feature">{row.feature}</div>
                <div className="col-zenkai">
                  <span className="check-icon">✓</span> {row.zenkai}
                </div>
                <div className="col-traditional">
                  <span className="cross-icon">✕</span> {row.traditional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="route-callout shell">
        <span className="kicker">READY WHEN YOU ARE</span>
        <h2>
          Scale your channel.<br />
          <em>We’ll handle the content.</em>
        </h2>
        <a href="/contact" className="brandif-btn-primary">
          Work with Zenkai Media <Arrow />
        </a>
      </section>

      <MediaModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </PageFrame>
  );
}
