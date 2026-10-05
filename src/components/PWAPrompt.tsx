import { useState, useEffect } from "react";
import { Download, Share, X, MoreVertical } from "lucide-react";

export function PWAPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }

    // Check if already installed
    const isStandAloneMatch = window.matchMedia("(display-mode: standalone)").matches;
    const isNavigatorStandalone = (navigator as any).standalone === true;
    if (isStandAloneMatch || isNavigatorStandalone) {
      setIsStandalone(true);
      return;
    }

    // Has user dismissed before?
        // Has user dismissed before?
    const hasDismissed = sessionStorage.getItem("audiocontos_pwa_dismissed");
    const hasHidden = localStorage.getItem("audiocontos_pwa_hidden");
    
    // Check iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Se não estiver no modo Standalone e não foi descartado nesta sessão, mostraremos o aviso.
    if (!hasDismissed && !hasHidden) {
      setShowPrompt(true);
    }
    setIsReady(true);

    // Handle Android install prompt (só dispara em HTTPS ou localhost real)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  if (!isReady || isStandalone || !showPrompt) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

    const handleDismiss = () => {
    const hidePermanently = window.confirm("Deseja ocultar este aviso de instalação permanentemente?\n\nOK: Nunca mais mostrar.\nCancelar: Ocultar apenas por agora.");
    if (hidePermanently) {
      localStorage.setItem("audiocontos_pwa_hidden", "true");
    } else {
      sessionStorage.setItem("audiocontos_pwa_dismissed", "true");
    }
    setShowPrompt(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-lg border border-primary/30 bg-black/95 p-4 shadow-2xl backdrop-blur-md">
      <button 
        onClick={handleDismiss}
        className="absolute right-2 top-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        aria-label="Fechar"
      >
        <X size={18} />
      </button>
      
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-background overflow-hidden">
          <img src="/favicon.png" alt="Icon" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-base font-semibold text-primary">ÁudioContos</h3>
          {isIOS ? (
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed pr-4">
              Instale o aplicativo: toque em <Share size={12} className="inline mx-0.5" /> e depois em <strong>Adicionar à Tela de Início</strong>.
            </p>
          ) : deferredPrompt ? (
            <div className="mt-2 flex flex-col gap-2 pr-4">
              <p className="text-xs text-muted-foreground">Instale o aplicativo para uma experiência imersiva.</p>
              <button 
                onClick={handleInstallClick}
                className="btn-brass inline-flex items-center justify-center rounded-sm px-3 py-2 text-xs font-medium uppercase tracking-widest cursor-pointer shadow-md"
              >
                <Download size={14} className="mr-2" />
                Instalar App
              </button>
            </div>
          ) : (
            <div className="mt-1 text-xs text-muted-foreground leading-relaxed pr-4">
              <p>Para jogar como aplicativo:</p>
              <p className="mt-1">Acesse o menu do navegador <MoreVertical size={12} className="inline mx-0.5" /> e escolha <strong>Adicionar à tela inicial</strong>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
