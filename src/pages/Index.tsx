import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DashboardView from '@/components/DashboardView';
import RoadmapView from '@/components/RoadmapView';
import TasksView from '@/components/TasksView';
import { useLearningStore } from '@/hooks/useLearningStore';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {
    tasks,
    modules,
    addTask,
    toggleTaskComplete,
    deleteTask,
    updateModuleProgress,
    addDailyLog,
    getStats,
  } = useLearningStore();

  const stats = getStats();

  const handleAddTask = (task: Parameters<typeof addTask>[0]) => {
    addTask(task);
    toast.success('Task added successfully!');
  };

  const handleToggleTask = (id: string) => {
    toggleTaskComplete(id);
    const task = tasks.find((t) => t.id === id);
    if (task && !task.completed) {
      toast.success('Task completed! 🎉');
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast.success('Task deleted');
  };

  const handleUpdateProgress = (moduleId: string, progress: number) => {
    updateModuleProgress(moduleId, progress);
    toast.success('Progress updated!');
  };

  const handleLogTime = (log: Parameters<typeof addDailyLog>[0]) => {
    addDailyLog(log);
    toast.success(`Logged ${log.hoursSpent} hours! Keep it up! 🔥`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-8 relative">
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            tasks={tasks}
            modules={modules}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
            onLogTime={handleLogTime}
          />
        )}
        {activeTab === 'roadmap' && (
          <RoadmapView modules={modules} onUpdateProgress={handleUpdateProgress} />
        )}
        {activeTab === 'tasks' && (
          <TasksView
            tasks={tasks}
            modules={modules}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
          />
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Index;
