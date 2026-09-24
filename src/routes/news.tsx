import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useRequireListener } from "@/components/radio/guard";
import { STORIES, type StoryKind } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TABS: { key: StoryKind; label: string }[] = [
  { key: "news", label: "News" },
  { key: "event", label: "Events" },
  { key: "weather", label: "Weather" },
];

export const Route = createFileRoute("/news")({
  validateSearch: (search: Record<string, unknown>): { tab: StoryKind } => {
    if (search.tab === "event" || search.tab === "weather" || search.tab === "news") return { tab: search.tab };
    return { tab: "news" };
  },
  head: () => ({ meta: [{ title: "News & Events — W1PJM" }] }),
  component: NewsScreen,
});

function NewsScreen() {
  useRequireListener();
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [ready, setReady] = useState(false);
  const items = STORIES.filter((story) => story.kind === tab);

  useEffect(() => {
    setReady(false);
    const timer = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(timer);
  }, [tab]);

  return (
    <div>
      <header className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">Cape Cod</p>
        <h1 className="mt-1 text-[28px] text-white">News & Events</h1>
      </header>
      <div className="mx-4 mt-4 grid grid-cols-3 overflow-hidden rounded-[10px] border border-[#5C1420]">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => navigate({ search: { tab: item.key } })}
            className={cn(
              "min-h-11 text-[15px] font-semibold",
              tab === item.key ? "bg-gold text-maroon" : "text-rose",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3 px-4">
        {!ready
          ? [0, 1, 2].map((key) => <div key={key} className="skeleton h-28" />)
          : items.map((story) => (
              <Link key={story.id} to="/news/$id" params={{ id: story.id }} className="block bg-surface">
                <img src={story.image} alt="" className="h-36 w-full object-cover" />
                <div className="px-3 py-3">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-gold uppercase">{story.time}</p>
                  <h2 className="mt-1 text-[16px] leading-snug font-bold tracking-normal text-white normal-case">{story.title}</h2>
                  <p className="mt-1 text-[13px] leading-relaxed font-normal tracking-normal text-rose normal-case">{story.excerpt}</p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
