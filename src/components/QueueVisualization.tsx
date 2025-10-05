import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Process } from "@/lib/scheduling";
import { Trash2, Play } from "lucide-react";

interface QueueVisualizationProps {
  processes: Process[];
  activeProcessId?: string;
  onRemoveProcess: (id: string) => void;
  onRunScheduler: () => void;
  isRunning: boolean;
}

const QueueVisualization = ({
  processes,
  activeProcessId,
  onRemoveProcess,
  onRunScheduler,
  isRunning,
}: QueueVisualizationProps) => {
  const getPriorityLabel = (priority: number) => {
    if (priority >= 8) return { label: "VIP 👑", color: "bg-primary/20 text-primary border-primary/30" };
    if (priority >= 5) return { label: "Regular 💇", color: "bg-accent/20 text-accent border-accent/30" };
    return { label: "Walk-in ☕", color: "bg-muted text-muted-foreground border-border" };
  };

  if (processes.length === 0) {
    return (
      <Card className="p-12 text-center bg-muted/30">
        <div className="text-6xl mb-4">💤</div>
        <h3 className="text-xl font-semibold text-muted-foreground">
          No customers in queue
        </h3>
        <p className="text-muted-foreground mt-2">Add some customers to get started!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Waiting Queue 💺</h3>
        <Button 
          onClick={onRunScheduler} 
          disabled={isRunning || processes.length === 0}
          size="lg"
          className="gap-2"
        >
          <Play className="h-5 w-5" />
          {isRunning ? "Running..." : "Run Scheduler"}
        </Button>
      </div>

      <div className="grid gap-4">
        {processes.map((process, index) => {
          const priorityInfo = getPriorityLabel(process.priority);
          const isActive = process.id === activeProcessId;

          return (
            <Card
              key={process.id}
              className={`p-4 transition-all duration-300 ${
                isActive
                  ? "scale-105 shadow-glow border-primary border-2 bg-gradient-to-r from-primary/10 to-accent/10"
                  : "hover:shadow-soft"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">💇‍♀️</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold">{process.name}</h4>
                    <Badge className={priorityInfo.color}>
                      {priorityInfo.label}
                    </Badge>
                    {isActive && (
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white animate-pulse">
                        Being Served ✨
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>⏱️ {process.burstTime} min</span>
                    <span>🎯 Priority: {process.priority}</span>
                    <span>📍 Position: #{index + 1}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveProcess(process.id)}
                  disabled={isRunning}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QueueVisualization;
