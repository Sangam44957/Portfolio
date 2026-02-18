import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-nexus-bg flex items-center justify-center p-6">
      <div className="text-center max-w-[500px]">
        <h1 className="text-[150px] font-bold leading-none gradient-text mb-4">404</h1>

        <div className="glass rounded-xl p-6 mb-8 font-mono text-sm text-left">
          <p className="text-nexus-muted mb-2">
            <span className="text-nexus-accent">❯</span> cd /requested-page
          </p>
          <p className="text-red-400 mb-2">Error: Page not found in this dimension</p>
          <p className="text-nexus-muted mb-2">
            <span className="text-nexus-accent">❯</span> suggest --fix
          </p>
          <p className="text-nexus-green">Try navigating to the homepage ↓</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nexus-accent/10 border border-nexus-accent/30 text-nexus-accent font-mono text-sm hover:border-nexus-accent/60 transition-all"
        >
          ← Go Home
        </Link>
      </div>
    </main>
  );
}