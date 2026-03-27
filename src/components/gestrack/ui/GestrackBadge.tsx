import React from 'react';
import { cn } from '@/lib/utils';

interface GestrackBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'outline' | 'solid' | 'glow';
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'zinc';
}

export const GestrackBadge = ({ 
  children, 
  className, 
  variant = 'outline',
  color = 'red'
}: GestrackBadgeProps) => {
  const colors = {
    red: "text-red-500 border-red-500/20 bg-red-500/5 glow:shadow-red-500/20",
    blue: "text-blue-500 border-blue-500/20 bg-blue-500/5 glow:shadow-blue-500/20",
    green: "text-green-500 border-green-500/20 bg-green-500/5 glow:shadow-green-500/20",
    yellow: "text-yellow-500 border-yellow-500/20 bg-yellow-500/5 glow:shadow-yellow-500/20",
    zinc: "text-zinc-400 border-zinc-800 bg-zinc-900 glow:shadow-zinc-500/10"
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border transition-all duration-300",
      colors[color],
      variant === 'solid' && `bg-${color}-600 text-white border-transparent`,
      variant === 'glow' && "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
      className
    )}>
      {children}
    </span>
  );
};
