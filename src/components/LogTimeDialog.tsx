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
import { Clock } from 'lucide-react';

interface LogTimeDialogProps {
  onLogTime: (log: {
    date: string;
    hoursSpent: number;
    notes: string;
    tasksCompleted: string[];
  }) => void;
}

const LogTimeDialog = ({ onLogTime }: LogTimeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState('3');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hours || parseFloat(hours) <= 0) return;

    onLogTime({
      date,
      hoursSpent: parseFloat(hours),
      notes: notes.trim(),
      tasksCompleted: [],
    });

    setHours('3');
    setNotes('');
    setDate(new Date().toISOString().split('T')[0]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 gap-2">
          <Clock className="w-4 h-4" />
          Log Time
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="gradient-text">Log Study Time</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-muted/30 border-border/50 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hours Spent</label>
            <Input
              type="number"
              step="0.5"
              min="0.5"
              max="12"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="bg-muted/30 border-border/50 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you learn today?"
              className="bg-muted/30 border-border/50 focus:border-primary resize-none"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Log Time
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LogTimeDialog;
