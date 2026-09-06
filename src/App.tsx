import React, { useState } from 'react';
import { PageTab, Project } from './types';
import { PROJECTS_LIST, FLAGSHIP_PROJECT } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { FlagshipProject } from './components/FlagshipProject';
import { ProjectsGrid } from './components/ProjectsGrid';
import { MethodologySection } from './components/MethodologySection';
import { TeamSection } from './components/TeamSection';
import { TestimonialSection } from './components/TestimonialSection';
import { BrandFrameworkSection } from './components/BrandFrameworkSection';
import { RecruitmentCTA } from './components/RecruitmentCTA';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TraineeModal } from './components/TraineeModal';
import { ResearchCasesView } from './components/ResearchCasesView';
import { AboutTeamView } from './components/AboutTeamView';
import { ScrollReveal } from './components/ScrollReveal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTraineeModalOpen, setIsTraineeModalOpen] = useState<boolean>(false);
  const [traineeModalType, setTraineeModalType] = useState<'trainee' | 'partnership'>('trainee');

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSelectProjectById = (id: string) => {
    const found = PROJECTS_LIST.find((p) => p.id === id) || FLAGSHIP_PROJECT;
    setSelectedProject(found);
  };

  const handleOpenTraineeModal = (type: 'trainee' | 'partnership' = 'trainee') => {
    setTraineeModalType(type);
    setIsTraineeModalOpen(true);
  };

  const handleNavigateTab = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#070510] bg-gradient-to-b from-[#090514] via-[#0b081e] via-[#070918] to-[#06040e] text-[#F3F4F6] min-h-screen flex flex-col selection:bg-[#7C3AED] selection:text-white relative overflow-x-hidden">
      {/* Continuous Futuristic Multi-Layered Background Engine */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ambient Cosmic Light Orbs positioned across scroll depths */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-[130px] animate-ambient-slow" />
        <div className="absolute top-[18%] -right-40 w-[650px] h-[650px] rounded-full bg-[#DB2777]/15 blur-[140px] animate-ambient-reverse" />
        <div className="absolute top-[42%] -left-36 w-[700px] h-[700px] rounded-full bg-[#4F46E5]/18 blur-[150px] animate-ambient-slow" />
        <div className="absolute top-[65%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#7C3AED]/16 blur-[140px] animate-ambient-reverse" />
        <div className="absolute top-[85%] left-[10%] w-[650px] h-[650px] rounded-full bg-[#DB2777]/16 blur-[130px] animate-ambient-slow" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full bg-[#4338CA]/20 blur-[130px]" />
        
        {/* Subtle Cybernetic Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        
        {/* Subtle Tech Micro-Nodes */}
        <div className="absolute inset-0 bg-tech-dots opacity-70" />

        {/* Vertical Center Glow Line for subtle depth */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#7C3AED]/10 to-transparent pointer-events-none" />
      </div>

      {/* Top Sticky Navigation */}
      <div className="relative z-20">
        <Navbar
          currentTab={currentTab}
          setCurrentTab={handleNavigateTab}
          onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {currentTab === 'home' && (
          <>
            {/* Hero Section with Interactive Carousel */}
            <ScrollReveal direction="up" duration={0.65} distance={28}>
              <HeroSection
                onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
                onExploreProjects={() => handleNavigateTab('projetos')}
                onSelectProjectById={handleSelectProjectById}
              />
            </ScrollReveal>

            {/* Metrics Indicator Banner */}
            <ScrollReveal direction="up" duration={0.6} distance={24}>
              <MetricsBar />
            </ScrollReveal>

            {/* Flagship Project Case Study */}
            <ScrollReveal direction="up" duration={0.65} distance={30}>
              <FlagshipProject onSelectProject={handleSelectProject} />
            </ScrollReveal>

            {/* Research & Innovation Portfolio Grid */}
            <ScrollReveal direction="up" duration={0.65} distance={30}>
              <ProjectsGrid
                onSelectProject={handleSelectProject}
                showFilters={true}
                title="Portfólio de Pesquisa & Inovação"
                subtitle="Projetos documentados no ecossistema NEURON. Criatividade científica com método rigoroso para solucionar desafios da Terra ao Espaço."
              />
            </ScrollReveal>

            {/* 4-Step Methodology Section */}
            <ScrollReveal direction="up" duration={0.65} distance={30}>
              <MethodologySection />
            </ScrollReveal>

            {/* Team Showcase with Real Photo */}
            <ScrollReveal direction="up" duration={0.65} distance={30}>
              <TeamSection />
            </ScrollReveal>

            {/* Brand Framework Section Preview */}
            <ScrollReveal direction="up" duration={0.65} distance={30}>
              <BrandFrameworkSection />
            </ScrollReveal>

            {/* Trainee Testimonial */}
            <ScrollReveal direction="up" duration={0.65} distance={30}>
              <TestimonialSection />
            </ScrollReveal>

            {/* Recruitment CTA Banner */}
            <ScrollReveal direction="up" duration={0.65} distance={30}>
              <RecruitmentCTA
                onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
                onExploreProjects={() => handleNavigateTab('projetos')}
              />
            </ScrollReveal>
          </>
        )}

        {currentTab === 'projetos' && (
          <div className="pt-8 pb-16">
            <ProjectsGrid
              onSelectProject={handleSelectProject}
              showFilters={true}
              title="Catálogo Geral de Pesquisas & Projetos"
              subtitle="Navegue pelas linhas de investigação ativas no NEURON. Utilize os filtros por categoria ou a barra de busca para encontrar casos de uso, artigos e resultados de bancada."
            />
          </div>
        )}

        {currentTab === 'pesquisa' && (
          <ResearchCasesView
            onSelectProject={handleSelectProject}
            onOpenTraineeModal={() => handleOpenTraineeModal('partnership')}
          />
        )}

        {currentTab === 'brand' && (
          <div className="pt-8 pb-16">
            <BrandFrameworkSection />
          </div>
        )}

        {currentTab === 'equipe' && (
          <AboutTeamView onOpenTraineeModal={() => handleOpenTraineeModal('trainee')} />
        )}
      </main>

      {/* Complete Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
        onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
      />

      {/* Individual Project Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenTraineeModal={() => {
          setSelectedProject(null);
          handleOpenTraineeModal('trainee');
        }}
      />

      {/* Trainee Recruitment & Partnership Modal */}
      <TraineeModal
        isOpen={isTraineeModalOpen}
        onClose={() => setIsTraineeModalOpen(false)}
        defaultType={traineeModalType}
      />
    </div>
  );
}
