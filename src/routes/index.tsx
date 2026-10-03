import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Puzzle, Headphones, Library } from "lucide-react";
import heroLondon from "@/assets/hero-london.jpg";
import investigateAsset from "@/assets/investigate.jpg.asset.json";
import desafieAsset from "@/assets/desafie-sua-mente.jpg.asset.json";
import oucaAsset from "@/assets/ouca-no-escuro.jpg.asset.json";
import pacotesAsset from "@/assets/pacotes-promocionais.jpg.asset.json";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ComoFunciona } from "@/components/site/ComoFunciona";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clube do Mistério — Enigma & Investigação" },
      {
        name: "description",
        content:
          "Histórias para investigar, enigmas para resolver e mistérios para ouvir: Escape Rooms, jogos de detetive e ÁudioContos.",
      },
      { property: "og:title", content: "Clube do Mistério — Enigma & Investigação" },
      {
        property: "og:description",
        content:
          "Histórias para investigar, enigmas para resolver e mistérios para ouvir: Escape Rooms, jogos de detetive e ÁudioContos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Hall,
});

const PORTAS = [
  {
    numero: "I",
    titulo: "Investigue",
    subtitulo: "Escape Rooms Virtuais",
    to: "/escape-rooms" as const,
    href: undefined,
    Icon: Search,
    destaque: false,
    emBreve: false,
    imagem: investigateAsset.url,
    alt: "Escrivaninha de investigador com lupa, mapa, relógio de bolso e lampião à luz de uma janela londrina enevoada",
  },
  {
    numero: "II",
    titulo: "Desafie sua Mente",
    subtitulo: "Jogos de Lógica & Palavras",
    to: "/jogos" as const,
    href: "https://jogos-do-detetive.vercel.app",
    Icon: Puzzle,
    destaque: false,
    emBreve: false,
    imagem: desafieAsset.url,
    alt: "Mesa de madeira com caderno de sudoku, palavras cruzadas, peças de letras e lupa sob luz quente",
  },
  {
    numero: "III",
    titulo: "Ouça no Escuro",
    subtitulo: "ÁudioContos Imersivos",
    to: "/audiocontos" as const,
    href: undefined,
    Icon: Headphones,
    destaque: false,
    emBreve: false,
    imagem: oucaAsset.url,
    alt: "Biblioteca aconchegante à luz de velas com rádio antigo, fones de ouvido e janela com luar",
  },
  {
    numero: "IV",
    titulo: "Pacotes Promocionais",
    subtitulo: "Combos & Ofertas Especiais",
    to: "/pacotes" as const,
    href: undefined,
    Icon: Library,
    destaque: true,
    emBreve: true,
    imagem: pacotesAsset.url,
    alt: "Maleta aberta com envelope de cera, chaves, moedas antigas, fones de ouvido e livros encadernados",
  },
];

function Hall() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden">
          <img
            src={heroLondon}
            alt="Rua londrina enevoada iluminada por lampiões antigos"
            width={1920}
            height={1280}
            className="absolute inset-0 -z-10 size-full object-cover object-center opacity-60"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.15_0.028_258/0.88),oklch(0.15_0.028_258/0.72)_45%,oklch(0.15_0.028_258/0.98))]"
          />

          <div className="mx-auto max-w-6xl px-4 pt-14 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-20">
            <p className="eyebrow">O Portal Oficial do Enigma &amp; Investigação</p>

            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] font-semibold tracking-[0.06em] text-champagne uppercase sm:text-6xl lg:text-7xl">
              Clube do Mistério
            </h1>

            <div className="gold-rule mx-auto mt-6 w-40 sm:w-56" />

            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/85 sm:text-xl">
              Histórias para investigar. Enigmas para resolver. Mistérios para ouvir.
            </p>

            <p className="mt-10 text-sm tracking-[0.24em] text-muted-foreground uppercase">
              Escolha uma porta
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {PORTAS.map(
                ({ numero, titulo, subtitulo, to, href, Icon, destaque, emBreve, imagem, alt }) => {
                  const conteudo = (
                    <>
                      {emBreve ? (
                        <span className="absolute top-6 -right-12 z-10 w-44 rotate-45 border-y border-gold/70 bg-primary py-1 text-center text-xs font-bold tracking-[0.16em] text-primary-foreground uppercase shadow-[var(--shadow-gold)]">
                          Em breve
                        </span>
                      ) : null}
                  <span className="font-display text-sm tracking-[0.3em] text-gold">{numero}</span>
                  <Icon aria-hidden="true" className="size-9 text-gold" strokeWidth={1.4} />
                  <span className="font-display text-2xl font-semibold tracking-[0.12em] text-champagne uppercase sm:text-3xl">
                    {titulo}
                  </span>
                  <span className="text-base text-muted-foreground">{subtitulo}</span>
                  <img
                    src={imagem}
                    alt={alt}
                    className="mt-2 aspect-[4/3] w-full rounded-md object-cover"
                    loading="lazy"
                  />
                    </>
                  );
                  const cardClass = `surface-panel group relative flex min-h-[9.5rem] flex-col items-center gap-3 overflow-hidden rounded-lg px-6 py-8 text-center transition-colors ${
                    destaque ? "border-gold/60 shadow-[var(--shadow-gold)]" : "hover:border-gold/60"
                  } ${emBreve ? "cursor-not-allowed" : ""}`;

                  return emBreve ? (
                    <article key={titulo} aria-disabled="true" className={cardClass}>
                      {conteudo}
                    </article>
                  ) : href ? (
                    <a key={titulo} href={href} className={cardClass}>
                      {conteudo}
                    </a>
                  ) : (
                    <Link key={titulo} to={to} className={cardClass}>
                      {conteudo}
                    </Link>
                  );
                },
              )}
            </div>
          </div>
        </section>

        <ComoFunciona />
      </main>

      <SiteFooter />
    </div>
  );
}
