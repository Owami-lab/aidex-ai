import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { runAI } from "@/lib/ai.functions";
import { addHistory } from "@/lib/history";
import { PageHeader } from "@/components/PageHeader";
import { AIOutput } from "@/components/AIOutput";
import { FeatureLayout } from "@/components/FeatureLayout";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkflowAI" },
      { name: "description", content: "Generate professional emails with AI in seconds." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!purpose.trim() || !recipient.trim()) {
      toast.error("Please fill in purpose and recipient.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const { content } = await runAI({
        data: { task: "email", payload: { purpose, recipient, tone } },
      });
      setOutput(content);
      addHistory("Email Generator", content);
    } catch (e: any) {
      toast.error(e.message || "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeatureLayout feature="Email Generator">
      <PageHeader icon={Mail} title="Smart Email Generator" description="Craft polished, on-brand emails in any tone." />
      <Card className="p-6">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="purpose">Email purpose</Label>
            <Textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Follow up with a client about the proposal sent last week"
              className="mt-1.5 min-h-24"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="recipient">Recipient type</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Senior client, Hiring manager"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={generate} disabled={loading} size="lg" className="mt-2">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Generating..." : "Generate Email"}
          </Button>
        </div>
      </Card>
      {output && <div className="mt-6"><AIOutput content={output} filename="email.txt" /></div>}
    </FeatureLayout>
  );
}
