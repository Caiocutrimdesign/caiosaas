import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface GestrackButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export const GestrackButton = ({ 
  children, 
  isLoading, 
  loadingText, 
  className, 
  variant = 'default',
  ...props 
}: GestrackButtonProps) => {
  const isPrimary = variant === 'default' || !variant;
  
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 font-bold uppercase tracking-widest text-[10px] h-11 px-8 rounded-xl",
        isPrimary && "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 active:scale-95",
        variant === 'outline' && "border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800",
        isLoading && "pointer-events-none opacity-80",
        className
      )}
      variant={variant}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-3 h-3 animate-spin" />
            {loadingText && <span>{loadingText}</span>}
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};
