import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[var(--ink-deep)]">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
        <div className="gold-rule mx-auto mb-8 w-24" />
        <h2 className="font-display text-2xl tracking-[0.2em] text-champagne uppercase">
          Clube do Mistério
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Histórias para investigar. Enigmas para resolver. Mistérios para ouvir.
        </p>

        <Button asChild variant="outline" className="mt-8 min-h-11 border-gold/50 bg-transparent px-5 text-champagne hover:border-gold hover:bg-accent">
          <a href="https://www.youtube.com/@CineTravesseiro" target="_blank" rel="noopener noreferrer">
            Visite o Cine Travesseiro
            <ExternalLink aria-hidden="true" />
          </a>
        </Button>

        <p className="mt-8 text-sm text-muted-foreground">© Clube do Mistério</p>
      </div>
    </footer>
  );
}
