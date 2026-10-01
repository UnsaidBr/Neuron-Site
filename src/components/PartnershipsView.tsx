import React, { useState, useEffect, useMemo } from 'react';
import { Partner } from '../types';
import { PARTNERS_LIST } from '../data/partnersData';
import { getPartners, submitPartnership, ApiError } from '../services/api';
import {
  Handshake,
  Globe2,
  Building2,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const PartnershipsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [partners, setPartners] = useState<Partner[]>(PARTNERS_LIST);
  const [loadingPartners, setLoadingPartners] = useState<boolean>(true);
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    email: '',
    institution: '',
    type: 'Pesquisa & Desenvolvimento (P&D)',
    scope: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadPartners() {
      try {
        const { partners: data } = await getPartners();
        if (isMounted && data && data.length > 0) {
          setPartners(data);
        }
      } catch {
        // Fallback is handled transparently inside getPartners()
      } finally {
        if (isMounted) setLoadingPartners(false);
      }
    }
    loadPartners();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: 'all', label: 'Todos os Parceiros' },
    { id: 'internacional', label: 'Internacionais' },
    { id: 'universidade', label: 'Universidade & Sede' },
    { id: 'fomento', label: 'Fomento' },
    { id: 'setor-produtivo', label: 'Agro & Setor Produtivo' },
    { id: 'saude', label: 'Saúde & Reabilitação' },
  ];

  const filteredPartners = useMemo(() => {
    if (activeCategory === 'all') return partners;
    return partners.filter((p) => p.category === activeCategory);
  }, [activeCategory, partners]);

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      await submitPartnership({
        name: partnerFormData.name.trim(),
        email: partnerFormData.email.trim(),
        institution: partnerFormData.institution.trim(),
        type: partnerFormData.type.trim(),
        scope: partnerFormData.scope.trim(),
      });
      setSubmitted(true);
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.statusCode === 503) {
          setErrorMessage(
            'O serviço de banco de dados está temporariamente em manutenção ou indisponível. Envie sua proposta diretamente para neuron@dcc.ufla.br.'
          );
        } else if (err.statusCode === 429) {
          setErrorMessage(
            'Muitas solicitações foram enviadas recentemente. Aguarde alguns instantes antes de reenviar.'
          );
        } else {
          setErrorMessage(
            err.message || 'Não foi possível registrar a proposta de parceria. Revise os campos preenchidos.'
          );
        }
      } else {
        setErrorMessage(
          'Houve uma instabilidade na conexão com o servidor. Tente novamente mais tarde ou envie e-mail para neuron@dcc.ufla.br.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const cooperationModels = [
    {
      title: 'P&D e Inovação Aberta',
      desc: 'Desenvolvimento conjunto de soluções proprietárias ou abertas com fomento público (FAPESP, CNPq, FAPEMIG) ou investimento privado de empresas.',
      tag: 'Co-desenvolvimento',
    },
    {
      title: 'Extensão Universitária',
      desc: 'Aplicação direta do conhecimento acadêmico da UFLA para resolver problemas reais de cooperativas cafeeiras, museus e unidades de saúde.',
      tag: 'Impacto Social Direto',
    },
    {
      title: 'Cooperação Internacional',
      desc: 'Projetos multilaterais unindo laboratórios globais para publicações científicas de alto fator de impacto e intercâmbio discente.',
      tag: 'Redes Globais',
    },
    {
      title: 'Bancada & Prototipagem Rápida',
      desc: 'Acesso à infraestrutura técnica e competências em hardware, robótica social e visão computacional do DCC/UFLA.',
      tag: 'Hardware & IA',
    },
  ];

  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <ScrollReveal direction="up" duration={0.65} className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[10px] font-mono text-[#10B981] uppercase tracking-widest font-bold">
          <Handshake className="w-3 h-3 text-[#10B981]" />
          <span>REDE DE COOPERAÇÃO // NEURON DCC/UFLA</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
          Parcerias que Impulsionam a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#06B6D4] to-[#7C3AED]">
            Fronteira da Tecnologia
          </span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg font-light max-w-3xl leading-relaxed">
          O NEURON conecta a pesquisa científica rigorosa da Universidade Federal de Lavras com as principais instituições de fomento, universidades internacionais e o setor produtivo.
        </p>
      </ScrollReveal>

      {/* Highlights Bar */}
      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '04+', label: 'Países Conectados', desc: 'Brasil, Coreia, Reino Unido e Canadá' },
            { value: '120k+', label: 'Interações Validadas', desc: 'No Museu Nacional em Seul' },
            { value: '15k+', label: 'Publicações Cafeeiras', desc: 'Indexadas no projeto LLM Café' },
            { value: '100%', label: 'Tecnologia Aplicada', desc: 'Hardware e IA com impacto real' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 space-y-1.5"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                {item.value}
              </div>
              <div className="text-xs font-bold text-[#10B981] uppercase font-mono">
                {item.label}
              </div>
              <div className="text-[11px] text-white/40 leading-tight">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Partners Catalog Section */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest font-bold">
              01. ECOSSISTEMA DE PARCEIROS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Instituições &amp; Organizações Conectadas
            </h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#10B981] text-black font-bold'
                    : 'text-white/60 hover:text-white bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <ScrollReveal
              key={partner.id}
              direction="up"
              duration={0.6}
              className="p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70 font-semibold uppercase">
                    {partner.badge}
                  </span>
                  <span className="text-xs font-mono text-white/50">
                    {partner.country} {partner.city ? `• ${partner.city}` : ''}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {partner.name}
                </h3>

                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {partner.description}
                </p>

                <div className="pt-2 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-[#10B981] uppercase block font-semibold">
                    Papel na Parceria:
                  </span>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {partner.role}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {partner.projectsInvolved.map((p, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#A78BFA] border border-white/5"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors"
                    aria-label={`Visitar site de ${partner.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Cooperation Models */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono text-[#7C3AED] uppercase tracking-widest font-bold">
            02. MODELOS DE ATUAÇÃO
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Como Cooperar com o NEURON
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
            Oferecemos flexibilidade e suporte jurídico através dos convênios e fundações de apoio da Universidade Federal de Lavras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cooperationModels.map((model, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 space-y-3 flex flex-col justify-between hover:border-[#10B981]/40 transition-all"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest font-bold">
                  {model.tag}
                </span>
                <h3 className="text-base font-bold text-white">{model.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  {model.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Proposal Submission Form */}
      <div className="rounded-3xl bg-gradient-to-r from-[#10B981]/15 via-[#0D0D0D] to-[#7C3AED]/15 border border-white/10 p-8 sm:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest font-bold">
              03. CANAL DIRETO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Proponha uma Parceria com o NEURON
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
              Sua empresa, universidade ou cooperativa tem um desafio de pesquisa ou extensão? Envie uma proposta preliminar para a equipe de coordenação do DCC/UFLA.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-black/60 border border-[#10B981]/40 text-center space-y-4 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto" />
              <h3 className="text-xl font-bold text-white">Proposta Enviada com Sucesso!</h3>
              <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                Agradecemos pelo interesse em colaborar com o NEURON. A coordenação docente do DCC/UFLA avaliará o escopo e entrará em contato via e-mail.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setErrorMessage(null);
                  setPartnerFormData({
                    name: '',
                    email: '',
                    institution: '',
                    type: 'Pesquisa & Desenvolvimento (P&D)',
                    scope: '',
                  });
                }}
                className="px-5 py-2 rounded-xl bg-white/10 text-white text-xs font-mono hover:bg-white/20 transition-all cursor-pointer"
              >
                Enviar Outra Proposta
              </button>
            </div>
          ) : (
            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-left animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-200/90 leading-relaxed">
                    <strong className="font-semibold text-rose-300 block mb-0.5">
                      Não foi possível registrar a proposta:
                    </strong>
                    {errorMessage}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 block">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                    placeholder="Ex: Dra. Juliana Mendes"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#10B981]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 block">E-mail Profissional / Institucional *</label>
                  <input
                    type="email"
                    required
                    value={partnerFormData.email}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, email: e.target.value })}
                    placeholder="Ex: juliana@empresa.com.br"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 block">Instituição, Empresa ou Cooperativa *</label>
                  <input
                    type="text"
                    required
                    value={partnerFormData.institution}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, institution: e.target.value })}
                    placeholder="Ex: Cooperativa Regional / Universidade"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#10B981]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 block">Modalidade de Interesse</label>
                  <select
                    value={partnerFormData.type}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#10B981]"
                  >
                    <option value="Pesquisa & Desenvolvimento (P&D)">Pesquisa &amp; Desenvolvimento (P&amp;D)</option>
                    <option value="Extensão Universitária">Extensão Universitária</option>
                    <option value="Cooperação Científica Internacional">Cooperação Científica Internacional</option>
                    <option value="Validação de Campo / Piloto">Validação de Campo / Piloto</option>
                    <option value="Outro Modelo">Outro Modelo</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 block">Descrição Resumida da Proposta / Desafio *</label>
                <textarea
                  required
                  rows={4}
                  value={partnerFormData.scope}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, scope: e.target.value })}
                  placeholder="Compartilhe os objetivos centrais, prazos desejados ou escopo do projeto..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/40">
                  Canal institucional: neuron@dcc.ufla.br
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105"
                >
                  <span>{loading ? 'Transmitindo...' : 'Enviar Proposta de Parceria'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
