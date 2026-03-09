"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { certifications } from "@/data/portfolio";
import { FiAward, FiExternalLink } from "react-icons/fi";

function CertCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative h-56 cursor-pointer"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={() => setIsFlipped(!isFlipped)}
      data-cursor-text="FLIP"
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass rounded-xl p-6 flex flex-col justify-center group hover:border-nexus-accent/30 transition-all duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-nexus-accent/10 text-nexus-accent group-hover:scale-110 transition-transform">
              <FiAward className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-nexus-text mb-2">
                {cert.name}
              </h3>
              <p className="text-xs text-nexus-muted font-mono">
                Click to see details
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass rounded-xl p-5 flex flex-col justify-between overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="space-y-3">
            <div>
              <div className="text-xs text-nexus-muted font-mono mb-1">ISSUED BY</div>
              <div className="text-sm font-semibold text-nexus-accent">{cert.issuer}</div>
            </div>
            
            <div>
              <div className="text-xs text-nexus-muted font-mono mb-1">DATE</div>
              <div className="text-sm text-nexus-text">{cert.date}</div>
            </div>
            
            {cert.techLearned && (
              <div>
                <div className="text-xs text-nexus-muted font-mono mb-1">TECH LEARNED</div>
                <div className="flex flex-wrap gap-1">
                  {cert.techLearned.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-nexus-surface text-nexus-muted border border-nexus-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {cert.verifyUrl !== "#" && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-nexus-accent hover:text-nexus-accentAlt transition-colors mt-2"
            >
              <FiExternalLink className="w-3 h-3" />
              Verify Certificate
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

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
          <CertCard key={index} cert={cert} index={index} />
        ))}
      </div>
      
      <motion.p
        className="text-center text-xs text-nexus-muted/40 font-mono mt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        💡 Click on any certificate to see details
      </motion.p>
    </SectionWrapper>
  );
}
