import React, { useState, useEffect, useMemo } from 'react';
import { Project, Publication } from '../types';
import { PROJECTS_LIST } from '../data/projectsData';
import { PUBLICATIONS_LIST } from '../data/publicationsData';
import { getProjects, getPublications } from '../services/api';
import {
  Calendar,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Filter,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Cpu,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { OptimizedImage } from './OptimizedImage';

interface PublicationsAndProjectsViewProps {
  onSelectProject: (project: Project) => void;
}

export const PublicationsAndProjectsView: React.FC<PublicationsAndProjectsViewProps> = ({
  onSelectProject,
}) => {
  // Chronological order direction: 'asc' (2023 -> 2025) or 'desc' (2025 -> 2023)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [pubFilter, setPubFilter] = useState<string>('all');
  const [pubProjectFilter, setPubProjectFilter] = useState<string>('all');
  const [expandedPubId, setExpandedPubId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [projects, setProjects] = useState<Project[]>(PROJECTS_LIST);
  const [publications, setPublications] = useState<Publication[]>(PUBLICATIONS_LIST);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [projRes, pubRes] = await Promise.all([
          getProjects(),
          getPublications(),
        ]);
        if (isMounted) {
          if (projRes.projects && projRes.projects.length > 0) {
            setProjects(projRes.projects);
          }
          if (pubRes.publications && pubRes.publications.length > 0) {
            setPublications(pubRes.publications);
          }
        }
      } catch {
        // Fallbacks are handled inside service functions
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Chronologically sorted projects
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.year - b.year;
      }
      return b.year - a.year;
    });
  }, [sortOrder, projects]);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchType = pubFilter === 'all' || pub.type === pubFilter;
      const matchProject =
        pubProjectFilter === 'all' || pub.projectId === pubProjectFilter;
      const matchSearch =
        searchQuery === '' ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchProject && matchSearch;
    });
  }, [pubFilter, pubProjectFilter, searchQuery, publications]);

  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <ScrollReveal direction="up" duration={0.65} className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold">
          <Layers className="w-3 h-3 text-[#A78BFA]" />
          <span>PRODUÇÃO CIENTÍFICA &amp; LINHA DO TEMPO // DCC • UFLA</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
          Publicações &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#DB2777] to-[#7C3AED]">
            Projetos Estruturantes
          </span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg font-light max-w-3xl leading-relaxed">
          Navegue pelas iniciativas tecnológicas do NEURON em ordem cronológica de desenvolvimento e explore os artigos e publicações científicas associados a cada linha de investigação.
        </p>
      </ScrollReveal>

      {/* SECTION 1: Chronological Projects Timeline */}
      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold">
              01. EVOLUÇÃO TEMPORAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Projetos em Ordem Cronológica
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-1 font-light">
              A trajetória do laboratório desde os primeiros marcos de robótica teomórfica até as soluções aplicadas de IA e biomecânica.
            </p>
          </div>

          {/* Chronological Sorting Switch */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#0D0D0D] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setSortOrder('asc')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                sortOrder === 'asc'
                  ? 'bg-[#7C3AED] text-white font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Cronológica (2023 → 2025)
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                sortOrder === 'desc'
                  ? 'bg-[#7C3AED] text-white font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Mais Recentes (2025 → 2023)
            </button>
          </div>
        </div>

        {/* Timeline Visual Indicators */}
        <div className="hidden lg:grid grid-cols-3 gap-4 pb-2">
          {sortedProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
                <span className="font-bold text-white">Ano {proj.year}</span>
              </div>
              <span className="text-[11px] text-white/50 truncate max-w-[140px]">
                {proj.title.split(':')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Projects Cards List (Chronological) */}
        <div className="space-y-8">
          {sortedProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <ScrollReveal
                key={project.id}
                direction="up"
                duration={0.65}
                delay={index * 0.1}
                className="rounded-3xl bg-[#0D0D0D]/90 border border-white/10 hover:border-white/25 transition-all overflow-hidden p-6 sm:p-8 lg:p-10 shadow-2xl relative"
              >
                {/* Year Milestone Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] font-bold text-xs">
                      MARCO DE INÍCIO: {project.year}
                    </span>
                    <span className="text-white/40 text-[11px] hidden sm:inline">
                      {project.timeline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-white/5 text-white/70 text-[11px] border border-white/10">
                      {project.badge}
                    </span>
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Image Preview */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="lg:col-span-5 rounded-2xl overflow-hidden bg-black/50 border border-white/10 aspect-video sm:aspect-[16/10] relative group cursor-pointer"
                  >
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={500}
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white pointer-events-none">
                      <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[11px]">
                        {project.categoryLabel}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#7C3AED]/80 font-bold text-[11px] flex items-center gap-1">
                        <span>Ver Estudo</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Right: Project Description & Metrics */}
                  <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold">
                        {project.tagCategory}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack pills */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-white/40 block mb-1.5 uppercase">
                        Tecnologias &amp; Métodos:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action bar */}
                    <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-[11px] text-white/40 font-mono">
                        Instituições: {project.institutions.split('•')[0]}
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105"
                      >
                        <span>Explorar Estudo de Caso Completo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Scientific Publications */}
      <div className="space-y-8 pt-6 border-t border-white/5" id="publicacoes">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>02. PRODUÇÃO CIENTÍFICA // PAPERS &amp; ARTIGOS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Publicações Acadêmicas do NEURON
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-1 font-light max-w-2xl">
              Artigos publicados em periódicos indexados, anais de conferências internacionais (IEEE, ACM) e boletins técnicos da UFLA.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-mono text-[#A78BFA] font-bold block">
              {filteredPublications.length} Publicações Listadas
            </span>
            <span className="text-[11px] text-white/40 font-mono">
              Revisão por Pares &amp; Divulgação
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, autor, conferência ou tag..."
              className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-white/40 uppercase mr-1">Tipo:</span>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'conferencia', label: 'Conferências' },
              { id: 'artigo', label: 'Artigos' },
              { id: 'relatorio', label: 'Relatórios' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setPubFilter(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  pubFilter === btn.id
                    ? 'bg-white/15 text-white font-bold border border-white/20'
                    : 'text-white/50 hover:text-white bg-white/5'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-white/40 uppercase mr-1">Projeto:</span>
            {[
              { id: 'all', label: 'Todos' },
              { id: 'flagship-robo-budista', label: 'Robô Budista' },
              { id: 'llm-cafe', label: 'LLM Café' },
              { id: 'marcha-plus', label: 'Marcha+' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setPubProjectFilter(btn.id)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  pubProjectFilter === btn.id
                    ? 'bg-[#7C3AED] text-white font-bold'
                    : 'text-white/50 hover:text-white bg-white/5'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          {filteredPublications.map((pub) => {
            const isExpanded = expandedPubId === pub.id;
            return (
              <div
                key={pub.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 hover:border-white/25 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#A78BFA] font-mono font-bold text-[10px] uppercase">
                      {pub.badge}
                    </span>
                    <span className="text-white/50 text-xs font-mono">
                      {pub.year} • {pub.typeLabel}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                    {pub.projectTitle}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {pub.title}
                </h3>

                <p className="text-xs text-white/50 font-mono">
                  {pub.authors} — <span className="text-white/70 italic">{pub.venue}</span>
                </p>

                {/* Abstract Drawer */}
                {isExpanded && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-white/70 leading-relaxed font-light mt-3 animate-fade-in space-y-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">
                      Resumo da Publicação:
                    </span>
                    <p>{pub.abstract}</p>
                  </div>
                )}

                {/* Actions & Tags */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {pub.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedPubId(isExpanded ? null : pub.id)}
                      className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Recolher Resumo' : 'Ler Resumo'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span>Acessar</span>
                        <ExternalLink className="w-3 h-3 text-white/50" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPublications.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-[#0D0D0D]/60 border border-white/10 text-white/40 text-sm">
              Nenhuma publicação encontrada para os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
