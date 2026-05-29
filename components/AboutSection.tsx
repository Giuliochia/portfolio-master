"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-28 w-full" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative flex-shrink-0"
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(82,183,136,0.18) 0%, transparent 70%)",
              filter: "blur(24px)",
              transform: "scale(1.1)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/portfolio.png"
            alt="Foto di Giulio Chiaramonte"
            width={220}
            height={220}
            loading="eager"
            className="relative rounded-2xl object-cover w-48 h-48 sm:w-56 sm:h-56 border border-[rgba(82,183,136,0.15)]"
          />
        </motion.div>

        {/* Testo */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="flex flex-col gap-5 text-center md:text-left"
        >
          {/* Titolo sezione */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[rgba(82,183,136,0.5)]" />
            <span className="text-xs tracking-widest uppercase text-[#52b788] font-medium">Chi sono</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f2] leading-tight">
            Giulio <span className="shimmer-gold">Chiaramonte</span>
          </h2>

          <p className="text-[#8a8a9a] leading-relaxed text-base sm:text-lg">
            Ho 38 anni. Siciliano di origine, vivo in Trentino da anni. Di professione sono
            operatore socio-sanitario — un lavoro che mi ha insegnato attenzione, empatia
            e cura per i dettagli.
          </p>

          <p className="text-[#8a8a9a] leading-relaxed text-base sm:text-lg">
            Parallelamente sto costruendo la mia strada nello sviluppo web front-end:
            creo siti{" "}
            <span className="text-[#f0f0f2] font-medium">curati, funzionali e pensati per chi li usa</span>.
          </p>

          <p className="text-[#52b788] font-medium text-base sm:text-lg">
            Due mondi diversi, ma con un filo comune: mettere le persone al centro.
          </p>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
