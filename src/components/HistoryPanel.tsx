import { useEffect, useState } from "react";
import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clearHistory, getHistory, type HistoryItem } from "@/lib/history";

export function HistoryPanel({ feature }: { feature?: string }) {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const load = () => setItems(getHistory());
    load();
    window.addEventListener("history-updated", load);
    return () => window.removeEventListener("history-updated", load);
  }, []);

  const filtered = feature ? items.filter((i) => i.feature === feature) : items;

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Recent History</h3>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => clearHistory()}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      {filtered.length === 0 ? (
        <p className="text-xs text-muted-foreground">No outputs yet. Generate something to see it here.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.slice(0, 8).map((i) => (
            <li key={i.id} className="rounded-md border border-border bg-muted/30 p-3 text-xs">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-medium text-foreground">{i.feature}</span>
                <span className="text-muted-foreground">{new Date(i.createdAt).toLocaleString()}</span>
              </div>
              <p className="line-clamp-2 text-muted-foreground">{i.preview}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
