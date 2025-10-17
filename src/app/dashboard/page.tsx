// app/dashboard/page.tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getServerUser } from "@/lib/supabaseServer";
import { Sparkles, Leaf } from "lucide-react";

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <section className="pt-28 pb-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="card-glass p-8 md:p-10 text-white">
              <h1 className="ep-gradient-text text-3xl md:text-4xl font-bold">Redirecting…</h1>
              <p className="mt-3 text-white/70">You’re not signed in.</p>
              <meta httpEquiv="refresh" content="0; url=/join" />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const name =
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    user.email;

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="card-glass p-8 md:p-10 text-white">
            <h1 className="ep-gradient-text text-3xl md:text-4xl font-bold">Welcome to the Garden</h1>
            <div className="divider-ep my-4" />
            <p className="text-white/80">Hello {name}, your sacred connection is active.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card-glass p-5 hover-lift">
                <Leaf className="h-5 w-5 mb-2" />
                <p className="text-white/90 font-medium">Plant a New Seed</p>
                <p className="text-sm text-white/60">Begin a new observation, note, or contribution to the Garden.</p>
              </div>
              <div className="card-glass p-5 hover-lift">
                <Sparkles className="h-5 w-5 mb-2" />
                <p className="text-white/90 font-medium">Your Contributions</p>
                <p className="text-sm text-white/60">View the ideas, data, and energy you’ve shared with Cybernetix.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
