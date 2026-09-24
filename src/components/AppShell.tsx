import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { MiniPlayer, TabBar, appChrome } from "./radio/Chrome";
import { Toasts } from "./radio/ui";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { started } = useApp();
  const chrome = appChrome(path);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background text-foreground">
      <Toasts />
      <main
        className={cn(
          "flex-1",
          chrome && (started ? "pb-[calc(env(safe-area-inset-bottom)+8.5rem)]" : "pb-[calc(env(safe-area-inset-bottom)+4.25rem)]"),
        )}
      >
        {children}
      </main>
      {chrome && started && <MiniPlayer />}
      {chrome && <TabBar />}
    </div>
  );
}
