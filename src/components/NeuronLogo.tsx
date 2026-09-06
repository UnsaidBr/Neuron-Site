import React from 'react';

interface NeuronLogoProps {
  variant?: 'full' | 'icon' | 'navbar' | 'footer';
  className?: string;
  showSubtitle?: boolean;
  animateHover?: boolean;
}

export const NeuronLogo: React.FC<NeuronLogoProps> = ({
  variant = 'full',
  className = '',
  showSubtitle = true,
  animateHover = true,
}) => {
  // Hexagon Emblem SVG matching Frame 12 2.png
  const HexagonEmblem = ({ size = 36 }: { size?: number }) => (
    <div
      className={`relative flex items-center justify-center shrink-0 ${
        animateHover ? 'group-hover:scale-105 transition-transform duration-300' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Gradient matching Frame 12 2.png: Amber/Gold on top-left to Purple/Magenta on bottom-right */}
          <linearGradient id="neuronHexGrad" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="55%" stopColor="#8B5CF6" />
            <stop offset="85%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>

          {/* Bevel highlight gradient for upper facet */}
          <linearGradient id="neuronHexLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Inner shadow */}
          <radialGradient id="neuronInnerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Outer Hexagon with inner cut-out (evenodd rule) */}
        {/* Outer Hexagon points: (50, 6) (90, 28) (90, 72) (50, 94) (10, 72) (10, 28) */}
        {/* Inner Hexagon points: (50, 26) (72, 38) (72, 62) (50, 74) (28, 62) (28, 38) */}
        <path
          d="M50 6 L90 28 L90 72 L50 94 L10 72 L10 28 Z M50 26 L28 38 L28 62 L50 74 L72 62 L72 38 Z"
          fill="url(#neuronHexGrad)"
          fillRule="evenodd"
        />

        {/* 3D Top Bevel Highlight */}
        <path
          d="M50 6 L90 28 L72 38 L50 26 L28 38 L10 28 Z"
          fill="url(#neuronHexLight)"
          opacity="0.6"
        />

        {/* Right side subtle shade */}
        <path
          d="M90 28 L90 72 L72 62 L72 38 Z"
          fill="#4C1D95"
          opacity="0.25"
        />

        {/* Bottom facet subtle purple depth */}
        <path
          d="M90 72 L50 94 L10 72 L28 62 L50 74 L72 62 Z"
          fill="#3B0764"
          opacity="0.3"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <HexagonEmblem size={36} />;
  }

  if (variant === 'navbar') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <HexagonEmblem size={34} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none font-sans uppercase">
              NEURON
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#A78BFA] font-medium mt-1 font-mono leading-none">
              NÚCLEO DE IA &amp; ROBÓTICA • UFLA
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <HexagonEmblem size={40} />
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight text-white leading-none font-sans uppercase">
            NEURON
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] font-mono mt-1">
            Departamento de Ciência da Computação • UFLA
          </span>
        </div>
      </div>
    );
  }

  // Full variant (matches Frame 12 2.png perfectly)
  return (
    <div className={`flex items-center gap-3.5 sm:gap-4 ${className}`}>
      <HexagonEmblem size={46} />
      <div className="flex flex-col">
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none font-sans uppercase">
          NEURON
        </span>
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#A78BFA] font-mono font-medium mt-1">
            Núcleo de Estudos de IA • UFLA
          </span>
        )}
      </div>
    </div>
  );
};
