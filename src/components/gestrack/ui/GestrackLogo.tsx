import React from 'react';
import { cn } from '@/lib/utils';

interface GestrackLogoProps {
  className?: string;
  showText?: boolean;
}

export const GestrackLogo = ({ className, showText = true }: GestrackLogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-12 h-12 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Circle Gradient */}
          <circle cx="50" cy="50" r="48" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
          <circle cx="50" cy="50" r="40" fill="url(#logo-gradient)" />
          
          {/* Shield/Eagle Silhouette (SVG Path approximation) */}
          <path
            d="M50 25C40 25 32 33 32 43C32 53 40 61 50 61C55 61 59 59 62 56L70 64V36L62 44C59 41 55 39 50 39C48 39 46 40 44 41C42 42 41 44 41 46C41 50 45 53 50 53C53 53 55 52 57 50"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Signal Icon */}
          <path d="M72 32C76 36 78 41 78 47" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M82 25C88 31 91 39 91 47" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="1" stopColor="#991b1b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none text-white">
              RASTRE<span className="text-red-600">MIX</span>
            </span>
          </div>
          <span className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.5em] mt-1 ml-0.5 whitespace-nowrap">
            SEGURANÇA VEICULAR
          </span>
        </div>
      )}
    </div>
  );
};
