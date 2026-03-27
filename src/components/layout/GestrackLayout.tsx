import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  UserCog, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  User,
  Settings,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GestrackButton } from '@/components/gestrack/ui/GestrackButton';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { GestrackLogo } from '@/components/gestrack/ui/GestrackLogo';
import { GestrackHelp } from '@/components/gestrack/ui/GestrackHelp';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';

interface GestrackLayoutProps {
  children: React.ReactNode;
}

const GestrackLayout = React.forwardRef<HTMLDivElement, GestrackLayoutProps>(({ children }, ref) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle Resize for Mobile/Desktop Detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'SELL (Vendas)', path: '/gestrack/sell', icon: ShoppingCart },
    { label: 'ERP (Gestão)', path: '/gestrack/erp', icon: LayoutDashboard },
    { label: 'TEC (Técnico)', path: '/gestrack/tec', icon: UserCog },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#000000] border-r border-zinc-900 shadow-2xl relative">
      {/* Sidebar Header / Logo (Only in Expanded) */}
      <div className={cn(
        "p-6 flex items-center gap-4 transition-all duration-500 overflow-hidden",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="flex flex-col">
             <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">Ambiente</span>
             <span className="text-sm font-black text-white italic tracking-tighter uppercase">Corporativo</span>
          </div>
        )}
        <div className={cn(
          "w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500",
          isCollapsed && "scale-110"
        )}>
          <GestrackLogo size="sm" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        <p className={cn(
          "text-[9px] text-zinc-700 font-black uppercase tracking-[0.3em] mb-4 transition-all duration-300",
          isCollapsed ? "text-center opacity-0 h-0 scale-0" : "ml-2"
        )}>
          Navegação Principal
        </p>
        
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
              location.pathname === item.path
                ? "bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.3)]"
                : "text-zinc-500 hover:bg-zinc-900/50 hover:text-white",
              isCollapsed && "justify-center px-0"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0", 
              location.pathname === item.path ? "text-white" : "text-zinc-600 group-hover:text-zinc-300"
            )} />
            {!isCollapsed && <span className="font-black text-[10px] uppercase tracking-widest whitespace-nowrap">{item.label}</span>}
            
            {(location.pathname === item.path && !isCollapsed) && (
              <motion.div 
                layoutId="nav-glow-active"
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-zinc-900 space-y-3">
         {!isCollapsed && (
           <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900 group cursor-pointer hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-500" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-white truncate">ADMINISTRADOR</p>
                    <p className="text-[8px] text-zinc-600 uppercase tracking-widest truncate">Rastremix Ltda</p>
                 </div>
              </div>
           </div>
         )}
         
         <GestrackButton 
           variant="ghost" 
           className={cn(
             "w-full justify-start text-zinc-500 hover:text-red-500 h-12 rounded-2xl",
             isCollapsed && "justify-center"
           )}
         >
           <LogOut className="w-5 h-5 flex-shrink-0" />
           {!isCollapsed && <span className="ml-3 font-black text-[9px] uppercase tracking-widest">Encerrar</span>}
         </GestrackButton>
      </div>

      {/* Collapse Toggle Button (Desktop Only) */}
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-44 w-6 h-6 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all z-[60] shadow-xl"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}
    </div>
  );

  return (
    <div ref={ref} className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans relative">
      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR / MOBILE DRAWER CONTENT */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[200] lg:relative transition-all duration-500 ease-in-out h-full",
        isMobile ? (isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full w-72") : (isCollapsed ? "w-24" : "w-72")
      )}>
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* TOP BAR / HEADER */}
        <header className="h-40 bg-[#000000] border-zinc-950 sticky top-0 z-[100] flex items-center px-6 lg:px-12 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-zinc-900">
          <div className="w-full flex items-center justify-between gap-10">
             {/* Left: Mobile Menu Button */}
             <div className="flex items-center gap-6 lg:hidden">
               <button 
                 onClick={() => setIsMobileOpen(true)}
                 className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all border border-zinc-800 shadow-xl"
               >
                 <Menu className="w-6 h-6" />
               </button>
             </div>

             {/* Left: Desktop Context (Only in expanded or collapsed) */}
             {!isMobile && (
               <div className="hidden lg:flex items-center gap-10 flex-1">
                 <GestrackBadge color="red" variant="glow" className="h-8 font-black tracking-[0.2em] uppercase">Enterprise Cloud</GestrackBadge>
                 <div className="h-1 w-24 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                 </div>
               </div>
             )}

             {/* CENTERED BRANDING LOGO */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
               <Link to="/gestrack" className="transition-all duration-700 hover:scale-110 hover:rotate-3 flex flex-col items-center group">
                 <GestrackLogo size="lg" />
                 <div className="mt-2 h-1 w-0 group-hover:w-12 bg-red-600 transition-all rounded-full hidden lg:block" />
               </Link>
             </div>

             {/* Right: Actions */}
             <div className="flex items-center justify-end gap-3 lg:gap-6 flex-1">
                <button className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-all hidden sm:flex">
                   <Bell className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-zinc-900 hidden lg:block" />
                 <Link 
                   to="/gestrack/admin"
                   className="flex items-center gap-3 px-6 h-14 rounded-2xl bg-white text-black font-black uppercase tracking-tighter italic text-[10px] hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-95"
                 >
                    <Settings className="w-4 h-4" /> <span className="hidden md:inline">Painel Admin</span>
                 </Link>
             </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-zinc-950/20 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
           <div className="p-6 lg:p-12 max-w-7xl mx-auto min-h-full">
              {children}
           </div>
        </main>
      </div>

      {/* Global Components */}
      <GestrackHelp />
    </div>
  );
});
GestrackLayout.displayName = 'GestrackLayout';

export default GestrackLayout;
