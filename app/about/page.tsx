"use client";

import { motion } from "framer-motion";
import { Arrow, PageFrame, PageHero } from "../components/PageShell";

const principles = [
  ["01", "Clarity before craft", "We find the sharpest version of the problem before making anything look impressive."],
  ["02", "Systems over one-offs", "Every deliverable is designed to create momentum beyond a single launch or campaign."],
  ["03", "Taste meets technology", "Creative instinct and technical execution stay connected from the first sketch to release."],
  ["04", "Small team, direct access", "The people thinking about the work are the same people shaping and shipping it."],
];

export default function AboutPage() {
  return (
    <PageFrame active="About">
      <PageHero
        eyebrow="THE STUDIO"
        title="Built for"
        italic="bold moves."
        index="04"
        copy="Zenkai Media is an independent creative technology studio for brands and people who care how the work feels—and how well it performs."
        bgImageSrc="/SERVICES.png"
      />
      <section className="about-story shell">
        <motion.div className="story-media" initial={{ opacity: 0, rotate: -4 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }}><img src="/media/Arslan_ash_tournament.jpg" alt="Tournament poster created by Zenkai Media" /><div>PK<br />→<br />WORLD</div></motion.div>
        <motion.div className="story-copy" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="kicker">OUR POINT OF VIEW</span><h2>Independent<br />by <em>design.</em></h2><p>Good work gets diluted when strategy, design, content, and development live in separate lanes. Zenkai Media was built to connect them—giving every idea a stronger through-line and every client a more direct way to create.</p><p>We work across media and software because modern brands do too. The result is one responsive partner for the things people watch, use, share, and remember.</p></motion.div>
      </section>
      <section className="principles shell"><span className="kicker">HOW WE WORK</span><div>{principles.map(([number, title, copy], index) => <motion.article key={number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><span>{number}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}</div></section>
      <section className="route-callout shell"><span className="kicker">READY WHEN YOU ARE</span><h2>Bring the ambition.<br /><em>We’ll bring the range.</em></h2><a href="/contact">Work with Zenkai Media <Arrow /></a></section>
    </PageFrame>
  );
}
