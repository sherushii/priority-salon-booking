import { Card } from "@/components/ui/card";
import { ExecutionStep } from "@/lib/scheduling";

interface GanttChartProps {
  executionSteps: ExecutionStep[];
  totalTime: number;
}

const colors = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-pink-400",
  "bg-purple-400",
  "bg-indigo-400",
];

const GanttChart = ({ executionSteps, totalTime }: GanttChartProps) => {
  if (executionSteps.length === 0) {
    return null;
  }

  const colorMap = new Map<string, string>();
  executionSteps.forEach((step) => {
    if (!colorMap.has(step.processId)) {
      colorMap.set(step.processId, colors[colorMap.size % colors.length]);
    }
  });

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Gantt Chart Timeline 📊</h3>
      
      <div className="space-y-4">
        <div className="flex gap-1 h-16 items-end">
          {executionSteps.map((step, index) => {
            const width = (step.timeSlice / totalTime) * 100;
            return (
              <div
                key={index}
                className={`${colorMap.get(step.processId)} rounded-t-lg transition-all hover:opacity-80 flex items-center justify-center text-white text-xs font-semibold px-1`}
                style={{ 
                  width: `${width}%`,
                  minWidth: '40px',
                  animation: `growUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {step.processName}
              </div>
            );
          })}
        </div>

        <div className="flex border-t-2 border-border pt-2">
          {executionSteps.map((step, index) => {
            const width = (step.timeSlice / totalTime) * 100;
            return (
              <div
                key={index}
                className="text-center text-xs text-muted-foreground"
                style={{ width: `${width}%`, minWidth: '40px' }}
              >
                {step.startTime}
              </div>
            );
          })}
          <div className="text-xs text-muted-foreground ml-auto">
            {totalTime}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes growUp {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: 4rem;
            opacity: 1;
          }
        }
      `}</style>
    </Card>
  );
};

export default GanttChart;
