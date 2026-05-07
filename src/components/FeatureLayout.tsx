import type { ReactNode } from "react";
import { HistoryPanel } from "@/components/HistoryPanel";
import { Disclaimer } from "@/components/Disclaimer";

export function FeatureLayout({
  children,
  feature,
  hideHistory,
}: {
  children: ReactNode;
  feature: string;
  hideHistory?: boolean;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {children}
          <Disclaimer />
        </div>
        {!hideHistory && (
          <aside className="space-y-4">
            <HistoryPanel feature={feature} />
          </aside>
        )}
      </div>
    </div>
  );
}
