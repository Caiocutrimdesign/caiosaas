import React from 'react';
import GestrackLayout from '@/components/layout/GestrackLayout';
import { useGestrackStore } from '@/hooks/useGestrackStore';
import { 
  Users, 
  Car, 
  ClipboardList, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle,
  Activity,
  ArrowRight,
  UserCheck,
  Package,
  Server
} from 'lucide-react';
import { 
  GestrackCard, 
  GestrackCardContent, 
  GestrackCardHeader, 
  GestrackCardTitle 
} from '@/components/gestrack/ui/GestrackCard';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const { clients, vehicles, orders, technicians } = useGestrackStore();

  const stats = [
    { label: 'Total de Clientes', value: clients.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Frota Rastreada', value: vehicles.length, icon: Car, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Ordens Ativas', value: orders.filter(o => o.status !== 'finished').length, icon: ClipboardList, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Técnicos em Campo', value: technicians.length, icon: UserCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <GestrackLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Painel <span className="text-red-600">Admin</span></h1>
            <p className="text-zinc-500 font-bold text-xs mt-3 uppercase tracking-[0.3em]">Visão geral de infraestrutura e performance</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Status do Servidor</p>
               <p className="text-xs font-bold text-green-500 flex items-center justify-end gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> OPERACIONAL
               </p>
             </div>
             <div className="h-10 w-px bg-zinc-900 mx-4 hidden sm:block" />
             <GestrackBadge color="red" variant="glow" className="h-10 px-6 font-black tracking-widest uppercase">Master Admin</GestrackBadge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GestrackCard accent="red" className="hover:border-red-600/30 transition-all border-zinc-900">
                <GestrackCardContent className="p-6">
                   <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <TrendingUp className="w-4 h-4 text-zinc-800" />
                   </div>
                   <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                   <h3 className="text-3xl font-black text-white tracking-tighter italic uppercase">{stat.value}</h3>
                </GestrackCardContent>
              </GestrackCard>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Oversight Card */}
          <GestrackCard className="lg:col-span-2 border-zinc-950 bg-[#000000] shadow-2xl">
            <GestrackCardHeader className="flex flex-row items-center justify-between border-b border-zinc-900 pb-6 mb-6">
               <GestrackCardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-3">
                 <Activity className="w-5 h-5 text-red-600" /> Últimas Atividades do Sistema
               </GestrackCardTitle>
               <Link to="/gestrack/erp" className="text-[10px] text-zinc-500 hover:text-white transition-colors font-black uppercase tracking-widest flex items-center gap-2">
                 Ver Tudo <ArrowRight className="w-3 h-3" />
               </Link>
            </GestrackCardHeader>
            <GestrackCardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="border-b border-zinc-900">
                       <th className="px-6 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">Referência</th>
                       <th className="px-6 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">Status Atual</th>
                       <th className="px-6 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">Plano</th>
                       <th className="px-6 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest text-right">Ação</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-zinc-900">
                     {recentOrders.map((order) => (
                       <tr key={order.id} className="group hover:bg-zinc-900/30 transition-all">
                         <td className="px-6 py-4">
                           <div className="flex flex-col">
                             <span className="text-xs font-black text-white uppercase tracking-tighter italic">{order.id}</span>
                             <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                            <GestrackBadge color={order.status === 'finished' ? 'green' : order.status === 'in_progress' ? 'blue' : 'yellow'}>
                              {order.status === 'finished' ? 'Sincronizado' : order.status === 'in_progress' ? 'Em Processo' : 'Aguardando'}
                            </GestrackBadge>
                         </td>
                         <td className="px-6 py-4">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{order.plan}</span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <Link to="/gestrack/erp" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center inline-flex hover:bg-red-600 hover:text-white transition-all group-hover:scale-110">
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </GestrackCardContent>
          </GestrackCard>

          {/* Quick Access Sidebar */}
          <div className="space-y-6">
             <GestrackCard className="border-zinc-900 bg-zinc-950/50">
                <GestrackCardHeader>
                   <GestrackCardTitle className="text-xs font-black uppercase tracking-widest italic">Acesso Rápido</GestrackCardTitle>
                </GestrackCardHeader>
                <GestrackCardContent className="space-y-3">
                   {[
                     { label: 'Gerente Comercial', path: '/gestrack/sell', icon: ShoppingCartIcon, desc: 'Módulo de Vendas' },
                     { label: 'Centro Logístico', path: '/gestrack/erp', icon: Server, desc: 'Módulo de Gestão' },
                     { label: 'Front Técnico', path: '/gestrack/tec', icon: LaptopIcon, desc: 'Módulo do Campo' }
                   ].map(item => (
                     <Link key={item.label} to={item.path} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900 hover:border-red-600/50 hover:bg-zinc-900 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-zinc-600 group-hover:text-red-500 transition-colors">
                           <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                           <p className="text-[10px] font-black text-white uppercase italic leading-none mb-1">{item.label}</p>
                           <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{item.desc}</p>
                        </div>
                     </Link>
                   ))}
                </GestrackCardContent>
             </GestrackCard>

             <GestrackCard accent="blue" className="bg-blue-600/5 border-blue-600/20">
                <GestrackCardContent className="p-6">
                   <div className="flex items-center gap-4 mb-4">
                      <ShieldCheck className="w-10 h-10 text-blue-500" />
                      <div>
                        <h4 className="text-sm font-black text-white uppercase italic tracking-tighter">Backup Seguro</h4>
                        <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Sincronização em tempo real ativa</p>
                      </div>
                   </div>
                   <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="h-full w-1/3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                      />
                   </div>
                </GestrackCardContent>
             </GestrackCard>
          </div>
        </div>
      </div>
    </GestrackLayout>
  );
};

// Icons needed but not imported
const ShoppingCartIcon = (props: any) => <Package {...props} />;
const LaptopIcon = (props: any) => <Activity {...props} />;

export default AdminPage;
