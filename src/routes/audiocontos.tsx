import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Headphones, Lock, ChevronDown, ChevronUp, Play, Pause, SkipForward, SkipBack, RefreshCw } from "lucide-react";
import audioSherlock from "@/assets/audio-sherlock.jpg";
import audioPadreBrown from "@/assets/audio-padre-brown.jpg";
import audioRainhaCrime from "@/assets/audio-rainha-crime.jpg";

export const Route = createFileRoute("/audiocontos")({
  head: () => ({
    meta: [
      { title: "ÁudioContos — Clube do Mistério" },
      { name: "description", content: "Coleções de contos narrados: universos de Sherlock Holmes, Padre Brown e Agatha Christie." },
      { property: "og:title", content: "ÁudioContos — Clube do Mistério" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AudioContos,
});

/* ----------------------------------------------------------------
   DADOS
   Para adicionar audio: preencha src com link direto do Dropbox
   (substitua dl=0 por raw=1 no link do Dropbox)
---------------------------------------------------------------- */

type Historia = { numero: string; titulo: string; src: string };
type Pacote = {
  id: string;
  numero: string;
  titulo: string;
  subtitulo: string;
  imagem?: string;
  disponivel: boolean;
  historias: Historia[];
  preco: string;
};
type Universo = { nome: string; pacotes: Pacote[] };

const UNIVERSOS: Universo[] = [
  {
    nome: "Universo Sherlock Holmes",
    pacotes: [
      {
        id: "sherlock-01",
        numero: "Pacote 01",
        titulo: "Crônicas Noturnas de Baker Street",
        subtitulo: "20 Histórias de Mistério para Ouvir e Descansar",
        imagem: audioSherlock,
        disponivel: true,
        preco: "R$ 19,90",
        historias: [
          { numero: "I",    titulo: "O Colecionador de Silêncios",        src: "https://www.dropbox.com/scl/fi/evxurmrwvrvxfvl64di8b/01-O-COLECIONADOR-DE-SIL-NCIOS.MP3?rlkey=g9vpppag6e4va7qpac0d8393p&st=lok4ql60&raw=1" },
          { numero: "II",   titulo: "A Casa de Bonecas de Belgravia",       src: "https://www.dropbox.com/scl/fi/dgi8u6jlb8650ixp2g28e/02-A-Casa-de-Bonecas-de-Belgravia.MP3?rlkey=xpmv59r86y0uopp6362texylh&st=36ygyj5c&raw=1" },
          { numero: "III",  titulo: "O Pianista sem Rosto",                 src: "https://www.dropbox.com/scl/fi/d1vpvdkwlts1gh5cbce0d/03-O-Pianista-sem-Rosto.MP3?rlkey=t0yjcyo40b2in5umdvc95t6nu&st=l3yb58oq&raw=1" },
          { numero: "IV",   titulo: "A Criança que Não Existia",              src: "https://www.dropbox.com/scl/fi/afyyz7gzegjdqxvaorc4n/04-A-CRIAN-A-QUE-N-O-EXISTIA.MP3?rlkey=739peev4tv9xz5n3mqe4bi4ma&st=nurrn2r4&raw=1" },
          { numero: "V",    titulo: "O Quarto da Senhora de Preto",         src: "https://www.dropbox.com/scl/fi/1aakzcibvkcnpodl6tddy/05-O-Quarto-da-Senhora-de-Preto.MP3?rlkey=yzqvt3me8daw6kyeyavv5hkdo&st=un9oferh&raw=1" },
          { numero: "VI",   titulo: "As Rosas da Casa Morta",               src: "https://www.dropbox.com/scl/fi/s7wwdbcj1xhnwzwfcqsb7/06-As-Rosas-da-Casa-Morta.MP3?rlkey=hws3xfmc0kweb4eh0e155pjl2&st=pg2igd15&raw=1" },
          { numero: "VII",  titulo: "O Homem da Janela Iluminada",          src: "https://www.dropbox.com/scl/fi/rm2vw3iaobx2myal22prx/07-O-Homem-da-Janela-Iluminada.MP3?rlkey=7dirfxkigb3heorkjk7w0u7ig&st=m1kwhp5h&raw=1" },
          { numero: "VIII", titulo: "A Noiva do Lago Sombrio",              src: "https://www.dropbox.com/scl/fi/756npvxjx3u2l4zlpifj1/08-A-Noiva-do-Lago-Sombrio.MP3?rlkey=tpcqvsjdevujbswl2qkccsthp&st=fhe2llo0&raw=1" },
          { numero: "IX",   titulo: "O Trem que Parou na Neve",             src: "https://www.dropbox.com/scl/fi/1eluntjd81minrniqisn7/09-O-Trem-que-Parou-na-Neve.MP3?rlkey=5f0e6l6qxwwxoandy8ln6akyj&st=gsad3ddy&raw=1" },
          { numero: "X",    titulo: "O Relógio que Marcava Mortes",          src: "" },
          { numero: "XI",   titulo: "A Viúva do Teatro de Cinzas",           src: "" },
          { numero: "XII",  titulo: "A Estrada dos Corvos Brancos",         src: "" },
          { numero: "XIII", titulo: "A Última Fotografia de Mayfair",        src: "" },
          { numero: "XIV",  titulo: "O Jardim das Estátuas Cobertas",        src: "" },
          { numero: "XV",   titulo: "A Dama do Quarto Número Sete",          src: "" },
          { numero: "XVI",  titulo: "O Navio no Rio de Névoa",               src: "" },
          { numero: "XVII", titulo: "O Perfume da Dama de Marfim",          src: "" },
          { numero: "XVIII",titulo: "A Colheita de Inverno",                src: "" },
          { numero: "XIX",  titulo: "O Último Caso do Espelho Partido",      src: "" },
          { numero: "XX",   titulo: "A Carta Dentro da Bíblia",              src: "" },
        ],
      },
    ],
  },
  {
    nome: "Universo Padre Brown",
    pacotes: [
      {
        id: "padre-01",
        numero: "Pacote 01",
        titulo: "Sussurros sob o Sino",
        subtitulo: "20 Histórias de Mistério para Ouvir e Descansar",
        imagem: audioPadreBrown,
        disponivel: false,
        preco: "R$ 19,90",
        historias: [],
      },
    ],
  },
  {
    nome: "Universo A Rainha do Crime",
    pacotes: [
      {
        id: "rainha-01",
        numero: "Pacote 01",
        titulo: "Veneno e Boa Noite",
        subtitulo: "20 Histórias de Mistério para Ouvir e Descansar",
        imagem: audioRainhaCrime,
        disponivel: false,
        preco: "R$ 19,90",
        historias: [],
      },
    ],
  },
];

type Modo = "individual" | "playlist";

function AudioContos() {
  // Todos os pacotes comecem fechados — so abre apos compra (Firebase fase 2)
  const [abertos, setAbertos] = useState<Set<string>>(new Set());
  const [modos, setModos] = useState<Record<string, Modo>>({});
  const [atuais, setAtuais] = useState<Record<string, number>>({});
  const [tocando, setTocando] = useState(false);
  const [packAtivo, setPackAtivo] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  function toggleAberto(id: string) {
    setAbertos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function getModo(id: string): Modo { return modos[id] ?? "individual"; }
  function getAtual(id: string): number { return atuais[id] ?? 0; }

  function setModo(id: string, m: Modo) {
    if (audioRef.current) { audioRef.current.pause(); setTocando(false); }
    setModos(p => ({ ...p, [id]: m }));
    setAtuais(p => ({ ...p, [id]: 0 }));
    setPackAtivo(null);
  }

  function setAtual(packId: string, idx: number) {
    setAtuais(p => ({ ...p, [packId]: idx }));
    setPackAtivo(packId);
  }

  const avancar = useCallback((packId: string, total: number) => {
    setAtuais(p => ({ ...p, [packId]: ((p[packId] ?? 0) + 1) % total }));
  }, []);

  const voltar = useCallback((packId: string, total: number) => {
    setAtuais(p => ({ ...p, [packId]: ((p[packId] ?? 0) - 1 + total) % total }));
  }, []);

  useEffect(() => {
    if (!packAtivo) return;
    const universo = UNIVERSOS.flatMap(u => u.pacotes).find(p => p.id === packAtivo);
    if (!universo) return;
    const el = audioRef.current;
    if (!el) return;
    const src = universo.historias[getAtual(packAtivo)]?.src;
    if (src) {
      el.src = src;
      el.load();
      el.play().then(() => setTocando(true)).catch(() => setTocando(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atuais, packAtivo]);

  function togglePlay(packId: string, src: string) {
    const el = audioRef.current;
    if (!el || !src) return;
    if (packAtivo !== packId) {
      setPackAtivo(packId);
      return;
    }
    if (tocando) { el.pause(); setTocando(false); }
    else { el.play().then(() => setTocando(true)).catch(() => {}); }
  }

  return (
    <PageShell eyebrow="Coleção de Universos" title="ÁudioContos">

      {/* Elemento de audio global oculto */}
      <audio
        ref={audioRef}
        onEnded={() => {
          if (!packAtivo) return;
          const pack = UNIVERSOS.flatMap(u => u.pacotes).find(p => p.id === packAtivo);
          if (pack) avancar(packAtivo, pack.historias.length);
        }}
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        className="hidden"
      />

      <div className="flex flex-col gap-10">
        {UNIVERSOS.map(universo => (
          <section key={universo.nome}>
            {/* Cabecalho do universo */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="font-typewriter text-xs tracking-[0.3em] text-gold uppercase px-2">
                {universo.nome}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Pacotes do universo */}
            <div className="flex flex-col gap-4">
              {universo.pacotes.map(pacote => {
                const estaAberto = abertos.has(pacote.id);
                const modo = getModo(pacote.id);
                const atual = getAtual(pacote.id);
                const disponiveis = pacote.historias.filter(h => h.src).length;

                return (
                  <div key={pacote.id} className="surface-panel overflow-hidden rounded-lg">

                    {/* Cabecalho do pacote com imagem */}
                    <div className="flex gap-4 border-b border-border p-5 sm:p-6">

                      {/* Thumbnail quadrado + status abaixo */}
                      <div className="flex shrink-0 flex-col items-center gap-2">
                        <div className="h-24 w-24 overflow-hidden rounded-md">
                          {pacote.imagem ? (
                            <img
                              src={pacote.imagem}
                              alt={pacote.titulo}
                              className="h-full w-full object-cover object-center"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[var(--ink-deep)]">
                              <Headphones className="h-8 w-8 text-gold/30" strokeWidth={1.2} />
                            </div>
                          )}
                        </div>

                        {/* TODO Firebase: trocar !pacote.disponivel por !usuarioTemAcesso(pacote.id) */}
                        {!pacote.disponivel && (
                          <div className="flex flex-col items-center gap-0.5">
                            <Lock className="h-3.5 w-3.5 text-muted-foreground/50" strokeWidth={1.5} />
                            <span className="font-typewriter text-[9px] tracking-[0.15em] text-muted-foreground/50 uppercase">
                              Em breve
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info + toggle */}
                      <div className="flex flex-1 flex-col justify-between gap-3 min-w-0">
                        <div>
                          <p className="font-typewriter text-[10px] tracking-[0.25em] text-gold uppercase">
                            {pacote.numero}
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold tracking-[0.08em] text-champagne uppercase sm:text-2xl">
                            {pacote.titulo}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {pacote.subtitulo}
                          </p>
                          <p className="mt-2 font-display text-xl font-semibold text-gold">
                            {pacote.preco}
                            <span className="ml-2 font-typewriter text-xs text-muted-foreground normal-case font-normal">
                              • 1 real por história
                            </span>
                          </p>
                        </div>

                        {pacote.disponivel ? (
                          <button
                            onClick={() => toggleAberto(pacote.id)}
                            className="flex w-fit items-center gap-2 rounded-md border border-gold/60 px-4 py-2 font-typewriter text-xs tracking-[0.15em] text-gold uppercase transition-colors hover:border-gold hover:bg-gold/10"
                          >
                            {estaAberto
                              ? <ChevronUp className="h-3.5 w-3.5" />
                              : <ChevronDown className="h-3.5 w-3.5" />}
                            {estaAberto ? "Fechar" : "Ouvir as Histórias"}
                            {!estaAberto && disponiveis > 0 && (
                              <span className="ml-1 text-muted-foreground normal-case tracking-normal">
                                • {disponiveis} de {pacote.historias.length} disponíveis
                              </span>
                            )}
                          </button>
                        ) : (
                          <div className="flex w-fit items-center gap-2 rounded-md border border-border px-4 py-2 font-typewriter text-xs tracking-[0.15em] text-muted-foreground/50 uppercase cursor-not-allowed">
                            <Lock className="h-3.5 w-3.5" />
                            Em breve
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Lista de episodios (acordeao) */}
                    {pacote.disponivel && estaAberto && (
                      <div className="border-t border-border">

                        {/* Toggle modo */}
                        <div className="flex gap-2 border-b border-border p-4">
                          {(["individual", "playlist"] as Modo[]).map(m => (
                            <button
                              key={m}
                              onClick={() => setModo(pacote.id, m)}
                              className={`flex items-center gap-1.5 rounded-md border px-4 py-2 font-typewriter text-xs tracking-[0.12em] uppercase transition-colors ${ modo === m ? "border-gold bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-gold/50" }`}
                            >
                              {m === "playlist" && <RefreshCw className="h-3 w-3" />}
                              {m === "individual" ? "Individual" : "Pacote Completo"}
                            </button>
                          ))}
                        </div>

                        {/* Player de playlist */}
                        {modo === "playlist" && (
                          <div className="border-b border-border bg-[var(--ink-deep)] px-6 py-6">
                            <div className="flex flex-col items-center gap-4">
                              <p className="font-typewriter text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Tocando agora</p>
                              <div className="text-center">
                                <span className="block font-display text-4xl font-semibold text-gold">{pacote.historias[atual]?.numero}</span>
                                <p className="mt-1 font-display text-lg tracking-[0.08em] text-champagne uppercase">{pacote.historias[atual]?.titulo}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <button onClick={() => voltar(pacote.id, pacote.historias.length)} className="rounded-full border border-border p-2 text-muted-foreground hover:border-gold/50 hover:text-gold transition-colors"><SkipBack className="h-4 w-4" /></button>
                                <button
                                  onClick={() => togglePlay(pacote.id, pacote.historias[atual]?.src ?? "")}
                                  disabled={!pacote.historias[atual]?.src}
                                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-primary text-primary-foreground shadow-[var(--shadow-gold)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  {tocando && packAtivo === pacote.id ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
                                </button>
                                <button onClick={() => avancar(pacote.id, pacote.historias.length)} className="rounded-full border border-border p-2 text-muted-foreground hover:border-gold/50 hover:text-gold transition-colors"><SkipForward className="h-4 w-4" /></button>
                              </div>
                              {!pacote.historias[atual]?.src && <p className="font-typewriter text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">— áudio em breve —</p>}
                            </div>
                          </div>
                        )}

                        {/* Lista de episodios */}
                        <div className={modo === "playlist" ? "divide-y divide-border" : "flex flex-col gap-3 p-4"}>
                          {pacote.historias.map((h, i) => (
                            modo === "playlist" ? (
                              <button
                                key={h.numero}
                                onClick={() => setAtual(pacote.id, i)}
                                className={`flex w-full items-center gap-4 px-6 py-3 text-left transition-colors hover:bg-white/5 ${ i === atual ? "bg-white/5 border-l-2 border-l-gold" : "" }`}
                              >
                                <span className={`font-display w-10 shrink-0 text-sm font-semibold tracking-widest ${ i === atual ? "text-gold" : "text-muted-foreground/40" }`}>{h.numero}</span>
                                <span className={`flex-1 truncate font-typewriter text-xs tracking-wide uppercase ${ i === atual ? "text-champagne" : "text-muted-foreground" }`}>{h.titulo}</span>
                                {!h.src && <span className="font-typewriter text-[9px] tracking-widest text-muted-foreground/30 uppercase shrink-0">em breve</span>}
                                {i === atual && tocando && packAtivo === pacote.id && <span className="h-2 w-2 shrink-0 rounded-full bg-gold animate-pulse" />}
                              </button>
                            ) : (
                              <article key={h.numero} className="surface-panel overflow-hidden rounded-lg">
                                <div className="flex items-center gap-4 p-4">
                                  <span className="font-display w-10 shrink-0 text-center text-base font-semibold tracking-widest text-gold">{h.numero}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-display text-sm font-semibold tracking-[0.08em] text-champagne uppercase sm:text-base">{h.titulo}</p>
                                    <div className="mt-2">
                                      {h.src ? (
                                        <audio controls src={h.src} className="w-full" preload="none" />
                                      ) : (
                                        <div className="flex h-8 items-center gap-2 rounded border border-dashed border-border bg-background/40 px-3">
                                          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                          <span className="font-typewriter text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">Áudio em breve</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </article>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
