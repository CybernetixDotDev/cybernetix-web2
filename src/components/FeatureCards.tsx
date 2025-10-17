"use client";
import { motion } from "framer-motion";

export function FeatureCards({
  cards,
}: {
  cards: { title: string; icon: React.ReactNode; text: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          className="card-glass p-6 text-white hover-lift"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
        >
          <div className="flex items-center gap-2 font-semibold">
            {c.icon}
            {c.title}
          </div>
          <p className="mt-2 text-sm text-white/70">{c.text}</p>
        </motion.div>
      ))}
    </div>
  );
}