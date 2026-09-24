import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useRequireListener } from "@/components/radio/guard";
import { GoldButton, Toggle } from "@/components/radio/ui";
import { DAYS, dayKey, formatClock, showsForDay, type DayKey, type Show } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "Schedule — W1PJM" }] }),
  component: ScheduleScreen,
});

function ScheduleScreen() {
  useRequireListener();
  const [day, setDay] = useState<DayKey>(dayKey());
  const [selected, setSelected] = useState<Show | null>(null);
  const { user, reminders, toggleReminder } = useApp();
  const [locked, setLocked] = useState(false);
  const shows = showsForDay(day);

  return (
    <div>
      <header className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">W1PJM</p>
        <h1 className="mt-1 text-[28px] text-white">Program Schedule</h1>
      </header>
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-4">
        {DAYS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setDay(item.key)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-4 text-[15px] font-semibold",
              day === item.key ? "bg-gold text-maroon" : "border border-[#5C1420] text-rose",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ol className="mt-4">
        {shows.map((show) => (
          <li key={show.id}>
            <button type="button" onClick={() => { setSelected(show); setLocked(false); }} className="flex w-full gap-3 border-b border-[#5C1420] px-4 py-4 text-left">
              <span className="w-[92px] shrink-0 text-[12px] font-bold tracking-wide text-gold">
                {formatClock(show.start)}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-bold tracking-wide text-white uppercase">{show.name}</span>
                <span className="mt-0.5 block text-[13px] font-normal tracking-normal text-rose normal-case">
                  {show.host} · {show.description}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-[430px] border-t border-[#5C1420] bg-surface px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              {formatClock(selected.start)} – {formatClock(selected.end)}
            </p>
            <h2 className="mt-2 text-[24px] text-white">{selected.name}</h2>
            <p className="mt-1 text-[14px] font-normal tracking-normal text-rose normal-case">with {selected.host}</p>
            <p className="mt-3 text-[15px] leading-relaxed font-normal tracking-normal text-white normal-case">{selected.description}</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-[14px] font-semibold text-white">Remind Me</span>
              <Toggle
                on={reminders.includes(selected.id)}
                label={`Remind me about ${selected.name}`}
                onClick={() => {
                  const ok = toggleReminder(selected.id);
                  if (!ok) setLocked(true);
                }}
              />
            </div>
            {locked && !user && (
              <p className="mt-3 text-[13px] text-rose">
                Reminders are part of a listener account. Log in to keep this show on your list.
              </p>
            )}
            <div className="mt-5">
              <GoldButton type="button" onClick={() => setSelected(null)}>
                Close
              </GoldButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
