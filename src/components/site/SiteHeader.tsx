export function SiteHeader() {
  const portalUrl = "https://portal-clube-do-misterio.lovable.app/";

  return (
    <header className="sticky top-0 z-[9999] border-b border-border/70 bg-background/95 backdrop-blur-md w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <a
          href={portalUrl}
          className="flex items-center gap-2 rounded-md border border-gold/50 bg-transparent px-3 py-2 text-xs font-bold tracking-[0.1em] text-champagne uppercase transition-colors hover:bg-gold/10"
        >
          ← Voltar
        </a>
        <a
          href={portalUrl}
          className="font-display text-sm sm:text-lg font-semibold tracking-[0.15em] text-gold uppercase transition-colors hover:text-champagne"
        >
          Clube do Mistério
        </a>
      </div>
    </header>
  );
}
