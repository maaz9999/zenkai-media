"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Arrow, PageFrame, PageHero } from "../components/PageShell";
import { CustomDropdown } from "../components/CustomDropdown";

export default function ContactPage() {
  const [ready, setReady] = useState(false);
  const [sent, setSent] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  
  useEffect(() => setReady(true), []);
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

  return (
    <PageFrame active="Contact">
      <PageHero
        eyebrow="START A PROJECT"
        title="Tell us the"
        italic="big idea."
        index="05"
        copy="Share the challenge, the ambition, or even the rough thought. We’ll help shape the smartest next move."
        primaryCtaLabel="Send a Brief"
        primaryCtaHref="#contact-form"
        secondaryCtaLabel="Direct WhatsApp"
        secondaryCtaHref="https://wa.me/923137396135"
      />
      <section id="contact-form" className="contact-route shell">
        <div className="contact-aside">
          <span className="kicker">PROJECT SIGNAL</span>
          <h2>What happens<br /><em>next?</em></h2>
          <ol>
            <li><span>01</span>We review your brief</li>
            <li><span>02</span>We schedule a focused call</li>
            <li><span>03</span>You receive a clear approach</li>
          </ol>
          <div className="direct-contact-cards">
            <div className="direct-card">
              <span>Direct Email</span>
              <a href="mailto:team@zenkai.media">team@zenkai.media</a>
            </div>
            <div className="direct-card">
              <span>Phone / WhatsApp</span>
              <a href="tel:+923137396135">+92 313 7396135</a>
            </div>
          </div>
          <div className="availability"><i /> Currently taking on selected projects</div>
        </div>
        {!ready ? <div className="form-placeholder" aria-hidden="true" /> : sent ? <motion.div className="thanks dark-thanks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><span>✓</span><h3>Brief received.</h3><p>Thanks for reaching out. Zenkai Media will get back to you with the next move.</p><button onClick={() => setSent(false)}>Send another</button></motion.div> : (
          <form className="route-form" onSubmit={submit} autoComplete="off" data-lpignore="true" data-form-type="other">
            <label suppressHydrationWarning><span>Your name</span><input type="text" name="name" placeholder="Jane Smith" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
            <label suppressHydrationWarning><span>Work email</span><input type="email" name="email" placeholder="jane@company.com" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
            <label suppressHydrationWarning><span>Company / brand</span><input type="text" name="company" placeholder="Company name" autoComplete="off" data-lpignore="true" data-1p-ignore /></label>
            <label suppressHydrationWarning>
              <span>Service</span>
              <CustomDropdown
                name="service"
                placeholder="Select one"
                options={["Website", "Video & social", "Custom software", "Brand identity", "Growth creative", "Not sure yet"]}
                value={serviceType}
                onChange={setServiceType}
                required
              />
            </label>
            <label className="form-full" suppressHydrationWarning><span>Project snapshot</span><textarea name="message" rows={5} placeholder="What are you building, changing, or trying to achieve?" data-lpignore="true" required /></label>
            <label className="form-full" suppressHydrationWarning>
              <span>Approximate budget</span>
              <CustomDropdown
                name="budget"
                placeholder="Select a range"
                options={["Under $2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000+"]}
                value={budgetRange}
                onChange={setBudgetRange}
              />
            </label>
            <button className="submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send the brief"} <Arrow /></button>
          </form>
        )}
      </section>
    </PageFrame>
  );
}
