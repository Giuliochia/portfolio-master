"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Megaphone, RefreshCw, Wrench, X } from "lucide-react";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const services = [
  {
    icon: Monitor,
    title: "Sito Vetrina",
    short: "La tua attività online, sempre.",
    detail:
      "Un sito curato che presenta la tua attività, i tuoi servizi e i tuoi contatti. Ideale per ristoranti, artigiani, studi professionali e negozi.",
    previewSrc: "/previews/servizio-vetrina.png",
  },
  {
    icon: Megaphone,
    title: "Landing Page",
    short: "Una pagina, un obiettivo.",
    detail:
      "Una singola pagina pensata per colpire e convertire. Perfetta per promuovere un prodotto, un evento o una promozione specifica.",
    previewSrc: "/previews/servizio-landing.png",
  },
  {
    icon: RefreshCw,
    title: "Restyling",
    short: "Nuovo look, stessa identità.",
    detail:
      "Hai già un sito ma è datato? Lo rinfreschiamo graficamente per renderlo moderno e piacevole, senza ripartire da zero.",
    previewSrc: "/previews/servizio-restyling.png",
  },
  {
    icon: Wrench,
    title: "Manutenzione",
    short: "Il tuo sito sempre aggiornato.",
    detail:
      "Aggiornamenti di contenuti, nuove foto, testi modificati. Un supporto continuativo per tenere il tuo sito sempre al passo.",
    previewSrc: "/previews/servizio-manutenzione.png",
  },
];

const cardVariants = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -60 : 60 }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};

function ServiceModal({ service, onClose }: { service: typeof services[number] | null; onClose: () => void }) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (service) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <>
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

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl pointer-events-auto"
              style={{
                background: "rgba(26,26,30,0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-[#8a8a9a] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                aria-label="Chiudi"
              >
                <X size={15} />
              </button>

              {/* Preview immagine */}
              <div className="bg-[#0b0b0c] rounded-t-2xl overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={service.previewSrc}
                  alt={`Anteprima ${service.title}`}
                  width={1440}
                  height={900}
                  className="rounded-xl object-cover w-full"
                  quality={90}
                />
              </div>

              {/* Contenuto testo */}
              <div className="p-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-[#f0f0f2] tracking-tight">{service.title}</h2>
                <p className="text-[#8a8a9a] text-sm leading-relaxed">{service.detail}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ServicesSection() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[number] | null>(null);

  return (
    <>
      <section id="services" className="relative px-6 py-28 w-full" style={{ background: "rgba(82,183,136,0.03)", borderTop: "1px solid rgba(82,183,136,0.07)", borderBottom: "1px solid rgba(82,183,136,0.07)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col items-center text-center mb-14"
          >
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#52b788] mb-3">
              Cosa posso fare per te
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f2] tracking-tight">
              Servizi
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[rgba(82,183,136,0.5)] to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isHovered = hoverIndex === i;

              return (
                <motion.div
                  key={service.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={cardVariants}
                  onHoverStart={() => setHoverIndex(i)}
                  onHoverEnd={() => setHoverIndex(null)}
                  onClick={() => setSelectedService(service)}
                  className="relative flex flex-col gap-4 p-6 rounded-2xl cursor-pointer overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: isHovered
                        ? "inset 0 0 0 1px rgba(82,183,136,0.35), 0 0 32px rgba(82,183,136,0.06)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.07)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    animate={{
                      backgroundColor: isHovered ? "rgba(82,183,136,0.12)" : "rgba(255,255,255,0.04)",
                      color: isHovered ? "#52b788" : "#505060",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                  >
                    <Icon size={20} />
                  </motion.div>

                  <div>
                    <h3 className="text-[#f0f0f2] font-semibold text-lg tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-[#8a8a9a] text-sm mt-1">{service.short}</p>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="text-sm text-[#8a8a9a] leading-relaxed overflow-hidden"
                      >
                        {service.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Hint anteprima */}
                  <motion.p
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] text-[#52b788] tracking-wider uppercase font-medium"
                  >
                    Vedi anteprima →
                  </motion.p>

                  <motion.div
                    className="absolute bottom-0 left-6 right-6 h-px"
                    animate={{
                      background: isHovered
                        ? "linear-gradient(90deg, rgba(82,183,136,0), rgba(82,183,136,0.4), rgba(82,183,136,0))"
                        : "linear-gradient(90deg, rgba(82,183,136,0), rgba(82,183,136,0), rgba(82,183,136,0))",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </>
  );
}
