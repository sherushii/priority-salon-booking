import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProcessForm from "@/components/ProcessForm";
import QueueVisualization from "@/components/QueueVisualization";
import ExecutionLog from "@/components/ExecutionLog";
import GanttChart from "@/components/GanttChart";
import { Process, priorityScheduling, roundRobinScheduling, ExecutionStep } from "@/lib/scheduling";
import { toast } from "sonner";

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [algorithm, setAlgorithm] = useState<"priority" | "roundrobin">("priority");
  const [quantum, setQuantum] = useState(5);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [activeProcessId, setActiveProcessId] = useState<string>();
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [averageWaitingTime, setAverageWaitingTime] = useState<number>();
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState<number>();
  const [totalTime, setTotalTime] = useState(0);

  const handleAddProcess = (process: Process) => {
    setProcesses([...processes, process]);
    setExecutionSteps([]);
    setActiveProcessId(undefined);
    setIsComplete(false);
  };

  const handleRemoveProcess = (id: string) => {
    setProcesses(processes.filter((p) => p.id !== id));
    setExecutionSteps([]);
    setActiveProcessId(undefined);
    setIsComplete(false);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleRunScheduler = async () => {
    if (processes.length === 0) {
      toast.error("Add some customers first! 💇‍♀️");
      return;
    }

    setIsRunning(true);
    setIsComplete(false);
    setExecutionSteps([]);
    setActiveProcessId(undefined);

    toast.success("Starting the scheduler! ✨");

    const result =
      algorithm === "priority"
        ? priorityScheduling(processes)
        : roundRobinScheduling(processes, quantum);

    setTotalTime(result.totalTime);
    setAverageWaitingTime(result.averageWaitingTime);
    setAverageTurnaroundTime(result.averageTurnaroundTime);

    for (const step of result.executionSteps) {
      setActiveProcessId(step.processId);
      setExecutionSteps((prev) => [...prev, step]);
      await sleep(800);
    }

    setActiveProcessId(undefined);
    setIsComplete(true);
    setIsRunning(false);
    toast.success("All customers served! 🎉");
  };

  return (
    <div className="min-h-screen pb-12">
      <HeroSection />

      <div className="container mx-auto px-4 space-y-8">
        <ProcessForm
          onAddProcess={handleAddProcess}
          algorithm={algorithm}
          onAlgorithmChange={setAlgorithm}
          quantum={quantum}
          onQuantumChange={setQuantum}
        />

        <QueueVisualization
          processes={processes}
          activeProcessId={activeProcessId}
          onRemoveProcess={handleRemoveProcess}
          onRunScheduler={handleRunScheduler}
          isRunning={isRunning}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <ExecutionLog
            executionSteps={executionSteps}
            isComplete={isComplete}
            averageWaitingTime={averageWaitingTime}
            averageTurnaroundTime={averageTurnaroundTime}
          />
          
          <GanttChart executionSteps={executionSteps} totalTime={totalTime} />
        </div>

        <footer className="text-center py-8 text-muted-foreground">
          <p className="text-lg">Made for OS lovers who multitask in style 💻💅</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
