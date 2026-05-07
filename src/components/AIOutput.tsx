import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AIOutput({ content, filename = "output.txt" }: { content: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!content) return null;

  return (
    <Card className="relative p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="absolute right-3 top-3 flex gap-1">
        <Button variant="ghost" size="icon" onClick={copy} aria-label="Copy">
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={download} aria-label="Download">
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </Card>
  );
}