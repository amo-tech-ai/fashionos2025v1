
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task, Guest, WorkflowMetrics, Asset } from '@/types/dashboard';

const INITIAL_TASKS: Task[] = [
  {
    id: 't1', title: 'Textile Surface Analysis', status: 'at-risk', phase: 'Sourcing',
    description: 'Finalize microscopic analysis of bio-silk samples.',
    blocking: 'Pattern Development', dueDate: 'Oct 24, 2024', owner: 'R. Simmons',
    priority: 'high', costCenter: 'R&D-01',
    subtasks: [
      { id: 'st1', label: 'Tension testing', completed: true },
      { id: 'st2', label: 'Colorfast validation', completed: false },
      { id: 'st3', label: 'Elasticity coefficient mapping', completed: false },
    ]
  },
  {
    id: 't2', title: 'Runway Lighting Grid', status: 'pending', phase: 'Production',
    description: 'Coordinate with lighting director to finalize the Lux-950 grid layout.',
    dueDate: 'Nov 02, 2024', owner: 'L. Chen',
    priority: 'medium', costCenter: 'EVT-PROD',
    subtasks: [
      { id: 'st4', label: 'Shadow angle simulation', completed: false },
      { id: 'st5', label: 'DMX patching verification', completed: false }
    ]
  }
];

const INITIAL_GUESTS: Guest[] = [
  { id: 'g1', name: 'Anna Wintour', affiliation: 'Condé Nast / Vogue', status: 'confirmed', seat: 'A01', priority: true },
  { id: 'g2', name: 'Edward Enninful', affiliation: 'British Vogue', status: 'checked-in', seat: 'A02', priority: true },
];

interface DashboardContextType {
  tasks: Task[];
  guests: Guest[];
  assets: Asset[];
  metrics: WorkflowMetrics;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  addTasksBulk: (newTasks: Partial<Task>[]) => void;
  checkInGuest: (guestId: string) => void;
  saveAsset: (asset: Omit<Asset, 'id'>) => void;
  deleteAsset: (assetId: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [assets, setAssets] = useState<Asset[]>([]);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  }, []);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      const updatedSubtasks = task.subtasks.map(sub => 
        sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
      );
      const allDone = updatedSubtasks.every(s => s.completed);
      const newStatus = allDone ? 'completed' : task.status === 'completed' ? 'pending' : task.status;
      return { ...task, subtasks: updatedSubtasks, status: newStatus as any };
    }));
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: `t-${Date.now()}` } as Task;
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const addTasksBulk = useCallback((newTasks: Partial<Task>[]) => {
    const tasksWithIds = newTasks.map((t, idx) => ({
      status: 'pending',
      description: '',
      dueDate: 'TBD',
      owner: 'Unassigned',
      subtasks: [],
      priority: 'medium',
      costCenter: 'GLOBAL-OS',
      ...t,
      id: `t-bulk-${Date.now()}-${idx}`
    })) as Task[];
    setTasks(prev => [...tasksWithIds, ...prev]);
  }, []);

  const checkInGuest = useCallback((guestId: string) => {
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, status: 'checked-in' } : g));
  }, []);

  const saveAsset = useCallback((asset: Omit<Asset, 'id'>) => {
    const newAsset = { ...asset, id: `a-${Date.now()}` } as Asset;
    setAssets(prev => [newAsset, ...prev]);
  }, []);

  const deleteAsset = useCallback((assetId: string) => {
    setAssets(prev => prev.filter(a => a.id !== assetId));
  }, []);

  const metrics: WorkflowMetrics = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    atRisk: tasks.filter(t => t.status === 'at-risk').length,
    budgetUtilization: 68.4,
  };

  const value = {
    tasks,
    guests,
    assets,
    metrics,
    updateTask,
    toggleSubtask,
    addTask,
    addTasksBulk,
    checkInGuest,
    saveAsset,
    deleteAsset
  };

  return React.createElement(DashboardContext.Provider, { value }, children);
}

export function useDashboardStore() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardStore must be used within a DashboardProvider');
  }
  return context;
}
