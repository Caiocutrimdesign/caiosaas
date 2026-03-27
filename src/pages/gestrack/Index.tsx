import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, UserCog, ArrowRight, ShieldCheck, Globe, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';
import { 
  GestrackCard, 
  GestrackCardContent, 
  GestrackCardHeader, 
  GestrackCardTitle 
} from '@/components/gestrack/ui/GestrackCard';
import { GestrackButton } from '@/components/gestrack/ui/GestrackButton';

const GestrackIndex = () => {
  const modules = [
    {
      title: 'SELL',
      desc: 'Gestão de vendas, prospecção e novos contratos com fluxo simplificado.',
      path: '/gestrack/sell',
      icon: ShoppingCart,
      color: 'red',
      tag: 'Comercial'
    },
    {
      title: 'ERP',
      desc: 'Controle operacional total, gestão de OS e monitoramento de equipe.',
      path: '/gestrack/erp',
      icon: LayoutDashboard,
      color: 'blue',
      tag: 'Gestão'
    },
    {
      title: 'TEC',
      desc: 'App de campo para técnicos com checklist e fotos geolocalizadas.',
      path: '/gestrack/tec',
      icon: UserCog,
      color: 'zinc',
      tag: 'Campo'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-500/30 overflow-hidden relative">
      {/* Enhanced Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -z-10 animate-pulse duration-[5000ms]" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none -z-10" />

      <header className="py-8 px-10 flex justify-between items-center max-w-7xl mx-auto border-b border-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-red-600/40 group-hover:rotate-12 transition-transform duration-500">G</div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Gestrack</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mt-1 ml-1">Intelligent SaaS</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <GestrackBadge color="zinc" variant="glow" className="h-8">v1.5 Premium MVP</GestrackBadge>
          <div className="h-4 w-px bg-zinc-800" />
          <GestrackButton variant="ghost" className="text-zinc-500 hover:text-white group">
            Documentação <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </GestrackButton>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-10 py-24">
        <div className="text-center mb-32 max-w-4xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Ecossistema de Rastreamento Enterprise
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-10 italic leading-[0.85]"
          >
            DOMINE A <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">OPERAÇÃO.</span> <br />
            ESCALA O <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">FUTURO.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-2xl text-zinc-500 leading-relaxed font-bold tracking-tight max-w-3xl mx-auto italic"
          >
            A plataforma definitiva para empresas de rastreamento que não aceitam nada menos que a <span className="text-zinc-200">excelência absoluta.</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Decorative line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -z-10" />
          
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.15), duration: 0.6 }}
            >
              <Link to={mod.path} className="group block h-full">
                <GestrackCard 
                  accent={mod.color as any} 
                  className="h-full border-zinc-800/50 hover:border-red-600/30 bg-zinc-900/20"
                >
                  <GestrackCardHeader className="pt-10 px-10">
                    <div className={cn(
                      "w-16 h-16 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6",
                      mod.color === 'red' ? "bg-red-600 shadow-red-600/30" : 
                      mod.color === 'blue' ? "bg-blue-600 shadow-blue-600/30" : 
                      "bg-zinc-800 shadow-zinc-800/30"
                    )}>
                      <mod.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <GestrackCardTitle className="text-4xl">{mod.title}</GestrackCardTitle>
                      <GestrackBadge color={mod.color as any} variant="glow">{mod.tag}</GestrackBadge>
                    </div>
                  </GestrackCardHeader>
                  <GestrackCardContent className="px-10 pb-10">
                    <p className="text-zinc-500 mb-10 leading-relaxed font-bold text-sm tracking-tight group-hover:text-zinc-300 transition-colors">
                      {mod.desc}
                    </p>
                    <div className="flex items-center text-[10px] font-black text-red-600 tracking-[0.3em] group-hover:gap-4 transition-all duration-500">
                      ACESSAR MÓDULO <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </GestrackCardContent>
                </GestrackCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-20">
          {[
            { icon: Zap, title: 'LATÊNCIA ZERO', desc: 'Processamento em tempo real com arquitetura distribuída.', color: 'text-red-500' },
            { icon: ShieldCheck, title: 'CRIPTOGRAFIA 256', desc: 'Dados protegidos com padrões de segurança bancários.', color: 'text-blue-500' },
            { icon: Globe, title: 'DISPONIBILIDADE 99%', desc: 'Infraestrutura global redundante para sua operação.', color: 'text-zinc-400' }
          ].map((feat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="flex gap-6 group"
            >
              <div className={cn("w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-red-600/10 group-hover:border-red-600/20", feat.color)}>
                <feat.icon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-black text-white mb-2 uppercase italic tracking-tighter text-lg">{feat.title}</h4>
                <p className="text-xs text-zinc-500 font-bold leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-24 text-center border-t border-zinc-900/50 bg-zinc-950/50 backdrop-blur-xl">
        <div className="flex items-center justify-center gap-3 mb-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center font-black text-xs">G</div>
           <span className="text-sm font-black tracking-tighter uppercase italic">Gestrack</span>
        </div>
        <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.6em]">© 2024 Intelligent Systems. Powered by Rastremix Enterprise.</p>
      </footer>
    </div>
  );
};

export default GestrackIndex;
