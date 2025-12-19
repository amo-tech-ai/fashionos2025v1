
export type TaskStatus = 'pending' | 'completed' | 'at-risk';
export type GuestStatus = 'confirmed' | 'pending' | 'checked-in';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export type Subtask = {
  id: string;
  label: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  phase: string;
  description: string;
  blocking?: string;
  subtasks: Subtask[];
  dueDate: string;
  owner: string;
  aiInsight?: string;
  priority?: PriorityLevel;
  costCenter?: string;
};

export type Guest = {
  id: string;
  name: string;
  affiliation: string;
  status: GuestStatus;
  seat?: string;
  dietaryNotes?: string;
  priority: boolean;
  aiInsight?: string;
};

export type Asset = {
  id: string;
  title: string;
  type: 'image' | 'video' | 'document';
  thumbnail: string;
  tags: string[];
  dimensions?: string;
  fileSize?: string;
  metadata?: Record<string, any>;
};

export type WorkflowMetrics = {
  total: number;
  pending: number;
  completed: number;
  atRisk: number;
  budgetUtilization?: number;
};

export type DrawerMode = 'summary' | 'detail' | 'guest-detail' | 'asset-detail';

export type ShowStage = {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  time: string;
};
