import React, { useState } from 'react';
import { useGestrackStore } from '@/hooks/useGestrackStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Smartphone, Mail, Hash, Car, CreditCard, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GestrackLayout from '@/components/layout/GestrackLayout';

const PLANS = [
  { id: 'smart', name: 'Plano Smart', price: 'R$ 59,90', features: ['Rastreamento 24h', 'App Mobile', 'Cerca Virtual'] },
  { id: 'premium', name: 'Plano Premium', price: 'R$ 89,90', features: ['Rastreamento 24h', 'App Mobile', 'Cerca Virtual', 'Bloqueio Remoto', 'Assistência 24h'] },
  { id: 'fleet', name: 'Plano Fleet', price: 'R$ 129,90', features: ['Gestão de Frotas', 'Relatórios Avançados', 'Controle de Combustível', 'Telemetria'] },
];

const SellPage = () => {
  const store = useGestrackStore();
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({ name: '', email: '', phone: '', cpf: '' });
  const [vehicleData, setVehicleData] = useState({ plate: '', brand: '', model: '', year: '' });
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleNext = () => {
    if (step === 1 && (!clientData.name || !clientData.phone)) {
      toast.error('Preencha os dados do cliente');
      return;
    }
    if (step === 2 && (!vehicleData.plate || !vehicleData.model)) {
      toast.error('Preencha os dados do veículo');
      return;
    }
    setStep(step + 1);
  };

  const handleFinish = () => {
    if (!selectedPlan) {
      toast.error('Selecione um plano');
      return;
    }

    const client = store.addClient(clientData);
    const vehicle = store.addVehicle({ ...vehicleData, clientId: client.id });
    const order = store.createOrder(client.id, vehicle.id, selectedPlan);

    toast.success(`Venda realizada com sucesso! OS: ${order.id}`);
    setStep(4); // Success state
  };

  return (
    <GestrackLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Novo Contrato</h1>
            <p className="text-zinc-400">Preencha os dados para gerar a ordem de serviço.</p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                  step === s ? "bg-red-600 text-white scale-110 shadow-lg shadow-red-600/20" : 
                  step > s ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-500"
                )}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {step === 1 && (
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="text-red-500 w-5 h-5" /> Dados do Cliente
                </CardTitle>
                <CardDescription>Informações básicas para o contrato.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Nome Completo</Label>
                    <Input 
                      placeholder="Ex: João Silva" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={clientData.name}
                      onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Celular / WhatsApp</Label>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={clientData.phone}
                      onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400">E-mail</Label>
                    <Input 
                      placeholder="joao@exemplo.com" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400">CPF</Label>
                    <Input 
                      placeholder="000.000.000-00" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={clientData.cpf}
                      onChange={(e) => setClientData({ ...clientData, cpf: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleNext} className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg">
                  Próximo Passo <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Car className="text-red-500 w-5 h-5" /> Dados do Veículo
                </CardTitle>
                <CardDescription>Informações do veículo para instalação.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Placa</Label>
                    <Input 
                      placeholder="ABC-1234" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={vehicleData.plate}
                      onChange={(e) => setVehicleData({ ...vehicleData, plate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Marca</Label>
                    <Input 
                      placeholder="Ex: Toyota" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={vehicleData.brand}
                      onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Modelo</Label>
                    <Input 
                      placeholder="Ex: Corolla" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={vehicleData.model}
                      onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Ano</Label>
                    <Input 
                      placeholder="Ex: 2024" 
                      className="bg-zinc-950 border-zinc-800 text-white focus:ring-red-500"
                      value={vehicleData.year}
                      onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-zinc-800 text-zinc-400 hover:bg-zinc-800">Voltar</Button>
                  <Button onClick={handleNext} className="flex-[2] bg-red-600 hover:bg-red-700 text-white h-12 text-lg">
                    Próximo Passo <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={cn(
                      "bg-zinc-900/50 border-zinc-800 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-red-500/50",
                      selectedPlan === plan.id && "border-red-600 ring-2 ring-red-600/20 bg-red-600/5"
                    )}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-white">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-red-500">{plan.price}<span className="text-sm text-zinc-500 font-normal">/mês</span></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                            <Check className="w-4 h-4 text-green-500" /> {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 border-zinc-800 text-zinc-400 hover:bg-zinc-800">Voltar</Button>
                <Button onClick={handleFinish} className="flex-[2] bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-bold shadow-lg shadow-red-600/20">
                  Fechar Venda & Gerar OS
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-20 space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                <Check className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Venda Finalizada!</h2>
                <p className="text-zinc-400 max-w-md mx-auto">A Ordem de Serviço foi gerada com sucesso e já está disponível no módulo ERP para atribuição técnica.</p>
              </div>
              <Button onClick={() => setStep(1)} variant="outline" className="border-zinc-800 text-zinc-400 hover:bg-zinc-800">Nova Venda</Button>
            </div>
          )}
        </div>
      </div>
    </GestrackLayout>
  );
};

export default SellPage;
