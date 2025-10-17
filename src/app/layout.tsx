import "./globals.css"; // ensure Tailwind + theme load

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black selection:bg-pink-400/40 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}