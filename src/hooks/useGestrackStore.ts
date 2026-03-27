import { useState, useEffect } from 'react';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface Vehicle {
  id: string;
  clientId: string;
  plate: string;
  model: string;
  brand: string;
  year: string;
}

export interface ServiceOrder {
  id: string;
  clientId: string;
  vehicleId: string;
  plan: string;
  status: 'pending' | 'in_progress' | 'finished';
  technicianId?: string;
  createdAt: string;
  testStatus?: 'none' | 'requested' | 'approved';
  signature?: string;
  clientNameSignature?: string;
  logs: {
    message: string;
    timestamp: string;
    type: 'system' | 'user' | 'tech';
  }[];
  steps: {
    started?: string;
    trackerPhoto?: string;
    platePhoto?: string;
    dashPhoto?: string;
    installPhoto?: string;
    tested?: boolean;
    finished?: string;
  };
}

export interface Technician {
  id: string;
  name: string;
}

const MOCK_TECHNICIANS: Technician[] = [
  { id: '1', name: 'Ricardo Silva' },
  { id: '2', name: 'Marcos Oliveira' },
  { id: '3', name: 'Ana Costa' },
];

export const useGestrackStore = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [currentTech, setCurrentTech] = useState<Technician | null>(null);

  // Load initial data
  useEffect(() => {
    const savedClients = localStorage.getItem('gestrack_clients');
    const savedVehicles = localStorage.getItem('gestrack_vehicles');
    const savedOrders = localStorage.getItem('gestrack_orders');

    if (savedClients) setClients(JSON.parse(savedClients));
    if (savedVehicles) setVehicles(JSON.parse(savedVehicles));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gestrack_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('gestrack_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('gestrack_orders', JSON.stringify(orders));
  }, [orders]);

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = { ...client, id: Math.random().toString(36).substr(2, 9) };
    setClients((prev) => [...prev, newClient]);
    return newClient;
  };

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle = { ...vehicle, id: Math.random().toString(36).substr(2, 9) };
    setVehicles((prev) => [...prev, newVehicle]);
    return newVehicle;
  };

  const createOrder = async (clientId: string, vehicleId: string, plan: string) => {
    // Simulate API Delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const newOrder: ServiceOrder = {
      id: `OS-${year}-${random}`,
      clientId,
      vehicleId,
      plan,
      status: 'pending',
      createdAt: new Date().toISOString(),
      logs: [
        { message: 'Venda concluída no SELL', timestamp: new Date().toISOString(), type: 'user' },
        { message: 'Ordem de Serviço gerada automaticamente', timestamp: new Date().toISOString(), type: 'system' },
        { message: 'Enviado para o ERP', timestamp: new Date().toISOString(), type: 'system' }
      ],
      steps: {},
    };
    setOrders((prev) => [...prev, newOrder]);
    return newOrder;
  };

  const addLog = (orderId: string, message: string, type: 'system' | 'user' | 'tech' = 'system') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { 
        ...o, 
        logs: [...o.logs, { message, timestamp: new Date().toISOString(), type }] 
      } : o))
    );
  };

  const updateOrderStatus = (orderId: string, status: ServiceOrder['status']) => {
    const statusMap = {
      'pending': 'Pendente',
      'in_progress': 'Em atendimento no local',
      'finished': 'Finalizada com sucesso'
    };
    
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return { 
            ...o, 
            status,
            logs: [...o.logs, { 
              message: `Status alterado para: ${statusMap[status]}`, 
              timestamp: new Date().toISOString(), 
              type: 'system' 
            }]
          };
        }
        return o;
      })
    );
  };

  const assignTechnician = (orderId: string, technicianId: string) => {
    const techName = MOCK_TECHNICIANS.find(t => t.id === technicianId)?.name || 'Técnico';
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { 
        ...o, 
        technicianId,
        logs: [...o.logs, { 
          message: `Técnico notificado: ${techName} atribuído à OS`, 
          timestamp: new Date().toISOString(), 
          type: 'user' 
        }]
      } : o))
    );
  };

  const updateOrderSteps = (orderId: string, steps: Partial<ServiceOrder['steps']>) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, steps: { ...o.steps, ...steps } } : o))
    );
  };

  const updateOrderTestStatus = (orderId: string, testStatus: ServiceOrder['testStatus']) => {
    const msg = testStatus === 'requested' ? 'Simulação: Técnico solicitou teste de comunicação' : 'Simulação: Teste aprovado pela base';
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { 
        ...o, 
        testStatus,
        logs: [...o.logs, { message: msg, timestamp: new Date().toISOString(), type: 'system' }]
      } : o))
    );
  };

  const saveSignature = (orderId: string, signature: string, clientNameSignature?: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { 
        ...o, 
        signature,
        clientNameSignature,
        logs: [...o.logs, { message: `Assinatura digital coletada: ${clientNameSignature}`, timestamp: new Date().toISOString(), type: 'tech' }]
      } : o))
    );
  };

  const loginTech = (tech: Technician) => {
    setCurrentTech(tech);
    localStorage.setItem('gestrack_current_tech', JSON.stringify(tech));
  };

  const logoutTech = () => {
    setCurrentTech(null);
    localStorage.removeItem('gestrack_current_tech');
  };

  useEffect(() => {
    const savedTech = localStorage.getItem('gestrack_current_tech');
    if (savedTech) setCurrentTech(JSON.parse(savedTech));
  }, []);

  return {
    clients,
    vehicles,
    orders,
    currentTech,
    technicians: MOCK_TECHNICIANS,
    addClient,
    addVehicle,
    createOrder,
    updateOrderStatus,
    assignTechnician,
    updateOrderSteps,
    updateOrderTestStatus,
    saveSignature,
    loginTech,
    logoutTech
  };
};
