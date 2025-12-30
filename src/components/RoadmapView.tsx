import { Module } from '@/types/learning';
import ModuleCard from './ModuleCard';
import { Progress } from '@/components/ui/progress';
import { Map, Clock, BookOpen } from 'lucide-react';

interface RoadmapViewProps {
  modules: Module[];
  onUpdateProgress: (moduleId: string, progress: number) => void;
}

const RoadmapView = ({ modules, onUpdateProgress }: RoadmapViewProps) => {
  const totalHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);
  const completedModules = modules.filter((m) => m.completed).length;
  const overallProgress = modules.reduce((sum, m) => sum + m.progress, 0) / modules.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
          <Map className="w-8 h-8 text-primary" />
          Learning <span className="gradient-text">Roadmap</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Your 16-week journey to GenAI mastery with 3 hours daily
        </p>
      </div>

      {/* Overview Stats */}
      <div className="glass-card p-6">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mb-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Total Modules</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {completedModules}/{modules.length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Total Hours</span>
            </div>
            <p className="text-2xl font-bold gradient-text">{totalHours}h</p>
          </div>
          <div className="text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-end gap-2 text-muted-foreground mb-2">
              <span className="text-sm">Overall Progress</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{Math.round(overallProgress)}%</p>
          </div>
        </div>
        <Progress value={overallProgress} className="h-3 mt-6" />
      </div>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            onUpdateProgress={onUpdateProgress}
            index={index}
          />
        ))}
      </div>

      {/* Timeline Note */}
      <div className="glass-card p-6 text-center">
        <p className="text-muted-foreground">
          📅 At 3 hours/day, you'll complete this curriculum in approximately{' '}
          <span className="text-primary font-semibold">16 weeks</span>
        </p>
      </div>
    </div>
  );
};

export default RoadmapView;
