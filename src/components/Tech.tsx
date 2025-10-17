"use client";
import { Orbit, InfinityIcon, Leaf } from "lucide-react";
import { FeatureCards } from "@/components/FeatureCards";

export default function Tech() {
  const cards = [
    { title: "AI as Soil", icon: <Orbit className="h-5 w-5" />, text: "We train with organic data: real observations, garden logs, community stories—turning lived truth into nourishment for models." },
    { title: "Blockchain as Mycelium", icon: <InfinityIcon className="h-5 w-5" />, text: "Trust, transparency, and fair exchange spread like fungal roots—quiet, resilient, unstoppable." },
    { title: "Humans as Gardeners", icon: <Leaf className="h-5 w-5" />, text: "Your gifts are seeds. Cybernetix connects talents to meaningful work and rewards contribution over status." },
  ];

  return (
    <section id="tech" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <h2 className="ep-gradient-text text-3xl md:text-4xl font-bold">Sacred Integration</h2>
            <div className="divider-ep mt-3" />
            <p className="mt-3 text-white/70">We merge cosmic wonder with practical design. Technology here is gentle yet powerful—an expression of care.</p>
            <ul className="mt-6 space-y-2 text-white/80">
              <li className="flex items-start gap-2"><span>•</span><span>Open, composable primitives for identity, contribution, and reputation.</span></li>
              <li className="flex items-start gap-2"><span>•</span><span>Consent-first data flows; you own your roots and branches.</span></li>
              <li className="flex items-start gap-2"><span>•</span><span>Community governance that rewards stewardship over control.</span></li>
            </ul>
          </div>
          <div className="md:col-span-7">
            <FeatureCards cards={cards} />
          </div>
        </div>
      </div>
    </section>
  );
}