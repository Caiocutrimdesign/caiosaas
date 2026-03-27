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
  steps: {
    started?: string;
    photos?: string[];
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

  const createOrder = (clientId: string, vehicleId: string, plan: string) => {
    const newOrder: ServiceOrder = {
      id: `OS-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId,
      vehicleId,
      plan,
      status: 'pending',
      createdAt: new Date().toISOString(),
      steps: {},
    };
    setOrders((prev) => [...prev, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: ServiceOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const assignTechnician = (orderId: string, technicianId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, technicianId } : o))
    );
  };

  const updateOrderSteps = (orderId: string, steps: Partial<ServiceOrder['steps']>) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, steps: { ...o.steps, ...steps } } : o))
    );
  };

  return {
    clients,
    vehicles,
    orders,
    technicians: MOCK_TECHNICIANS,
    addClient,
    addVehicle,
    createOrder,
    updateOrderStatus,
    assignTechnician,
    updateOrderSteps,
  };
};
