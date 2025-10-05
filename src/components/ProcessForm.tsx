import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Info } from "lucide-react";
import { Process } from "@/lib/scheduling";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProcessFormProps {
  onAddProcess: (process: Process) => void;
  algorithm: "priority" | "roundrobin";
  onAlgorithmChange: (algorithm: "priority" | "roundrobin") => void;
  quantum: number;
  onQuantumChange: (quantum: number) => void;
}

const ProcessForm = ({
  onAddProcess,
  algorithm,
  onAlgorithmChange,
  quantum,
  onQuantumChange,
}: ProcessFormProps) => {
  const [name, setName] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !burstTime || !priority) {
      toast.error("Please fill in all fields! 🚫");
      return;
    }

    const newProcess: Process = {
      id: Date.now().toString(),
      name,
      burstTime: parseInt(burstTime),
      priority: parseInt(priority),
      remainingTime: parseInt(burstTime),
      waitingTime: 0,
      turnaroundTime: 0,
      completionTime: 0,
    };

    onAddProcess(newProcess);
    toast.success(`${name} added to the queue! 💇‍♀️`);
    
    setName("");
    setBurstTime("");
    setPriority("");
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Add Customer (Process) 💇‍♀️
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              placeholder="e.g., Sarah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="burstTime" className="flex items-center gap-2">
              Burst Time (minutes)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How long this service takes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="burstTime"
              type="number"
              min="1"
              placeholder="e.g., 30"
              value={burstTime}
              onChange={(e) => setBurstTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="priority" className="flex items-center gap-2">
              Priority (1-10)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Higher number = higher priority (10 = bridal, 1 = walk-in)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="priority"
              type="number"
              min="1"
              max="10"
              placeholder="e.g., 8"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <Button type="submit" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t">
        <Label className="text-lg font-semibold mb-3 block">Choose Scheduling Algorithm 🧮</Label>
        
        <RadioGroup value={algorithm} onValueChange={(val) => onAlgorithmChange(val as "priority" | "roundrobin")}>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="priority" id="priority" />
            <Label htmlFor="priority" className="flex-1 cursor-pointer">
              <div className="font-semibold">Priority Scheduling 👑</div>
              <div className="text-sm text-muted-foreground">VIPs first! Serve customers by priority order.</div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="roundrobin" id="roundrobin" />
            <Label htmlFor="roundrobin" className="flex-1 cursor-pointer">
              <div className="font-semibold">Round Robin ⏱️</div>
              <div className="text-sm text-muted-foreground">Fair for everyone! Each customer gets equal time slices.</div>
            </Label>
          </div>
        </RadioGroup>

        {algorithm === "roundrobin" && (
          <div className="mt-4">
            <Label htmlFor="quantum">Time Quantum (minutes)</Label>
            <Input
              id="quantum"
              type="number"
              min="1"
              value={quantum}
              onChange={(e) => onQuantumChange(parseInt(e.target.value) || 1)}
              className="mt-1"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProcessForm;
