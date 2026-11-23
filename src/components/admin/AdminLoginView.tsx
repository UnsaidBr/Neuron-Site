import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, LogIn, Mail, AlertCircle, ShieldCheck } from 'lucide-react';
import { NeuronLogo } from '../NeuronLogo';
import { AdminUserProfile } from '../../types';
import { adminLogin, getAdminMe } from '../../services/adminApi';
import { ApiError } from '../../services/api';

interface AdminLoginViewProps {
  onLoginSuccess: (admin: AdminUserProfile) => void;
  onBackToSite: () => void;
  sessionMessage?: string | null;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onBackToSite,
  sessionMessage,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(sessionMessage || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage('Informe seu e-mail e sua senha de administrador.');
      return;
    }

    setIsSubmitting(true);
    try {
      const profile = await adminLogin(trimmedEmail, password);
      try {
        const verifiedProfile = await getAdminMe();
        setPassword('');
        onLoginSuccess(verifiedProfile || profile);
      } catch {
        setErrorMessage(
          'O navegador bloqueou o cookie de sessão neste ambiente incorporado. Permita cookies para este site ou abra o endereço do app em uma nova aba.'
        );
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Não foi possível autenticar. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070510] bg-gradient-to-b from-[#090514] via-[#0b081e] to-[#06040e] text-[#F3F4F6] flex flex-col relative overflow-hidden">
      {/* Ambient background matching NEURON identity */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#7C3AED]/20 blur-[130px]" />
        <div className="absolute bottom-[-120px] -right-32 w-[520px] h-[520px] rounded-full bg-[#DB2777]/15 blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#F59E0B]/8 blur-[140px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
      </div>

      {/* Top Navigation Return */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-white/75 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
        >
          <ArrowLeft className="w-4 h-4 text-[#A78BFA]" />
          <span>Voltar ao site</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-white/50">
          <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
          <span className="hidden sm:inline">Acesso Restrito · Coordenação NEURON</span>
        </div>
      </header>

      {/* Main Centered Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D0B18]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col items-start gap-4 mb-6">
            <NeuronLogo variant="navbar" />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Painel Administrativo
              </h1>
              <p className="text-sm text-white/60 mt-1">
                Entre com sua conta de coordenação para gerenciar mensagens, parcerias e inscrições.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-[#DB2777]/40 bg-[#DB2777]/10 px-4 py-3 text-sm text-pink-200"
            >
              <AlertCircle className="w-4 h-4 text-[#DB2777] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-medium text-white/80 mb-2"
              >
                E-mail institucional
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="coordenacao@neuron.ufla.br"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-colors disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-medium text-white/80 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-colors disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-white/45 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-md"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#F59E0B]" />
                  <span>Entrar no Painel</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
            <span>Sessão via cookie HttpOnly</span>
            <span className="text-[#A78BFA]">Proteção CSRF ativa</span>
          </div>
        </div>
      </main>
    </div>
  );
};
