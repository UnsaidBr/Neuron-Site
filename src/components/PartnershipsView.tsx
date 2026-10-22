import React, { useState, useEffect, useMemo } from 'react';
import { Partner } from '../types';
import { PARTNERS_LIST } from '../data/partnersData';
import { getPartners } from '../services/api';
import {
  Handshake,
  Globe2,
  Building2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  HeartHandshake,
  Mail,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const PartnershipsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [partners, setPartners] = useState<Partner[]>(PARTNERS_LIST);
  const [loadingPartners, setLoadingPartners] = useState<boolean>(true);

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
          <span>REDE INSTITUCIONAL &amp; COOPERAÇÃO // DCC • UFLA</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
          Parcerias &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#7C3AED]">
            Ecossistema Global
          </span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg font-light max-w-3xl leading-relaxed">
          O NEURON conecta a excelência acadêmica da Universidade Federal de Lavras a centros de pesquisa de prestígio mundial, agências de fomento e setores estratégicos da sociedade civil e produtiva.
        </p>
      </ScrollReveal>

      {/* Network Metrics Bar */}
      <ScrollReveal direction="up" delay={0.1} duration={0.65}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Países Conectados</span>
            <div className="text-2xl sm:text-3xl font-bold text-white">04 Continentes</div>
            <p className="text-[11px] text-white/50">Brasil, Coreia do Sul, Canadá, Escócia</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Instituições Parceiras</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#10B981]">{partners.length}+ Ativas</div>
            <p className="text-[11px] text-white/50">Universidades, Museus e Cooperativas</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Modelo de Extensão</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#F59E0B]">100% Aberto</div>
            <p className="text-[11px] text-white/50">Diretrizes MEC &amp; Impacto Social</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Sede Operacional</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#7C3AED]">DCC / UFLA</div>
            <p className="text-[11px] text-white/50">Lavras, Minas Gerais, Brasil</p>
          </div>
        </div>
      </ScrollReveal>

      {/* SECTION 1: Category Filter & Partners Directory */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest font-bold">
              01. DIRETÓRIO DE COOPERAÇÃO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Instituições &amp; Agências Colaboradoras
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#10B981] text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <StaggerItem key={partner.id}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 hover:border-[#10B981]/40 transition-all flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#10B981] font-bold">
                      {partner.badge}
                    </span>
                    <span className="text-[11px] font-mono text-white/40 flex items-center gap-1">
                      <Globe2 className="w-3 h-3 text-white/40" />
                      {partner.country}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed font-light">
                      {partner.role}
                    </p>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed font-light pt-2 border-t border-white/5">
                    {partner.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                      Iniciativas Vinculadas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(partner.projectsInvolved || (partner as any).projects || []).map((proj: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/70"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#10B981] hover:underline pt-1"
                    >
                      <span>Portal Oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* SECTION 2: Models of Cooperation */}
      <div className="space-y-8">
        <div className="border-b border-white/5 pb-4">
          <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold">
            02. MODELOS DE COOPERAÇÃO
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Como Cooperar com a Colmeia
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-1 font-light">
            Estruturas ágeis de relacionamento universidade-sociedade orientadas a resultados mensuráveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cooperationModels.map((model, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#F59E0B]/40 transition-all"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#F59E0B] font-bold uppercase tracking-wider block">
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

      {/* Institutional Contact Bar */}
      <ScrollReveal direction="up" duration={0.65}>
        <div className="rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Cooperação &amp; Convênios Institucionais</h3>
            <p className="text-xs text-white/50 font-light max-w-xl leading-relaxed">
              Para propostas formais de cooperação técnico-científica, acordos de extensão e projetos conjuntos, entre em contato direto com a coordenação docente no DCC/UFLA.
            </p>
          </div>
          <a
            href="mailto:neuron@dcc.ufla.br?subject=Proposta%20de%20Parceria%20-%20NEURON"
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 hover:border-[#10B981]/50 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#10B981]" />
            <span>neuron@dcc.ufla.br</span>
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
};
