import React from 'react';
import { motion } from 'framer-motion';

interface NeuronBeeProps {
  size?: number | string;
  variant?: 'standalone' | 'badge' | 'watermark' | 'floating-card' | 'micro';
  className?: string;
  animate?: boolean;
}

export const NeuronBee: React.FC<NeuronBeeProps> = ({
  size = 64,
  variant = 'standalone',
  className = '',
  animate = true,
}) => {
  // Vector illustration strictly matching the uploaded bee mascot:
  // Yellow/gold wings with geometric neural/hexagonal cell venation,
  // dark royal purple body with vibrant yellow stripes, aggressive forward angle,
  // yellow eye visor, antennae, jointed legs, and sharp stinger.
  const BeeSvg = ({ width, height }: { width: number | string; height: number | string }) => (
    <svg
      viewBox="0 0 260 220"
      width={width}
      height={height}
      className="filter drop-shadow-[0_4px_16px_rgba(245,158,11,0.25)] select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Wing gradient: vibrant gold to radiant amber */}
        <linearGradient id="beeWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Wing inner highlight */}
        <linearGradient id="beeWingGlow" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
        </linearGradient>

        {/* Body gradient: deep royal purple to midnight indigo */}
        <linearGradient id="beeBodyPurple" x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#6D28D9" />
          <stop offset="50%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>

        {/* Yellow stripe gradient */}
        <linearGradient id="beeYellowStripe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* --- REAR WING (Secondary Wing Behind Body) --- */}
      <g className="bee-secondary-wing">
        <path
          d="M 50 85 L 110 50 L 140 75 L 85 105 Z"
          fill="url(#beeWingGrad)"
          stroke="#1E1B4B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner geometric veins for rear wing */}
        <path
          d="M 65 77 L 115 58 M 80 88 L 125 68 M 100 62 L 105 80"
          stroke="#1E1B4B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* --- FOREGROUND MAIN WING (Large Upper Geometric Wing) --- */}
      <g className="bee-main-wing">
        {/* Main wing outer perimeter */}
        <path
          d="M 12 10 
             L 110 40 
             C 125 45, 145 55, 150 70 
             L 105 95 
             L 70 98 
             L 35 75 
             Z"
          fill="url(#beeWingGrad)"
          stroke="#1E1B4B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Thick dark purple outer leading edge */}
        <path
          d="M 12 10 L 110 40 C 130 46, 145 58, 150 70"
          stroke="#2E1065"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Cellular Venation Veins (creating the characteristic segmented polygonal facet look) */}
        <path
          d="M 30 25 L 85 45 L 120 55 M 50 35 L 75 55 L 110 70 M 70 42 L 60 70 L 95 80 M 35 75 L 60 70 M 85 45 L 80 65 L 125 65"
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Upper wing glossy highlights */}
        <path
          d="M 25 18 L 95 38 C 110 42, 125 50, 135 60"
          stroke="url(#beeWingGlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* --- LEGS (Sharp articulated insect legs) --- */}
      <g className="bee-legs" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {/* Rear leg with yellow accents */}
        <path d="M 85 140 L 80 185 L 75 210" />
        <path d="M 80 185 L 85 195" stroke="#F59E0B" strokeWidth="2.5" />

        {/* Middle leg */}
        <path d="M 115 150 L 125 180 L 120 205" />
        <path d="M 125 180 L 128 190" stroke="#F59E0B" strokeWidth="2.5" />

        {/* Front leg */}
        <path d="M 145 145 L 165 170 L 175 185" />
        <path d="M 165 170 L 170 178" stroke="#F59E0B" strokeWidth="2.5" />

        {/* Far side legs peering beneath */}
        <path d="M 100 135 L 95 160 L 90 175" opacity="0.6" />
        <path d="M 130 140 L 140 162" opacity="0.6" />
      </g>

      {/* --- ABDOMEN (Curved striped body with stinger) --- */}
      <g className="bee-abdomen">
        {/* Abdomen Base Purple Silhouette */}
        <path
          d="M 125 95 
             C 105 95, 75 110, 68 135 
             C 62 155, 70 180, 85 200 
             L 80 215 
             C 78 220, 84 218, 88 212 
             C 100 195, 115 175, 130 150 
             Z"
          fill="url(#beeBodyPurple)"
          stroke="#1E1B4B"
          strokeWidth="3.5"
        />

        {/* Sharp Pointed Stinger at Bottom */}
        <path
          d="M 82 205 L 75 220 L 88 212 Z"
          fill="#1E1B4B"
        />

        {/* Abdominal Yellow Stripes (Alternating bands) */}
        {/* Stripe 1 (top) */}
        <path
          d="M 100 115 C 90 125, 82 135, 78 145 L 98 150 C 105 140, 112 130, 122 120 Z"
          fill="url(#beeYellowStripe)"
          stroke="#1E1B4B"
          strokeWidth="2"
        />
        {/* Stripe 2 (middle) */}
        <path
          d="M 80 152 C 75 162, 73 172, 75 182 L 92 178 C 92 170, 94 162, 98 155 Z"
          fill="url(#beeYellowStripe)"
          stroke="#1E1B4B"
          strokeWidth="2"
        />
        {/* Stripe 3 (lower) */}
        <path
          d="M 76 186 C 78 192, 80 198, 84 204 L 92 195 C 90 190, 88 185, 86 181 Z"
          fill="url(#beeYellowStripe)"
          stroke="#1E1B4B"
          strokeWidth="2"
        />
      </g>

      {/* --- THORAX (Muscular center segment) --- */}
      <g className="bee-thorax">
        <path
          d="M 115 85 
             C 135 75, 160 85, 168 105 
             C 172 120, 165 140, 145 150 
             C 130 155, 115 145, 112 130 
             C 110 115, 112 95, 115 85 Z"
          fill="url(#beeBodyPurple)"
          stroke="#1E1B4B"
          strokeWidth="3.5"
        />

        {/* Yellow shoulder plate accent */}
        <path
          d="M 125 90 C 138 85, 150 90, 156 100 L 148 108 C 142 100, 134 98, 126 100 Z"
          fill="url(#beeYellowStripe)"
          stroke="#1E1B4B"
          strokeWidth="1.5"
        />

        {/* Lower thorax yellow highlight */}
        <path
          d="M 132 130 C 145 125, 152 130, 155 138 L 146 142 C 142 138, 136 136, 130 138 Z"
          fill="url(#beeYellowStripe)"
          stroke="#1E1B4B"
          strokeWidth="1.5"
        />
      </g>

      {/* --- HEAD & ANTENNAE --- */}
      <g className="bee-head">
        {/* Antennae */}
        <path
          d="M 185 85 C 195 75, 215 75, 230 80 M 230 80 L 225 85"
          stroke="#1E1B4B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 195 90 C 210 85, 235 92, 245 100"
          stroke="#1E1B4B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Antenna tips */}
        <circle cx="230" cy="80" r="3" fill="#F59E0B" />
        <circle cx="245" cy="100" r="3" fill="#F59E0B" />

        {/* Head armor base */}
        <path
          d="M 160 95 
             C 170 85, 190 90, 198 105 
             C 205 120, 195 135, 182 140 
             C 170 142, 160 135, 155 125 
             Z"
          fill="url(#beeBodyPurple)"
          stroke="#1E1B4B"
          strokeWidth="3.5"
        />

        {/* Large Golden Compound Eye / Visor */}
        <ellipse
          cx="184"
          cy="112"
          rx="12"
          ry="16"
          transform="rotate(15 184 112)"
          fill="#FDE047"
          stroke="#1E1B4B"
          strokeWidth="3"
        />
        {/* Eye inner gloss and facet depth */}
        <ellipse
          cx="182"
          cy="108"
          rx="6"
          ry="10"
          transform="rotate(15 182 108)"
          fill="#FEF08A"
        />
        <path
          d="M 188 105 L 180 120"
          stroke="#CA8A04"
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* Yellow facial markings */}
        <path
          d="M 194 122 C 198 128, 195 134, 190 136"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  // Animation wrapper with smooth loop
  const motionProps = animate
    ? {
        animate: { y: [0, -6, 0] },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  if (variant === 'micro') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <BeeSvg width={24} height={20} />
      </div>
    );
  }

  if (variant === 'watermark') {
    return (
      <div className={`pointer-events-none select-none opacity-10 filter blur-[0.5px] ${className}`}>
        <BeeSvg width={size} height={typeof size === 'number' ? (size * 0.85) : size} />
      </div>
    );
  }

  if (variant === 'floating-card') {
    return (
      <motion.div
        {...motionProps}
        className={`relative inline-flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-[#111]/90 backdrop-blur-md border border-[#F59E0B]/30 shadow-[0_0_25px_rgba(245,158,11,0.15)] group hover:border-[#F59E0B]/60 transition-all ${className}`}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
          <BeeSvg width={48} height={40} />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
              A COLMEIA NEURON
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777] animate-pulse" />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">
            Mascote Oficial de IA &amp; Robótica
          </span>
          <span className="text-[9px] text-white/50 font-light">
            Inteligência Coletiva • DCC / UFLA
          </span>
        </div>
      </motion.div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 ${className}`}>
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <BeeSvg width={20} height={17} />
        </div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F59E0B]">
          A Colmeia NEURON
        </span>
      </div>
    );
  }

  // Standalone variant
  return (
    <motion.div
      {...motionProps}
      className={`inline-block ${className}`}
    >
      <BeeSvg width={size} height={typeof size === 'number' ? (size * 0.85) : size} />
    </motion.div>
  );
};
