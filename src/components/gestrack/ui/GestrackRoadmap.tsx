import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { ShoppingCart, LayoutDashboard, UserCog, ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { GestrackBadge } from './GestrackBadge';

const RoadmapStep = ({ icon: Icon, title, desc, status }: { icon: any, title: string, desc: string, status: string }) => (
  <div className="flex gap-6 items-start relative pb-12 last:pb-0">
    <div className="absolute left-6 top-12 bottom-0 w-px bg-zinc-900 last:hidden" />
    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 relative z-10 shadow-2xl">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 pt-1">
      <div className="flex items-center gap-3 mb-1">
        <h4 className="font-black uppercase italic tracking-tighter text-white">{title}</h4>
        <GestrackBadge color="zinc" variant="outline" className="text-[8px] h-5">{status}</GestrackBadge>
      </div>
      <p className="text-zinc-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export const GestrackRoadmap = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-16 px-12 text-lg font-bold border-zinc-800 hover:bg-zinc-900 group rounded-2xl bg-zinc-950/50 backdrop-blur-xl border flex items-center justify-center transition-all hover:border-zinc-700">
          Ver Roadmap <ChevronRight className="ml-2 opacity-50 group-hover:translate-x-1 transition-all" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#000000] border-zinc-900 text-white rounded-[3rem] p-10 max-w-2xl sm:max-w-xl">
        <DialogHeader className="mb-12">
          <GestrackBadge color="red" variant="glow" className="mx-auto mb-6">Pipeline de Produto 2024</GestrackBadge>
          <DialogTitle className="text-5xl font-black text-white italic uppercase tracking-tighter text-center">
             Evolução <span className="text-red-600">Gestrack</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
            <RoadmapStep 
              icon={ShoppingCart} 
              title="Módulo SELL" 
              status="DISPONÍVEL" 
              desc="Funil de vendas digital, integração de tabelas de preços e geração inteligente de Ordens de Serviço."
            />
            <RoadmapStep 
              icon={LayoutDashboard} 
              title="Módulo ERP" 
              status="DISPONÍVEL" 
              desc="BI em tempo real, gestão de frotas, escalas técnicas e controle de estoque de dispositivos."
            />
            <RoadmapStep 
              icon={UserCog} 
              title="Módulo TEC" 
              status="DISPONÍVEL" 
              desc="Protocolo de campo mobile, checklist de instalação e homologação de hardware via satélite."
            />
            <RoadmapStep 
              icon={Zap} 
              title="AI Fleet" 
              status="Q4-2024" 
              desc="Predição de falhas e otimização de rotas baseada em comportamento de direção."
            />
        </div>
      </DialogContent>
    </Dialog>
  );
};
