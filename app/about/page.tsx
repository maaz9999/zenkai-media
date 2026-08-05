"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Arrow, PageFrame, PageHero } from "../components/PageShell";

const principles = [
  ["01", "Retention before vanity", "We craft hooks and edits focused on viewer watch-time, engagement, and actual growth."],
  ["02", "Consistency is king", "Every video and social post is built within a repeatable system for reliable content output."],
  ["03", "High-CTR packaging", "From thumbnails to titles and reels, we package content to command attention in crowded feeds."],
  ["04", "Senior editors, direct access", "The editors and media strategists planning your content are the ones executing and refining it."],
];

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/#about");
    }
  }, []);
  return (
    <PageFrame active="About">
      <PageHero
        eyebrow="THE STUDIO"
        title="Built for"
        italic="reach & retention."
        index="04"
        copy="Zenkai Media is a specialized Video Editing & Social Media Management (SMM) studio for creators, esports legends, and ambitious brands."
        primaryCtaLabel="Explore Portfolio"
        primaryCtaHref="/work"
        secondaryCtaLabel="Discuss a Project"
        secondaryCtaHref="/contact"
      />
      <section className="about-story shell">
        <motion.div className="story-media" initial={{ opacity: 0, rotate: -4 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }}><img src="/media/Arslan_ash_tournament.jpg" alt="Tournament poster created by Zenkai Media" /><div>PK<br />→<br />WORLD</div></motion.div>
        <motion.div className="story-copy" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="kicker">OUR POINT OF VIEW</span><h2>Specialized<br />by <em>design.</em></h2><p>Generic agencies try to do everything—web development, app coding, SEO, offline ads—and end up delivering mediocre video edits. Zenkai Media was built differently: hyper-focused on high-retention video editing and strategic Social Media Management (SMM).</p><p>We partner with creators, competitive players, and brands to turn raw footage into high-converting YouTube videos, viral reels, and click-tested channel assets.</p></motion.div>
      </section>
      <section className="principles shell"><span className="kicker">HOW WE WORK</span><div>{principles.map(([number, title, copy], index) => <motion.article key={number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><span>{number}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}</div></section>
      <section className="route-callout shell"><span className="kicker">READY WHEN YOU ARE</span><h2>Scale your content.<br /><em>We’ll handle the production.</em></h2><a href="/contact">Work with Zenkai Media <Arrow /></a></section>
    </PageFrame>
  );
}
