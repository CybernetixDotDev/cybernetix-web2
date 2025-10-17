"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Sparkles, Github, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  const params = useSearchParams();
  const fromParam = params.get("from") || "/dashboard";

  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    // Send OAuth/magic-link back to our server callback, then it will redirect once to `next`
    const next = encodeURIComponent(fromParam);
    return `${window.location.origin}/auth/callback?next=${next}`;
  }, [fromParam]);

  async function signInWithProvider(provider: "google" | "github") {
    try {
      setLoading(provider);
      setMessage(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
      if (error) throw error;
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Authentication failed" });
      setLoading(null);
    }
  }

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading("email");
      setMessage(null);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setMessage({ type: "info", text: "Magic link sent. Check your inbox ✨" });
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Could not send magic link" });
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="card-glass p-8 md:p-10 text-white">
          <h1 className="ep-gradient-text text-3xl md:text-4xl font-bold">Join the Garden</h1>
          <div className="divider-ep mt-3" />
          <p className="mt-3 text-white/80">
            Create your sacred link to Cybernetix. Sign in with Google, GitHub, or an email magic link.
          </p>

          <a href="/" className="mt-4 inline-flex items-center gap-2 text-white/80 hover:text-white">
            <span aria-hidden>←</span> Back to landing
          </a>

          {message && (
            <div
              className={`mt-4 rounded-xl border px-3 py-3 text-sm ${
                message.type === "success"
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                  : message.type === "error"
                  ? "border-rose-400/40 bg-rose-400/10 text-rose-200"
                  : "border-sky-400/40 bg-sky-400/10 text-sky-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                <span>{message.text}</span>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-3">
            <button onClick={() => signInWithProvider("google")} className="btn-ep justify-center" disabled={!!loading}>
              {loading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Continue with Google
            </button>

            <button onClick={() => signInWithProvider("github")} className="btn-ep justify-center" disabled={!!loading}>
              {loading === "github" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
              Continue with GitHub
            </button>
          </div>

          <form onSubmit={signInWithEmail} className="mt-6">
            <label className="block text-sm text-white/80">Or use a magic link</label>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@cosmos.xyz"
                className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
              />
              <button type="submit" className="btn-ep">
                {loading === "email" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Send Link
              </button>
            </div>
          </form>

          <p className="mt-6 text-xs text-white/60">By joining, you agree that connection is our currency and care is our protocol.</p>
        </div>
      </div>
    </main>
  );
}
