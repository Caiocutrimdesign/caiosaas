import React, { useState } from 'react';
import { useGestrackStore } from '@/hooks/useGestrackStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Car, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles
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
  GestrackCardTitle,
  GestrackCardDescription 
} from '@/components/gestrack/ui/GestrackCard';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';

const PLANS = [
  { id: 'smart', name: 'Plano Smart', price: 'R$ 59,90', features: ['Rastreamento 24h', 'App Mobile', 'Cerca Virtual'] },
  { id: 'premium', name: 'Plano Premium', price: 'R$ 89,90', features: ['Rastreamento 24h', 'App Mobile', 'Cerca Virtual', 'Bloqueio Remoto', 'Assistência 24h'] },
  { id: 'fleet', name: 'Plano Fleet', price: 'R$ 129,90', features: ['Gestão de Frotas', 'Relatórios Avançados', 'Controle de Combustível', 'Telemetria'] },
];

const SellPage = () => {
  const store = useGestrackStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [clientData, setClientData] = useState({ name: '', email: '', phone: '', cpf: '' });
  const [vehicleData, setVehicleData] = useState({ plate: '', brand: '', model: '', year: '' });
  const [selectedPlan, setSelectedPlan] = useState('');
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  const handleNext = () => {
    if (step === 1 && (!clientData.name || !clientData.phone)) {
      toast.error('Preencha os dados obrigatórios do cliente');
      return;
    }
    if (step === 2 && (!vehicleData.plate || !vehicleData.model)) {
      toast.error('Preencha os dados obrigatórios do veículo');
      return;
    }
    setStep(step + 1);
  };

  const handleFinish = async () => {
    if (!selectedPlan) {
      toast.error('Selecione um plano para continuar');
      return;
    }

    setIsLoading(true);
    try {
      // Regra: O dado só é digitado uma vez.
      // O store agora lida com o vínculo automático.
      const newClientId = `CLI-${Date.now()}`;
      const newVehicleId = `VEH-${Date.now()}`;
      
      const client = { ...clientData, id: newClientId };
      const vehicle = { ...vehicleData, id: newVehicleId, clientId: newClientId };

      const order = await store.createOrder({
        clientId: newClientId,
        vehicleId: newVehicleId,
        planId: selectedPlan,
        testStatus: 'pending'
      }, client, vehicle);
      
      setCreatedOrder(order);
      setStep(4);
      
      // Fluxo de Automação "Sensorial" com frases específicas
      toast.success('Ordem de Serviço criada automaticamente');
      setTimeout(() => toast.info('Dados enviados para o ERP'), 1000);
      setTimeout(() => toast.info('Sistema sincronizado com sucesso'), 2000);
    } catch (error) {
      toast.error('Erro ao processar venda. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setClientData({ name: '', email: '', phone: '', cpf: '' });
    setVehicleData({ plate: '', brand: '', model: '', year: '' });
    setSelectedPlan('');
    setCreatedOrder(null);
  };

  return (
    <GestrackLayout>
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        {step < 4 && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div>
              <GestrackBadge className="mb-4">Módulo de Vendas</GestrackBadge>
              <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
                Novo <span className="text-red-600">Contrato</span>
              </h1>
              <p className="text-zinc-500 font-medium mt-2">Transformando prospecção em operação real.</p>
            </div>
            
            <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-black transition-all duration-500",
                    step === s ? "bg-red-600 text-white scale-110 shadow-xl shadow-red-600/30" : 
                    step > s ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-600"
                  )}
                >
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GestrackCard accent="red">
                <GestrackCardHeader>
                  <GestrackCardTitle className="flex items-center gap-3">
                    <User className="text-red-600 w-6 h-6" /> Identificação do Cliente
                  </GestrackCardTitle>
                  <GestrackCardDescription>Inicie o cadastro com os dados pessoais do titular.</GestrackCardDescription>
                </GestrackCardHeader>
                <GestrackCardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Nome Completo</Label>
                      <Input 
                        placeholder="Nome do cliente" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-red-600 transition-all rounded-xl"
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">WhatsApp</Label>
                      <Input 
                        placeholder="(00) 00000-0000" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-red-600 transition-all rounded-xl"
                        value={clientData.phone}
                        onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">E-mail Corporativo</Label>
                      <Input 
                        placeholder="email@dominio.com" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-red-600 transition-all rounded-xl"
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Documento (CPF/CNPJ)</Label>
                      <Input 
                        placeholder="000.000.000-00" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-red-600 transition-all rounded-xl"
                        value={clientData.cpf}
                        onChange={(e) => setClientData({ ...clientData, cpf: e.target.value })}
                      />
                    </div>
                  </div>
                  <GestrackButton onClick={handleNext} className="w-full h-14 text-sm">
                    Continuar para Veículo <ChevronRight className="ml-2 w-5 h-5" />
                  </GestrackButton>
                </GestrackCardContent>
              </GestrackCard>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GestrackCard accent="blue">
                <GestrackCardHeader>
                  <GestrackCardTitle className="flex items-center gap-3">
                    <Car className="text-blue-500 w-6 h-6" /> Detalhes do Patrimônio
                  </GestrackCardTitle>
                  <GestrackCardDescription>Vincule o veículo que receberá o rastreamento.</GestrackCardDescription>
                </GestrackCardHeader>
                <GestrackCardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Placa do Veículo</Label>
                      <Input 
                        placeholder="ABC-0000" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-blue-500 transition-all rounded-xl uppercase font-bold tracking-widest"
                        value={vehicleData.plate}
                        onChange={(e) => setVehicleData({ ...vehicleData, plate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Marca / Fabricante</Label>
                      <Input 
                        placeholder="Ex: Toyota" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-blue-500 transition-all rounded-xl"
                        value={vehicleData.brand}
                        onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Modelo</Label>
                      <Input 
                        placeholder="Ex: Hillux SRV" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-blue-500 transition-all rounded-xl"
                        value={vehicleData.model}
                        onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Ano de Fabricação</Label>
                      <Input 
                        placeholder="Ex: 2024" 
                        className="h-12 bg-zinc-950 border-zinc-800 text-white focus:border-blue-500 transition-all rounded-xl"
                        value={vehicleData.year}
                        onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <GestrackButton variant="outline" onClick={() => setStep(1)} className="flex-1">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
                    </GestrackButton>
                    <GestrackButton onClick={handleNext} className="flex-[2] h-14 text-sm bg-blue-600 hover:bg-blue-700 shadow-blue-600/20">
                      Escolher Plano <ChevronRight className="ml-2 w-5 h-5" />
                    </GestrackButton>
                  </div>
                </GestrackCardContent>
              </GestrackCard>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan, i) => (
                  <GestrackCard 
                    key={plan.id} 
                    accent={selectedPlan === plan.id ? 'red' : 'zinc'}
                    className={cn(
                      "cursor-pointer transition-all duration-500",
                      selectedPlan === plan.id && "ring-2 ring-red-600/50 bg-red-600/5"
                    )}
                    onClick={() => setSelectedPlan(plan.id)}
                    delay={i * 0.1}
                  >
                    <GestrackCardHeader>
                      <GestrackCardTitle className="text-lg">{plan.name}</GestrackCardTitle>
                      <div className="text-3xl font-black text-red-500 mt-2 tracking-tighter">
                        {plan.price}
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest ml-1">/mês</span>
                      </div>
                    </GestrackCardHeader>
                    <GestrackCardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600" /> {f}
                          </li>
                        ))}
                      </ul>
                    </GestrackCardContent>
                    {selectedPlan === plan.id && (
                      <div className="bg-red-600 py-1.5 text-center text-[10px] font-black uppercase tracking-widest text-white">Selecionado</div>
                    )}
                  </GestrackCard>
                ))}
              </div>
              <div className="flex gap-4">
                <GestrackButton variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Voltar
                </GestrackButton>
                <GestrackButton 
                  onClick={handleFinish} 
                  isLoading={isLoading}
                  loadingText="PROCESSANDO ATIVAÇÃO..."
                  className="flex-[2] h-14 text-sm"
                >
                  Confirmar & Ativar Serviço <Sparkles className="ml-2 w-5 h-5" />
                </GestrackButton>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto"
            >
              <GestrackCard className="text-center py-12 border-green-500/30 bg-green-500/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse" />
                <GestrackCardContent className="space-y-8">
                  <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-600/40 animate-bounce">
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Venda <span className="text-green-500">Concluída!</span></h2>
                    <p className="text-zinc-400 font-medium px-4 italic">O contrato foi ativado com sucesso e a Ordem de Serviço já foi enviada para o ERP.</p>
                  </div>
                  
                  <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800 inline-block mx-auto min-w-[280px]">
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mb-2">Protocolo OS</p>
                    <p className="text-2xl font-black text-white font-mono tracking-widest">{createdOrder?.id}</p>
                    <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between text-[10px] font-bold text-zinc-500">
                      <span>{clientData.name}</span>
                      <span className="text-green-500 uppercase">Status: Pendente</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <GestrackButton onClick={resetForm} className="w-full h-14 bg-zinc-800 hover:bg-zinc-700 shadow-none border border-zinc-700">
                      Nova Venda
                    </GestrackButton>
                  </div>
                </GestrackCardContent>
              </GestrackCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GestrackLayout>
  );
};

export default SellPage;
