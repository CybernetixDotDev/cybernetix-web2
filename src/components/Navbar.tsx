"use client";
import { useEffect, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // lock scroll when menu open
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { href: "#garden", label: "Garden" },
    { href: "#values", label: "Values" },
    { href: "#tech", label: "Tech" },
    { href: "#join", label: "Join" },
  ];

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo + Title with halo */}
            <a href="#top" className="relative flex items-center gap-3 leading-none">
              <div className="relative halo">
                <img
                  src="/logo.png"
                  alt="Cybernetix"
                  className="relative h-12 w-12 sm:h-16 sm:w-16 drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                />
              </div>
              <span className="relative ep-gradient-animated font-semibold text-base sm:text-lg md:text-xl tracking-wide">
                Cybernetix
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-white/70">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="hover:text-white transition">
                  {label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a href="#join" className="btn-ep hidden md:inline-flex md:ml-4">
              <Sparkles className="h-4 w-4" />
              <span>Become a Butterfly</span>
            </a>

            {/* Mobile toggle */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-2 text-white hover:bg-white/20 transition"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm card-glass p-6 border border-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              <div className="flex items-center justify-between">
                <div className="relative halo">
                  <img src="/logo.png" alt="Cybernetix" className="h-10 w-10" />
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-2 text-white hover:bg-white/20 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="divider-ep my-4" />

              <nav className="flex flex-col gap-2 text-white/90">
                {navLinks.map(({ href, label }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 hover:bg-white/10 hover-lift"
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-6">
                <a href="#join" onClick={() => setOpen(false)} className="btn-ep w-full justify-center">
                  <Sparkles className="h-4 w-4" />
                  Become a Butterfly
                </a>
              </div>

              <p className="mt-6 text-xs text-white/60">
                Money does not define us. Contribution, creativity, and consciousness do.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}