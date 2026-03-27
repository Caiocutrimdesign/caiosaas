import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, UserCog, ArrowRight, ShieldCheck, Globe, Zap, ChevronRight, Activity, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
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

const GestrackIndex = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden selection:bg-red-600/30">
      {/* Grainy Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-[200]" />
      
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full -z-10" />

      {/* FIXED HEADER WITH CENTERED LOGO */}
      <header className="fixed top-0 left-0 right-0 h-48 py-8 px-10 flex flex-col items-center justify-center border-b border-zinc-900 bg-[#000000] backdrop-blur-3xl z-[300] shadow-[0_10px_50px_rgba(0,0,0,0.9)]">
        <div className="w-full max-w-7xl flex items-center justify-between relative h-full">
            {/* Left Nav */}
            <div className="hidden lg:flex items-center gap-10">
               <GestrackBadge color="red" variant="glow" className="h-7 px-4">v2.0 ENTERPRISE</GestrackBadge>
            </div>

            {/* Centered Large Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/gestrack">
                <GestrackLogo size="xl" className="hover:scale-105 transition-all duration-700" />
              </Link>
            </div>

            {/* Right Nav */}
            <div className="flex items-center gap-6">
               <div className="h-5 w-px bg-zinc-800 hidden md:block" />
               <button className="relative text-zinc-500 hover:text-white transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
               </button>
               <GestrackButton className="hidden md:flex h-12 px-8 bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5">
                 Acessar Portal
               </GestrackButton>
            </div>
        </div>
      </header>

      {/* Offset for Fixed Header */}
      <div className="h-48" />

      <main className="max-w-7xl mx-auto px-10 py-24 pt-32">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-red-500 font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl">
              <Activity className="w-4 h-4 animate-pulse" /> Unified Monitoring Shield
            </div>
            
            <h1 className="text-8xl font-black leading-[0.85] tracking-tighter uppercase italic text-white drop-shadow-2xl">
              PRECISÃO <br />
              <span className="text-red-600">ABSOLUTA.</span><br />
              <span className="text-zinc-400">CONTROLE TOTAL.</span>
            </h1>

            <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-lg italic">
              A arquitetura definitiva para rastreamento veicular de alta performance. 
              Integração nativa entre comercial, administrativo e engenharia de campo.
            </p>

            <div className="flex flex-wrap gap-6 pt-6">
              <GestrackButton className="h-16 px-12 text-lg bg-red-600 hover:bg-red-700 shadow-2xl shadow-red-600/30 group">
                Iniciar Demonstração <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </GestrackButton>
              <GestrackButton variant="outline" className="h-16 px-12 text-lg border-zinc-800 hover:bg-zinc-900 group">
                Ver Roadmap <ChevronRight className="ml-2 opacity-50 group-hover:translate-x-1 transition-all" />
              </GestrackButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-600/20 blur-[150px] rounded-full animate-pulse" />
            <GestrackCard accent="red" className="relative bg-zinc-950/40 backdrop-blur-3xl border-zinc-900 p-8 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
               <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all cursor-pointer">
                        <Zap className="w-10 h-10 text-white fill-white" />
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-6 mt-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2 + i, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/2 bg-red-600" 
                       />
                    </div>
                  ))}
               </div>
            </GestrackCard>
          </motion.div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Module SELL", 
              path: "/gestrack/sell", 
              icon: ShoppingCart, 
              color: "red",
              desc: "Ciclo de vendas ultra-rápido com ativação automática de contratos e geração de OS."
            },
            { 
              title: "Module ERP", 
              path: "/gestrack/erp", 
              icon: LayoutDashboard, 
              color: "zinc",
              desc: "Controle operacional centralizado com mobilização técnica e monitoramento de KPIs." 
            },
            { 
              title: "Module TEC", 
              path: "/gestrack/tec", 
              icon: UserCog, 
              color: "red",
              desc: "Interface mobile-first para engenheiros de campo com homologação satelital via app." 
            }
          ].map((item, i) => (
            <Link key={i} to={item.path}>
              <GestrackCard 
                accent={item.color as any} 
                className="group hover:-translate-y-4 transition-all duration-700 bg-zinc-950/50 backdrop-blur-xl border-zinc-900/50 h-full p-8"
                delay={i * 0.2}
              >
                <item.icon className={cn("w-14 h-14 mb-8 transition-all duration-700 group-hover:scale-110", item.color === 'red' ? "text-red-600" : "text-white")} />
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-white group-hover:text-red-500 transition-colors">{item.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed mb-10">{item.desc}</p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-red-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0">
                  Acessar Módulo <ChevronRight className="w-4 h-4" />
                </div>
              </GestrackCard>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-24 text-center border-t border-zinc-900/50 bg-[#000000] backdrop-blur-xl relative z-[200]">
        <div className="flex flex-col items-center justify-center mb-12">
           <GestrackLogo size="lg" className="mb-4" />
        </div>
        <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.6em]">© 2024 Rastremix Segurança Veicular. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-10 mt-10">
           {['Termos', 'Privacidade', 'Segurança'].map(t => (
             <span key={t} className="text-[8px] text-zinc-800 font-bold uppercase tracking-widest hover:text-zinc-500 cursor-pointer transition-colors">{t}</span>
           ))}
        </div>
      </footer>
    </div>
  );
};

export default GestrackIndex;
