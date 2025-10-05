export interface Process {
  id: string;
  name: string;
  burstTime: number;
  priority: number;
  remainingTime: number;
  waitingTime: number;
  turnaroundTime: number;
  completionTime: number;
}

export interface ExecutionStep {
  processId: string;
  processName: string;
  startTime: number;
  endTime: number;
  timeSlice: number;
}

export interface SchedulingResult {
  executionSteps: ExecutionStep[];
  processes: Process[];
  totalTime: number;
  averageWaitingTime: number;
  averageTurnaroundTime: number;
}

export function priorityScheduling(processes: Process[]): SchedulingResult {
  const sortedProcesses = [...processes].sort((a, b) => b.priority - a.priority);
  const executionSteps: ExecutionStep[] = [];
  let currentTime = 0;

  sortedProcesses.forEach((process) => {
    const startTime = currentTime;
    const endTime = currentTime + process.burstTime;
    
    executionSteps.push({
      processId: process.id,
      processName: process.name,
      startTime,
      endTime,
      timeSlice: process.burstTime,
    });

    process.waitingTime = currentTime;
    process.completionTime = endTime;
    process.turnaroundTime = endTime;
    currentTime = endTime;
  });

  const totalWaitingTime = sortedProcesses.reduce((sum, p) => sum + p.waitingTime, 0);
  const totalTurnaroundTime = sortedProcesses.reduce((sum, p) => sum + p.turnaroundTime, 0);

  return {
    executionSteps,
    processes: sortedProcesses,
    totalTime: currentTime,
    averageWaitingTime: totalWaitingTime / sortedProcesses.length,
    averageTurnaroundTime: totalTurnaroundTime / sortedProcesses.length,
  };
}

export function roundRobinScheduling(processes: Process[], quantum: number): SchedulingResult {
  const queue = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const executionSteps: ExecutionStep[] = [];
  let currentTime = 0;
  let index = 0;

  while (queue.some(p => p.remainingTime > 0)) {
    const process = queue[index];

    if (process.remainingTime > 0) {
      const timeSlice = Math.min(quantum, process.remainingTime);
      const startTime = currentTime;
      const endTime = currentTime + timeSlice;

      executionSteps.push({
        processId: process.id,
        processName: process.name,
        startTime,
        endTime,
        timeSlice,
      });

      process.remainingTime -= timeSlice;
      currentTime = endTime;

      if (process.remainingTime === 0) {
        process.completionTime = currentTime;
        process.turnaroundTime = currentTime;
        process.waitingTime = process.turnaroundTime - process.burstTime;
      }
    }

    index = (index + 1) % queue.length;
  }

  const totalWaitingTime = queue.reduce((sum, p) => sum + p.waitingTime, 0);
  const totalTurnaroundTime = queue.reduce((sum, p) => sum + p.turnaroundTime, 0);

  return {
    executionSteps,
    processes: queue,
    totalTime: currentTime,
    averageWaitingTime: totalWaitingTime / queue.length,
    averageTurnaroundTime: totalTurnaroundTime / queue.length,
  };
}
