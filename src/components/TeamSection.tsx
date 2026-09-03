import React from 'react';
import { Users, Globe2, Sparkles, MapPin, Cpu } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/5" id="equipe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span>08. BASTIDORES / TIME • UFLA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Mentes Curiosas, <br />
            <span className="text-[#A78BFA]">Ideias que Transformam.</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            O NEURON reúne estudantes, pesquisadores e docentes dos mais diversos cursos da UFLA — Ciência da Computação, Engenharia, Sistemas de Informação e áreas correlatas — unidos pelo entusiasmo de construir tecnologias aplicadas.
          </p>
        </div>

        {/* Prominent Team Showcase Image Banner - Immersive UI double-layer frame */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
            <div className="relative rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/5 flex items-center justify-center min-h-[340px] sm:min-h-[480px] lg:min-h-[540px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkFAkl4VEIIrQrHGzFoJF5O-4tYCxAg5mAnj941-VCjjGpvp0ANbjy_aIPuzqBHC4udZGVGmRgFrQoo4P5BN9MiNC8Iia5Ht8A8Cf3yHSB-L5WgDa7yvNR3C8njizZVBfN7xOveAJLoRE9jLHvkHFWeXYIXgGaVxhBLnQCQruXqCn8-lnpoJQI5eli0pG5aeXLZ2r2qRjvlBibHdgmR07P10lBeFJW5pCwXMnmyxmUY2w4-9rm5zYhiuslBaQcOdwg5w"
                alt="Equipe e Pesquisadores NEURON UFLA"
                className="w-full h-auto object-contain max-h-[580px] drop-shadow-md group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent pointer-events-none" />

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
                <span className="px-4 py-2 text-xs sm:text-sm font-mono font-medium rounded-lg bg-black/80 backdrop-blur-md text-[#F59E0B] border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DB2777] animate-pulse" />
                  Equipe &amp; Pesquisadores NEURON • UFLA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-black/70 text-white/80 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                  LAVRAS / MG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Culture Grid with Immersive UI double-layer cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="relative bg-[#0A0A0A] rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center space-x-2 text-[#F59E0B] font-mono text-xs font-bold mb-3">
                  <Users className="w-4 h-4 text-[#F59E0B]" />
                  <span>CULTURA ABERTA &amp; MENTORIA</span>
                </div>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Mentoria contínua entre veteranos, professores e novos membros trainees com foco em desenvolvimento humanizado e excelência técnica prática.
                </p>
              </div>
              <span className="text-[11px] font-mono text-white/40 mt-4 pt-3 border-t border-white/5">
                Formação Integrada • Graduação &amp; Mestrado
              </span>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="relative bg-[#0A0A0A] rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center space-x-2 text-[#DB2777] font-mono text-xs font-bold mb-3">
                  <Globe2 className="w-4 h-4 text-[#DB2777]" />
                  <span>PROJETOS GLOBAIS</span>
                </div>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Oportunidade real de publicação em periódicos e intercâmbio com instituições internacionais parceiras na Coreia do Sul, Reino Unido e Canadá.
                </p>
              </div>
              <span className="text-[11px] font-mono text-white/40 mt-4 pt-3 border-t border-white/5">
                Alumni em Toronto, Seul e Edimburgo
              </span>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="relative bg-[#0A0A0A] rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center space-x-2 text-[#7C3AED] font-mono text-xs font-bold mb-3">
                  <Cpu className="w-4 h-4 text-[#7C3AED]" />
                  <span>INFRAESTRUTURA DE PONTA</span>
                </div>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Laboratório sediado no DCC/UFLA com bancadas de prototipagem rápida, cluster de inferência neural, drones industriais e estufas de teste biológico.
                </p>
              </div>
              <span className="text-[11px] font-mono text-white/40 mt-4 pt-3 border-t border-white/5">
                Acesso 24/7 para membros ativos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
