"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const fadeDown = (delay = 0) => ({
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

// Dot grid SVG come componente — parallax leggero al mouse
function DotGrid({ mouseX, mouseY }: { mouseX: ReturnType<typeof useSpring>; mouseY: ReturnType<typeof useSpring> }) {
  const x = useTransform(mouseX, (v) => v * 0.015);
  const y = useTransform(mouseY, (v) => v * 0.015);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ x, y }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-[0.22]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(82,183,136,0.6)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        {/* Maschera radiale per dissolvere i bordi */}
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-fade)"
        />
        <defs>
          <radialGradient id="dot-fade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#121214" stopOpacity="0" />
            <stop offset="100%" stopColor="#121214" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking per parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set(e.clientX - rect.left - rect.width / 2);
      rawY.set(e.clientY - rect.top - rect.height / 2);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 text-center overflow-hidden"
    >
      {/* Dot grid con parallax */}
      <DotGrid mouseX={mouseX} mouseY={mouseY} />

      {/* Orb gold in alto */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(82,183,136,0.22) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Orb emerald basso-destra */}
      <div
        className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(82,183,136,0.14) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />

      {/* Logo grande — entrata + float + glow pulse */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-6"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 28px rgba(82,183,136,0.35))",
                "drop-shadow(0 0 60px rgba(82,183,136,0.70))",
                "drop-shadow(0 0 28px rgba(82,183,136,0.35))",
              ],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Image
              src="/logo.svg"
              alt="GC Logo"
              width={208}
              height={208}
              className="w-40 h-40 sm:w-52 sm:h-52 object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Badge disponibilità con dot pulse */}
      <motion.div {...fadeDown(0.1)} className="mb-8">
        <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium border border-[rgba(82,183,136,0.25)] bg-[rgba(82,183,136,0.06)] text-[#74c69d]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52b788] opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#52b788]" />
          </span>
          Disponibile per nuovi progetti
        </span>
      </motion.div>

      {/* Nome con shimmer sul cognome */}
      <motion.div {...fadeLeft(0.2)}>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#f0f0f2] leading-[1.05]">
          Giulio{" "}
          <span className="shimmer-gold">Chiaramonte</span>
        </h1>
      </motion.div>

      {/* Ruolo */}
      <motion.p
        {...fadeRight(0.35)}
        className="mt-4 text-lg sm:text-xl font-light tracking-widest uppercase text-[#8a8a9a]"
      >
        Frontend Developer
      </motion.p>

      {/* Separatore ornamentale */}
      <motion.div {...fadeUp(0.45)} className="mt-6 flex items-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(82,183,136,0.7)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[rgba(82,183,136,0.9)]" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[rgba(82,183,136,0.7)]" />
      </motion.div>

      {/* Tagline */}
      <motion.p
        {...fadeLeft(0.5)}
        className="mt-8 max-w-xl text-base sm:text-lg text-[#8a8a9a] leading-relaxed"
      >
        Front-end developer in crescita, specializzato in{" "}
        <span className="text-[#f0f0f2] font-medium">siti web curati</span>. Offro attenzione,
        disponibilità e un approccio su misura — ideale per chi cerca un sito professionale
        senza la complessità di una grande agenzia.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        className="mt-10 flex items-center gap-6 sm:gap-10"
      >
        {[
          { value: "3", label: "Progetti completati" },
          { value: "24h", label: "Tempo di risposta" },
          { value: "100%", label: "Disponibilità" },
        ].map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
            {i > 0 && <div className="h-8 w-px bg-white/10" />}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-[#f0f0f2] tracking-tight">{stat.value}</span>
              <span className="text-[11px] text-[#505060] tracking-wide">{stat.label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Freccia scroll-down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-1.5 text-[#505060] hover:text-[#52b788] transition-colors cursor-pointer"
        >
          <span className="text-[10px] tracking-widest uppercase font-medium">Scorri</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
