import { Clock, Target, Flame, Trophy, BookOpen, CheckCircle } from 'lucide-react';
import StatsCard from './StatsCard';
import ProgressRing from './ProgressRing';
import TaskItem from './TaskItem';
import AddTaskDialog from './AddTaskDialog';
import LogTimeDialog from './LogTimeDialog';
import { Task, Module, LearningStats } from '@/types/learning';

interface DashboardViewProps {
  stats: LearningStats;
  tasks: Task[];
  modules: Module[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onLogTime: (log: { date: string; hoursSpent: number; notes: string; tasksCompleted: string[] }) => void;
}

const DashboardView = ({
  stats,
  tasks,
  modules,
  onToggleTask,
  onDeleteTask,
  onAddTask,
  onLogTime,
}: DashboardViewProps) => {
  const recentTasks = tasks.slice(-5).reverse();
  const incompleteTasks = tasks.filter((t) => !t.completed).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">Learner</span>
          </h2>
          <p className="text-muted-foreground mt-1">
            Track your GenAI learning journey
          </p>
        </div>
        <div className="flex gap-3">
          <LogTimeDialog onLogTime={onLogTime} />
          <AddTaskDialog modules={modules} onAddTask={onAddTask} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Hours Logged"
          value={stats.totalHoursLogged.toFixed(1)}
          subtitle="Total study time"
          icon={Clock}
          gradient
        />
        <StatsCard
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          subtitle={`Best: ${stats.longestStreak} days`}
          icon={Flame}
        />
        <StatsCard
          title="Tasks Done"
          value={stats.totalTasksCompleted}
          subtitle={`${tasks.filter((t) => !t.completed).length} remaining`}
          icon={CheckCircle}
        />
        <StatsCard
          title="Modules Done"
          value={`${stats.modulesCompleted}/${modules.length}`}
          subtitle="Keep going!"
          icon={Trophy}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Overall Progress
          </h3>
          <div className="flex flex-col items-center">
            <ProgressRing progress={stats.overallProgress} size={160} strokeWidth={12} />
            <div className="mt-6 w-full space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target</span>
                <span className="text-foreground">16 Weeks (336 hours)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="text-primary">{stats.totalHoursLogged.toFixed(1)} hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Daily Goal</span>
                <span className="text-foreground">3 hours/day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Active Tasks
          </h3>
          {incompleteTasks.length > 0 ? (
            <div className="space-y-3">
              {incompleteTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">All tasks completed!</p>
              <p className="text-sm text-muted-foreground mt-1">Add new tasks to keep learning</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-foreground mb-4">💡 Today's Tip</h3>
        <p className="text-muted-foreground">
          Consistency beats intensity. Your 3-hour daily commitment will compound into mastery. 
          Focus on understanding concepts deeply rather than rushing through materials.
        </p>
      </div>
    </div>
  );
};

export default DashboardView;
