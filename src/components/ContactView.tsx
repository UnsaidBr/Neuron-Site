import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Instagram,
  Github,
  Sparkles,
  Navigation,
  Compass,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { NeuronBee } from './NeuronBee';

export const ContactView: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const officialEmail = 'neuron@dcc.ufla.br';
  const fullAddress =
    'Departamento de Ciência da Computação (DCC), Universidade Federal de Lavras (UFLA), Câmpus Universitário, Trevo Rotatório Prof. Edmir Sá Santos, Caixa Postal 3037, Lavras - MG, CEP 37200-900';

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <div className="pt-8 pb-20 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header with Title and Recruitment Notice */}
        <ScrollReveal direction="up" duration={0.6} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>COMUNICAÇÃO &amp; EXTENSÃO // DCC • UFLA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
            Como nos <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] via-[#F59E0B] to-[#DB2777]">Contatar</span>
          </h1>

          <p className="text-base sm:text-lg text-white/50 leading-relaxed font-light">
            Tem uma proposta de parceria, convite para evento ou deseja saber mais sobre nossas tecnologias aplicadas? Estamos à disposição.
          </p>

          {/* Official Notice: Selection Processes Closed This Year */}
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-left flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              <strong className="font-semibold text-amber-300 block mb-0.5">
                Aviso importante sobre Processos Seletivos:
              </strong>
              Não estamos realizando processos seletivos ou admissões de trainees neste ano. Nosso canal de atendimento está atualmente voltado para parcerias institucionais, convênios de extensão, cooperação técnica e dúvidas sobre projetos.
            </div>
          </div>
        </ScrollReveal>

        {/* Direct Channels Cards Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: E-mail Institucional */}
          <StaggerItem className="h-full">
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-col justify-between hover:border-[#7C3AED]/40 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center text-[#A78BFA]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-semibold block">
                    Correio Eletrônico
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">E-mail Institucional</h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Canal formal para propostas de extensão, cooperação científica e solicitações acadêmicas.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono text-xs text-white/90 break-all select-all">
                  {officialEmail}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyEmail(officialEmail)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copiedEmail === officialEmail ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span>Copiar E-mail</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${officialEmail}?subject=Contato%20via%20Portal%20NEURON`}
                  className="py-2.5 px-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Escrever</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Localização Física */}
          <StaggerItem className="h-full">
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-col justify-between hover:border-[#F59E0B]/40 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-semibold block">
                    Sede Física
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">Laboratório na UFLA</h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Departamento de Ciência da Computação (DCC), Câmpus Universitário da UFLA.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-white/80 space-y-1">
                  <p className="font-semibold text-white">Universidade Federal de Lavras</p>
                  <p className="text-white/60 text-[11px]">Caixa Postal 3037 • Lavras - MG</p>
                  <p className="text-white/60 text-[11px]">CEP 37200-900 • Brasil</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => document.getElementById('mapa-ufla')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Ver no Mapa</span>
                </button>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=DCC+Departamento+de+Ciencia+da+Computacao+UFLA+Lavras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] font-medium text-xs border border-[#F59E0B]/30 flex items-center justify-center gap-1 transition-all cursor-pointer"
                  title="Abrir no Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: Redes & Canais Abertos */}
          <StaggerItem className="h-full">
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-col justify-between hover:border-[#DB2777]/40 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#DB2777]/10 border border-[#DB2777]/30 flex items-center justify-center text-[#DB2777]">
                  <NeuronBee variant="micro" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#DB2777] uppercase tracking-widest font-semibold block">
                    Comunidade &amp; Mídia
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">Redes &amp; Conexões</h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Acompanhe em tempo real os bastidores dos protótipos de extensão e novidades da Colmeia.
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href="https://instagram.com/neuron.ufla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-xs text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span>@neuron.ufla</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-white/40" />
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-xs text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-purple-400" />
                      <span>Código Aberto // NEURON</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-white/40" />
                  </a>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-white/40 flex items-center justify-between font-mono">
                <span>Atendimento:</span>
                <span>Seg - Sex // 08h - 18h</span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Interactive Google Maps Location Section */}
        <ScrollReveal direction="up" duration={0.65} className="space-y-6 scroll-mt-24" id="mapa-ufla">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>LOCALIZAÇÃO NO CÂMPUS // DCC • UFLA</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Encontre o NEURON na UFLA
              </h2>
              <p className="text-xs sm:text-sm text-white/50 mt-1 font-light">
                Departamento de Ciência da Computação (DCC), Câmpus Universitário • Lavras, Minas Gerais
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=DCC+Departamento+de+Ciencia+da+Computacao+UFLA+Lavras"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Abrir no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/50" />
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=DCC+Departamento+de+Ciencia+da+Computacao+UFLA+Lavras"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Traçar Rota</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map Frame (8 cols on desktop) */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-[#0D0D0D] border border-white/10 shadow-2xl relative flex flex-col">
              {/* Map status header */}
              <div className="px-4 py-2.5 bg-black/70 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 font-medium">Google Maps • Câmpus Histórico e Principal da UFLA</span>
                </div>
                <span className="hidden sm:inline text-white/40">
                  DCC/UFLA (Lavras - MG)
                </span>
              </div>

              {/* Iframe embed */}
              <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] bg-[#111]">
                <iframe
                  title="Localização do Departamento de Ciência da Computação - UFLA no Google Maps"
                  src="https://maps.google.com/maps?q=DCC+-+Departamento+de+Ci%C3%AAncia+da+Computa%C3%A7%C3%A3o+-+UFLA,+Lavras+-+MG&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-[1.04] brightness-[0.93]"
                />
              </div>

              {/* Bottom Quick Bar */}
              <div className="px-4 py-2.5 bg-black/50 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60 font-mono">
                <span>// Ponto de Referência: DCC / Próximo ao Pavilhão de Aulas 6 (PV6)</span>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=DCC+Departamento+de+Ciencia+da+Computacao+UFLA+Lavras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A78BFA] hover:text-white transition-colors flex items-center gap-1 font-sans font-semibold text-xs"
                >
                  <span>Navegação via GPS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Info & Access Details (4 cols on desktop) */}
            <div className="lg:col-span-4 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#F59E0B]">
                  <Compass className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                    GUIA DE ACESSO AO LABORATÓRIO
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">Endereço Completo</h3>
                  <div className="mt-2 p-3.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white/80 space-y-1">
                    <p className="font-semibold text-white">Departamento de Ciência da Computação</p>
                    <p className="text-white/60">Universidade Federal de Lavras (UFLA)</p>
                    <p className="text-white/60">Trevo Rotatório Prof. Edmir Sá Santos, s/n</p>
                    <p className="text-white/60">Câmpus Universitário • Caixa Postal 3037</p>
                    <p className="text-white/60 font-mono">Lavras - MG • CEP 37200-900</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono uppercase text-white/70 font-semibold">
                    Pontos de Referência
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    O complexo do DCC está situado no setor leste do câmpus principal, ao lado do Pavilhão de Aulas 6 (PV6) e a poucos metros do Centro de Convivência da UFLA.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono uppercase text-white/70 font-semibold">
                    Transporte &amp; Estacionamento
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    Linhas de ônibus circulares gratuitas da universidade com parada em frente ao DCC. Estacionamento gratuito para veículos de visitantes e parceiros.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Endereço Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span>Copiar Endereço Completo</span>
                    </>
                  )}
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=DCC+Departamento+de+Ciencia+da+Computacao+UFLA+Lavras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Traçar Rota no Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* DCC / UFLA Institutional Card */}
        <ScrollReveal direction="up" duration={0.65}>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center shrink-0">
                <NeuronBee variant="micro" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Extensão Universitária • DCC</h4>
                <p className="text-xs font-mono text-[#A78BFA]">
                  Universidade Federal de Lavras (UFLA)
                </p>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-light max-w-xl">
              O NEURON atua em conformidade com as diretrizes de extensão do MEC, integrando ensino, pesquisa e extensão universitária através de projetos abertos de alto impacto socioeconômico.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
