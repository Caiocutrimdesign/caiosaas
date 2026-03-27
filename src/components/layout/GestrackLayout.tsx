import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, UserCog, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-red-600/20">G</div>
          <span className="text-xl font-bold tracking-tight">Gestrack</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                location.pathname === item.path
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", location.pathname === item.path ? "text-white" : "text-zinc-500 group-hover:text-zinc-300")} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 px-4 py-3 h-auto">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sair</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 relative">
        <div className="p-8 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default GestrackLayout;
