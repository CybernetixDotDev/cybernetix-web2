export function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10 text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Cybernetix" className="h-6 w-6" />
            <span className="text-white/80">© {new Date().getFullYear()} Cybernetix — Cultivating the Future</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#values" className="hover:text-white">Values</a>
            <a href="#tech" className="hover:text-white">Tech</a>
            <a href="/join" className="hover:text-white">Join</a>
          </div>
        </div>
      </div>
    </footer>
  );
}