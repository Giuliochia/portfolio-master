export interface TechBadge {
  name: string;
  color?: "gold" | "emerald" | "default";
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  technicalDescription: string;
  stack: TechBadge[];
  liveUrl: string | null;
  logo?: string;
  slides: { type: "image" | "video"; src: string; alt?: string }[];
  featured?: boolean;
  status?: "live" | "wip" | "archived";
}

export const projects: Project[] = [
  {
    id: "leandro-style",
    title: "Leandro Style — Booking Salon",
    shortDescription:
      "App di prenotazione per salone di parrucchiere con gestione calendario e notifiche in tempo reale.",
    technicalDescription:
      "SPA React + Vite con backend Appwrite. Flusso prenotazione multi-step, gestione disponibilità in tempo reale tramite Appwrite Realtime, pannello admin per la gestione degli appuntamenti. UI mobile-first con animazioni Framer Motion e tema glassmorphism personalizzato.",
    stack: [
      { name: "React", color: "default" },
      { name: "Vite", color: "default" },
      { name: "Appwrite", color: "gold" },
      { name: "Framer Motion", color: "default" },
      { name: "TypeScript", color: "default" },
    ],
    liveUrl: null,
    logo: "/previews/logo-leandro.png",
    slides: [
      { type: "image", src: "/previews/leandro-style-1.png", alt: "Schermata 1" },
      { type: "image", src: "/previews/leandro-style-2.png", alt: "Schermata 2" },
      { type: "image", src: "/previews/leandro-style-3.png", alt: "Schermata 3" },
      { type: "image", src: "/previews/leandro-style-4.png", alt: "Schermata 4" },
    ],
    featured: true,
    status: "live",
  },
  {
    id: "peso-tracker",
    title: "Peso Tracker",
    shortDescription:
      "PWA per il tracciamento del peso con calcolo BMI, obiettivo personalizzato e grafici andamento.",
    technicalDescription:
      "Progressive Web App installabile su mobile costruita con React + Vite. Visualizza l'andamento del peso nel tempo tramite Chart.js, calcola il BMI e mostra i kg mancanti all'obiettivo. Il salvataggio dei dati è cloud-based tramite Supabase, permettendo sincronizzazione cross-device.",
    stack: [
      { name: "React", color: "default" },
      { name: "Vite", color: "default" },
      { name: "Supabase", color: "emerald" },
      { name: "Chart.js", color: "gold" },
      { name: "PWA", color: "default" },
    ],
    liveUrl: null,
    logo: "/previews/logo-peso.png",
    slides: [
      { type: "image", src: "/previews/peso-tracker-1.png", alt: "Schermata 1" },
      { type: "image", src: "/previews/peso-tracker-2.png", alt: "Schermata 2" },
      { type: "image", src: "/previews/peso-tracker-3.png", alt: "Schermata 3" },
      { type: "image", src: "/previews/peso-tracker-4.png", alt: "Schermata 4" },
    ],
    featured: true,
    status: "live",
  },
  {
    id: "community-bot",
    title: "Community Bot",
    shortDescription:
      "Bot multi-piattaforma per la gestione di una community: ticketing, benvenuto automatico, automod e integrazioni esterne.",
    technicalDescription:
      "Bot scritto in Python con architettura modulare e supporto multi-piattaforma. Funzionalità principali: sistema di ticketing, messaggi di benvenuto personalizzati, moderazione automatica e integrazione con API esterne (Twitch). Logging centralizzato con rotazione file, validazione variabili d'ambiente all'avvio e database PostgreSQL per la persistenza dei dati. Rilasciato in produzione alla versione v1.0.",
    stack: [
      { name: "Python", color: "gold" },
      { name: "PostgreSQL", color: "emerald" },
      { name: "Twitch API", color: "default" },
    ],
    logo: "/previews/logo-bot.svg",
    liveUrl: "https://github.com/Giuliochia/redm-bot",
    slides: [
      { type: "image", src: "/previews/community-bot-1.png", alt: "Schermata 1" },
      { type: "image", src: "/previews/community-bot-2.png", alt: "Schermata 2" },
    ],
    featured: true,
    status: "live",
  },
  // Template per nuovi progetti:
  // {
  //   id: "nuovo-progetto",
  //   title: "",
  //   shortDescription: "",
  //   technicalDescription: "",
  //   stack: [{ name: "", color: "default" }],
  //   liveUrl: null,
  //   slides: [{ type: "image", src: "/previews/nuovo-1.png", alt: "" }],
  //   featured: false,
  //   status: "wip",
  // },
];
