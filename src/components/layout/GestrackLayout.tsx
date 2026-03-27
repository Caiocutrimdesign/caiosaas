import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, UserCog, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { GestrackLogo } from '@/components/gestrack/ui/GestrackLogo';
import { GestrackHelp } from '@/components/gestrack/ui/GestrackHelp';

interface GestrackLayoutProps {
  children: React.ReactNode;
}

const GestrackLayout = ({ children }: GestrackLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { label: 'SELL (Vendas)', path: '/gestrack/sell', icon: ShoppingCart },
    { label: 'ERP (Gestão)', path: '/gestrack/erp', icon: LayoutDashboard },
    { label: 'TEC (Técnico)', path: '/gestrack/tec', icon: UserCog },
  ];

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white overflow-hidden font-sans">
      {/* Fixed Top Bar matching Logo Background (Perfect Black/Zinc-950) */}
      <header className="h-40 bg-[#000000] border-b border-zinc-900 sticky top-0 z-[100] flex flex-col items-center justify-center px-10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="w-full max-w-7xl flex items-center justify-between">
           {/* Sidebar Toggle or Empty for balance */}
           <div className="w-48 hidden md:block">
              <span className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">SISTEMA OPERACIONAL</span>
           </div>

           {/* Centered Large Logo */}
           <Link to="/gestrack" className="transition-transform duration-500 hover:scale-105">
             <GestrackLogo size="lg" className="mx-auto" />
           </Link>

           {/* User Meta */}
           <div className="w-48 flex justify-end">
              <Button variant="ghost" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 gap-3 font-bold uppercase text-[10px] tracking-widest">
                <LogOut className="w-4 h-4" /> Sair
              </Button>
           </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Module Sidebar */}
        <aside className="w-64 border-r border-zinc-900 bg-[#000000] flex flex-col p-6 z-50">
          <nav className="flex-1 space-y-3">
            <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.3em] mb-4 ml-2">Módulos Integrados</p>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  location.pathname === item.path
                    ? "bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.3)]"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", location.pathname === item.path ? "text-white" : "text-zinc-600 group-hover:text-zinc-300")} />
                <span className="font-black text-[10px] uppercase tracking-widest">{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                  />
                )}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-6 border-t border-zinc-900/50">
             <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                <p className="text-[8px] text-zinc-600 font-black uppercase tracking-widest mb-1">Status do Servidor</p>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                   <span className="text-[10px] font-bold text-zinc-400">ONLINE • VPN ATIVA</span>
                </div>
             </div>
          </div>
        </aside>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 relative">
          <div className="p-10 max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global Help Button */}
      <GestrackHelp />
    </div>
  );
};

export default GestrackLayout;
