import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, UserCog, ArrowRight, ShieldCheck, Globe, Zap, ChevronRight, Activity, Bell, Popcorn, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GestrackLogo } from '@/components/gestrack/ui/GestrackLogo';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';
import { 
  GestrackCard, 
  GestrackCardContent, 
  GestrackCardHeader, 
  GestrackCardTitle,
  GestrackCardDescription 
} from '@/components/gestrack/ui/GestrackCard';
import { GestrackButton } from '@/components/gestrack/ui/GestrackButton';
import { GestrackHelp } from '@/components/gestrack/ui/GestrackHelp';
import { GestrackTour } from '@/components/gestrack/ui/GestrackTour';
import { GestrackRoadmap } from '@/components/gestrack/ui/GestrackRoadmap';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const GestrackIndex = () => {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [notifications] = useState([
    { title: 'Nova OS criada', desc: 'Contrato ativado via SELL', time: 'Agora', icon: ShoppingCart, color: 'red' },
    { title: 'Teste Pendente', desc: 'Técnico Ricardo aguardando sinal', time: '12min', icon: Zap, color: 'blue' },
    { title: 'OS Finalizada', desc: 'Protocolo OS-2024-8832 concluído', time: '45min', icon: CheckCircle2, color: 'green' }
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden selection:bg-red-600/30">
      {/* Tour Overlay */}
      {showTour && <GestrackTour onOpenChange={setShowTour} />}

      {/* Grainy Texture */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-[200]" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />

      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 h-40 py-8 px-10 flex flex-col items-center justify-center border-b border-zinc-900 bg-[#000000] backdrop-blur-3xl z-[300] shadow-[0_10px_50px_rgba(0,0,0,0.9)]">
        <div className="w-full max-w-7xl flex items-center justify-between relative h-full">
            <div className="hidden lg:flex items-center gap-10">
               <GestrackBadge color="red" variant="glow" className="h-7 px-4">SISTEMA INTELIGENTE</GestrackBadge>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/gestrack">
                <GestrackLogo size="xl" className="hover:scale-105 transition-all duration-700" />
              </Link>
            </div>

            <div className="flex items-center gap-6">
               <Popover>
                  <PopoverTrigger asChild>
                    <button className="relative text-zinc-500 hover:text-white transition-colors group">
                        <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-zinc-950 border-zinc-900 text-white p-0 rounded-3xl overflow-hidden shadow-2xl z-[400]">
                    <div className="bg-red-600 h-1 w-full" />
                    <div className="p-5 border-b border-zinc-900 bg-zinc-950/50">
                        <h4 className="font-black text-xs uppercase tracking-widest italic">Alertas Operacionais</h4>
                    </div>
                    <div className="p-2 space-y-1">
                        {notifications.map((n, i) => (
                           <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-900 transition-colors cursor-pointer group">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `bg-${n.color}-600/10 text-${n.color}-500 group-hover:scale-110 transition-transform`)}>
                                 <n.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-[10px] font-black uppercase text-white tracking-widest">{n.title}</p>
                                 <p className="text-[10px] text-zinc-500 truncate">{n.desc}</p>
                              </div>
                              <span className="text-[8px] text-zinc-700 font-bold">{n.time}</span>
                           </div>
                        ))}
                    </div>
                    <Link to="/gestrack/erp" className="block text-center py-4 bg-zinc-950 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                        Ver todo o sistema
                    </Link>
                  </PopoverContent>
               </Popover>
               <div className="h-5 w-px bg-zinc-800 hidden md:block" />
               <GestrackButton onClick={() => navigate('/gestrack/erp')} className="hidden md:flex h-12 px-8 bg-white text-black hover:bg-zinc-200">
                 Acessar Portal
               </GestrackButton>
            </div>
        </div>
      </header>

      <div className="h-40" />

      <main className="max-w-7xl mx-auto px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-10 shadow-2xl">
              <Activity className="w-4 h-4" /> Gestrack Operations v2.0
            </div>
            <h1 className="text-8xl font-black leading-[0.85] tracking-tighter uppercase italic text-white mb-10">
              DOMINE A SUA <br />
              <span className="text-red-600">OPERAÇÃO.</span>
            </h1>
            <div className="flex flex-wrap gap-6">
              <GestrackButton 
                onClick={() => setShowTour(true)}
                className="h-16 px-12 text-lg bg-red-600 hover:bg-red-700 shadow-2xl shadow-red-600/30 group"
              >
                Iniciar Demonstração <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </GestrackButton>
              <GestrackRoadmap />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
            <GestrackCard accent="red" className="p-8 bg-zinc-950/40 backdrop-blur-3xl border-zinc-900 shadow-2xl">
               <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all cursor-pointer">
                        <Zap className="w-10 h-10 text-white fill-white" />
                     </div>
                  </div>
               </div>
            </GestrackCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Módulo SELL", path: "/gestrack/sell", icon: ShoppingCart, color: "red", desc: "Contratos e Vendas" },
            { title: "Módulo ERP", path: "/gestrack/erp", icon: LayoutDashboard, color: "zinc", desc: "Gestão Operacional" },
            { title: "Módulo TEC", path: "/gestrack/tec", icon: UserCog, color: "red", desc: "Interface de Campo" }
          ].map((item, i) => (
            <Link key={i} to={item.path}>
              <GestrackCard accent={item.color as any} className="group hover:-translate-y-4 transition-all duration-700 p-8 h-full" delay={i * 0.2}>
                <item.icon className="w-14 h-14 mb-8 text-red-600" />
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-white group-hover:text-red-500 transition-colors uppercase">{item.title}</h3>
                <p className="text-zinc-500 font-medium italic">{item.desc}</p>
                <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-700 opacity-0 group-hover:opacity-100 transition-all">
                   Abrir Módulo <ChevronRight className="w-4 h-4" />
                </div>
              </GestrackCard>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-24 text-center border-t border-zinc-900/50 bg-[#000000] z-[300] relative">
        <GestrackLogo size="lg" className="mb-6" />
        <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.6em]">© 2024 Rastremix Segurança Veicular. Todos os direitos reservados.</p>
      </footer>

      <GestrackHelp />
    </div>
  );
};

export default GestrackIndex;
