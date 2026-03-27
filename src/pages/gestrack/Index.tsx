import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, UserCog, ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GestrackIndex = () => {
  const modules = [
    {
      title: 'SELL',
      desc: 'Gestão de vendas, prospecção e novos contratos com fluxo simplificado.',
      path: '/gestrack/sell',
      icon: ShoppingCart,
      color: 'bg-blue-600',
      shadow: 'shadow-blue-600/20'
    },
    {
      title: 'ERP',
      desc: 'Controle operacional total, gestão de OS e monitoramento de equipe.',
      path: '/gestrack/erp',
      icon: LayoutDashboard,
      color: 'bg-red-600',
      shadow: 'shadow-red-600/20'
    },
    {
      title: 'TEC',
      desc: 'App de campo para técnicos com checklist e fotos geolocalizadas.',
      path: '/gestrack/tec',
      icon: UserCog,
      color: 'bg-zinc-800',
      shadow: 'shadow-zinc-800/20'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-500/30 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse duration-[4000ms]" />

      <header className="py-10 px-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-xl shadow-red-600/30">G</div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">Gestrack <span className="text-zinc-500 font-normal not-italic">SaaS</span></span>
        </div>
        <div className="flex items-center gap-4">
          <LocalBadge className="border-zinc-800 text-zinc-500 h-8 font-bold tracking-widest uppercase text-[10px]">v1.0 MVP</LocalBadge>
          <Button variant="ghost" className="text-zinc-400 hover:text-white">Documentação</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-10 py-20">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Ecossistema de Rastreamento Inteligente
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic"
          >
            DOMINE A <span className="text-red-600">OPERAÇÃO.</span> <br />
            ESCALA O <span className="text-blue-500">FUTURO.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            A plataforma completa para empresas de rastreamento que buscam excelência do comercial ao técnico.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (i * 0.1) }}
            >
              <Link to={mod.path} className="group block h-full">
                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl h-full transition-all duration-500 hover:border-red-600/50 hover:bg-zinc-900/80 group-hover:-translate-y-2 overflow-hidden relative">
                  <div className={cn("h-1 w-0 group-hover:w-full transition-all duration-500 absolute top-0 left-0", mod.color)} />
                  <CardHeader className="pt-8 px-8 pb-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500", mod.color, mod.shadow)}>
                      <mod.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black text-white italic">{mod.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
                      {mod.desc}
                    </p>
                    <div className="flex items-center text-sm font-bold text-red-500 group-hover:gap-2 transition-all">
                      ACESSAR MÓDULO <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Bottom */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-900 pt-16">
          <div className="flex gap-4">
            <Zap className="w-10 h-10 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Alta Performance</h4>
              <p className="text-sm text-zinc-500">Interface ultra-rápida construída para operações dinâmicas.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <ShieldCheck className="w-10 h-10 text-blue-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Segurança Enterprise</h4>
              <p className="text-sm text-zinc-500">Proteção de dados e logs de auditoria em cada etapa.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Globe className="w-10 h-10 text-zinc-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Nuvem Global</h4>
              <p className="text-sm text-zinc-500">Infraestrutura escalável pronta para o seu crescimento.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center border-t border-zinc-900">
        <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest">© 2024 Gestrack Intelligent Systems. Powered by Rastremix.</p>
      </footer>
    </div>
  );
};

const LocalBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors", className)}>
    {children}
  </span>
);

const Card = ({ children, className }: any) => <div className={cn("rounded-3xl border", className)}>{children}</div>;
const CardHeader = ({ children, className }: any) => <div className={cn("p-6", className)}>{children}</div>;
const CardTitle = ({ children, className }: any) => <h3 className={cn("text-2xl font-semibold", className)}>{children}</h3>;
const CardContent = ({ children, className }: any) => <div className={cn("p-6 pt-0", className)}>{children}</div>;

export default GestrackIndex;
