"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { certifications } from "@/data/portfolio";
import { FiAward, FiExternalLink } from "react-icons/fi";

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper
      id="certifications"
      title="Certifications"
      subtitle="Professional certifications and courses completed"
      number="05"
    >
      <div ref={ref} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6 hover:border-nexus-accent/30 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-nexus-accent/10 text-nexus-accent group-hover:scale-110 transition-transform">
                <FiAward className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-nexus-text mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-nexus-muted mb-2">
                  {cert.issuer} • {cert.date}
                </p>
                {cert.verifyUrl !== "#" && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-nexus-accent hover:text-nexus-accentAlt transition-colors"
                  >
                    <FiExternalLink className="w-3 h-3" />
                    Verify Certificate
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
