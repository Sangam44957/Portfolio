"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import SectionWrapper from "./SectionWrapper";
import MagneticButton from "./MagneticButton";
import { personalInfo } from "@/data/portfolio";
import { EASE_OUT_EXPO, TOAST_STYLE } from "@/lib/constants";
import { useConfetti } from "./Confetti";
import toast from "react-hot-toast";
import {
  FiMail, FiMapPin, FiPhone, FiSend, FiCopy, FiCheck,
  FiGithub, FiLinkedin, FiTwitter, FiInstagram,
} from "react-icons/fi";

const SOCIALS = [
  { icon: FiGithub, url: personalInfo.socials.github, label: "GitHub", color: "#ffffff" },
  { icon: FiLinkedin, url: personalInfo.socials.linkedin, label: "LinkedIn", color: "#0A66C2" },
  { icon: FiTwitter, url: personalInfo.socials.twitter, label: "Twitter", color: "#1DA1F2" },
  { icon: FiInstagram, url: personalInfo.socials.instagram, label: "Instagram", color: "#E4405F" },
] as const;

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { fireConfetti } = useConfetti();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      fireConfetti();
      toast.success("Message sent successfully! I'll get back to you soon.", TOAST_STYLE);
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error('Send error:', error);
      toast.error("Failed to send message. Please try emailing directly.", TOAST_STYLE);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setEmailCopied(true);
    toast.success("Email copied to clipboard!", TOAST_STYLE);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <SectionWrapper
      id="contact"
      title="Let's Connect"
      subtitle="Got a project in mind? Or just want to say hi? I'd love to hear from you."
      number="08"
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-16">
        {/* Left — Info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-nexus-text mb-4">
              Let&apos;s build something{" "}
              <span className="gradient-text-static">extraordinary</span> together.
            </h3>
            <p className="text-nexus-muted leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities
              to be part of your vision.
            </p>
          </div>

          {/* Contact cards */}
          <div className="space-y-4">
            <motion.div
              className="glass rounded-xl p-4 flex items-center justify-between group hover:border-nexus-accent/20 transition-all cursor-pointer"
              onClick={copyEmail}
              whileHover={{ x: 5 }}
              data-cursor-text="COPY"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-nexus-accent/10 flex items-center justify-center">
                  <FiMail className="w-5 h-5 text-nexus-accent" />
                </div>
                <div>
                  <div className="text-xs text-nexus-muted font-mono mb-0.5">EMAIL</div>
                  <div className="text-sm text-nexus-text">{personalInfo.email}</div>
                </div>
              </div>
              <motion.div
                className="text-nexus-muted group-hover:text-nexus-accent transition-colors"
                animate={{ scale: emailCopied ? [1, 1.3, 1] : 1 }}
              >
                {emailCopied ? <FiCheck className="w-4 h-4 text-nexus-green" /> : <FiCopy className="w-4 h-4" />}
              </motion.div>
            </motion.div>

            <motion.a
              href={`tel:${personalInfo.phone}`}
              className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-nexus-accentAlt/20 transition-all block"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-nexus-accentAlt/10 flex items-center justify-center">
                <FiPhone className="w-5 h-5 text-nexus-accentAlt" />
              </div>
              <div>
                <div className="text-xs text-nexus-muted font-mono mb-0.5">PHONE</div>
                <div className="text-sm text-nexus-text">{personalInfo.phone}</div>
              </div>
            </motion.a>

            <motion.div
              className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-nexus-pink/20 transition-all"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-nexus-pink/10 flex items-center justify-center">
                <FiMapPin className="w-5 h-5 text-nexus-pink" />
              </div>
              <div>
                <div className="text-xs text-nexus-muted font-mono mb-0.5">LOCATION</div>
                <div className="text-sm text-nexus-text">{personalInfo.location}</div>
              </div>
            </motion.div>
          </div>

          {/* Social icons */}
          <div>
            <p className="text-sm text-nexus-muted font-mono mb-4">// Find me on</p>
            <div className="flex gap-3">
              {SOCIALS.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-nexus-muted transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  data-cursor-text={social.label}
                  style={{ "--hover-color": social.color } as React.CSSProperties}
                >
                  <social.icon className="w-5 h-5 group-hover:text-[var(--hover-color)] transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <motion.div
            className="glass rounded-xl p-4 flex items-center gap-3"
            animate={{
              borderColor: ["rgba(0,255,136,0.1)", "rgba(0,255,136,0.3)", "rgba(0,255,136,0.1)"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-green opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-nexus-green" />
            </span>
            <span className="text-sm text-nexus-green font-mono">
              Currently available for freelance &amp; full-time opportunities
            </span>
          </motion.div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {(["name", "email"] as const).map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-xs font-mono text-nexus-muted uppercase tracking-wider">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    placeholder={field === "email" ? "john@example.com" : "John Doe"}
                    className="w-full px-4 py-3 glass rounded-xl bg-transparent text-nexus-text text-sm font-mono outline-none focus:border-nexus-accent/40 transition-colors placeholder:text-nexus-muted/30"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-nexus-muted uppercase tracking-wider">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project Inquiry / Collaboration / Just saying hi"
                className="w-full px-4 py-3 glass rounded-xl bg-transparent text-nexus-text text-sm font-mono outline-none focus:border-nexus-accent/40 transition-colors placeholder:text-nexus-muted/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-nexus-muted uppercase tracking-wider">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project or idea..."
                className="w-full px-4 py-3 glass rounded-xl bg-transparent text-nexus-text text-sm font-mono outline-none focus:border-nexus-accent/40 transition-colors resize-none placeholder:text-nexus-muted/30"
              />
            </div>

            <MagneticButton onClick={() => {}} variant="primary" size="lg" className="w-full justify-center">
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-nexus-accent/30 border-t-nexus-accent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Send Message
                </>
              )}
            </MagneticButton>

            <p className="text-xs text-nexus-muted/30 text-center font-mono">
              I typically respond within 24 hours. No spam, ever.
            </p>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}