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
  ["Work", "/work"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
};

function Logo() {
  return (
    <a className="logo medievalsharp-regular" href="/" aria-label="Zenkai Media home">
      <img src="/favicon.png" alt="Zenkai Media Logo" className="logo-img" />
      <span>ZENKAI MEDIA</span>
    </a>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const serviceMedia: Record<string, { src: string; isVideo?: boolean; label: string }> = {
  "01": { src: "/Assets/Thumbnails/solentrix.png", label: "WEB SYSTEM PREVIEW" },
  "02": { src: "/Assets/REELS/v2.mp4", isVideo: true, label: "SHORT-FORM CONTENT" },
  "03": { src: "/Assets/MARK47.png", isVideo: false, label: "MARK47 - PUBG MOBILE SOFTWARE" },
  "04": { src: "/Assets/POSTERS/jonn.jpg", label: "BRAND IDENTITY" },
  "05": { src: "/Assets/REELS/growth_creative.mp4", isVideo: true, label: "GROWTH CREATIVE" },
  "06": { src: "/Assets/Thumbnails/2025-01-04_09-01-54.jpg", label: "HIGH-CTR YOUTUBE THUMBNAIL" },
};

function ServiceVisual({ number, title }: { number: string; title: string }) {
  const media = serviceMedia[number] || { src: "/Assets/POSTERS/20250104_090832.jpg", label: "MEDIA PREVIEW" };
  return (
    <div className="service-visual" data-visual={number} aria-hidden="true">
      <div className="visual-meta"><span>LIVE SYSTEM</span><span>PR/{number}</span></div>
      <div className="visual-frame real-media-frame">
        {media.isVideo ? (
          <AutoplayVideo src={media.src} className="service-real-media" />
        ) : (
          <img src={media.src} alt={title} className="service-real-media" loading="lazy" />
        )}
        <div className="media-overlay-badge">{media.label}</div>
      </div>
      <span className="visual-name">{title}</span>
    </div>
  );
}

const productMedia = [
  { src: "/Assets/POSTERS/20250104_090832.jpg", isVideo: false, tag: "SYSTEM SHOWCASE" },
  { src: "/Assets/REELS/v2.mp4", isVideo: true, tag: "CONTENT ENGINE" },
  { src: "/Assets/MARK47.png", isVideo: false, tag: "MARK47 PUBG MOBILE" },
];

function HomeProductVisual({ index }: { index: number }) {
  const media = productMedia[index] || productMedia[0];
  return (
    <div className="home-product-art" data-product={index + 1} aria-hidden="true">
      <div className="product-art-bar"><span>ZENKAI / PREVIEW</span><i /><i /><i /></div>
      <div className="product-art-screen real-product-screen">
        {media.isVideo ? (
          <AutoplayVideo src={media.src} className="product-real-media" />
        ) : (
          <img src={media.src} alt="" className="product-real-media" loading="lazy" />
        )}
        <span className="product-media-tag">{media.tag}</span>
      </div>
      <div className="product-art-status"><span>BUILD READY</span><span>0{index + 1} / 03</span></div>
    </div>
  );
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
      className="service-card"
      data-number={service.number}
      style={{ rotateX, rotateY, "--accent": service.color } as React.CSSProperties}
      onMouseMove={tilt}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="service-top"><span>ZENKAI / {service.number}</span><span>{service.tag}</span><i>AVAILABLE</i></div>
      <ServiceVisual number={service.number} title={service.title} />
      <div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p></div>
      <div className="service-footer">
        <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        <a href="/contact" aria-label={`Start a ${service.title} project`}><span>Discuss service</span><Arrow /></a>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "d68962ff-4b36-4171-874e-a1d2d6c6e7a2"); // placeholder access key
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

  const visibleAssets = assetItems.filter(
    (item) => filter === "All" || item.type.toLowerCase() === filter.toLowerCase()
  ).slice(0, 12);

  const currentModalIndex = selectedAsset ? assetItems.findIndex((a) => a.id === selectedAsset.id) : -1;
  const hasPrev = currentModalIndex > 0;
  const hasNext = currentModalIndex >= 0 && currentModalIndex < assetItems.length - 1;

  return (
    <main id="top">
      <div className="grain" aria-hidden="true" />
      <nav className="nav shell" aria-label="Main navigation">
        <Logo />
        <div className="desktop-nav">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </div>
        <a className="nav-cta" href="/contact">Start a project <Arrow /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}>
            {navItems.map(([label, href], index) => (
              <motion.a key={label} href={href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 + 0.12 }}>{label} <Arrow /></motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
          <motion.div className="eyebrow" variants={reveal}><span /> Independent digital studio · PK / Worldwide</motion.div>
          <motion.h1 variants={reveal}>We turn<br /><span>ideas</span> into<br />impact.</motion.h1>
          <motion.div className="hero-bottom" variants={reveal}>
            <p>Creative media and digital products engineered to look impossible to ignore.</p>
            <a className="circle-link" href="/work" aria-label="Explore selected work"><span>Explore work</span><Arrow /></a>
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
          <div className="stage-badge">PLAY<br /><span>YOUR<br />NEXT<br />MOVE</span></div>
        </motion.div>

        <div className="hero-index"><span>01</span><div><i /></div><span>06</span></div>
      </section>

      <section className="marquee" aria-label="Zenkai Media capabilities">
        <motion.div animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {[0, 1].map((copy) => <span key={copy}>WEB <i>✦</i> EDITING <i>✦</i> APPS <i>✦</i> SOFTWARE <i>✦</i> STRATEGY <i>✦</i> </span>)}
        </motion.div>
      </section>

      <section id="services" className="section services shell">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
          <div><span className="kicker">WHAT WE DO</span><h2>One studio.<br /><em>Every screen.</em></h2></div>
          <p>We combine taste, technology, and momentum to build work that earns attention—and keeps it.</p>
        </motion.div>
        <div className="service-grid">{services.map((service) => <ServiceCard key={service.number} service={service} />)}</div>
        <a className="section-more" href="/services">Explore all capabilities <Arrow /></a>
      </section>


      <section id="work" className="section work-section">
        <div className="shell">
          <motion.div className="section-heading work-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
            <div><span className="kicker">SELECTED WORK ARCHIVE</span><h2>Built to<br /><em>be seen.</em></h2></div>
            <div className="filters" role="group" aria-label="Filter projects">
              {["All", "Posters", "Thumbnails", "Reels"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
          </motion.div>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {visibleAssets.map((item, index) => (
                <motion.article
                  className={`project-card ${item.size} ${item.isVideo ? "video-card" : ""}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  onClick={() => setSelectedAsset(item)}
                >
                  {item.isVideo ? (
                    <video src={item.src} autoPlay muted loop playsInline aria-label={`${item.title} video project`} />
                  ) : (
                    <img src={item.src} alt={`${item.title} project by Zenkai Media`} loading="lazy" />
                  )}
                  <div className="project-overlay">
                    <span>{item.type}</span>
                    <h3>{item.title}</h3>
                    <i>{item.isVideo ? "▶" : <Arrow />}</i>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="work-home-footer">
            <a href="/work" className="section-more">
              Explore Full Archive ({assetItems.length} Assets) <Arrow />
            </a>
          </div>
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

      <section id="about" className="section about shell">
        <motion.div className="about-orb" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}><span>ZENKAI MEDIA · IDEAS INTO IMPACT · </span><i /></motion.div>
        <motion.div className="about-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <span className="kicker">WHY ZENKAI</span>
          <h2>Small team.<br />Big <em>range.</em></h2>
          <p>Strategy without the theatre. Design without the sameness. Development without the handoffs. Zenkai Media brings the whole process under one sharp, responsive team.</p>
          <a href="/about" className="text-link">Meet your next creative partner <Arrow /></a>
        </motion.div>
        <div className="stats">
          <div><strong>4×</strong><span>disciplines<br />under one roof</span></div>
          <div><strong>360°</strong><span>from strategy<br />to launch</span></div>
          <div><strong>1:1</strong><span>senior-level<br />collaboration</span></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="shell contact-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <span className="kicker">HAVE A PROJECT?</span>
            <h2>Let’s make<br />it <em>unmissable.</em></h2>
            <p>Tell us what you’re building, what needs to change, or where you want to go next.</p>
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
                  options={["Web experiences", "Video & social", "Custom software", "Brand identity", "Growth creative", "Something else"]}
                  value={serviceType}
                  onChange={setServiceType}
                  required
                />
              </label>
              <label suppressHydrationWarning><span>Project snapshot</span><textarea name="message" rows={3} placeholder="A few details about the idea, timing, and goals…" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
              <button className="submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send the brief"} <Arrow /></button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
