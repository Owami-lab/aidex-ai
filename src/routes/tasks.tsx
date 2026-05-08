import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { runAI } from "@/lib/ai.functions";
import { addHistory } from "@/lib/history";
import { PageHeader } from "@/components/PageHeader";
import { AIOutput } from "@/components/AIOutput";
import { FeatureLayout } from "@/components/FeatureLayout";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkflowAI" },
      { name: "description", content: "Generate prioritized daily schedule and productivity tips." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [tasks, setTasks] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!tasks.trim()) {
      toast.error("Please enter your tasks.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const { content } = await runAI({ data: { task: "plan", payload: { tasks, context } } });
      setOutput(content);
      addHistory("Task Planner", content);
    } catch (e: any) {
      toast.error(e.message || "Failed to plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeatureLayout feature="Task Planner">
      <PageHeader icon={ListChecks} title="AI Task Planner" description="Prioritized daily schedule and time optimization tips." />
      <Card className="p-6">
        <Label htmlFor="tasks">Your tasks (one per line, mark priority)</Label>
        <Textarea
          id="tasks"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          placeholder={`Finish quarterly report (HIGH, due 5pm)\nEmail vendor about invoice (medium)\nReview design mockups (low)`}
          className="mt-1.5 min-h-44 font-mono text-sm"
        />
        <div className="mt-4">
          <Label htmlFor="ctx">Workday context (optional)</Label>
          <Input
            id="ctx"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g. 9am-6pm, 2 meetings at 11 and 3"
            className="mt-1.5"
          />
        </div>
        <Button onClick={run} disabled={loading} size="lg" className="mt-4">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {loading ? "Planning..." : "Generate Schedule"}
        </Button>
      </Card>
      {output && <div className="mt-6"><AIOutput content={output} filename="schedule.md" /></div>}
    </FeatureLayout>
  );
}
