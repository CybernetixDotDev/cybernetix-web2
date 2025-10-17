"use client";
import { motion } from "framer-motion";
import { HandHeart, Leaf, ShieldHalf, Sprout, Flower2, InfinityIcon } from "lucide-react";

export default function Values() {
  const items = [
    { icon: <HandHeart className="h-5 w-5" />, title: "Love as Logic", text: "Compassion is our algorithm; empathy our architecture." },
    { icon: <Leaf className="h-5 w-5" />, title: "Sacred Reciprocity", text: "Everything we build must give back to the ecosystems that feed it." },
    { icon: <ShieldHalf className="h-5 w-5" />, title: "Transparency & Trust", text: "Open-source, verifiable, community-governed." },
    { icon: <Sprout className="h-5 w-5" />, title: "Evolution through Service", text: "Technology grows in service to humanity, never in control of it." },
    { icon: <Flower2 className="h-5 w-5" />, title: "Inclusion Beyond Borders", text: "All identities, all paths—every gardener belongs." },
    { icon: <InfinityIcon className="h-5 w-5" />, title: "Light Economy", text: "Worth measured by contribution, creativity, and consciousness." },
  ];

  return (
    <section id="values" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="ep-gradient-text text-3xl md:text-4xl font-bold">Our Sacred Values</h2>
          <div className="divider-ep mt-3" />
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">The garden thrives when we nurture what nurtures us. These are the vows we keep as we grow Cybernetix.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              className="card-glass p-6 text-white/90 hover-lift"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-2 text-white">
                {it.icon}
                <span className="font-semibold">{it.title}</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}