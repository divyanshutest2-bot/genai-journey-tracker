import { Module } from '@/types/learning';
import { ChevronRight, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface ModuleCardProps {
  module: Module;
  onUpdateProgress: (moduleId: string, progress: number) => void;
  index: number;
}

const ModuleCard = ({ module, onUpdateProgress, index }: ModuleCardProps) => {
  const [progress, setProgress] = useState(module.progress);

  const handleSaveProgress = () => {
    onUpdateProgress(module.id, progress);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="glass-card-hover p-6 cursor-pointer group opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                {module.weekNumber}
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Week {module.weekNumber}-{module.weekNumber + 1}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {module.description}
          </p>

          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{module.estimatedHours}h</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{module.topics.length} topics</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className={module.progress >= 100 ? 'text-primary' : 'text-foreground'}>
                {module.progress}%
              </span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="glass-card border-border/50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
              {module.weekNumber}
            </div>
            <div>
              <span className="gradient-text">{module.title}</span>
              <p className="text-sm font-normal text-muted-foreground">
                Week {module.weekNumber}-{module.weekNumber + 1} • {module.estimatedHours} hours
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Topics Covered</h4>
            <ul className="space-y-2">
              {module.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Resources</h4>
            <div className="space-y-2">
              {module.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary uppercase font-medium">
                      {resource.type}
                    </span>
                    <span className="text-sm text-foreground">{resource.title}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="font-semibold text-foreground">Update Progress</h4>
            <div className="space-y-4">
              <Slider
                value={[progress]}
                onValueChange={(value) => setProgress(value[0])}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold gradient-text">{progress}%</span>
                <Button onClick={handleSaveProgress} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Progress
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleCard;
