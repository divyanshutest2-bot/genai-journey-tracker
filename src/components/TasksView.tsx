import { useState } from 'react';
import { Task, Module } from '@/types/learning';
import TaskItem from './TaskItem';
import AddTaskDialog from './AddTaskDialog';
import { Button } from '@/components/ui/button';
import { ListTodo, CheckCircle, Circle, Filter } from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  modules: Module[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const TasksView = ({
  tasks,
  modules,
  onToggleTask,
  onDeleteTask,
  onAddTask,
}: TasksViewProps) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [moduleFilter, setModuleFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    const moduleMatch = moduleFilter === 'all' || task.moduleId === moduleFilter;
    return statusMatch && moduleMatch;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-primary" />
            Task <span className="gradient-text">Manager</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            {activeCount} active • {completedCount} completed
          </p>
        </div>
        <AddTaskDialog modules={modules} onAddTask={onAddTask} />
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Status:</span>
            <div className="flex gap-2">
              {(['all', 'active', 'completed'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={`capitalize ${
                    filter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {status === 'active' && <Circle className="w-3 h-3 mr-1" />}
                  {status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm text-muted-foreground">Module:</span>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="bg-muted/30 border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="all">All Modules</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  Week {module.weekNumber}: {module.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ListTodo className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No tasks found</h3>
            <p className="text-muted-foreground text-sm">
              {filter === 'all'
                ? 'Add your first task to get started!'
                : `No ${filter} tasks to display.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksView;
