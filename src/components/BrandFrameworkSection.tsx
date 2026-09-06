import React, { useState } from 'react';
import { BRAND_POST_PATTERNS, BRAND_COLORS } from '../data/brandData';
import { Palette, Layers, Check, Copy, Shield, Sparkles } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { NeuronLogo } from './NeuronLogo';
import { NeuronBee } from './NeuronBee';
import { OptimizedImage } from './OptimizedImage';

export const BrandFrameworkSection: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section className="py-20 bg-transparent border-t border-white/5 relative" id="brand-framework">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <ScrollReveal direction="up" duration={0.6} className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/5 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#F59E0B] font-mono text-[10px] font-bold tracking-[0.25em] uppercase">
              <Palette className="w-4 h-4 text-[#DB2777]" />
              <span>// DESIGN SYSTEM &amp; COMUNICAÇÃO NEURON</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 tracking-tight">
              Dashboard de Padrões &amp; Identidade Visual
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-1 font-light">
              Diretrizes oficiais inspiradas no framework visual do NEURON (UFLA). Padrões consistentes para todas as mídias.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#7C3AED]" title="#7C3AED" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#DB2777]" title="#DB2777" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" title="#F59E0B" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#3B82F6]" title="#3B82F6" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]" title="#10B981" />
          </div>
        </ScrollReveal>

        {/* Official Brand Identity Showcase: Logo & Bee Mascot */}
        <ScrollReveal direction="up" delay={0.05} duration={0.6} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Official Logo (Frame 12 2) */}
          <div className="lg:col-span-6 bg-[#111]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#7C3AED]" />
                  <span>LOGOTIPO OFICIAL DA MARCA</span>
                </span>
                <span className="text-[10px] font-mono text-white/40 uppercase">Frame 12 2 Spec</span>
              </div>

              {/* Live Render of Official Frame 12 2 Logo */}
              <div className="p-8 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center my-4 group-hover:border-[#7C3AED]/30 transition-colors">
                <NeuronLogo variant="full" />
              </div>

              <div className="space-y-2.5 mt-6 text-xs text-white/60 font-light leading-relaxed">
                <p>
                  <strong className="text-white font-medium">Emblema Hexagonal 3D:</strong> Estrutura em anel facetado com degradê contínuo partindo de âmbar dourado (<span className="text-[#F59E0B] font-mono font-normal">#F59E0B</span>) até violeta e magenta reais (<span className="text-[#7C3AED] font-mono font-normal">#7C3AED</span> / <span className="text-[#DB2777] font-mono font-normal">#DB2777</span>), simbolizando conectividade neural e precisão matemática.
                </p>
                <p>
                  <strong className="text-white font-medium">Wordmark NEURON:</strong> Tipografia geométrica pura, caixa alta com traços limpos e alto contraste para máxima legibilidade sobre fundos escuros do ecossistema Immersive UI.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>Proporção: 1:1 Ícone + Caixa Alta</span>
              <span className="text-emerald-400">Padrão Primário Ativo</span>
            </div>
          </div>

          {/* Card 2: Official Bee Mascot (A Colmeia NEURON) */}
          <div className="lg:col-span-6 bg-[#111]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>MASCOTE OFICIAL: A ABELHA NEURON</span>
                </span>
                <span className="text-[10px] font-mono text-[#F59E0B] uppercase">Símbolo do Enxame</span>
              </div>

              {/* Live Render of Official Bee Mascot (SVG Vector & Optimized WebP) */}
              <div className="p-6 rounded-xl bg-black/60 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 group-hover:border-[#F59E0B]/30 transition-colors">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5 border border-white/5 text-center">
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-[#F59E0B]/15 blur-xl rounded-full" />
                    <NeuronBee size={90} animate={true} />
                  </div>
                  <span className="text-xs font-bold text-white block">Ícone Vetorial SVG</span>
                  <span className="text-[10px] text-[#F59E0B] font-mono block mt-0.5">Interface &amp; Micro-badges</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5 border border-white/5 text-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 mb-2 relative">
                    <OptimizedImage
                      src="/src/assets/images/neuron_bee_mascot.webp"
                      alt="Mascote 3D da Abelha NEURON em WebP"
                      width={200}
                      height={200}
                      aspectRatio="1/1"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs font-bold text-white block">Asset 3D Render WebP</span>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">srcset Responsivo • -83% Peso</span>
                </div>
              </div>

              <div className="space-y-2.5 mt-6 text-xs text-white/60 font-light leading-relaxed">
                <p>
                  <strong className="text-white font-medium">Inspiração Bioinspirada:</strong> Na Inteligência Artificial, algoritmos de colônia de abelhas (Bee Colony Optimization - BCO) e robótica de enxame (Swarm Robotics) resolvem problemas computacionais intratáveis através de comunicação descentralizada.
                </p>
                <p>
                  <strong className="text-white font-medium">Cultura &amp; Comunidade:</strong> O laboratório carinhosamente reconhece seus pesquisadores e trainees como membros da "Colmeia", reforçando o companheirismo, a disciplina científica e o orgulho de pertencer à UFLA.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>Aplicações: Trainee, Stickers, Merch &amp; Dev</span>
              <span className="text-[#F59E0B]">Identidade Única da Marca</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 10 Post Pattern Frames Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50">
            <Layers className="w-4 h-4 text-[#F59E0B]" />
            <span>Padrões de Comunicação &amp; Mídia (01 ao 10)</span>
          </div>

          <StaggerContainer staggerDelay={0.04} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BRAND_POST_PATTERNS.map((item) => (
              <StaggerItem key={item.number} className="h-full">
                <div
                  className="h-full bg-[#111]/80 backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
                  style={{ borderColor: `${item.colorHex}40` }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-mono font-bold block"
                        style={{ color: item.colorHex }}
                      >
                        {item.number}. {item.category}
                      </span>
                    </div>
                    <h4 className="text-white text-xs font-bold mt-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-white/50 mt-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono text-white/40 mt-3 pt-2 border-t border-white/5 block truncate">
                    {item.tag}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Technical Design Tokens: Colors & Typography */}
        <ScrollReveal direction="up" delay={0.1} duration={0.6} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Typography Specs */}
          <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider block mb-4">
              TIPOGRAFIA OFICIAL
            </span>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-white">Aa</span>
                <div>
                  <p className="text-xs font-bold text-white uppercase">
                    Inter / Montserrat
                  </p>
                  <p className="text-[11px] text-white/50">Títulos em Bold • Textos em Regular</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-3 border-t border-white/5">
                <span className="text-3xl font-bold text-[#F59E0B]">Nn</span>
                <div>
                  <p className="text-xs font-bold text-white uppercase">
                    JetBrains Mono / Plus Jakarta
                  </p>
                  <p className="text-[11px] text-white/50">Destaques conceituais, microdados e números</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Elements Specs */}
          <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider block mb-4">
              ELEMENTOS VISUAIS
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#0A0A0A]/90 border border-white/5 flex items-center space-x-2">
                <div className="w-4 h-4 border border-[#F59E0B] rotate-45 shrink-0" />
                <span className="text-white/70">Hexágonos</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0A0A0A]/90 border border-white/5 flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#DB2777] shrink-0" />
                <span className="text-white/70">Degradês</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0A0A0A]/90 border border-white/5 flex items-center space-x-2">
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3 shrink-0">
                  <div className="bg-[#7C3AED] rounded-full" />
                  <div className="bg-[#7C3AED] rounded-full" />
                  <div className="bg-[#7C3AED] rounded-full" />
                  <div className="bg-[#7C3AED] rounded-full" />
                </div>
                <span className="text-white/70">Conexões</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0A0A0A]/90 border border-white/5 flex items-center space-x-2">
                <span className="font-mono text-[#F59E0B] font-bold">:::</span>
                <span className="text-white/70">Tecnologia</span>
              </div>
            </div>
          </div>

          {/* Observações & Guidelines */}
          <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider block mb-3">
                DIRETRIZES DE MARCA
              </span>
              <p className="text-xs text-white/50 leading-relaxed italic font-light">
                “Manter consistência visual, hierarquia clara e foco inegociável na mensagem principal: conectar inteligência artificial, criatividade e impacto científico transformador.”
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-2 text-[11px] text-[#F59E0B] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#DB2777] animate-ping" />
              <span>Identidade Visual • NEURON UFLA</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Palette Tokens Swatches */}
        <ScrollReveal direction="up" delay={0.15} duration={0.6} className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-4">
          <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider block">
            PALETA CROMÁTICA OFICIAL (Clique para Copiar)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BRAND_COLORS.map((color) => (
              <button
                key={color.hex}
                onClick={() => copyToClipboard(color.hex)}
                className="p-3 rounded-xl bg-[#0A0A0A]/90 border border-white/5 hover:border-white/20 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="font-mono text-xs font-bold text-white">{color.hex}</span>
                  {copiedColor === color.hex ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <p className="text-xs font-medium text-white truncate">{color.name}</p>
                <p className="text-[10px] text-white/40 line-clamp-1">{color.role}</p>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
