import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/projectsData';
import { Project } from '../types';
import { ChevronLeft, ChevronRight, ArrowUpRight, Cpu, Mail } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { OptimizedImage } from './OptimizedImage';
import { NeuronBee } from './NeuronBee';

interface HeroSectionProps {
  onNavigateToContact: () => void;
  onExploreProjects: () => void;
  onSelectProjectById: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToContact,
  onExploreProjects,
  onSelectProjectById,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto advance carousel gently every 7 seconds if user does not interact
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-transparent">
      {/* Subtle Ambient Section Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copywriting & Value Proposition */}
          <ScrollReveal
            direction="up"
            duration={0.7}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Tag Badge & Official Hive Mascot Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-block px-3 py-1 bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-full">
                <span className="text-[10px] uppercase tracking-widest text-[#A78BFA] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                  Extensão Universitária • DCC / UFLA
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full">
                <NeuronBee variant="micro" />
                <span className="text-[10px] uppercase tracking-widest text-[#F59E0B] font-mono font-bold">
                  A Colmeia NEURON
                </span>
              </div>
            </div>

            {/* Main Title with Bold Extension Statement */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-white mb-6">
              Mais que um núcleo de estudos,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] via-[#F59E0B] to-[#DB2777]">
                fazemos extensão.
              </span>
            </h1>

            {/* Description exploring extension */}
            <p className="text-base sm:text-lg text-white/60 max-w-xl mb-8 leading-relaxed font-light">
              Levamos a inteligência artificial para além das salas de aula. Na{' '}
              <span className="text-white font-medium">UFLA</span>, não nos limitamos a discutir teoria: construímos robôs reais, tecnologias abertas e soluções aplicadas que transformam a sociedade.
            </p>

            {/* Action Cluster */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreProjects}
                className="px-7 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center space-x-2 cursor-pointer hover:scale-102"
              >
                <span>Conhecer Projetos de Extensão</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onNavigateToContact}
                className="px-7 py-3.5 border border-white/10 hover:bg-white/5 text-white font-bold text-sm rounded-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#F59E0B]" />
                <span>Como nos Contatar</span>
              </button>
            </div>

            {/* Trust / Affiliations Pill Bar */}
            <div className="pt-8 mt-8 border-t border-white/5">
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-white/30 mb-3">
                Cooperação Científica &amp; Destaques Globais
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/60 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" /> UFLA • Lavras
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> FAPESP
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777]" /> Heriot-Watt Univ. (UK)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" /> Ontario Tech (Canadá)
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Visual Showcase Mockup Card in Immersive UI Structure */}
          <ScrollReveal
            direction="left"
            delay={0.2}
            duration={0.7}
            className="lg:col-span-5 flex flex-col gap-6 justify-center"
          >
            {/* Outer Frame */}
            <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-50 pointer-events-none" />

              {/* Inner Card */}
              <div className="relative bg-[#0A0A0A]/90 rounded-xl p-6 border border-white/5 space-y-4">
                {/* Header Controls Bar */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-semibold">
                    Case em Destaque
                  </span>
                  <div className="flex items-center gap-3">
                    {/* Dots indicator */}
                    <div className="flex gap-1.5">
                      {HERO_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlideIndex(idx)}
                          aria-label={`Slide ${idx + 1}`}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            idx === currentSlideIndex ? 'bg-[#7C3AED]' : 'bg-white/20 hover:bg-white/40'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Prev / Next controls */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={prevSlide}
                        aria-label="Slide anterior"
                        className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#7C3AED] transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Próximo slide"
                        className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#7C3AED] transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Case Image Thumbnail Container with Optimized Image */}
                <div
                  onClick={() =>
                    onSelectProjectById(
                      activeSlide.id === 'robo-budista'
                        ? 'flagship-robo-budista'
                        : activeSlide.id === 'llm-cafe'
                        ? 'llm-cafe'
                        : 'marcha-plus'
                    )
                  }
                  className="relative rounded-lg overflow-hidden bg-black/40 border border-white/10 aspect-video cursor-pointer group"
                >
                  <OptimizedImage
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    width={800}
                    height={450}
                    priority={true}
                    aspectRatio="16/9"
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white/80 pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10 font-medium">
                      {activeSlide.category}
                    </span>
                    <span className="text-emerald-400 font-semibold">{activeSlide.status}</span>
                  </div>
                </div>

                {/* Case Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                    {activeSlide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light line-clamp-2">
                    {activeSlide.description}
                  </p>
                </div>

                {/* Tag chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[9px] px-2.5 py-1 bg-white/5 rounded border border-white/10 text-white/80 font-mono">
                    {activeSlide.pillTitle}
                  </span>
                  <span className="text-[9px] px-2.5 py-1 bg-white/5 rounded border border-white/10 text-white/80 font-mono">
                    {activeSlide.badge}
                  </span>
                </div>

                {/* Case Study Link Action & Minimalist Hive Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() =>
                      onSelectProjectById(
                        activeSlide.id === 'robo-budista'
                          ? 'flagship-robo-budista'
                          : activeSlide.id === 'llm-cafe'
                          ? 'llm-cafe'
                          : 'marcha-plus'
                      )
                    }
                    className="text-[#7C3AED] hover:text-[#A78BFA] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer text-left"
                  >
                    <span>Explorar Projeto</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <NeuronBee variant="micro" />
                    <span className="text-[11px] font-mono text-white/50">
                      Colmeia // Extensão
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
