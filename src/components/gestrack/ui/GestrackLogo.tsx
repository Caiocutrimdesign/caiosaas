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
        <img 
          src="/2222.png" 
          alt="Rastremix Logo" 
          className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]"
        />
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
