import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p>
        AI-generated content should be reviewed before professional use. Verify facts, tone, and
        sensitive details before sharing.
      </p>
    </div>
  );
}
