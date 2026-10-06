import React, { useState } from 'react';
import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { audio } from './AudioService';

export default function AuthModal({ onClose, onSuccess, user, grantField }) {
  const [mode, setMode] = useState(!user ? 'login' : 'no_access'); 
  // modes: 'login', 'forgot', 'no_access'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkAccessAndSuccess = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data()[grantField] === true) {
        onSuccess();
      } else {
        setMode('no_access');
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao verificar acesso no banco de dados.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await checkAccessAndSuccess(userCredential.user.uid);
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Email ou senha incorretos.'); if (audio.playError) audio.playError();
      } else {
        setError('Erro ao fazer login: ' + err.message); if (audio.playError) audio.playError();
      }
    }
    setLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('Digite seu email primeiro.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Um link de redefinição foi enviado para o seu email.');
      setMode('login');
      if (audio.playSuccess) audio.playSuccess();
    } catch (err) {
      setError('Erro ao redefinir senha: ' + err.message); if (audio.playError) audio.playError();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMode('login');
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans text-champagne">
      <div className="relative w-full max-w-md rounded-2xl border border-gold-soft bg-slate-950 p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] animate-in fade-in zoom-in duration-300">
        
        {/* Decorative elements */}
        <div className="absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gold-soft hover:text-gold transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="font-display text-2xl tracking-wider text-gold uppercase mb-2">
            {mode === 'no_access' ? 'Acesso Restrito' : 'Identificação'}
          </h2>
          <div className="h-px w-16 bg-gold mx-auto mb-4" />
        </div>

        {error && (
          <div className="mb-6 rounded border border-red-500/50 bg-red-500/10 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded border border-gold/50 bg-gold/10 p-3 text-center text-sm text-gold">
            {message}
          </div>
        )}

        {mode === 'no_access' && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <svg className="h-16 w-16 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-sm text-gold-soft">
              Você está logado como <strong className="text-gold">{user?.email}</strong>, mas ainda não possui acesso a este conteúdo.
            </p>
            <p className="text-xs text-gold-soft/70">
              Caso já tenha adquirido, a liberação pode levar alguns instantes. Se não, adquira na nossa loja para liberar.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleLogout}
                className="w-full rounded border border-gold-soft/30 bg-transparent py-3 text-sm font-bold tracking-widest text-gold-soft uppercase hover:bg-gold/5 transition-all"
              >
                Sair desta conta
              </button>
              <a
                href="https://pay.kiwify.com.br/0MLVbfD" target="_blank" rel="noopener noreferrer"
                className="w-full rounded bg-gold/10 border border-gold/50 py-3 text-sm font-bold tracking-widest text-gold uppercase hover:bg-gold/20 transition-all block text-center mt-2"
              >
                🔓 Adquirir Acesso (R$ 19,90)
              </a>
              <a
                href="https://portal-clube-do-misterio.lovable.app/pacotes" target="_blank" rel="noopener noreferrer"
                className="w-full mt-2 rounded border border-gold/30 bg-transparent py-3 text-sm font-bold tracking-widest text-gold-soft uppercase hover:bg-gold/5 transition-all block text-center"
              >
                Ver Combos Promocionais
              </a>
            </div>
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-wider text-gold-soft uppercase mb-2">
                Email
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-gold-soft/30 bg-black/50 px-4 py-3 text-champagne placeholder-gold-soft/30 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                placeholder="detetive@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-gold-soft uppercase mb-2">
                Senha
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gold-soft/30 bg-black/50 px-4 py-3 pr-20 text-champagne placeholder-gold-soft/30 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gold-soft hover:text-gold uppercase tracking-wider"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setMode('forgot')}
                className="text-xs text-gold-soft hover:text-gold transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-6 w-full relative group overflow-hidden rounded bg-gold px-4 py-3 text-sm font-bold tracking-widest text-black uppercase transition-all hover:bg-gold-soft disabled:opacity-50"
            >
              <span className="relative z-10">{loading ? 'Acessando...' : 'Entrar'}</span>
              <div className="absolute inset-0 -translate-x-full bg-white/20 group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
            <div className="text-center mt-6">
              <p className="text-xs text-gold-soft mb-3">Não tem uma conta?</p>
              <a
                href="https://pay.kiwify.com.br/0MLVbfD" target="_blank" rel="noopener noreferrer"
                className="w-full rounded border border-gold/50 bg-transparent py-3 text-sm font-bold tracking-widest text-gold uppercase hover:bg-gold/10 transition-all block text-center"
              >
                Adquirir Acesso (R$ 19,90)
              </a>
              <a
                href="https://portal-clube-do-misterio.lovable.app/pacotes" target="_blank" rel="noopener noreferrer"
                className="w-full mt-2 rounded border border-gold/30 bg-transparent py-3 text-sm font-bold tracking-widest text-gold-soft uppercase hover:bg-gold/5 transition-all block text-center"
              >
                Ver Combos Promocionais
              </a>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleReset} className="space-y-5">
            <p className="text-sm text-center text-gold-soft mb-6">
              Digite seu email para receber um link de redefinição de senha.
            </p>
            <div>
              <label className="block text-xs font-bold tracking-wider text-gold-soft uppercase mb-2">
                Email
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-gold-soft/30 bg-black/50 px-4 py-3 text-champagne placeholder-gold-soft/30 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                placeholder="detetive@email.com"
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="mt-6 w-full relative group overflow-hidden rounded bg-gold px-4 py-3 text-sm font-bold tracking-widest text-black uppercase transition-all hover:bg-gold-soft disabled:opacity-50"
            >
              <span className="relative z-10">{loading ? 'Enviando...' : 'Enviar link'}</span>
              <div className="absolute inset-0 -translate-x-full bg-white/20 group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>

            <button 
              type="button" 
              onClick={() => { setMode('login'); setError(''); setMessage(''); }}
              className="w-full mt-4 text-xs text-gold-soft hover:text-gold transition-colors uppercase tracking-widest"
            >
              Voltar ao login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
