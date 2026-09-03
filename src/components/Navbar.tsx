import React, { useState } from 'react';
import { PageTab } from '../types';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: PageTab;
  setCurrentTab: (tab: PageTab) => void;
  onOpenTraineeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenTraineeModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'pesquisa', label: 'Pesquisa & Cases' },
    { id: 'brand', label: 'Brand Framework' },
    { id: 'equipe', label: 'Equipe & Sobre' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching Immersive UI */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          aria-label="Ir para a página inicial do NEURON"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-[#7C3AED] to-[#DB2777] rounded-sm rotate-45 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 bg-white rounded-full blur-[2px] opacity-80" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter leading-none text-white">
              NEURON
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#7C3AED] font-semibold mt-1">
              Núcleo de Estudos de IA • UFLA
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-white/60">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors cursor-pointer pb-1 ${
                  isActive
                    ? 'text-white border-b border-[#7C3AED]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenTraineeModal}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all cursor-pointer hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#F59E0B]" />
            <span>Inscrições Abertas</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-white/80" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#0A0A0A]/95 px-4 pt-4 pb-6 space-y-3 backdrop-blur-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-3 rounded-lg text-left text-xs uppercase tracking-widest font-medium transition-all ${
                    isActive
                      ? 'bg-[#7C3AED]/15 text-white border border-[#7C3AED]/30 font-bold'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTraineeModal();
              }}
              className="w-full py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-widest font-bold text-white flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Inscrições Abertas 2025</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
