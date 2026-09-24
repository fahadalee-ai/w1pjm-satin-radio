import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useRequireListener } from "@/components/radio/guard";
import { Toggle } from "@/components/radio/ui";
import { ALERTS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile/notifications")({
  head: () => ({ meta: [{ title: "Notifications — W1PJM" }] }),
  component: NotificationsScreen,
});

function NotificationsScreen() {
  useRequireListener();
  const { user, prefs, togglePref } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/profile", replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <Link to="/profile" aria-label="Back" className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-[#5C1420] text-gold">
        <ArrowLeft size={18} strokeWidth={1.5} />
      </Link>
      <h1 className="text-[28px] text-white">Notifications</h1>
      <div className="mt-5 divide-y divide-[#5C1420] border-y border-[#5C1420]">
        <Pref label="Breaking local news" on={prefs.breakingNews} onClick={() => togglePref("breakingNews")} />
        <Pref label="Show reminders" on={prefs.showReminders} onClick={() => togglePref("showReminders")} />
      </div>
      <h2 className="mt-6 text-[13px] tracking-[0.16em] text-gold">Recent</h2>
      <ul className="mt-3 space-y-3">
        {ALERTS.map((alert) => (
          <li key={alert.id} className="bg-surface px-3 py-3">
            <p className="text-[11px] font-bold tracking-[0.14em] text-gold uppercase">{alert.kind}</p>
            <p className="mt-1 text-[14px] text-white">{alert.title}</p>
            <p className="mt-1 text-[12px] text-rose">{alert.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pref({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4">
      <span className="text-[15px] text-white">{label}</span>
      <Toggle on={on} label={label} onClick={onClick} />
    </div>
  );
}
