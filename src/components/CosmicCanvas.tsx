"use client";
import { motion } from "framer-motion";

export function CosmicCanvas() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Nebula gradients */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[70rem] w-[70rem] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,170,255,.3), rgba(120,80,255,.25), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -left-40 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, rgba(80,220,255,.25), rgba(150,120,255,.2), transparent 70%)",
        }}
      />
      {/* Star field */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.15),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,.08),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,.1),transparent_30%)]" />
      {/* Floating butterflies */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ y: 800, opacity: 0 }}
            animate={{
              y: [-100, -300 - i * 20],
              opacity: [0.2, 0.9, 0.2],
              x: [0, i % 2 === 0 ? 80 : -80, 0],
            }}
            transition={{ duration: 12 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: `${(i * 8) % 100}%`, bottom: `${(i * 7) % 100}%` }}
          >
            <span className="select-none">🦋</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}