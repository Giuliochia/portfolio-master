"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none"
      aria-hidden="true"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(90deg, #52b788 0%, #74c69d 60%, rgba(82,183,136,0.4) 100%)",
          boxShadow: "0 0 8px rgba(82,183,136,0.6), 0 0 20px rgba(82,183,136,0.2)",
        }}
      />
    </motion.div>
  );
}
