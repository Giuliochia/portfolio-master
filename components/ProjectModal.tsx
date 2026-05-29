"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/config/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const badgeStyles: Record<string, string> = {
  gold: "bg-[rgba(82,183,136,0.12)] text-[#74c69d] border border-[rgba(82,183,136,0.2)]",
  emerald: "bg-[rgba(16,185,129,0.1)] text-[#10b981] border border-[rgba(16,185,129,0.2)]",
  default: "bg-white/5 text-[#8a8a9a] border border-white/8",
};

const statusConfig = {
  live: { label: "Live", className: "bg-[rgba(16,185,129,0.1)] text-[#10b981] border-[rgba(16,185,129,0.3)]" },
  wip: { label: "In Progress", className: "bg-[rgba(82,183,136,0.1)] text-[#52b788] border-[rgba(82,183,136,0.3)]" },
  archived: { label: "Archived", className: "bg-white/5 text-[#505060] border-white/10" },
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // Reset slide index quando si apre un nuovo progetto
  useEffect(() => {
    setSlideIndex(0);
  }, [project?.id]);

  // Chiudi con ESC, naviga con frecce
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setSlideIndex((i) => (i + 1) % project.slides.length);
      if (e.key === "ArrowLeft")
        setSlideIndex((i) => (i - 1 + project.slides.length) % project.slides.length);
    },
    [project, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Blocca lo scroll del body mentre il modal è aperto
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const prev = () =>
    setSlideIndex((i) => (i - 1 + (project?.slides.length ?? 1)) % (project?.slides.length ?? 1));
  const next = () =>
    setSlideIndex((i) => (i + 1) % (project?.slides.length ?? 1));

  const status = project?.status ? statusConfig[project.status] : null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as [number,number,number,number] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl pointer-events-auto"
              style={{
                background: "rgba(26,26,30,0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bottone chiudi */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-[#8a8a9a] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                aria-label="Chiudi"
              >
                <X size={15} />
              </button>

              {/* ── Slideshow — nascosto se non ci sono slide ── */}
              {project.slides.length > 0 && (
                <div className="relative bg-[#0b0b0c] rounded-t-2xl py-6 flex justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-center"
                    >
                      {project.slides[slideIndex].type === "image" ? (
                        <Image
                          src={project.slides[slideIndex].src}
                          alt={project.slides[slideIndex].alt ?? project.title}
                          width={240}
                          height={480}
                          className="rounded-2xl object-contain shadow-2xl"
                          quality={95}
                          style={{ maxHeight: "55vh", width: "auto" }}
                        />
                      ) : null}
                    </motion.div>
                  </AnimatePresence>

                  {project.slides.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 border border-white/10 text-white hover:bg-black/70 hover:border-white/20 transition-all"
                        aria-label="Slide precedente"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 border border-white/10 text-white hover:bg-black/70 hover:border-white/20 transition-all"
                        aria-label="Slide successiva"
                      >
                        <ChevronRight size={18} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {project.slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setSlideIndex(i)}
                            className="transition-all duration-200 rounded-full"
                            style={{
                              width: i === slideIndex ? 20 : 6,
                              height: 6,
                              background:
                                i === slideIndex
                                  ? "rgba(82,183,136,0.9)"
                                  : "rgba(255,255,255,0.25)",
                            }}
                            aria-label={`Vai alla slide ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── Contenuto testo ── */}
              <div className="p-6 flex flex-col gap-4">
                {/* Titolo + stato */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-[#f0f0f2] tracking-tight leading-snug">
                    {project.title}
                  </h2>
                  {status && (
                    <span
                      className={`shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full border ${status.className}`}
                    >
                      {status.label}
                    </span>
                  )}
                </div>

                {/* Descrizione tecnica */}
                <p className="text-[#8a8a9a] text-sm leading-relaxed">
                  {project.technicalDescription}
                </p>

                {/* Separatore */}
                <div className="h-px bg-white/5" />

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech.name}
                      className={`text-xs font-medium px-2.5 py-1 rounded-md ${badgeStyles[tech.color ?? "default"]}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* Link demo live (se disponibile) */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[rgba(82,183,136,0.3)] bg-[rgba(82,183,136,0.08)] text-[#52b788] hover:bg-[rgba(82,183,136,0.15)] transition-all duration-200"
                  >
                    <ExternalLink size={14} />
                    Apri demo live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
