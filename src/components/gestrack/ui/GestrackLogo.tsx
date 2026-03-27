import React from 'react';
import { cn } from '@/lib/utils';

interface GestrackLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GestrackLogo = ({ className, showText = true, size = 'md' }: GestrackLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-28 h-28"
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-5xl"
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative flex-shrink-0">
        <img 
          src="/2222.png" 
          alt="Rastremix Logo" 
          className={cn("object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]", sizeClasses[size])}
        />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={cn("font-black tracking-tighter uppercase italic leading-none text-white", textClasses[size])}>
              RASTRE<span className="text-red-600">MIX</span>
            </span>
          </div>
          <span className={cn("text-zinc-500 font-black uppercase tracking-[0.5em] mt-1 ml-0.5 whitespace-nowrap", size === 'xl' ? "text-xs" : size === 'lg' ? "text-[10px]" : "text-[8px]")}>
            SEGURANÇA VEICULAR
          </span>
        </div>
      )}
    </div>
  );
};
