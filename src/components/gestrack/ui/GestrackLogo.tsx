import React from 'react';
import { cn } from '@/lib/utils';

interface GestrackLogoProps {
  className?: string;
  showText?: boolean; // Kept for interface compatibility but defaulted to false
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const GestrackLogo = ({ className, size = 'md' }: GestrackLogoProps) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
    '2xl': "w-44 h-44"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative flex-shrink-0">
        <img 
          src="/2222.png" 
          alt="Rastremix Logo" 
          className={cn("object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse-slow", sizeClasses[size])}
        />
      </div>
    </div>
  );
};
