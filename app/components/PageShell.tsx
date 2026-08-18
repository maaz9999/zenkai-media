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
                <a href="https://youtube.com/@zenkaimedia" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/zenkaimedia" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/zenkai" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Discord</span>
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
