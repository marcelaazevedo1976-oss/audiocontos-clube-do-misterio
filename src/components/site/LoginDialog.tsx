import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Interface de acesso. Ainda sem autenticação real —
 * preparada para conexão futura ao sistema de login.
 */
export function LoginDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="surface-panel max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-wide text-champagne">
            Acessar com Senha
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Entre com o e-mail utilizado na compra e a senha que você criou.
          </DialogDescription>
        </DialogHeader>

        <form
          className="mt-2 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold tracking-wide">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              className="min-h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senha" className="block text-sm font-semibold tracking-wide">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="min-h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <button
            type="submit"
            className="min-h-12 w-full rounded-md border border-gold bg-primary px-4 py-3 text-base font-bold tracking-[0.12em] text-primary-foreground uppercase"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-muted-foreground">
            O sistema de acesso será ativado em breve.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
