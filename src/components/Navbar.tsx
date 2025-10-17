"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, Menu, X, LogOut, CheckCircle2, User2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

type SUser = {
  email?: string;
  user_metadata?: { full_name?: string; name?: string; picture?: string };
};

function initialsFrom(user: SUser) {
  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "You";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const second = parts[1]?.[0] || "";
  return (first + second).toUpperCase();
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SUser | null>(null);

  // hydrate auth state
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      mounted = false;
      sub?.subscription.unsubscribe();
    };
  }, []);

  // lock scroll for mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const navLinks = useMemo(
    () =>
      [
        { href: "/#garden", label: "Garden" },
        { href: "/#values", label: "Values" },
        { href: "/#tech", label: "Tech" },
        user ? { href: "/dashboard", label: "Dashboard" } : { href: "/join", label: "Join" },
      ] as const,
    [user]
  );

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/join";
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo + Title */}
            <a href="/" className="relative flex items-center gap-3 leading-none">
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

            {/* Right side: CTA or User */}
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <a href="/join" className="btn-ep">
                  <Sparkles className="h-4 w-4" />
                  Become a Butterfly
                </a>
              ) : (
                <>
                  {/* Signed-in badge + avatar */}
                  <div className="relative">
                    <span
                      title="Connected"
                      className="absolute -right-1 -top-1 inline-flex items-center justify-center rounded-full bg-emerald-500 text-black h-4 w-4"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    {user.user_metadata?.picture ? (
                      <img
                        src={user.user_metadata.picture}
                        alt="avatar"
                        className="h-9 w-9 rounded-full ring-1 ring-white/20 object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full ring-1 ring-white/20 bg-white/10 flex items-center justify-center text-sm">
                        {initialsFrom(user)}
                      </div>
                    )}
                  </div>
                  <button onClick={signOut} className="btn-ep">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              )}
            </div>

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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div className="md:hidden fixed inset-0 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
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
                <div className="flex items-center gap-3">
                  {user ? (
                    <>
                      {user.user_metadata?.picture ? (
                        <img src={user.user_metadata.picture} alt="avatar" className="h-9 w-9 rounded-full ring-1 ring-white/20 object-cover" />
                      ) : (
                        <div className="h-9 w-9 rounded-full ring-1 ring-white/20 bg-white/10 flex items-center justify-center text-sm">
                          {initialsFrom(user)}
                        </div>
                      )}
                      <div className="text-white/80 text-sm">
                        <div className="font-medium">{user.user_metadata?.full_name || user.user_metadata?.name || "Welcome"}</div>
                        <div className="text-white/50">{user.email}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <User2 className="h-9 w-9 text-white/60" />
                      <div className="text-white/70">Not signed in</div>
                    </>
                  )}
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
                {!user ? (
                  <a href="/join" onClick={() => setOpen(false)} className="btn-ep w-full justify-center">
                    <Sparkles className="h-4 w-4" />
                    Become a Butterfly
                  </a>
                ) : (
                  <button onClick={signOut} className="btn-ep w-full justify-center">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                )}
              </div>

              {user && (
                <p className="mt-6 text-xs text-white/60 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Connected
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
