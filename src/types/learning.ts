export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  moduleId: string;
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  weekNumber: number;
  topics: string[];
  resources: Resource[];
  estimatedHours: number;
  completed: boolean;
  progress: number;
}

export interface Resource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'book' | 'project';
}

export interface DailyLog {
  id: string;
  date: string;
  hoursSpent: number;
  notes: string;
  tasksCompleted: string[];
}

export interface LearningStats {
  totalHoursLogged: number;
  totalTasksCompleted: number;
  currentStreak: number;
  longestStreak: number;
  modulesCompleted: number;
  overallProgress: number;
}
