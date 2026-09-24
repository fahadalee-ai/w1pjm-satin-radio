import { createFileRoute, Link } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useRequireListener } from "@/components/radio/guard";
import { Waveform } from "@/components/radio/ui";
import { currentShow, featuredShows, formatClock, STORIES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Listen Live — W1PJM" }] }),
  component: HomeScreen,
});

function HomeScreen() {
  useRequireListener();
  const { playing, togglePlay, volume, setVolume } = useApp();
  const [ready, setReady] = useState(false);
  const show = currentShow();
  const lineup = featuredShows();
  const events = STORIES.filter((story) => story.kind === "event").slice(0, 2);
  const news = STORIES.filter((story) => story.kind === "news").slice(0, 2);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="bg-maroon">
      <header className="flex items-end justify-between px-4 pt-[max(0.9rem,env(safe-area-inset-top))] pb-3">
        <div>
          <p className="text-[22px] font-extrabold tracking-[0.14em] text-white uppercase">W1PJM</p>
          <p className="text-[10px] font-bold tracking-[0.22em] text-gold uppercase">Satin Radio</p>
        </div>
        <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-gold uppercase">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-gold" />
          On Air
        </span>
      </header>

      {!ready ? (
        <div className="space-y-3 px-4">
          <div className="skeleton h-64" />
          <div className="skeleton h-24" />
          <div className="skeleton h-24" />
        </div>
      ) : (
        <>
          <section className="mx-4 bg-surface px-4 pt-5 pb-4">
            <div className="mx-auto h-24 w-full max-w-[240px]">
              <Waveform active={playing} />
            </div>
            <p className="mt-4 text-center text-[20px] text-white">{show.name}</p>
            <p className="mt-1 text-center text-[14px] font-normal tracking-normal text-rose normal-case">with {show.host}</p>
            <button
              type="button"
              aria-label={playing ? "Pause live stream" : "Play live stream"}
              onClick={togglePlay}
              className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-maroon active:opacity-70"
            >
              {playing ? <Pause size={26} strokeWidth={2} /> : <Play size={26} strokeWidth={2} className="ml-1" />}
            </button>
            <label className="mt-5 block">
              <span className="mb-2 block text-[11px] font-bold tracking-[0.16em] text-rose uppercase">Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                aria-label="Volume"
                onChange={(event) => setVolume(Number(event.target.value))}
                className="w-full accent-[#FACD05]"
              />
            </label>
          </section>

          <section className="mt-6">
            <h2 className="px-4 text-[13px] tracking-[0.18em] text-white">Live Shows</h2>
            <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
              {lineup.map((item) => (
                <Link
                  key={item.id}
                  to="/schedule"
                  className="w-[168px] shrink-0 bg-surface"
                >
                  <img src={item.image} alt="" className="h-24 w-full object-cover" />
                  <div className="px-3 py-3">
                    <p className="text-[13px] font-bold tracking-wide text-white uppercase">{item.name}</p>
                    <p className="mt-1 text-[12px] text-rose">
                      {formatClock(item.start)} – {formatClock(item.end)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-4 mt-6 border border-[#5C1420] px-4 py-4">
            <h2 className="text-[13px] tracking-[0.18em] text-gold">Curated Music</h2>
            <p className="mt-2 text-[15px] leading-relaxed font-normal tracking-normal text-rose normal-case">
              An eclectic blend of classic favorites, contemporary hits, and standout tracks from independent Massachusetts artists.
            </p>
          </section>

          <Feed title="Local Events" tab="event" items={events} />
          <Feed title="Local News" tab="news" items={news} />

          <Link to="/about" className="mx-4 mt-6 mb-2 flex items-center justify-between border border-[#5C1420] bg-surface px-4 py-4">
            <span>
              <span className="block text-[13px] tracking-[0.16em] text-white">Station Story</span>
              <span className="mt-1 block text-[13px] font-normal tracking-normal text-rose normal-case">The true voice of Cape Cod</span>
            </span>
            <span className="text-gold">→</span>
          </Link>
        </>
      )}
    </div>
  );
}

function Feed({
  title,
  tab,
  items,
}: {
  title: string;
  tab: "news" | "event";
  items: { id: string; title: string; time: string; image: string }[];
}) {
  return (
    <section className="mx-4 mt-6">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-[13px] tracking-[0.18em] text-white">{title}</h2>
        <Link to="/news" search={{ tab }} className="text-[12px] font-semibold tracking-wide text-gold uppercase">
          See all
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Link key={item.id} to="/news/$id" params={{ id: item.id }} className="flex gap-3 bg-surface">
            <img src={item.image} alt="" className="h-20 w-24 object-cover" />
            <span className="min-w-0 py-2 pr-3">
              <span className="block text-[14px] font-semibold leading-snug tracking-normal text-white normal-case">{item.title}</span>
              <span className="mt-1 block text-[12px] text-rose">{item.time}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
