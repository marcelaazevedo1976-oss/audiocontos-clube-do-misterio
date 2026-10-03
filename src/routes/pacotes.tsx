import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/pacotes")({
  head: () => ({
    meta: [
      { title: "Pacotes Promocionais — Clube do Mistério" },
      {
        name: "description",
        content:
          "Combinações especiais de Escape Rooms, jogos e ÁudioContos do Clube do Mistério com condições promocionais.",
      },
      { property: "og:title", content: "Pacotes Promocionais — Clube do Mistério" },
      {
        property: "og:description",
        content: "Mais mistérios. Mais experiências. Condições especiais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pacotes,
});

function Pacotes() {
  return (
    <PageShell
      eyebrow="Combos & Ofertas Especiais"
      title="Pacotes Promocionais"
      intro="Mais mistérios. Mais experiências. Condições especiais."
    >
      <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
        Os pacotes reunirão diferentes experiências do Clube — Escape Rooms, Jogos do Detetive,
        ÁudioContos e outros universos — em combinações com condições promocionais.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {[1, 2].map((n) => (
          <div
            key={n}
            className="flex min-h-[16rem] flex-col items-center justify-center rounded-lg border border-dashed border-gold/40 p-8 text-center"
          >
            <Library aria-hidden="true" className="size-10 text-gold/70" strokeWidth={1.2} />
            <p className="eyebrow mt-4">Espaço reservado</p>
            <p className="mt-2 max-w-sm text-base text-muted-foreground">
              Este espaço receberá um pacote promocional do Clube do Mistério.
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
