import React, { useState } from 'react';
import { PageTab } from '../types';
import { Menu, X, ArrowRight, Mail } from 'lucide-react';
import { NeuronLogo } from './NeuronLogo';

interface NavbarProps {
  currentTab: PageTab;
  setCurrentTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contatos', label: 'Contatos' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching Frame 12 2.png */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center group text-left cursor-pointer focus:outline-none"
          aria-label="Ir para a página inicial do NEURON"
        >
          <NeuronLogo variant="navbar" />
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
                    ? 'text-white border-b border-[#7C3AED] font-bold'
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
            onClick={() => handleNavClick('contatos')}
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all cursor-pointer hover:scale-105 group"
          >
            <Mail className="w-3.5 h-3.5 mr-1.5 text-[#F59E0B]" />
            <span>Fale Conosco</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
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
              onClick={() => handleNavClick('contatos')}
              className="w-full py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-widest font-bold text-white flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              <Mail className="w-4 h-4 text-[#F59E0B]" />
              <span>Fale Conosco</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
