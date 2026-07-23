"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageFrame, PageHero, Arrow, AutoplayVideo } from "../components/PageShell";
import { services } from "../content";
import { assetItems, MediaAsset } from "../assetsData";
import { MediaModal } from "../components/MediaModal";

export default function ServicesPage() {
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Helper to get matching work for each service
  function getServiceWork(serviceTitle: string): MediaAsset[] {
    const titleLower = serviceTitle.toLowerCase();
    if (titleLower.includes("web")) {
      return assetItems.filter((a) => a.type.toLowerCase() === "web");
    }
    if (titleLower.includes("video") || titleLower.includes("social")) {
      return [
        assetItems.find((a) => a.id === "reels-1"),
        assetItems.find((a) => a.id === "reels-7"),
        assetItems.find((a) => a.id === "reels-3"),
      ].filter(Boolean) as MediaAsset[];
    }
    if (titleLower.includes("growth")) {
      // Put growth_creative, V2, and V3 videos in Growth Creative section
      return [
        assetItems.find((a) => a.id === "reel-growth-creative"),
        assetItems.find((a) => a.id === "reel-v2"),
        assetItems.find((a) => a.id === "reel-v3"),
      ].filter(Boolean) as MediaAsset[];
    }
    if (titleLower.includes("brand")) {
      // Exclude posters-4 (runner up poster)
      return assetItems.filter((a) => a.type.toLowerCase() === "posters" && a.id !== "posters-4").slice(0, 3);
    }
    if (titleLower.includes("thumbnail")) {
      return assetItems.filter((a) => a.type.toLowerCase() === "thumbnails").slice(0, 4);
    }
    if (titleLower.includes("software") || titleLower.includes("custom")) {
      return [
        assetItems.find((a) => a.id === "software-mark47"),
      ].filter(Boolean) as MediaAsset[];
    }
    // Default fallback
    return assetItems.filter((a) => a.type.toLowerCase() === "posters" && a.id !== "posters-4").slice(0, 4);
  }

  function getServiceWorkLink(title: string): { href: string; label: string } {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("thumbnail")) {
      return { href: "/work?tab=Thumbnails", label: "Explore All Thumbnails" };
    }
    if (titleLower.includes("web")) {
      return { href: "/work?tab=Web", label: "Explore Web Work" };
    }
    if (titleLower.includes("video") || titleLower.includes("social")) {
      return { href: "/work?tab=Reels", label: "Explore Reels & Video" };
    }
    if (titleLower.includes("software") || titleLower.includes("custom")) {
      return { href: "/work?tab=Web", label: "Explore Software Archive" };
    }
    if (titleLower.includes("brand")) {
      return { href: "/work?tab=Posters", label: "Explore Brand Graphics" };
    }
    if (titleLower.includes("growth")) {
      return { href: "/work?tab=Reels", label: "Explore Growth Creative" };
    }
    return { href: "/work", label: "Explore Work Archive" };
  }

  return (
    <PageFrame active="Services">
      <PageHero
        eyebrow="CAPABILITIES"
        title="MORE"
        italic="Range."
        index="02"
        copy="From the first strategic question to the final shipped product, Zenkai Media keeps creative and technical thinking in the same room."
        videoSrc="/media/services-hero-landscape.mp4"
        mobileVideoSrc="/media/services-hero-portrait.mp4"
        posterSrc="/media/services-hero-landscape.png"
        singleLine={true}
      />
      <section className="route-section shell">
        <div className="route-service-list">
          {services.map((service, index) => {
            const relatedWork = getServiceWork(service.title);
            const workLinkInfo = getServiceWorkLink(service.title);
            const isWeb = service.title.toLowerCase().includes("web");
            const isSoftware = service.title.toLowerCase().includes("software");
            const isThumbnail = service.title.toLowerCase().includes("thumbnail");
            return (
              <motion.article
                key={service.number}
                className={`service-showcase-panel ${
                  isSoftware ? "software-split-panel" : isWeb ? "web-showcase-panel" : ""
                }`}
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

                {/* Right Column / Bottom Section: Featured Showcase */}
                {isSoftware ? (
                  <div className="software-banner-container">
                    <div className="service-gallery-head">
                      <span>Featured Software Platform ({relatedWork.length})</span>
                    </div>
                    {relatedWork.map((work) => {
                      const domain = work.url
                        ? work.url.replace("https://", "").replace("http://", "").replace(/\/$/, "")
                        : "mark47.com";
                      return (
                        <div className="web-browser-frame software-hero-frame" key={work.id}>
                          {/* Chrome / Mac OS Browser Bar */}
                          <div className="browser-header">
                            <div className="browser-dots">
                              <span className="dot red" />
                              <span className="dot yellow" />
                              <span className="dot green" />
                            </div>
                            <div className="browser-address">
                              <span className="lock-icon">🔒</span>
                              <span>{domain}</span>
                            </div>
                            <span className="browser-badge">LIVE SYSTEM</span>
                          </div>

                          {/* High Visibility Banner Viewport */}
                          <div className="browser-viewport" onClick={() => setSelectedAsset(work)}>
                            <img src={work.src} alt={work.title} loading="lazy" className="browser-banner-img" />
                            <div className="browser-hover-shield">
                              <span>EXPAND PREVIEW ↗</span>
                            </div>
                          </div>

                          {/* Project Meta Info */}
                          <div className="browser-footer-info">
                            <div className="browser-title-row">
                              <h3>{work.title}</h3>
                              {work.url && (
                                <a
                                  href={work.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="browser-live-btn"
                                >
                                  VISIT SITE ↗
                                </a>
                              )}
                            </div>
                            <p className="browser-desc">
                              Broadcast & live production software engineered for PUBG Mobile esports tournaments, real-time match telemetry, observer overlays, and graphics automation.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : isWeb ? (
                  <div className="web-browser-section">
                    <div className="service-gallery-head">
                      <span>Featured {service.title} Projects ({relatedWork.length})</span>
                    </div>
                    <div className="web-browser-grid">
                      {relatedWork.map((work) => {
                        const domain = work.url
                          ? work.url.replace("https://", "").replace("http://", "").replace(/\/$/, "")
                          : "website.com";
                        return (
                          <div className="web-browser-frame" key={work.id}>
                            {/* Chrome / Mac OS Browser Bar */}
                            <div className="browser-header">
                              <div className="browser-dots">
                                <span className="dot red" />
                                <span className="dot yellow" />
                                <span className="dot green" />
                              </div>
                              <div className="browser-address">
                                <span className="lock-icon">🔒</span>
                                <span>{domain}</span>
                              </div>
                              <span className="browser-badge">{work.isVideo ? "DEMO VIDEO" : "LIVE SYSTEM"}</span>
                            </div>

                            {/* Crisp Banner Viewport (100% Fits perfectly without cropping) */}
                            <div className="browser-viewport" onClick={() => setSelectedAsset(work)}>
                              {work.isVideo ? (
                                <AutoplayVideo src={work.src} className="browser-banner-img" />
                              ) : (
                                <img src={work.src} alt={work.title} loading="lazy" className="browser-banner-img" />
                              )}
                              <div className="browser-hover-shield">
                                <span>EXPAND PREVIEW ↗</span>
                              </div>
                            </div>

                            {/* Project Meta Info */}
                            <div className="browser-footer-info">
                              <div className="browser-title-row">
                                <h3>{work.title}</h3>
                                {work.url && (
                                  <a
                                    href={work.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="browser-live-btn"
                                  >
                                    VISIT SITE ↗
                                  </a>
                                )}
                              </div>
                              <p className="browser-desc">
                                {work.title.toLowerCase().includes("solentrix")
                                  ? "Clean energy platform in Pakistan offering premium solar installations, smart battery storage, and custom hybrid inverters."
                                  : "AI Talent Marketplace matching enterprise companies with vetted machine learning experts, data scientists, and consulting services."}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : isThumbnail ? (
                  <div className="thumbnail-showcase-section">
                    <div className="service-gallery-head">
                      <span>High-CTR YouTube Thumbnails ({relatedWork.length})</span>
                    </div>
                    <div className="thumbnail-showcase-grid">
                      {relatedWork.map((work) => (
                        <div
                          key={work.id}
                          className="thumbnail-preview-card"
                          onClick={() => setSelectedAsset(work)}
                        >
                          <div className="thumbnail-media-wrap">
                            <img src={work.src} alt={work.title} loading="lazy" />
                            <div className="thumbnail-hover-badge">
                              <span>EXPAND THUMBNAIL ↗</span>
                            </div>
                          </div>
                          <div className="thumbnail-card-info">
                            <span>YOUTUBE THUMBNAIL</span>
                            <h4>{work.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="service-showcase-gallery">
                    <div className="service-gallery-head">
                      <span>Featured Work ({relatedWork.length})</span>
                    </div>
                    <div className="service-gallery-grid">
                      {relatedWork.map((work) => {
                        const cardClass =
                          work.type.toLowerCase() === "web"
                            ? "web-card banner-card"
                            : work.type.toLowerCase() === "reels"
                            ? "reel-card video-card"
                            : work.type.toLowerCase() === "thumbnails"
                            ? "thumbnail-card"
                            : "poster-card";
                        return (
                          <div
                            key={work.id}
                            className={`service-work-card ${cardClass}`}
                            onClick={() => setSelectedAsset(work)}
                          >
                            {work.isVideo ? (
                              <AutoplayVideo src={work.src} />
                            ) : (
                              <img src={work.src} alt={work.title} loading="lazy" />
                            )}
                            <div className="service-work-overlay">
                              <span>{work.type}</span>
                              <h4>{work.title}</h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Brandif-inspired Interactive 4-Step Studio Process Section */}
      <section className="studio-process-section shell">
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
            <span className="kicker">STUDIO WORKFLOW</span>
            <h2>
              From concept.<br />
              <em>To momentum.</em>
            </h2>
          </div>
          <p>Four disciplined phases designed to eliminate friction and ship extraordinary work on time.</p>
        </motion.div>

        <div className="process-grid">
          {[
            {
              step: "01",
              phase: "STRATEGY & AUDIT",
              title: "Uncovering the Advantage",
              desc: "We analyze your audience, positioning gaps, and brand identity before crafting the core creative direction.",
              deliverable: "Positioning Brief & Architecture",
            },
            {
              step: "02",
              phase: "PROTOTYPING",
              title: "High-Fidelity Direction",
              desc: "Developing responsive UI components, motion guidelines, video storyboards, and high-impact visual design.",
              deliverable: "Interactive Prototypes & Tokens",
            },
            {
              step: "03",
              phase: "ENGINEERING",
              title: "Production & Polish",
              desc: "Building clean full-stack applications in Next.js, Framer Motion, and producing high-CTR media assets.",
              deliverable: "Shipped Code & Media Assets",
            },
            {
              step: "04",
              phase: "LAUNCH & SCALE",
              title: "Performance Engine",
              desc: "Deploying high-speed infrastructure, measuring real-time telemetry, and optimizing for audience growth.",
              deliverable: "Live System & Growth Metrics",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              className="process-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div className="process-header">
                <span className="process-step">{item.step}</span>
                <span className="process-phase">{item.phase}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="process-deliverable-pill">
                <span>Output:</span> {item.deliverable}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern Comparison Matrix Table */}
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
              Modern studio.<br />
              <em>Zero overhead.</em>
            </h2>
          </div>
          <p>How our integrated team compares to bloated traditional agency retainers.</p>
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
                zenkai: "Web, Software, Video, 2D Design, Thumbnails",
                traditional: "Siloed across 3–4 separate vendors",
              },
              {
                feature: "Execution Speed",
                zenkai: "Rapid weekly iterations & shipped builds",
                traditional: "Months of bloated meetings & decks",
              },
              {
                feature: "Technical Quality",
                zenkai: "Next.js, Framer Motion, 4K Video Pipeline",
                traditional: "Outsourced templates & slow plugins",
              },
              {
                feature: "Focus & Outcome",
                zenkai: "High CTR, conversion performance, & impact",
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
          Bring the ambition.<br />
          <em>We’ll bring the range.</em>
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
