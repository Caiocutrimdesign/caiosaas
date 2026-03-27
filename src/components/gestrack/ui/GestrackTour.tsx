import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Zap } from 'lucide-react';
import { GestrackButton } from './GestrackButton';

interface TourStep {
  title: string;
  content: string;
  target?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Bem-vindo ao Tour Gestrack",
    content: "Vou te guiar pela jornada operacional completa. Primeiro, vamos entrar no Portal para ver como tudo se conecta."
  },
  {
    title: "Ciclo de Vendas (SELL)",
    content: "Aqui você inicia novos contratos. Cadastre o cliente e o veículo, selecione um plano e 'Feche a Venda'. Isso criará uma OS automática."
  },
  {
    title: "Gestão Operacional (ERP)",
    content: "A central de comando. Localize a OS criada e mobilize um técnico. Veja o status mudar para 'Em Execução' instantaneamente."
  },
  {
    title: "Engenharia de Campo (TEC)",
    content: "O app do técnico. Aqui ele faz a vistoria, solicita o teste de sinal satelital e finaliza com a assinatura do cliente."
  },
  {
    title: "Pronto para Começar?",
    content: "Agora que você entende o fluxo, experimente criar sua primeira venda e acompanhar até a finalização técnica!"
  }
];

export const GestrackTour = ({ onOpenChange }: { onOpenChange: (open: boolean) => void }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < TOUR_STEPS.length - 1) setCurrent(current + 1);
    else onOpenChange(false);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
          onClick={() => onOpenChange(false)}
        />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.9, y: 20 }}
           className="relative z-10 w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-[3rem] p-10 shadow-[0_30px_100px_rgba(0,0,0,1)] pointer-events-auto overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-900 overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((current + 1) / TOUR_STEPS.length) * 100}%` }}
                className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
             />
          </div>

          <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500">
                   <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">PASSO {current + 1} DE {TOUR_STEPS.length}</span>
             </div>
             <button onClick={() => onOpenChange(false)} className="text-zinc-600 hover:text-white transition-colors">
                <X className="w-6 h-6" />
             </button>
          </div>

          <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
            {TOUR_STEPS[current].title}
          </h3>
          
          <p className="text-zinc-400 text-lg font-medium leading-relaxed italic mb-10">
            "{TOUR_STEPS[current].content}"
          </p>

          <div className="flex justify-between items-center">
             <GestrackButton 
               variant="ghost" 
               onClick={prev} 
               disabled={current === 0}
               className="text-zinc-500 hover:text-white disabled:opacity-0"
             >
               <ChevronLeft className="mr-2" /> Anterior
             </GestrackButton>

             <GestrackButton 
               onClick={next} 
               className="h-14 px-8 bg-red-600 hover:bg-red-700 shadow-xl shadow-red-600/20"
             >
               {current === TOUR_STEPS.length - 1 ? "Entendi!" : "Próximo"} <ChevronRight className="ml-2" />
             </GestrackButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
