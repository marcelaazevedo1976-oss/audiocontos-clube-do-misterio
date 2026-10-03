import { useState } from "react";

export function SiteHeader() {
  const portalUrl = "https://portal-clube-do-misterio.lovable.app/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4 sm:px-6">
        <a
          href={portalUrl}
          className="font-display text-lg font-semibold tracking-[0.22em] text-champagne uppercase sm:text-xl transition-colors hover:text-gold"
        >
          Clube do Mistério
        </a>

        <nav className="flex w-full items-center justify-center gap-3 sm:w-auto">
          <a
            href={portalUrl}
            className="flex min-h-12 flex-1 items-center justify-center rounded-md border border-gold bg-primary px-4 py-3 text-sm font-bold tracking-[0.12em] text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-opacity hover:opacity-90 sm:flex-none"
          >
            Voltar para o Clube
          </a>
        </nav>
      </div>
    </header>
  );
}
