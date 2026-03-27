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
    trackerPhoto?: string; // base64
    platePhoto?: string;   // base64
    dashPhoto?: string;    // base64
    installPhoto?: string; // base64
    tested?: boolean;
    finished?: string;
  };
}

export interface User {
  email: string;
  role: 'admin' | 'tec' | 'user';
  name: string;
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
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gestrack_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentTech, setCurrentTech] = useState<Technician | null>(() => {
    const saved = localStorage.getItem('gestrack_current_tech');
    return saved ? JSON.parse(saved) : null;
  });

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

  const loginUser = (email: string, role: User['role'], name: string) => {
    const newUser = { email, role, name };
    setUser(newUser);
    localStorage.setItem('gestrack_user', JSON.stringify(newUser));
    // If logging in as tech, also set tech if found
    if (role === 'tec') {
      const tech = MOCK_TECHNICIANS.find(t => t.name === name);
      if (tech) {
        setCurrentTech(tech);
        localStorage.setItem('gestrack_current_tech', JSON.stringify(tech));
      }
    }
  };

  const logoutUser = () => {
    setUser(null);
    setCurrentTech(null);
    localStorage.removeItem('gestrack_user');
    localStorage.removeItem('gestrack_current_tech');
  };

  const loginTech = (tech: Technician) => {
    setCurrentTech(tech);
    localStorage.setItem('gestrack_current_tech', JSON.stringify(tech));
    // Also set as user
    const newUser: User = { email: `${tech.name.toLowerCase().replace(' ', '.')}@rastremix.com.br`, role: 'tec', name: tech.name };
    setUser(newUser);
    localStorage.setItem('gestrack_user', JSON.stringify(newUser));
  };

  const logoutTech = () => {
    setCurrentTech(null);
    setUser(null);
    localStorage.removeItem('gestrack_current_tech');
    localStorage.removeItem('gestrack_user');
  };

  useEffect(() => {
    const savedTech = localStorage.getItem('gestrack_current_tech');
    const savedUser = localStorage.getItem('gestrack_user');
    if (savedTech) setCurrentTech(JSON.parse(savedTech));
    if (savedUser) setUser(JSON.parse(savedUser));
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
    logoutTech,
    user,
    loginUser,
    logoutUser
  };
};
