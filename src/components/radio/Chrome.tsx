import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, House, Newspaper, UserRound, Pause, Play } from "lucide-react";
import { currentShow } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Waveform } from "./ui";

const TABS = [
  { to: "/home", label: "Home", icon: House },
  { to: "/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/news", label: "News & Events", icon: Newspaper },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

export function appChrome(path: string) {
  return ["/home", "/schedule", "/news", "/about", "/profile"].some(
    (base) => path === base || path.startsWith(`${base}/`),
  );
}

export function TabBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[#5C1420] bg-maroon pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-4">
        {TABS.map((tab) => {
          const active = path === tab.to || path.startsWith(`${tab.to}/`);
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-[0.08em] uppercase",
                  active ? "text-gold" : "text-rose",
                )}
              >
                <Icon size={20} strokeWidth={1.5} />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MiniPlayer() {
  const { playing, togglePlay } = useApp();
  const show = currentShow();
  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+3.5rem)] left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[#5C1420] bg-surface">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="h-8 w-14">
          <Waveform bars={10} active={playing} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold tracking-[0.14em] text-gold uppercase">Live</p>
          <p className="truncate text-[13px] text-white">
            {show.name} · {show.host}
          </p>
        </div>
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-maroon active:opacity-70"
        >
          {playing ? <Pause size={16} strokeWidth={2} /> : <Play size={16} strokeWidth={2} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
