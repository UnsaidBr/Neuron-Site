import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Globe, Calendar, Award, CheckCircle, Share2, Sparkles, FileText } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenTraineeModal: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenTraineeModal,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl animate-fade-in">
      {/* Modal Double-Layer Container */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative w-full max-w-4xl max-h-[90vh] overflow-hidden group shadow-2xl">
        <div className="relative w-full max-h-[calc(90vh-8px)] overflow-y-auto bg-[#0A0A0A] rounded-xl p-6 sm:p-8 border border-white/5 text-white space-y-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-colors cursor-pointer z-20"
            aria-label="Fechar detalhes do projeto"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-white/5 text-[#F59E0B] font-mono text-[10px] font-bold uppercase tracking-wider border border-white/10">
              {project.badge}
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 text-white/70 font-mono text-[10px] border border-white/10">
              {project.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-md bg-black/60 text-emerald-400 font-mono text-[10px] font-semibold flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden aspect-video w-full bg-black/50 border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
          </div>

          {/* Content Tabs / Sections */}
          <div className="space-y-6 text-sm sm:text-base">
            {/* Executive Summary */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#F59E0B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DB2777]" />
                Resumo Executivo
              </h3>
              <p className="text-white/70 leading-relaxed font-light text-sm">
                {project.description}
              </p>
            </div>

            {/* Problem & Hypothesis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-[10px] font-mono font-bold text-[#DB2777] uppercase tracking-wider">
                  O Problema Científico
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-[10px] font-mono font-bold text-[#7C3AED] uppercase tracking-wider">
                  Hipótese de Fronteira
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {project.hypothesis}
                </p>
              </div>
            </div>

            {/* Methodology */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Metodologia &amp; Desenvolvimento
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                {project.methodology}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider">
                Stack Tecnológica &amp; Componentes
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#F59E0B]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hardware & Prototype Specs (if any) */}
            {project.specs && (
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider">
                  Especificações Técnicas de Bancada
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {Object.entries(project.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs"
                    >
                      <span className="text-white/40 block text-[9px] uppercase font-mono">
                        {key}
                      </span>
                      <span className="font-semibold text-white font-mono mt-0.5 block">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results & Impact */}
            <div className="p-4 rounded-xl bg-white/5 border border-[#7C3AED]/30 space-y-2">
              <h4 className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                Resultados Validados &amp; Impacto
              </h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                {project.results}
              </p>
            </div>

            {/* Institutions & Partners */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block font-semibold">
                Instituições Envolvidas &amp; Consórcio
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-white/60">
                {project.partners.map((partner, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/5"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-white/40">
              <Calendar className="w-4 h-4 text-[#7C3AED]" />
              <span>Linha de Pesquisa: {project.timeline}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenTraineeModal();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-wider font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all cursor-pointer"
              >
                Participar Desta Linha
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
