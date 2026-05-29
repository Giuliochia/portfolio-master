"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/config/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section id="projects" className="relative px-6 py-28 w-full" style={{ background: "rgba(255,255,255,0.02)" }}>
        {/* Intestazione sezione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#52b788] mb-3">
            Lavori selezionati
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f2] tracking-tight">
            Progetti
          </h2>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[rgba(82,183,136,0.5)] to-transparent" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-5">
          {featured.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={featured.length + i}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal lightbox — montato fuori dalla section per evitare clipping */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
