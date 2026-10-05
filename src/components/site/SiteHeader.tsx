export function SiteHeader() {
  const portalUrl = "https://portal-clube-do-misterio.lovable.app/";

  const scrollToComoFunciona = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("como-funciona");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-[9999] border-b border-border/70 bg-background/95 backdrop-blur-md w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex gap-2">
          <a
            href={portalUrl}
            className="flex items-center gap-2 rounded-md border border-gold/50 bg-transparent px-3 py-2 text-xs font-bold tracking-[0.1em] text-champagne uppercase transition-colors hover:bg-gold/10"
          >
            Voltar
          </a>
          <button
            onClick={scrollToComoFunciona}
            className="flex items-center gap-2 rounded-md border border-gold/20 bg-transparent px-3 py-2 text-xs font-bold tracking-[0.1em] text-champagne uppercase transition-colors hover:bg-gold/10"
          >
            Como Funciona
          </button>
        </div>
        <a
          href={portalUrl}
          className="font-display text-sm sm:text-lg font-semibold tracking-[0.15em] text-gold uppercase transition-colors hover:text-champagne hidden sm:block"
        >
          Clube do Mistério
        </a>
      </div>
    </header>
  );
}
