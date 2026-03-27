import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GestrackCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  accent?: 'red' | 'blue' | 'zinc';
  delay?: number;
  onClick?: () => void;
}

export const GestrackCard = React.forwardRef<HTMLDivElement, GestrackCardProps>(({ 
  children, 
  className, 
  hoverEffect = true,
  accent = 'zinc',
  delay = 0,
  onClick
}, ref) => {
  const accentColors = {
    red: "border-l-red-600/50 hover:border-l-red-600",
    blue: "border-l-blue-600/50 hover:border-l-blue-600",
    zinc: "border-l-zinc-800 hover:border-l-zinc-600"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={cn(
        "bg-zinc-900/40 border border-zinc-800 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500",
        accent && `border-l-4 ${accentColors[accent]}`,
        hoverEffect && "hover:bg-zinc-900/60 hover:border-zinc-700 group",
        className
      )}
    >
      {children}
    </motion.div>
  );
});
GestrackCard.displayName = 'GestrackCard';

export const GestrackCardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("p-8 pb-4", className)}>{children}</div>
);

export const GestrackCardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h3 className={cn("text-xl font-bold text-white tracking-tight uppercase italic", className)}>{children}</h3>
);

export const GestrackCardDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={cn("text-sm text-zinc-500 font-medium", className)}>{children}</p>
);

export const GestrackCardContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode, className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("px-8 pb-8", className)}>{children}</div>
  )
);
GestrackCardContent.displayName = 'GestrackCardContent';
