"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import LightRays from "./LightRays";

export const navItems = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
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
      <nav className={`nav shell ${menuOpen ? "menu-active" : ""}`} aria-label="Main navigation">
        <Logo />
        <div className="desktop-nav route-nav">
          {navItems.map(([label, href]) => (
            <a className={active === label ? "active" : ""} key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="/contact">
          Start a project <Arrow />
        </a>
        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="bar bar-1" />
          <span className="bar bar-2" />
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-header">
              <span className="mobile-menu-label">MENU NAVIGATION</span>
              <button
                className="mobile-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="mobile-menu-links">
              {navItems.map(([label, href], index) => (
                <motion.a
                  key={label}
                  href={href}
                  className={active === label ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.06 }}
                >
                  <span>{label}</span>
                  <Arrow />
                </motion.a>
              ))}
            </div>
            <div className="mobile-menu-footer">
              <a href="/contact" className="mobile-cta-btn" onClick={() => setMenuOpen(false)}>
                START A PROJECT ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer shell">
      <div className="footer-top-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-bio">
            Independent creative technology & media studio. Engineering high-impact websites, video edits, reels, thumbnails, and custom software for ambitious brands.
          </p>
          <div className="footer-availability">
            <span className="dot" /> Taking on selected projects
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/work">Work Archive</a></li>
            <li><a href="/services">Capabilities</a></li>
            <li><a href="/about">About Studio</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="/services">Web Experiences</a></li>
            <li><a href="/services">Video & Reels Editing</a></li>
            <li><a href="/services">Thumbnail Suite</a></li>
            <li><a href="/services">Growth Creative</a></li>
            <li><a href="/services">Custom Software</a></li>
          </ul>
        </div>

        <div className="footer-col footer-contact-col">
          <h4>Direct Contact</h4>
          <div className="footer-contact-item">
            <span>Email</span>
            <a href="mailto:team@zenkai.media" className="footer-link-highlight">
              team@zenkai.media
            </a>
          </div>
          <div className="footer-contact-item">
            <span>Phone / WhatsApp</span>
            <a href="tel:+923137396135" className="footer-link-highlight">
              +92 313 7396135
            </a>
          </div>
          <div className="footer-contact-item">
            <span>Location</span>
            <p>Pakistan · Working Worldwide</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© 2026 Zenkai Media. All rights reserved.</span>
        <a href="#page-top" className="back-top-link">Back to top ↑</a>
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
