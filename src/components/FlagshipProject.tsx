import React from 'react';
import { Project } from '../types';
import { FLAGSHIP_PROJECT } from '../data/projectsData';
import { Globe, ArrowRight, FileText, Quote } from 'lucide-react';

interface FlagshipProjectProps {
  onSelectProject: (project: Project) => void;
}

export const FlagshipProject: React.FC<FlagshipProjectProps> = ({ onSelectProject }) => {
  return (
    <section className="w-full py-20 bg-[#050505] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Flagship Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F59E0B] font-bold">
              PROJETO EM FOCO // 2024 - 2025
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1 tracking-tight">
              Destaque Científico Principal
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-white/50 font-mono text-xs">
            <Globe className="w-4 h-4 text-[#7C3AED]" />
            <span>Cooperação Internacional Coreia do Sul • Brasil</span>
          </div>
        </div>

        {/* Bento Flagship Container with Immersive UI Double Layer */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
          {/* Ambient Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-50 pointer-events-none" />

          {/* Inner Card Container */}
          <div className="relative bg-[#0A0A0A] rounded-xl p-6 md:p-10 border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Story & Intelligence (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6 relative z-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded bg-[#7C3AED]/15 text-[#A78BFA] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#7C3AED]/30">
                    Case Principal // Robótica Teomórfica
                  </span>
                  <span className="px-3 py-1 rounded bg-white/5 text-white/60 font-mono text-[10px] border border-white/10">
                    Museu Nacional da Coreia do Sul
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                  {FLAGSHIP_PROJECT.title}
                </h3>

                <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light">
                  {FLAGSHIP_PROJECT.description}
                </p>

                {/* Partners Badges Ribbon */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40 block font-semibold">
                    Consórcio de Pesquisa &amp; Financiamento:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/70">
                    {FLAGSHIP_PROJECT.partners.map((partner, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/70"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote Callout */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 mt-4">
                  <Quote className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm italic text-white/70 leading-relaxed font-light">
                    {FLAGSHIP_PROJECT.quote}
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onSelectProject(FLAGSHIP_PROJECT)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-102 transition-all cursor-pointer"
                >
                  <span>Ver Ficha Técnica Completa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectProject(FLAGSHIP_PROJECT)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/10 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  <span>Ler Artigo Científico (Case Study)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Case Poster (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-white/5 border border-white/10 p-4 gap-4 relative overflow-hidden group">
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-black/40 border border-white/5">
                <img
                  src={FLAGSHIP_PROJECT.image}
                  alt={FLAGSHIP_PROJECT.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />

                {/* Live Status Tags over Image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-emerald-400 font-mono text-[10px] font-semibold flex items-center gap-1.5 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Em Operação no Museu
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[#DB2777] font-mono text-[10px] font-bold border border-[#DB2777]/30">
                    Destaque FAPESP
                  </span>
                </div>

                {/* In-Photo Technical Specs Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-white text-xs font-semibold">
                    <span className="text-white/80">Especificações do Protótipo</span>
                    <span className="text-[#F59E0B] font-mono font-bold">v3.4-KOR</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono text-[9px]">
                    <div className="bg-white/10 text-white/80 py-1 rounded border border-white/10">
                      Sensoriamento 360°
                    </div>
                    <div className="bg-white/10 text-white/80 py-1 rounded border border-white/10">
                      Edge Computing
                    </div>
                    <div className="bg-white/10 text-white/80 py-1 rounded border border-white/10">
                      Áudio Adaptativo
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-white/40 font-mono text-xs px-1">
                <span>Protocolo: RO-2024-KOR-UFLA</span>
                <span className="text-[#F59E0B] font-semibold">Interação Homem-Máquina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
