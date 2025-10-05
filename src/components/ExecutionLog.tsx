import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExecutionStep } from "@/lib/scheduling";

interface ExecutionLogProps {
  executionSteps: ExecutionStep[];
  isComplete: boolean;
  averageWaitingTime?: number;
  averageTurnaroundTime?: number;
}

const ExecutionLog = ({
  executionSteps,
  isComplete,
  averageWaitingTime,
  averageTurnaroundTime,
}: ExecutionLogProps) => {
  if (executionSteps.length === 0) {
    return (
      <Card className="p-6 bg-muted/30">
        <h3 className="text-xl font-bold mb-4">Execution Log 📋</h3>
        <p className="text-muted-foreground text-center py-8">
          Click "Run Scheduler" to see the magic happen! ✨
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Execution Log 📋</h3>
      
      <ScrollArea className="h-64 pr-4">
        <div className="space-y-2">
          {executionSteps.map((step, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-gradient-to-r from-muted to-muted/50 border border-border"
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary">
                  💇‍♀️ {step.processName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {step.startTime} → {step.endTime} min ({step.timeSlice} min)
                </span>
              </div>
            </div>
          ))}
          
          {isComplete && (
            <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
              <p className="text-lg font-bold text-center mb-3">
                All customers served! CPU resting 💤
              </p>
              {averageWaitingTime !== undefined && averageTurnaroundTime !== undefined && (
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div>
                    <div className="text-muted-foreground">Avg Waiting Time</div>
                    <div className="text-xl font-bold text-primary">
                      {averageWaitingTime.toFixed(1)} min
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Avg Turnaround Time</div>
                    <div className="text-xl font-bold text-accent">
                      {averageTurnaroundTime.toFixed(1)} min
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </Card>
  );
};

export default ExecutionLog;
