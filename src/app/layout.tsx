import "./globals.css";
import { getServerClient } from "@/lib/supabaseServer";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Touch the session once so SSR pages can immediately see auth if they need to.
  const supabase = await getServerClient();
  await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className="min-h-screen bg-black selection:bg-pink-400/40 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
