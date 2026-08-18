"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import LightRays from "./LightRays";

export const navItems = [
  ["Home", "/"],
  ["Portfolio", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function Arrow() {
  return null;
}

export function Logo() {
  return (
    <a className="logo medievalsharp-regular" href="/" aria-label="Zenkai Media home">
      <img src="/favicon.png" alt="Zenkai Media Logo" className="logo-img" />
      <span>ZENKAI MEDIA</span>
    </a>
  );
}

export function SiteNav({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="nav shell" aria-label="Main navigation">
        <Logo />
        <div className="desktop-nav route-nav">
          {navItems.map(([label, href]) => (
            <a className={active === label ? "active" : ""} key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="/contact">
          Start a project
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {navItems.map(([label, href], index) => (
              <motion.a
                key={label}
                href={href}
                className={active === label ? "active" : ""}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 + 0.12 }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  function handleBackToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="footer-wrap">
      <div className="footer-inner shell">
        <div className="footer-top-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-bio">
              Independent Video Editing &amp; Social Media Management (SMM) studio. Engineering high-retention video edits, short-form reels, thumbnails, and channel growth strategies.
            </p>
            <div className="footer-availability">
              <span className="dot" /> Taking on selected projects
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#top" onClick={handleBackToTop}>Home</a></li>
              <li><a href="#services">Capabilities</a></li>
              <li><a href="#work">Portfolio Showcase</a></li>
              <li><a href="#packages">Monthly Packages</a></li>
              <li><a href="#about">Why Zenkai</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Social Media</h4>
            <ul>
              <li>
                <a href="https://www.instagram.com/zenkai.media/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/zenkai-media-2458a542a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-contact-col">
            <h4>Direct Contact</h4>
            <div className="footer-contact-item">
              <span style={{ display: "block", marginBottom: "4px" }}>Email</span>
              <a href="mailto:team@zenkai.media" className="footer-link-highlight">
                team@zenkai.media
              </a>
            </div>
            <div className="footer-contact-item">
              <span style={{ display: "block", marginBottom: "4px" }}>Phone / WhatsApp</span>
              <a href="tel:+923137396135" className="footer-link-highlight">
                +92 313 7396135
              </a>
            </div>
            <div className="footer-contact-item">
              <span style={{ display: "block", marginBottom: "4px" }}>Location</span>
              <p>Pakistan · Working Worldwide</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>© 2026 Zenkai Media. All rights reserved.</span>
          <a href="#top" onClick={handleBackToTop} className="back-top-link" style={{ cursor: "pointer" }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  italic,
  copy,
  index,
  videoSrc,
  mobileVideoSrc,
  posterSrc,
  bgImageSrc,
  showTopWidget = false,
  singleLine = false,
  showActions = true,
  primaryCtaLabel = "Explore Work",
  primaryCtaHref = "/work",
  secondaryCtaLabel = "Start a Project",
  secondaryCtaHref = "/contact",
}: {
  eyebrow: string;
  title: string;
  italic: string;
  copy: string;
  index: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  posterSrc?: string;
  bgImageSrc?: string;
  showTopWidget?: boolean;
  singleLine?: boolean;
  showActions?: boolean;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}) {
  return (
    <section className={`page-hero ${videoSrc ? "has-bg-video" : bgImageSrc ? "has-bg-banner" : ""} shell`}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={0.5}
      />
      {bgImageSrc && (
        <div className="hero-bg-banner-container">
          <img src={bgImageSrc} alt="" className="hero-bg-banner-image" loading="eager" />
          <div className="hero-bg-banner-overlay" />
        </div>
      )}
      {videoSrc && (
        <div className="hero-bg-video-container">
          {mobileVideoSrc ? (
            <>
              <video
                src={videoSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="hero-bg-video-element desktop-only-video"
              />
              <video
                src={mobileVideoSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="hero-bg-video-element mobile-only-video"
              />
            </>
          ) : (
            <video
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-bg-video-element"
            />
          )}
          <div className="hero-bg-video-overlay" />
        </div>
      )}

      <motion.div
        className="page-hero-title-group"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="kicker">{eyebrow}</span>
        <h1>
          {singleLine ? (
            <>
              {title} <em>{italic}</em>
            </>
          ) : (
            <>
              {title}
              <br />
              <em>{italic}</em>
            </>
          )}
        </h1>
      </motion.div>

      <motion.div
        className="page-hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.16 }}
      >
        {showTopWidget && (
          <div className="hero-top-widget">
            <div className="hero-status-pill">
              <span className="live-dot" />
              <span>STUDIO ENGINE • LIVE DISCIPLINE LABS</span>
            </div>
            <div className="hero-capabilities-grid">
              <span>WEB</span>
              <span>REELS</span>
              <span>SOFTWARE</span>
              <span>BRAND</span>
              <span>THUMBNAILS</span>
            </div>
          </div>
        )}
        <div className="hero-copy-bottom">
          <span>{index} / 05</span>
          <p>{copy}</p>
          {showActions && (
            <div className="brandif-hero-actions" style={{ marginTop: "18px" }}>
              <a href={primaryCtaHref} className="brandif-btn-primary">
                {primaryCtaLabel} <Arrow />
              </a>
              <a href={secondaryCtaHref} className="brandif-btn-secondary">
                {secondaryCtaLabel} <Arrow />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export function PageFrame({ active, children }: { active: string; children: React.ReactNode }) {
  return <main id="page-top"><div className="grain" aria-hidden="true" /><SiteNav active={active} />{children}<SiteFooter /></main>;
}

export function AutoplayVideo({
  src,
  poster,
  className,
  ariaLabel,
  eager = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
  eager?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [srcSet, setSrcSet] = useState(eager);

  // Step 1: Preload video early (600px lookahead margin)
  useEffect(() => {
    if (eager) {
      setSrcSet(true);
      return;
    }
    const wrap = wrapRef.current;
    if (!wrap) return;
    const srcObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSrcSet(true);
          srcObserver.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    srcObserver.observe(wrap);
    return () => srcObserver.disconnect();
  }, [eager, src]);

  // Step 2: Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !srcSet) return;

    video.muted = true;

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    playObserver.observe(video);
    return () => playObserver.disconnect();
  }, [srcSet]);

  return (
    <div ref={wrapRef} className={`autoplay-video-wrapper ${isLoaded ? "is-loaded" : "is-loading"}`}>
      {!isLoaded && (
        <div className="video-skeleton-loader" aria-hidden="true">
          <div className="skeleton-spinner" />
          <span className="skeleton-text">LOADING MEDIA...</span>
        </div>
      )}
      {srcSet && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => setIsLoaded(true)}
          onPlay={() => setIsLoaded(true)}
          className={`${className || ""} ${isLoaded ? "video-visible" : "video-hidden"}`}
          aria-label={ariaLabel}
        />
      )}
    </div>
  );
}
