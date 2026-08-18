"use client";

import { FormEvent, MouseEvent, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { products, services } from "./content";
import { assetItems, MediaAsset } from "./assetsData";
import { MediaModal } from "./components/MediaModal";
import { CustomDropdown } from "./components/CustomDropdown";
import { SiteFooter, AutoplayVideo } from "./components/PageShell";
import LightRays from "./components/LightRays";

const navItems = [
  ["Home", "#top"],
  ["Services", "#services"],
  ["Portfolio", "#work"],
  ["Packages", "#packages"],
  ["Why Zenkai", "#about"],
  ["Contact", "#contact"],
];

const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
};

function Logo() {
  return (
    <a className="logo medievalsharp-regular" href="#top" aria-label="Zenkai Media home">
      <img src="/favicon.png" alt="Zenkai Media Logo" className="logo-img" />
      <span>ZENKAI MEDIA</span>
    </a>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 22 });

  function tilt(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    event.currentTarget.style.setProperty("--my", `${y * 100}%`);
    ry.set((x - 0.5) * 5);
    rx.set(-(y - 0.5) * 5);
  }

  return (
    <motion.article
      className="service-card plain-service-card"
      data-number={service.number}
      style={{ rotateX, rotateY, "--accent": service.color } as React.CSSProperties}
      onMouseMove={tilt}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="service-top">
        <span>ZENKAI / {service.number}</span>
        <span>{service.tag}</span>
        <i>AVAILABLE</i>
      </div>
      <div className="service-copy">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
      <div className="service-footer">
        <ul>
          {service.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a href="#contact" className="service-discuss-link" aria-label={`Start a ${service.title} project`}>
          <span>Inquire Service</span>
          <Arrow />
        </a>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [subFilter2D, setSubFilter2D] = useState<"4THRIVE" | "ARSLAN ASH">("4THRIVE");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [sent, setSent] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 20 });
  const cardX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const cardY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const cardRotate = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    setFormReady(true);
  }, []);

  function trackPointer(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleAnchorClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "d68962ff-4b36-4171-874e-a1d2d6c6e7a2");
    formData.append("subject", "New Zenkai Media Inquiry");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });
      const data = (await res.json()) as { success?: boolean };
      if (data.success) {
        setSent(true);
      } else {
        setSent(true);
      }
    } catch (e) {
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const filteredAssets = assetItems.filter((item) => {
    if (item.type.toLowerCase() === "software" || item.type.toLowerCase() === "web") return false;
    if (filter === "All") return true;
    if (filter === "Reels") return item.type.toLowerCase() === "reels";
    if (filter === "Thumbnails") return item.type.toLowerCase() === "thumbnails";
    if (filter === "Posters") return item.type.toLowerCase() === "posters";

    if (filter === "Arslan Ash") {
      return item.folder.toLowerCase().includes("twitch emote presentation") || item.id.includes("twitch-emote") || item.id.includes("twitch-sticker");
    }
    if (filter === "4T") {
      return (item.folder.toLowerCase().includes("4thrive") || item.id.includes("merch-4thrive")) && item.type !== "Reels";
    }
    if (filter === "2D Design" || filter === "2D & Art") {
      if (subFilter2D === "ARSLAN ASH") {
        return item.folder.toLowerCase().includes("twitch emote presentation") || item.id.includes("twitch-emote") || item.id.includes("twitch-sticker");
      }
      return (item.folder.toLowerCase().includes("4thrive") || item.id.includes("merch-4thrive")) && item.type !== "Reels";
    }
    return item.type.toLowerCase() === filter.toLowerCase();
  });

  const sortedFilteredAssets = [...filteredAssets].sort((a, b) => {
    if (filter === "All") {
      const getPriority = (item: MediaAsset) => {
        if (item.type.toLowerCase() === "reels" || item.isVideo) return 1;
        if (item.type.toLowerCase() === "posters") return 2;
        return 3;
      };
      return getPriority(a) - getPriority(b);
    }
    return 0;
  });

  const currentModalIndex = selectedAsset ? assetItems.findIndex((a) => a.id === selectedAsset.id) : -1;
  const hasPrev = currentModalIndex > 0;
  const hasNext = currentModalIndex >= 0 && currentModalIndex < assetItems.length - 1;

  return (
    <main id="top">
      <div className="grain" aria-hidden="true" />
      
      {/* Floating Single-Page Navigation */}
      <nav className="nav shell" aria-label="Main navigation">
        <Logo />
        <div className="desktop-nav">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={(e) => handleAnchorClick(e, href)}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact" onClick={(e) => handleAnchorClick(e, "#contact")}>Start a project</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}>
            {navItems.map(([label, href], index) => (
              <motion.a key={label} href={href} onClick={(e) => handleAnchorClick(e, href)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 + 0.12 }}>{label}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero shell" onMouseMove={trackPointer}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.6}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
        <div className="hero-glow" aria-hidden="true" />
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div className="eyebrow" variants={reveal}><span /> Independent Video &amp; SMM Studio · PK / Worldwide</motion.div>
          <motion.h1 variants={reveal}>High-Retention<br /><span>Video Edits</span> &amp;<br />SMM Growth.</motion.h1>
          <motion.div className="hero-bottom" variants={reveal} style={{ flexDirection: "column", alignItems: "flex-start", gap: "24px" }}>
            <p style={{ maxWidth: "480px", margin: 0 }}>High-impact YouTube edits, vertical Reels/Shorts, and end-to-end Social Media Management built to scale channel authority.</p>
            <div className="brandif-hero-actions" style={{ marginTop: 0 }}>
              <a href="#work" onClick={(e) => handleAnchorClick(e, "#work")} className="brandif-btn-primary">
                Explore Portfolio
              </a>
              <a href="#contact" onClick={(e) => handleAnchorClick(e, "#contact")} className="brandif-btn-secondary">
                Start a Project
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="hero-stage" style={{ x: cardX, y: cardY, rotateY: cardRotate }}>
          <motion.div className="stage-card stage-main" initial={{ opacity: 0, rotate: 8, scale: 0.85 }} animate={{ opacity: 1, rotate: 3, scale: 1 }} transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <img src="/Assets/banner.JPG" alt="Zenkai Media Featured Banner Design" />
          </motion.div>
          <motion.div className="stage-card stage-poster" animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [-7, -5, -7] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <img src="/Assets/POSTERS/jonn.jpg" alt="Why I Fear Veera Malik poster by Zenkai Media" />
          </motion.div>
          <motion.div className="stage-card stage-small" animate={reduceMotion ? undefined : { y: [0, 10, 0], rotate: [8, 5, 8] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
            <video src="/Assets/REELS/Ashes reel.mp4" autoPlay muted loop playsInline aria-label="Short-form video edit by Zenkai Media" />
          </motion.div>
          <div className="stage-ring ring-one" /><div className="stage-ring ring-two" />
          <div className="stage-badge">EDIT<br /><span>REELS<br />SMM<br />GROWTH</span></div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services shell">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
          <div><span className="kicker">WHAT WE DO</span><h2>Core Pillars.<br />Maximum reach.</h2></div>
          <p>We focus 100% on high-retention video production, click-tested packaging, and strategic social channel management.</p>
        </motion.div>
        <div className="service-grid">{services.map((service) => <ServiceCard key={service.number} service={service} />)}</div>
      </section>

      {/* Integrated Work Portfolio Showcase Section */}
      <section id="work" className="section work-section">
        <div className="shell">
          <motion.div className="section-heading work-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
            <div><span className="kicker">PORTFOLIO SHOWCASE</span><h2>Selected<br />Works.</h2></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div className="filters" role="group" aria-label="Filter projects">
                {["All", "Reels", "Thumbnails", "Posters", "2D & Art"].map((item) => (
                  <button key={item} className={filter === item || (filter === "2D Design" && item === "2D & Art") ? "active" : ""} onClick={() => setFilter(item)}>
                    {item === "Reels" ? "Reels & Videos" : item}
                  </button>
                ))}
              </div>
              {(filter === "2D Design" || filter === "2D & Art") && (
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
          </motion.div>
          
          <motion.div layout className="project-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <AnimatePresence mode="popLayout">
              {sortedFilteredAssets
                .slice(0, 15)
                .map((item, index) => {
                  const isVideo = item.type.toLowerCase() === "reels" || item.isVideo;
                  const isPoster = item.type.toLowerCase() === "posters";
                  const isThumbnail = item.type.toLowerCase() === "thumbnails";
                  const isContain = item.type === "2D Design" || item.folder.toLowerCase().includes("4thrive") || item.id.includes("merch-4thrive");
                  const cardTypeClass = isVideo
                    ? "video-card reel-card"
                    : isPoster
                    ? "poster-card"
                    : isThumbnail
                    ? "thumbnail-card"
                    : isContain
                    ? "contain-fit"
                    : "normal";
                  return (
                    <motion.article
                      className={`project-card ${cardTypeClass}`}
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.45, delay: index * 0.04 }}
                      onClick={() => setSelectedAsset(item)}
                    >
                      {item.isVideo ? (
                        <AutoplayVideo src={item.src} ariaLabel={`${item.title} video project`} />
                      ) : (
                        <img src={item.src} alt={`${item.title} project by Zenkai Media`} loading="lazy" />
                      )}
                      <div className="project-overlay">
                        <span>{item.type}</span>
                      </div>
                    </motion.article>
                  );
                })}
            </AnimatePresence>
          </motion.div>
        </div>

        <MediaModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onPrev={() => {
            if (hasPrev) setSelectedAsset(assetItems[currentModalIndex - 1]);
          }}
          onNext={() => {
            if (hasNext) setSelectedAsset(assetItems[currentModalIndex + 1]);
          }}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </section>

      {/* Monthly Content & SMM Packages Section */}
      <section id="packages" className="section shell" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
          <div><span className="kicker">PRODUCTION SYSTEM</span><h2>Monthly<br />Packages.</h2></div>
          <p>Repeatable editing and SMM retainers designed to scale your channel output consistently.</p>
        </motion.div>

        <div className="service-grid">
          {products.map((prod) => (
            <motion.article
              key={prod.code}
              className="service-card plain-service-card"
              style={{ "--accent": prod.accent, gridColumn: "span 6 !important" } as React.CSSProperties}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="service-top">
                <span>{prod.code}</span>
                <span>{prod.label}</span>
                <i>RETAINER</i>
              </div>
              <div className="service-copy">
                <h3>{prod.name}</h3>
                <p>{prod.description}</p>
              </div>
              <div className="service-footer">
                <ul>
                  {prod.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#contact" onClick={(e) => handleAnchorClick(e, "#contact")} className="service-discuss-link">
                  <span>Select Package</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Why Zenkai / Specialized by Design Section */}
      <section id="about" className="section shell" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
        <motion.div className="specialized-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <div className="specialized-glow-ring" aria-hidden="true" />
          <div className="specialized-copy">
            <span className="kicker"><span className="dot" /> SPECIALIZED BY DESIGN</span>
            <h2>Specialized.<br />For <span>Channel Retention.</span></h2>
            <p>Zero web bloat, zero fluff. Zenkai Media focuses exclusively on high-retention video editing, click-tested packaging, and end-to-end social media management for creators, esports teams, and ambitious brands.</p>
            <div style={{ marginTop: "24px" }}>
              <a href="#services" onClick={(e) => handleAnchorClick(e, "#services")} className="brandif-btn-primary">
                Explore Core Pillars
              </a>
            </div>
          </div>

          <div className="specialized-stats-grid">
            <div className="spec-stat-item">
              <strong>100%</strong>
              <span>Video &amp; SMM Focus</span>
            </div>
            <div className="spec-stat-item">
              <strong>10M+</strong>
              <span>Watch-Time Impressions</span>
            </div>
            <div className="spec-stat-item">
              <strong>1:1</strong>
              <span>Senior Editor Access</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* High-Impact Bento Comparison Showcase */}
      <section className="comparison-section shell">
        <motion.div className="comparison-header-wrapper" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
          <span className="kicker">STUDIO VS TRADITIONAL AGENCY</span>
          <h2>Built Different for <em>Channel Growth.</em></h2>
          <p>Why top creators and gaming legends partner with Zenkai Media instead of slow traditional agencies.</p>
        </motion.div>

        <div className="bento-comparison-grid">
          {/* Zenkai Studio Card */}
          <motion.div className="bento-card-zenkai" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div>
              <div className="bento-badge-hero">
                <span className="pulse-dot" /> ZENKAI MEDIA STUDIO ✦ HIGH RETENTION ENGINE
              </div>
              <h3>1:1 Senior Editing &amp; Channel Growth Engine</h3>
              <p className="bento-subhead">A dedicated media team handling long-form YouTube cuts, vertical viral reels, thumbnails, and channel publishing under one roof.</p>
              
              <div className="bento-features-list">
                <div className="bento-feature-item">
                  <div className="bento-feature-header">
                    <span className="icon-check">✓</span>
                    <h4>Direct 1:1 Senior Team</h4>
                  </div>
                  <p>Work directly with lead editors &amp; strategists. Zero middleman handoffs.</p>
                </div>
                <div className="bento-feature-item">
                  <div className="bento-feature-header">
                    <span className="icon-check">✓</span>
                    <h4>Full Discipline Engine</h4>
                  </div>
                  <p>Long-form, Shorts/Reels, SMM, Thumbnails &amp; Growth Creative in sync.</p>
                </div>
                <div className="bento-feature-item">
                  <div className="bento-feature-header">
                    <span className="icon-check">✓</span>
                    <h4>Rapid 48h Turnaround</h4>
                  </div>
                  <p>Continuous weekly sprints &amp; daily social publishing cadence.</p>
                </div>
                <div className="bento-feature-item">
                  <div className="bento-feature-header">
                    <span className="icon-check">✓</span>
                    <h4>4K 60fps Pipeline</h4>
                  </div>
                  <p>High-retention motion FX, custom sound design &amp; color grading.</p>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "20px", borderTop: "1px solid rgba(255, 102, 0, 0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <span style={{ font: "10px var(--font-geist-mono), monospace", color: "var(--acid)", letterSpacing: "0.1em", textTransform: "uppercase" }}>✦ 100% RETENTION GUARANTEE</span>
              <a href="#contact" onClick={(e) => handleAnchorClick(e, "#contact")} className="brandif-btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>
                Start Studio Partnership <Arrow />
              </a>
            </div>
          </motion.div>

          {/* Traditional Agency Card */}
          <motion.div className="bento-card-agency" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div>
              <div className="bento-badge-muted">TRADITIONAL AGENCIES</div>
              <h3>Slow Meetings &amp; Bloated Overhead</h3>
              <p className="bento-subhead">Generic agencies that treat video as an afterthought with bloated account managers.</p>
              
              <div className="agency-flaws-list">
                <div className="agency-flaw-item">
                  <span className="icon-cross">✕</span>
                  <div>
                    <h5>Junior Account Hand-offs</h5>
                    <p>Passed to inexperienced interns behind complex email chains.</p>
                  </div>
                </div>
                <div className="agency-flaw-item">
                  <span className="icon-cross">✕</span>
                  <div>
                    <h5>Siloed Vendors</h5>
                    <p>Splitting video, thumbnails &amp; SMM across 3–4 different agencies.</p>
                  </div>
                </div>
                <div className="agency-flaw-item">
                  <span className="icon-cross">✕</span>
                  <div>
                    <h5>Sluggish Output</h5>
                    <p>Weeks wasted in deck approvals &amp; unnecessary status calls.</p>
                  </div>
                </div>
                <div className="agency-flaw-item">
                  <span className="icon-cross">✕</span>
                  <div>
                    <h5>Outsourced Template Cuts</h5>
                    <p>Generic Premiere presets with zero watch-time optimization.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="shell contact-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <span className="kicker">HAVE A PROJECT?</span>
            <h2>Let’s make<br />it <em>viral.</em></h2>
            <p>Tell us about your content goals, current channel metrics, or campaign deadlines.</p>
            <div className="home-direct-contact">
              <div className="contact-pill">
                <span>Email</span>
                <a href="mailto:team@zenkai.media">team@zenkai.media</a>
              </div>
              <div className="contact-pill">
                <span>Phone / WhatsApp</span>
                <a href="tel:+923137396135">+92 313 7396135</a>
              </div>
            </div>
          </motion.div>
          {!formReady ? (
            <div className="form-placeholder" aria-hidden="true" />
          ) : sent ? (
            <motion.div className="thanks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span>✓</span><h3>Brief received.</h3><p>Thanks for reaching out. Zenkai Media will get back to you with the next move.</p><button onClick={() => setSent(false)}>Send another</button>
            </motion.div>
          ) : (
            <form onSubmit={submit} autoComplete="off" data-lpignore="true" data-form-type="other">
              <label suppressHydrationWarning><span>Your name</span><input type="text" name="name" placeholder="Jane Smith" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
              <label suppressHydrationWarning><span>Work email</span><input type="email" name="email" placeholder="jane@company.com" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
              <label suppressHydrationWarning>
                <span>I need help with</span>
                <CustomDropdown
                  name="service"
                  placeholder="Select a service"
                  options={["Video editing", "Social media management", "Thumbnail design", "Growth creative", "Full content engine", "Something else"]}
                  value={serviceType}
                  onChange={setServiceType}
                  required
                />
              </label>
              <label suppressHydrationWarning><span>Project snapshot</span><textarea name="message" rows={3} placeholder="A few details about the project, channel, and goals…" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
              <button className="submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send the brief"} <Arrow /></button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
