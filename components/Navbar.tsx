"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { label: "Chi sono", href: "#about" },
  { label: "Servizi", href: "#services" },
  { label: "Progetti", href: "#projects" },
  { label: "Contatti", href: "#contact" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16"
    >
      {/* Sfondo glassmorphism che appare dopo lo scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: "rgba(18,18,20,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        aria-hidden="true"
      />

      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="relative z-10 flex items-center"
        aria-label="Torna in cima"
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/logo.png"
            alt="GC Logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(82,183,136,0.5)]"
            priority
          />
        </motion.div>
      </button>

      {/* Nav links */}
      <nav className="relative z-10 flex items-center gap-1">
        {navLinks.map(({ label, href }) => (
          <MagneticButton
            key={href}
            onClick={() => scrollTo(href)}
            className="px-4 py-1.5 rounded-lg text-sm text-[#8a8a9a] hover:text-[#f0f0f2] hover:bg-white/5 transition-all duration-200"
            strength={0.25}
          >
            {label}
          </MagneticButton>
        ))}

        {/* CTA contatti */}
        <MagneticButton
          onClick={() => scrollTo("#contact")}
          className="ml-2 px-4 py-1.5 rounded-lg text-sm font-medium border border-[rgba(82,183,136,0.7)] text-[#52b788] hover:bg-[rgba(82,183,136,0.12)] transition-all duration-200"
          strength={0.3}
        >
          Contattami
        </MagneticButton>
      </nav>
    </motion.header>
  );
}
