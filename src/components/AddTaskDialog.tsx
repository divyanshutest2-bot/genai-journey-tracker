import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Module } from '@/types/learning';

interface AddTaskDialogProps {
  modules: Module[];
  onAddTask: (task: {
    title: string;
    description?: string;
    moduleId: string;
    dueDate?: string;
    completed: boolean;
  }) => void;
}

const AddTaskDialog = ({ modules, onAddTask }: AddTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !moduleId) return;

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      moduleId,
      dueDate: dueDate || undefined,
      completed: false,
    });

    setTitle('');
    setDescription('');
    setModuleId('');
    setDueDate('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="gradient-text">Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Complete PyTorch tutorial..."
              className="bg-muted/30 border-border/50 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details..."
              className="bg-muted/30 border-border/50 focus:border-primary resize-none"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Module</label>
            <Select value={moduleId} onValueChange={setModuleId}>
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent className="glass-card border-border/50">
                {modules.map((module) => (
                  <SelectItem key={module.id} value={module.id}>
                    Week {module.weekNumber}: {module.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-muted/30 border-border/50 focus:border-primary"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
