"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/config/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const badgeStyles: Record<string, string> = {
  gold: "bg-[rgba(82,183,136,0.12)] text-[#74c69d] border border-[rgba(82,183,136,0.2)]",
  emerald: "bg-[rgba(16,185,129,0.1)] text-[#10b981] border border-[rgba(16,185,129,0.2)]",
  default: "bg-white/5 text-[#8a8a9a] border border-white/[0.08]",
};

const statusConfig = {
  live: { label: "Live", className: "bg-[rgba(16,185,129,0.1)] text-[#10b981] border-[rgba(16,185,129,0.3)]" },
  wip: { label: "In Progress", className: "bg-[rgba(82,183,136,0.1)] text-[#52b788] border-[rgba(82,183,136,0.3)]" },
  archived: { label: "Archived", className: "bg-white/5 text-[#505060] border-white/10" },
};

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLElement>(null);

  const status = project.status ? statusConfig[project.status] : null;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setShine({ x, y });
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 14,
        delay: index * 0.12,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Apri dettaglio ${project.title}`}
      className="group relative flex flex-col rounded-2xl overflow-visible cursor-pointer select-none"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Bordo gold animato su hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(82,183,136,0.45), 0 20px 60px rgba(0,0,0,0.5), 0 0 32px rgba(82,183,136,0.08)"
            : "inset 0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.35)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {/* Riflesso di luce */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Area logo */}
      <div className="relative flex items-center justify-center py-10 bg-[#0b0b0c] rounded-t-2xl">
        {project.logo ? (
          <Image
            src={project.logo}
            alt={`Logo ${project.title}`}
            width={100}
            height={100}
            className="object-contain w-24 h-24"
            priority={index < 2}
          />
        ) : (
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-[#52b788] bg-[rgba(82,183,136,0.08)] border border-[rgba(82,183,136,0.15)]">
            {project.title[0]}
          </div>
        )}
      </div>

      {/* Popup preview al hover — fuori dal div con overflow hidden */}
      <AnimatePresence>
        {hovered && project.slides[0] && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 rounded-2xl overflow-hidden shadow-2xl z-50 pointer-events-none"
            style={{
              border: "1px solid rgba(82,183,136,0.2)",
              background: "#0b0b0c",
            }}
          >
            <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
              <motion.div
                className="absolute inset-x-0 top-0"
                animate={{ y: "-55%" }}
                transition={{ duration: 3, ease: "easeInOut", delay: 0.3 }}
              >
                <Image
                  src={project.slides[0].src}
                  alt={project.title}
                  width={400}
                  height={800}
                  className="w-full h-auto"
                  quality={90}
                />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0b0b0c] to-transparent pointer-events-none" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0, duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-[11px] font-medium text-[#52b788] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(82,183,136,0.3)]">
                  Visualizza anteprima →
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenuto */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[#f0f0f2] font-semibold text-base leading-snug tracking-tight">
            {project.title}
          </h3>
          {status && (
            <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${status.className}`}>
              {status.label}
            </span>
          )}
        </div>

        <p className="text-[#8a8a9a] text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech.name}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${badgeStyles[tech.color ?? "default"]}`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
