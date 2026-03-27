import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { HelpCircle, Info, ShoppingCart, LayoutDashboard, UserCog, Zap, ChevronRight, BookOpen } from 'lucide-react';
import { GestrackButton } from './GestrackButton';
import { GestrackBadge } from './GestrackBadge';

const HelpSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="space-y-3 mb-10">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-red-600/10 flex items-center justify-center text-red-500">
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="font-black uppercase italic tracking-tighter text-white">{title}</h3>
    </div>
    <div className="pl-11 text-zinc-500 text-sm leading-relaxed font-medium">
      {children}
    </div>
  </div>
);

export const GestrackHelp = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed right-8 bottom-8 z-[500] w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden">
          <BookOpen className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#000000] border-l border-zinc-900 w-full sm:max-w-md text-white overflow-y-auto scrollbar-hide">
        <SheetHeader className="mt-10 mb-12">
          <GestrackBadge color="red" variant="glow" className="mx-auto mb-6">Guia de Operação Gestrack</GestrackBadge>
          <SheetTitle className="text-4xl font-black text-white italic uppercase tracking-tighter text-center">
             Manual <span className="text-red-600 italic">Interno</span>
          </SheetTitle>
        </SheetHeader>

        <div className="px-2 pb-20">
          <HelpSection title="1. Introdução" icon={Info}>
            O Gestrack é um ecossistema inteligente que unifica o ciclo de vida do rastreamento veicular. Esta demo simula a jornada real desde a venda até a homologação técnica.
          </HelpSection>

          <HelpSection title="2. Módulo SELL (Vendas)" icon={ShoppingCart}>
            A porta de entrada. Aqui você cadastra clientes e veículos. 
            <p className="mt-2 text-zinc-400 font-bold italic underline decoration-red-600/30 line-through">Regra de Negócio:</p>
            Ao clicar em <span className="text-white font-bold">"Fechar Venda"</span>, o sistema gera uma OS automática vinculada ao contrato.
          </HelpSection>

          <HelpSection title="3. Módulo ERP (Gestão)" icon={LayoutDashboard}>
              O cérebro operacional. Monitore a fila de ordens pendentes. Use o botão <span className="text-red-500 font-bold">"Mobilizar"</span> para atribuir um técnico (ex: Ricardo Silva) e disparar a execução.
          </HelpSection>

          <HelpSection title="4. Módulo TEC (Técnico)" icon={UserCog}>
              Interface mobile para o campo. O técnico recebe a OS, captura fotos e solicita o <span className="text-blue-500 font-bold">Teste de Sinal</span>. Após a aprovação satelital, colha a assinatura do cliente para finalizar.
          </HelpSection>

          <HelpSection title="5. Fluxo Completo" icon={Zap}>
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900 space-y-4">
                 {[
                   "Venda iniciada no SELL",
                   "OS gerada e enviada ao ERP",
                   "Técnico atribuído no ERP",
                   "Serviço executado no TEC",
                   "OS finalizada e baixada no ERP"
                 ].map((step, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black">{i+1}</div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{step}</span>
                   </div>
                 ))}
              </div>
          </HelpSection>

          <div className="p-6 bg-red-600/5 rounded-3xl border border-red-600/20 mt-10">
             <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Dica Rápida</h4>
             <p className="text-xs text-zinc-400 font-medium italic">"Use o botão de sino no topo da tela para ver notificações em tempo real conforme você avança no fluxo."</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
