import React, { useState } from 'react';
import { useGestrackStore, ServiceOrder } from '@/hooks/useGestrackStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GestrackLayout from '@/components/layout/GestrackLayout';

const StatusBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors", className)}>
    {children}
  </span>
);

const ErpPage = () => {
  const store = useGestrackStore();
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);

  const getStatusBadge = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'pending': return <StatusBadge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pendente</StatusBadge>;
      case 'in_progress': return <StatusBadge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Em Andamento</StatusBadge>;
      case 'finished': return <StatusBadge className="bg-green-500/10 text-green-500 border-green-500/20">Finalizada</StatusBadge>;
    }
  };

  const handleAssign = (orderId: string, techId: string) => {
    store.assignTechnician(orderId, techId);
    store.updateOrderStatus(orderId, 'in_progress');
    toast.success('Técnico atribuído com sucesso!');
  };

  const stats = [
    { label: 'Total de OS', value: store.orders.length, icon: LayoutDashboard, color: 'text-zinc-100' },
    { label: 'Pendentes', value: store.orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'text-yellow-500' },
    { label: 'Em Execução', value: store.orders.filter(o => o.status === 'in_progress').length, icon: Wrench, color: 'text-blue-500' },
    { label: 'Finalizadas', value: store.orders.filter(o => o.status === 'finished').length, icon: CheckCircle2, color: 'text-green-500' },
  ];

  return (
    <GestrackLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Painel Operacional</h1>
            <p className="text-zinc-400">Gerenciamento centralizado de ordens de serviço e equipe técnica.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:bg-zinc-800 gap-2">
              <Filter className="w-4 h-4" /> Filtrar
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg shadow-red-600/20 text-xs font-bold uppercase tracking-widest px-6 h-11">
              <Search className="w-4 h-4" /> Buscar OS
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm border-l-4 border-l-red-600/50 hover:border-l-red-600 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className="text-3xl font-bold text-white tracking-tighter">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* OS Table */}
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-zinc-800 pb-6">
            <CardTitle className="text-xl text-white">Listagem de Ordens de Serviço</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader className="bg-zinc-950/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 font-bold uppercase text-xs tracking-wider">OS</TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-xs tracking-wider">Cliente</TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-xs tracking-wider">Veículo</TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-xs tracking-wider">Plano</TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-xs tracking-wider">Técnico</TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-xs tracking-wider">Status</TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-xs tracking-wider text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center text-zinc-500 italic">Nenhuma ordem de serviço registrada.</TableCell>
                </TableRow>
              ) : (
                store.orders.map((order) => {
                  const client = store.clients.find(c => c.id === order.clientId);
                  const vehicle = store.vehicles.find(v => v.id === order.vehicleId);
                  const tech = store.technicians.find(t => t.id === order.technicianId);

                  return (
                    <TableRow key={order.id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
                      <TableCell className="font-bold text-red-500">{order.id}</TableCell>
                      <TableCell>
                        <div className="font-medium text-white">{client?.name}</div>
                        <div className="text-zinc-500 text-xs">{client?.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-white uppercase">{vehicle?.plate}</div>
                        <div className="text-zinc-500 text-xs">{vehicle?.brand} {vehicle?.model}</div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge className="bg-zinc-800 text-zinc-300 font-normal uppercase text-[10px] tracking-widest border-zinc-700">{order.plan}</StatusBadge>
                      </TableCell>
                      <TableCell>
                        {tech ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold">{tech.name.charAt(0)}</div>
                            <span className="text-sm text-zinc-300">{tech.name}</span>
                          </div>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-wider gap-1 text-red-500 hover:text-red-400 hover:bg-red-500/10 border border-red-500/20 bg-red-500/5 px-3">
                                <UserPlus className="w-3 h-3" /> Atribuir
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
                              <DialogHeader>
                                <DialogTitle>Atribuir Técnico - {order.id}</DialogTitle>
                              </DialogHeader>
                              <div className="py-6 space-y-4">
                                <p className="text-sm text-zinc-400">Selecione o técnico responsável pela instalação no veículo <span className="font-bold text-white">{vehicle?.plate}</span>.</p>
                                <Select onValueChange={(val) => handleAssign(order.id, val)}>
                                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectValue placeholder="Selecione um técnico" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    {store.technicians.map((t) => (
                                      <SelectItem key={t.id} value={t.id} className="hover:bg-zinc-800">{t.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white group-hover:bg-zinc-800">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </GestrackLayout>
  );
};

export default ErpPage;
