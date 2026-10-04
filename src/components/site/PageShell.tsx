import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, intro, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          

          <header className="mt-8 text-center">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-[0.08em] text-champagne uppercase sm:text-5xl">
              {title}
            </h1>
            <div className="gold-rule mx-auto mt-5 w-32" />
            {intro ? (
              <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
            ) : null}
          </header>

          <div className="mt-12">{children}</div>

          <div className="mt-14 flex justify-center">
            
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}



