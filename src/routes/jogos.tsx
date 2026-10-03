import { createFileRoute } from "@tanstack/react-router";
import { Puzzle } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/jogos")({
  head: () => ({
    meta: [
      { title: "Jogos do Detetive — Clube do Mistério" },
      {
        name: "description",
        content:
          "Desafios de palavras, lógica, memória e observação reunidos para quem gosta de colocar a mente de detetive à prova.",
      },
      { property: "og:title", content: "Jogos do Detetive — Clube do Mistério" },
      { property: "og:description", content: "Observe. Pense. Encontre a resposta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Jogos,
});

function Jogos() {
  return (
    <PageShell
      eyebrow="Passatempos Investigativos"
      title="Jogos do Detetive"
      intro="Observe. Pense. Encontre a resposta."
    >
      <article className="surface-panel mx-auto max-w-3xl overflow-hidden rounded-lg">
        <div className="flex aspect-[16/7] items-center justify-center border-b border-border bg-[var(--ink-deep)]">
          <Puzzle aria-hidden="true" className="size-12 text-gold/70" strokeWidth={1.2} />
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-[0.1em] text-champagne uppercase sm:text-3xl">
            Coleção de Passatempos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Desafios de palavras, lógica, memória e observação reunidos em um único lugar para quem
            gosta de colocar a mente de detetive à prova.
          </p>
          <a
            href="https://jogos-do-detetive.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block min-h-12 w-full rounded-md border border-gold bg-primary px-6 py-3 text-center text-base font-bold tracking-[0.12em] text-primary-foreground uppercase transition-opacity hover:opacity-90 sm:w-auto"
          >
            Conhecer os Jogos
          </a>
        </div>
      </article>

      <div className="mx-auto mt-6 flex max-w-3xl min-h-[8rem] flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center">
        <p className="eyebrow">Espaço reservado</p>
        <p className="mt-2 text-base text-muted-foreground">
          Área preparada para um acesso de degustação gratuita no futuro.
        </p>
      </div>
    </PageShell>
  );
}
