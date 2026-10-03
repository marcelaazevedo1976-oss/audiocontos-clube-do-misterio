import React, { useState } from 'react';
import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';


const VIP_CODE = "CLUBE2026";

export default function AuthModal({ onClose, onSuccess, user }) {
  const [mode, setMode] = useState(user ? 'unlock' : 'login'); // 'login', 'register', 'unlock'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vipCode, setVipCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const grantAccess = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { jogos_do_detetive: true }, { merge: true });
      onSuccess();
    } catch (err) {
      console.error(err);
      setError('Erro ao liberar acesso no banco de dados. Tente novamente.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (vipCode.trim().toUpperCase() !== VIP_CODE) {
      setError('Código VIP inválido. Verifique o código na Kiwify.');
       
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword, sendPasswordResetEmail(auth, email, password);
      await grantAccess(userCredential.user.uid);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError('Este e-mail já está em uso. Faça login.');
      else if (err.code === 'auth/weak-password') setError('A senha deve ter pelo menos 6 caracteres.');
      else setError('Erro ao criar conta: ' + err.message);
       
    }
    setLoading(false);
  };

  
  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Digite seu e-mail acima para redefinir a senha.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError('E-mail de redefinição enviado! Verifique sua caixa de entrada.');
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar e-mail. Verifique se o e-mail está correto.');
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Checar se já tem acesso
      const userRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().jogos_do_detetive === true) {
        onSuccess();
      } else {
        // Logou, mas não tem o acesso ainda. Vai para a tela de destrancar.
        setMode('unlock');
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('E-mail ou senha incorretos.');
      } else {
        setError('Erro ao fazer login: ' + err.message);
      }
       
    }
    setLoading(false);
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError('');
    
    if (vipCode.trim().toUpperCase() !== VIP_CODE) {
      setError('Código VIP inválido. Verifique o código na Kiwify.');
       
      return;
    }

    setLoading(true);
    try {
      await grantAccess(user.uid);
    } catch (err) {
      setError('Erro ao validar código. Tente novamente.');
       
    }
    setLoading(false);
  };

  const modalStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 10000, padding: '20px'
  };

  const boxStyle = {
    background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
    border: '2px solid #d4af37', borderRadius: '12px',
    padding: '30px', width: '100%', maxWidth: '400px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.8)', color: '#f8fafc',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%', padding: '12px', marginBottom: '15px',
    backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #475569',
    borderRadius: '6px', color: '#fff', fontSize: '1rem', boxSizing: 'border-box'
  };

  const btnStyle = {
    width: '100%', padding: '14px',
    background: 'linear-gradient(135deg, #d4af37 0%, #f1c40f 100%)',
    border: 'none', borderRadius: '8px', color: '#000',
    fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
    marginTop: '10px', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
  };

  return (
    <div style={modalStyle}>
      <div style={boxStyle}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '3rem' }}>{mode === 'unlock' ? '🗝️' : '🕵️‍♂️'}</span>
          <h2 style={{ color: '#d4af37', margin: '10px 0 5px 0' }}>
            {mode === 'login' ? 'Acesso Restrito' : mode === 'register' ? 'Criar Conta VIP' : mode === 'reset' ? 'Recuperar Senha' : 'Desbloquear Jogos'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            {mode === 'login' && 'Faça login para continuar sua investigação.'}
            {mode === 'reset' && 'Insira seu e-mail para receber um link de redefinição de senha.'}
            {mode === 'register' && 'Crie sua conta e use o código de liberação.'}
            {mode === 'unlock' && 'Você já está logado! Digite o Código VIP para liberar.'}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        
        {mode === 'reset' && (
          <form onSubmit={handleReset}>
            <input 
              type="email" placeholder="Seu E-mail para redefinir" required 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              style={inputStyle} 
            />
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? 'Enviando...' : 'Enviar Link de Redefinição'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Lembrou a senha? </span>
              <button 
                type="button" onClick={() => { setError(''); setMode('login'); }}
                style={{ background: 'none', border: 'none', color: '#d4af37', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Voltar
              </button>
            </div>
          </form>
        )}

        {(mode === 'login' || mode === 'register') && (
          <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
            <input 
              type="email" placeholder="Seu E-mail" required 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              style={inputStyle} 
            />
            <input 
              type="password" placeholder="Sua Senha" required minLength={6}
              value={password} onChange={(e) => setPassword(e.target.value)} 
              style={inputStyle} 
            />
            {mode === 'register' && (
              <input 
                type="text" placeholder="Código VIP (Kiwify)" required 
                value={vipCode} onChange={(e) => setVipCode(e.target.value)} 
                style={{...inputStyle, border: '1px dashed #d4af37', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', fontWeight: 'bold', color: '#f1c40f'}} 
              />
            )}
            <button type="submit" disabled={loading} style={{...btnStyle, opacity: loading ? 0.7 : 1}}>
              {loading ? 'Aguarde...' : (mode === 'login' ? 'Entrar' : 'Criar Conta e Liberar')}
            </button>
          </form>
        )}

        {mode === 'unlock' && (
          <form onSubmit={handleUnlock}>
            <input 
              type="text" placeholder="Código VIP (Kiwify)" required 
              value={vipCode} onChange={(e) => setVipCode(e.target.value)} 
              style={{...inputStyle, border: '1px dashed #d4af37', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', fontWeight: 'bold', color: '#f1c40f'}} 
            />
            <button type="submit" disabled={loading} style={{...btnStyle, opacity: loading ? 0.7 : 1}}>
              {loading ? 'Aguarde...' : 'Desbloquear Jogos Agora'}
            </button>
          </form>
        )}

        {mode === 'login' && (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#cbd5e1' }}>
            Comprou agora? <button onClick={() => {setMode('register'); setError('');}} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Criar Conta</button>
          </p>
        )}
        
        {mode === 'register' && (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#cbd5e1' }}>
            Já tem conta no Clube? <button onClick={() => {setMode('login'); setError('');}} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Faça Login</button>
          </p>
        )}

      </div>
    </div>
  );
}
