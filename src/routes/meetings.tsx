import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Loader2, Sparkles } from "lucide-react";
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

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer — WorkflowAI" },
      { name: "description", content: "Summarize meeting notes into key points, decisions and action items." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!notes.trim() || notes.trim().length < 30) {
      toast.error("Please paste meeting notes (at least 30 characters).");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const { content } = await runAI({ data: { task: "summarize", payload: { notes } } });
      setOutput(content);
      addHistory("Meeting Summarizer", content);
    } catch (e: any) {
      toast.error(e.message || "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeatureLayout feature="Meeting Summarizer">
      <PageHeader icon={FileText} title="Meeting Notes Summarizer" description="Extract key points, decisions, action items and deadlines." />
      <Card className="p-6">
        <Label htmlFor="notes">Paste your meeting notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste raw meeting notes, transcripts or bullet points..."
          className="mt-1.5 min-h-64 font-mono text-sm"
        />
        <Button onClick={run} disabled={loading} size="lg" className="mt-4">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {loading ? "Summarizing..." : "Summarize Notes"}
        </Button>
      </Card>
      {output && <div className="mt-6"><AIOutput content={output} filename="meeting-summary.md" /></div>}
    </FeatureLayout>
  );
}
