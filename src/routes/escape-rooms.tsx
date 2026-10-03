import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import cronicasHero from "@/assets/cronicas-hero.png";

export const Route = createFileRoute("/escape-rooms")({
  head: () => ({
    meta: [
      { title: "Escape Rooms — Clube do Mistério" },
      {
        name: "description",
        content:
          "Entre na história, observe as pistas e resolva o mistério nos Escape Rooms narrativos do Clube do Mistério.",
      },
      { property: "og:title", content: "Escape Rooms — Clube do Mistério" },
      {
        property: "og:description",
        content: "Entre na história. Observe as pistas. Resolva o mistério.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EscapeRooms,
});

const UNIVERSOS = [
  {
    eyebrow: "Baker Street, 221B — Londres",
    titulo: "Crônicas de Baker Street",
    descricao:
      "Um escape room virtual de mistério vitoriano. Examine pistas, interrogue suspeitos e resolva os casos ao lado de Sherlock Holmes e do Dr. Watson.",
    imagem: cronicasHero,
    alt: "Sherlock Holmes e Dr. Watson em Baker Street enevoada",
    botoes: [
      {
        label: "Abrir o Arquivo de Casos",
        href: "https://cronicas-de-baker-street.vercel.app/pacotes",
        primary: true,
      },
      {
        label: "Jogar Degustação (Grátis)",
        href: "https://cronicas-de-baker-street.vercel.app/prologo",
        primary: false,
      },
    ],
  },
];

function EscapeRooms() {
  return (
    <PageShell eyebrow="Coleção de Universos" title="Escape Rooms">
      <div className="flex flex-col gap-8">
        {UNIVERSOS.map((u) => (
          <UniversoCard key={u.titulo} {...u} />
        ))}
        <FuturoUniverso />
      </div>
    </PageShell>
  );
}

function UniversoCard({
  eyebrow,
  titulo,
  descricao,
  imagem,
  alt,
  botoes,
}: {
  eyebrow: string;
  titulo: string;
  descricao: string;
  imagem: string;
  alt: string;
  botoes: { label: string; href: string; primary: boolean }[];
}) {
  return (
    <article className="surface-panel overflow-hidden rounded-lg">
      <div className="relative">
        <img
          src={imagem}
          alt={alt}
          className="aspect-[21/9] w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.15_0.028_258/0.3),oklch(0.15_0.028_258/0.75))]" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <p className="font-typewriter text-xs tracking-[0.25em] text-gold uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-[0.06em] text-champagne uppercase sm:text-4xl">
            {titulo}
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {descricao}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {botoes.map((btn) => (
            <a
              key={btn.href}
              href={btn.href}
              className={
                btn.primary
                  ? "inline-flex min-h-11 items-center rounded-md border border-gold bg-primary px-5 py-2.5 text-sm font-bold tracking-[0.12em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
                  : "inline-flex min-h-11 items-center rounded-md border border-gold/60 bg-transparent px-5 py-2.5 text-sm font-bold tracking-[0.12em] text-gold uppercase transition-colors hover:border-gold hover:bg-gold/10"
              }
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function FuturoUniverso() {
  return (
    <div className="flex min-h-[12rem] flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
      <p className="eyebrow">Espaço reservado</p>
      <p className="mt-3 font-display text-xl text-champagne/80">
        Novos universos de investigação
      </p>
      <p className="mt-2 max-w-sm text-base text-muted-foreground">
        Este espaço receberá futuras coleções e Escape Rooms do Clube.
      </p>
    </div>
  );
}
