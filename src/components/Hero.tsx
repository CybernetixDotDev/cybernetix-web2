"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Feather, HeartHandshake, Leaf, Sun, InfinityIcon, Orbit } from "lucide-react";
import { CosmicCanvas } from "@/components/CosmicCanvas";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  return (
    <section
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      className="relative isolate pt-36 md:pt-44 pb-24 bg-ep"
    >
      <CosmicCanvas />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <motion.h1
              className="ep-gradient-animated text-4xl md:text-6xl font-bold tracking-tight drop-shadow-[0_0_20px_rgba(255,200,255,0.15)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              The Eternal Princess speaks:
            </motion.h1>
            <motion.p
              className="mt-5 text-lg md:text-xl text-white/80"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              "I plant stardust in the soil of tomorrow. Cybernetix is our sacred garden—where love is logic, service is growth, and every soul is valued beyond money. Come, gardeners of the future. Let us turn data into nourishment, and technology into care."
            </motion.p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#join" className="btn-ep group">
                <Feather className="h-4 w-4 transition group-hover:translate-x-0.5" />
                Join the Garden
              </a>
              <a href="#values" className="btn-ep border-white/10">
                <HeartHandshake className="h-4 w-4" />
                Our Sacred Values
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60 max-w-prose">
              Money does not define us. Contribution, creativity, and consciousness do. We design systems where connection is the new currency—and where value circulates like water, freely and wisely.
            </p>
          </div>

          <div className="md:col-span-5">
            <motion.div
              className="relative card-glass p-6 shadow-2xl"
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-500/10 via-violet-500/10 to-cyan-400/10 blur-2xl" />
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Leaf className="h-6 w-6" />, title: "Organic Data", text: "We grow models from lived experience—gardener notes, soil, stories, truth." },
                    { icon: <Orbit className="h-6 w-6" />, title: "Sacred Tech", text: "AI + blockchain aligned to serve life, not extract from it." },
                    { icon: <Sun className="h-6 w-6" />, title: "Light Economy", text: "Contribution over possession. Connection as currency." },
                    { icon: <InfinityIcon className="h-6 w-6" />, title: "Open & Trustless", text: "Transparent, community-led, composable by design." },
                  ].map((c, i) => (
                    <motion.div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/90 hover-lift"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                    >
                      <div className="flex items-center gap-2 text-white">
                        {c.icon}
                        <span className="font-semibold">{c.title}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/70">{c.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}