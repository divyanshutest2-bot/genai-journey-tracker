import { Task } from '@/types/learning';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
        task.completed
          ? 'bg-muted/20 opacity-60'
          : 'glass-card-hover'
      }`}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium transition-all ${
            task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-muted-foreground truncate">{task.description}</p>
        )}
        {task.dueDate && (
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TaskItem;
