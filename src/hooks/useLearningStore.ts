import { useState, useEffect } from 'react';
import { Task, Module, DailyLog, LearningStats } from '@/types/learning';
import { genAICurriculum } from '@/data/curriculum';

const STORAGE_KEYS = {
  tasks: 'genai-tasks',
  modules: 'genai-modules',
  logs: 'genai-logs',
};

export const useLearningStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEYS.tasks);
    const savedModules = localStorage.getItem(STORAGE_KEYS.modules);
    const savedLogs = localStorage.getItem(STORAGE_KEYS.logs);

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    } else {
      setModules(genAICurriculum);
    }
    if (savedLogs) setDailyLogs(JSON.parse(savedLogs));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.modules, JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateModuleProgress = (moduleId: string, progress: number) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, progress, completed: progress >= 100 }
          : module
      )
    );
  };

  const addDailyLog = (log: Omit<DailyLog, 'id'>) => {
    const newLog: DailyLog = {
      ...log,
      id: crypto.randomUUID(),
    };
    setDailyLogs((prev) => [...prev, newLog]);
    return newLog;
  };

  const getStats = (): LearningStats => {
    const totalHoursLogged = dailyLogs.reduce((sum, log) => sum + log.hoursSpent, 0);
    const totalTasksCompleted = tasks.filter((t) => t.completed).length;
    const modulesCompleted = modules.filter((m) => m.completed).length;
    
    // Calculate streak
    const sortedLogs = [...dailyLogs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].date);
      logDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (logDate.getTime() === expectedDate.getTime()) {
        tempStreak++;
        currentStreak = tempStreak;
      } else {
        break;
      }
    }

    // Calculate longest streak
    tempStreak = 1;
    for (let i = 1; i < sortedLogs.length; i++) {
      const prevDate = new Date(sortedLogs[i - 1].date);
      const currDate = new Date(sortedLogs[i].date);
      const diffDays = Math.floor(
        (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);

    const overallProgress =
      modules.length > 0
        ? modules.reduce((sum, m) => sum + m.progress, 0) / modules.length
        : 0;

    return {
      totalHoursLogged,
      totalTasksCompleted,
      currentStreak,
      longestStreak,
      modulesCompleted,
      overallProgress,
    };
  };

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter((task) => task.dueDate === today);
  };

  return {
    tasks,
    modules,
    dailyLogs,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateModuleProgress,
    addDailyLog,
    getStats,
    getTodaysTasks,
  };
};
