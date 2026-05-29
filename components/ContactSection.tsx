"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import MagneticButton from "./MagneticButton";


type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const result = await sendContactEmail({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      message: fd.get("message") as string,
    });

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Errore sconosciuto.");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Orb decorativo */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(82,183,136,0.07) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />

      {/* Intestazione */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
        className="flex flex-col items-center text-center mb-14"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#52b788] mb-3">
          Lavoriamo insieme
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f2] tracking-tight">
          Contatti
        </h2>
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[rgba(82,183,136,0.5)] to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Colonna sinistra: info + badge disponibilità ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Badge disponibilità */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(16,185,129,0.25)] self-start"
            style={{ background: "rgba(16,185,129,0.06)" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]" />
            </span>
            <div>
              <p className="text-[#10b981] text-sm font-medium leading-none mb-0.5">
                Disponibile
              </p>
              <p className="text-[#505060] text-xs">per nuovi progetti freelance</p>
            </div>
            <Sparkles size={14} className="text-[#10b981] ml-auto opacity-70" />
          </div>

          {/* Testo introduttivo */}
          <p className="text-[#8a8a9a] text-sm leading-relaxed">
            Hai un progetto in mente o vuoi semplicemente fare due chiacchiere su una
            collaborazione? Scrivimi — rispondo entro 24 ore.
          </p>

        </motion.div>

        {/* ── Colonna destra: form ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
          className="lg:col-span-3"
        >
          <div
            className="rounded-2xl p-6 border border-white/8"
            style={{
              background: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                // Stato successo
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-10 gap-4"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center border border-[rgba(16,185,129,0.3)]" style={{ background: "rgba(16,185,129,0.1)" }}>
                    <CheckCircle size={26} className="text-[#10b981]" />
                  </div>
                  <div>
                    <p className="text-[#f0f0f2] font-semibold text-lg">Messaggio inviato!</p>
                    <p className="text-[#8a8a9a] text-sm mt-1">Ti rispondo entro 24 ore.</p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs text-[#505060] hover:text-[#52b788] transition-colors underline underline-offset-2"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                // Form
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nome" name="name" type="text" placeholder="Il tuo nome" required />
                    <Field label="Email" name="email" type="email" placeholder="tua@email.com" required />
                  </div>
                  <Field
                    label="Messaggio"
                    name="message"
                    placeholder="Raccontami il tuo progetto..."
                    required
                    multiline
                    rows={5}
                  />

                  {/* Errore */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-red-500/20 bg-red-500/8 text-red-400 text-sm"
                      >
                        <AlertCircle size={14} className="shrink-0" />
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <MagneticButton
                    type="submit"
                    disabled={status === "loading"}
                    className="self-end flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, rgba(82,183,136,0.9) 0%, rgba(232,204,106,0.85) 100%)",
                      color: "#0b0b0c",
                      boxShadow: "0 4px 16px rgba(82,183,136,0.2)",
                    }}
                    strength={0.4}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-[#0b0b0c]/30 border-t-[#0b0b0c] animate-spin" />
                        Invio...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Invia messaggio
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Campo input/textarea riutilizzabile
interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

function Field({ label, name, type = "text", placeholder, required, multiline, rows }: FieldProps) {
  const base =
    "w-full px-3.5 py-2.5 rounded-xl text-sm text-[#f0f0f2] placeholder-[#505060] border border-white/8 bg-white/[0.03] focus:outline-none focus:border-[rgba(82,183,136,0.4)] focus:bg-[rgba(82,183,136,0.03)] transition-all duration-200 resize-none";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-[#8a8a9a] font-medium">
        {label}
        {required && <span className="text-[#52b788] ml-0.5">*</span>}
      </label>
      {multiline ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={rows} className={base} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} className={base} />
      )}
    </div>
  );
}
