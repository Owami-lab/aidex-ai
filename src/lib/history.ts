export type HistoryItem = {
  id: string;
  feature: string;
  preview: string;
  content: string;
  createdAt: number;
};

const KEY = "workflowai.history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addHistory(feature: string, content: string) {
  if (typeof window === "undefined") return;
  const items = getHistory();
  const item: HistoryItem = {
    id: crypto.randomUUID(),
    feature,
    preview: content.slice(0, 120).replace(/\n+/g, " "),
    content,
    createdAt: Date.now(),
  };
  const next = [item, ...items].slice(0, 30);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("history-updated"));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("history-updated"));
}
