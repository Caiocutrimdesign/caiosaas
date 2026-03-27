import React, { useState } from 'react';
import { useGestrackStore, ServiceOrder } from '@/hooks/useGestrackStore';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  LayoutDashboard, 
  UserPlus, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  Search, 
  Filter,
  MoreVertical,
  Calendar,
  Layers,
  Activity,
  Zap,
  PenTool
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GestrackLayout from '@/components/layout/GestrackLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { GestrackButton } from '@/components/gestrack/ui/GestrackButton';
import { 
  GestrackCard, 
  GestrackCardContent, 
  GestrackCardHeader, 
  GestrackCardTitle 
} from '@/components/gestrack/ui/GestrackCard';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';

const ErpPage = () => {
  const store = useGestrackStore();
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (order: ServiceOrder) => {
    if (order.status === 'finished') return <GestrackBadge color="green" variant="glow">Finalizada</GestrackBadge>;
    if (order.testStatus === 'approved') return <GestrackBadge color="green" variant="outline">Testado & Aprovado</GestrackBadge>;
    if (order.testStatus === 'requested') return (
      <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
        <GestrackBadge color="purple" variant="glow" className="shadow-[0_0_15px_rgba(168,85,247,0.4)]">Aguardando Teste</GestrackBadge>
      </motion.div>
    );
    if (order.status === 'in_progress') return <GestrackBadge color="blue" variant="glow">Em Andamento</GestrackBadge>;
    return <GestrackBadge color="yellow" variant="glow">Pendente</GestrackBadge>;
  };

  const handleAssign = async (orderId: string, techId: string) => {
    setIsAssigning(true);
    // Simulate activation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    store.assignTechnician(orderId, techId);
    store.updateOrderStatus(orderId, 'in_progress');
    toast.success('Equipe técnica mobilizada!');
    setTimeout(() => toast.info('Técnico notificado no campo'), 800);
    setIsAssigning(false);
  };

  const filteredOrders = store.orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.clientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Fluxo Total', value: store.orders.length, icon: Activity, color: 'red' },
    { label: 'Aguardando', value: store.orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'yellow' },
    { label: 'Em Campo', value: store.orders.filter(o => o.status === 'in_progress').length, icon: Wrench, color: 'blue' },
    { label: 'Concluídas', value: store.orders.filter(o => o.status === 'finished').length, icon: CheckCircle2, color: 'green' },
  ];

  return (
    <GestrackLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GestrackBadge className="mb-4">Administrativo • ERP</GestrackBadge>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
              Painel <span className="text-red-600">Operacional</span>
            </h1>
            <p className="text-zinc-500 font-medium mt-2">Visão 360° da frota e ordens de serviço ativas.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
              <input 
                type="text"
                placeholder="Buscar por OS ou Cliente..."
                className="h-12 w-64 bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 text-sm text-white focus:border-red-600 outline-none transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <GestrackButton variant="outline" className="px-4 border-zinc-800">
              <Filter className="w-4 h-4" />
            </GestrackButton>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <GestrackCard key={i} accent={stat.color as any} delay={i * 0.1}>
              <GestrackCardContent className="pt-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
                    `bg-${stat.color}-600/10 text-${stat.color}-500`
                  )}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-4xl font-black text-white tracking-tighter italic">{stat.value}</div>
                <div className="mt-4 flex items-center gap-1 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                  <Layers className="w-3 h-3" /> Sincronizado agora
                </div>
              </GestrackCardContent>
            </GestrackCard>
          ))}
        </div>

        {/* OS Table */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
        >
          <GestrackCard className="border-zinc-800 shadow-2xl">
            <GestrackCardHeader className="border-b border-zinc-800/50 bg-zinc-950/30 flex flex-row items-center justify-between">
              <div>
                <GestrackCardTitle>Monitoramento de Ordens</GestrackCardTitle>
                <p className="text-xs text-zinc-500 font-medium mt-1 uppercase tracking-widest">Fila de atendimento priorizado</p>
              </div>
              <GestrackBadge variant="glow" color="zinc" className="h-7">TOTAL: {filteredOrders.length}</GestrackBadge>
            </GestrackCardHeader>
            <Table>
              <TableHeader className="bg-zinc-950/80">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] py-5">Protocolo</TableHead>
                  <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Titular / Contato</TableHead>
                  <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Veículo Alvo</TableHead>
                  <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Plano</TableHead>
                  <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Técnico Designado</TableHead>
                  <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Status OS</TableHead>
                  <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                          <Search className="w-12 h-12 text-zinc-800" />
                          <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Nenhum registro encontrado</p>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order, i) => {
                      const client = store.clients.find(c => c.id === order.clientId);
                      const vehicle = store.vehicles.find(v => v.id === order.vehicleId);
                      const tech = store.technicians.find(t => t.id === order.technicianId);
                      const isWaitingTest = order.testStatus === 'requested';

                      return (
                        <TableRow key={order.id} className={cn(
                          "border-zinc-800 transition-all group h-24",
                          isWaitingTest ? "bg-purple-950/10 border-purple-500/30" : "hover:bg-zinc-800/40"
                        )}>
                          <TableCell className="font-black text-red-600 font-mono tracking-tighter">
                            {order.id}
                            {isWaitingTest && (
                              <div className="text-[8px] text-purple-400 font-black uppercase tracking-widest mt-1 animate-pulse flex items-center gap-1">
                                <Zap className="w-2 h-2" /> Técnico aguardando teste
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-zinc-100">{client?.name || 'Cliente Geral'}</div>
                            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">{client?.phone}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-black text-white uppercase italic tracking-tighter px-2 py-1 bg-zinc-800 rounded inline-block">{vehicle?.plate}</div>
                            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">{vehicle?.brand} {vehicle?.model}</div>
                          </TableCell>
                          <TableCell>
                            <span className="text-[10px] font-black text-zinc-300 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-700 uppercase tracking-widest">{order.plan}</span>
                          </TableCell>
                          <TableCell>
                            {tech ? (
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center text-[10px] text-red-500 font-black">{tech.name.charAt(0)}</div>
                                <span className="text-xs font-bold text-zinc-300">{tech.name}</span>
                              </div>
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <GestrackButton variant="outline" className="h-9 px-4 text-[9px] gap-2 border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-600 hover:text-white transition-all shadow-none">
                                    <UserPlus className="w-3 h-3" /> Mobilizar
                                  </GestrackButton>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-3xl overflow-hidden p-0">
                                  <div className="bg-red-600 h-1.5 w-full" />
                                  <DialogHeader className="p-8 pb-4">
                                    <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Mobilizar <span className="text-red-600">Equipe</span></DialogTitle>
                                    <p className="text-zinc-500 font-medium text-sm mt-2">Selecione o técnico especializado para OS <span className="text-white font-bold">{order.id}</span></p>
                                  </DialogHeader>
                                  <div className="p-8 pt-4 space-y-6">
                                    <Select onValueChange={(val) => handleAssign(order.id, val)}>
                                      <SelectTrigger className="h-14 bg-zinc-900 border-zinc-800 text-white rounded-xl focus:border-red-600 transition-all font-bold">
                                        <SelectValue placeholder="Lista de Técnicos Disponíveis" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white p-2">
                                        {store.technicians.map((t) => (
                                          <SelectItem key={t.id} value={t.id} className="h-10 rounded-lg focus:bg-red-600 focus:text-white transition-colors cursor-pointer font-bold uppercase text-[10px] tracking-widest">
                                            {t.name} • Especialista I
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4">
                                      <Calendar className="text-red-500 w-5 h-5" />
                                      <div>
                                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Previsão</p>
                                        <p className="text-sm font-bold text-white">Atendimento Imediato</p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {getStatusBadge(order)}
                              {order.testStatus === 'approved' && <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1"><Zap className="w-2 h-2" /> Sinal OK</span>}
                              {order.signature && <span className="text-[8px] text-blue-500 font-bold uppercase tracking-widest flex items-center gap-1"><PenTool className="w-2 h-2" /> Assinado</span>}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                             <Dialog>
                                <DialogTrigger asChild>
                                  <GestrackButton variant="outline" className="w-10 h-10 p-0 hover:bg-zinc-800 rounded-xl">
                                    <Clock className="w-4 h-4" />
                                  </GestrackButton>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-3xl overflow-hidden p-0 max-w-lg">
                                   <div className="bg-red-600 h-1.5 w-full" />
                                   <DialogHeader className="p-8">
                                      <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Histórico <span className="text-red-600">Completo</span></DialogTitle>
                                      <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Linha do tempo: {order.id}</p>
                                   </DialogHeader>
                                   <div className="p-8 pt-0 max-h-[400px] overflow-y-auto space-y-6 scrollbar-hide">
                                      <div className="relative ml-2 space-y-6">
                                         <div className="absolute left-[3px] top-2 bottom-2 w-px bg-zinc-900" />
                                         {order.logs?.map((log, idx) => (
                                           <div key={idx} className="relative pl-8">
                                              <div className={cn(
                                                "absolute left-0 top-1.5 w-2 h-2 rounded-full",
                                                log.type === 'system' ? "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]" : log.type === 'tech' ? "bg-blue-500" : "bg-zinc-700"
                                              )} />
                                               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide leading-relaxed">{log.message}</p>
                                               
                                               {log.type === 'tech' && order.signature && log.message.includes('Assinatura') && (
                                                 <div className="mt-4 p-4 bg-white rounded-xl border border-zinc-200 animate-in zoom-in-95 max-w-[200px]">
                                                   <p className="text-[8px] text-zinc-400 font-black uppercase mb-2">Assinatura Digital</p>
                                                   <img src={order.signature} className="h-16 object-contain invert" alt="Assinatura" />
                                                 </div>
                                               )}

                                               {log.type === 'tech' && log.message.includes('Foto') && (
                                                 <div className="mt-4 grid grid-cols-2 gap-2 animate-in fade-in">
                                                   {order.steps.trackerPhoto && log.message.includes('tracker') && <img src={order.steps.trackerPhoto} className="rounded-lg h-24 w-full object-cover border border-zinc-800" alt="tracker" />}
                                                   {order.steps.platePhoto && log.message.includes('plate') && <img src={order.steps.platePhoto} className="rounded-lg h-24 w-full object-cover border border-zinc-800" alt="plate" />}
                                                   {order.steps.dashPhoto && log.message.includes('dash') && <img src={order.steps.dashPhoto} className="rounded-lg h-24 w-full object-cover border border-zinc-800" alt="dash" />}
                                                   {order.steps.installPhoto && log.message.includes('install') && <img src={order.steps.installPhoto} className="rounded-lg h-24 w-full object-cover border border-zinc-800" alt="install" />}
                                                 </div>
                                               )}

                                               <p className="text-[8px] text-zinc-600 font-black uppercase mt-1">
                                                 {new Date(log.timestamp).toLocaleTimeString()} • {log.type === 'system' ? 'AUTOMAÇÃO' : log.type === 'tech' ? 'CAMPO' : 'ADMIN'}
                                               </p>
                                           </div>
                                         ))}
                                      </div>
                                   </div>
                                </DialogContent>
                             </Dialog>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </GestrackCard>
        </motion.div>
      </div>
    </GestrackLayout>
  );
};

export default ErpPage;
