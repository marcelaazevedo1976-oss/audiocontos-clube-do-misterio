import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITENS: { titulo: string; texto: string[] }[] = [
  {
    titulo: "Onde posso usar?",
    texto: [
      "O Clube do Mistério funciona diretamente pelo navegador e pode ser acessado pelo celular, tablet ou computador. Alguns produtos também podem ser adicionados à tela inicial do celular, proporcionando uma experiência semelhante à de um aplicativo.",
    ],
  },
  {
    titulo: "Como recebo meu acesso?",
    texto: [
      "Após adquirir um produto do Clube do Mistério, você receberá as orientações de acesso no e-mail utilizado na compra. No primeiro acesso, você poderá criar sua conta e sua própria senha. Depois disso, basta entrar com seu e-mail e senha sempre que quiser voltar.",
    ],
  },
  {
    titulo: "O que são os Escape Rooms?",
    texto: [
      "São histórias de mistério nas quais você participa da investigação. Ouça a narrativa, examine cenas, encontre pistas e resolva pequenos desafios para avançar no caso. Ao final, descubra a solução completa do mistério.",
      "Não é necessário ter experiência com jogos. As instruções aparecem durante a investigação.",
    ],
  },
  {
    titulo: "O que são os Jogos do Detetive?",
    texto: [
      "Uma coleção de passatempos inspirados no universo da investigação: palavras, lógica, memória, observação e desafios visuais. Entre, escolha um jogo e comece a jogar.",
      "Foram pensados para momentos de diversão e exercício da atenção, sem necessidade de experiência anterior com jogos digitais.",
    ],
  },
  {
    titulo: "O que são os ÁudioContos?",
    texto: [
      "Histórias de mistério criadas para ouvir com tranquilidade. Escolha um conto, coloque os fones de ouvido se desejar e deixe a narrativa conduzir você por crimes, segredos e enigmas.",
      "Uma experiência para quem prefere simplesmente se acomodar e ouvir uma boa história.",
    ],
  },
  {
    titulo: "O que são os Pacotes Promocionais?",
    texto: [
      "Combinações especiais de produtos do Clube do Mistério reunidas com condições promocionais. Os pacotes podem incluir diferentes experiências, universos e coleções disponíveis no portal.",
    ],
  },
  {
    titulo: "Preciso entender de tecnologia?",
    texto: [
      "Não. O Clube do Mistério foi pensado para ser simples de usar. Você escolhe a experiência, segue as instruções exibidas na tela e começa.",
      "Se você já utiliza normalmente sites, YouTube ou aplicativos no celular, deverá conseguir navegar pelo Clube com facilidade.",
    ],
  },
];

export function ComoFunciona() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section id="como-funciona" className="scroll-mt-24 border-t border-border bg-[var(--ink)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="eyebrow">Orientações do Clube</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[0.1em] text-champagne uppercase sm:text-4xl">
            Como Funciona
          </h2>
          <div className="gold-rule mx-auto mt-5 w-28" />
        </div>

        <div className="mt-10 space-y-3">
          {ITENS.map((item, i) => {
            const isOpen = aberto === i;
            return (
              <div
                key={item.titulo}
                className="overflow-hidden rounded-md border border-border bg-card"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setAberto(isOpen ? null : i)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold tracking-[0.06em] text-foreground uppercase sm:text-lg">
                    {item.titulo}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-6 shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen ? (
                  <div className="space-y-4 border-t border-border px-5 py-5 text-base leading-relaxed text-muted-foreground">
                    {item.texto.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
