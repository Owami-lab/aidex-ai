import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { runAI } from "@/server/ai.functions";
import { addHistory } from "@/lib/history";
import { PageHeader } from "@/components/PageHeader";
import { AIOutput } from "@/components/AIOutput";
import { FeatureLayout } from "@/components/FeatureLayout";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkflowAI" },
      { name: "description", content: "Summarize topics and articles with key insights and recommendations." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!topic.trim() || topic.trim().length < 10) {
      toast.error("Please enter a topic or paste an article (10+ characters).");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const { content } = await runAI({ data: { task: "research", payload: { topic } } });
      setOutput(content);
      addHistory("Research Assistant", content);
    } catch (e: any) {
      toast.error(e.message || "Failed to research");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeatureLayout feature="Research Assistant">
      <PageHeader icon={Search} title="AI Research Assistant" description="Distill topics and articles into clear, actionable insights." />
      <Card className="p-6">
        <Label htmlFor="topic">Topic or article</Label>
        <Textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Paste an article or describe a topic to research..."
          className="mt-1.5 min-h-56"
        />
        <Button onClick={run} disabled={loading} size="lg" className="mt-4">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {loading ? "Researching..." : "Summarize & Analyze"}
        </Button>
      </Card>
      {output && <div className="mt-6"><AIOutput content={output} filename="research.md" /></div>}
    </FeatureLayout>
  );
}
