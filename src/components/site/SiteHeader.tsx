import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";

export function SiteHeader() {
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  function goToComoFunciona() {
    const el = document.getElementById("como-funciona");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-[0.22em] text-champagne uppercase sm:text-xl"
        >
          Clube do Mistério
        </Link>

        <nav className="flex w-full items-center justify-center gap-3 sm:w-auto">
          {isHome ? (
            <button
              type="button"
              onClick={goToComoFunciona}
              className="min-h-12 flex-1 rounded-md border border-border px-4 py-3 text-sm font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-gold hover:text-champagne sm:flex-none"
            >
              Como Funciona
            </button>
          ) : (
            <Link
              to="/"
              hash="como-funciona"
              className="min-h-12 flex-1 rounded-md border border-border px-4 py-3 text-center text-sm font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-gold hover:text-champagne sm:flex-none"
            >
              Como Funciona
            </Link>
          )}

          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="min-h-12 flex-1 rounded-md border border-gold bg-primary px-4 py-3 text-sm font-bold tracking-[0.12em] text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-opacity hover:opacity-90 sm:flex-none"
          >
            Entrar
          </button>
        </nav>
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
}
