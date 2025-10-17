"use client";
import { Sparkles, Sprout } from "lucide-react";

export default function CallToAction() {
  return (
    <section id="garden" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="card-glass p-8 md:p-12 text-center text-white">
          <h3 className="ep-gradient-text text-3xl md:text-4xl font-bold">Plant Your Starseed</h3>
          <div className="divider-ep mt-3" />
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">Add your first note, observation, or offering. Let the garden learn from real life—and let that knowledge return to all.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/join" className="btn-ep">
              <Sprout className="h-4 w-4" />
              Share an Observation
            </a>
            <a href="/join" className="btn-ep">
              <Sparkles className="h-4 w-4" />
              Become a Steward
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}