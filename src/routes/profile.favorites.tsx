import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect } from "react";
import { useRequireListener } from "@/components/radio/guard";
import { EmptyState } from "@/components/radio/ui";
import { formatClock, SHOWS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile/favorites")({
  head: () => ({ meta: [{ title: "Favorites — W1PJM" }] }),
  component: FavoritesScreen,
});

function FavoritesScreen() {
  useRequireListener();
  const { user, favorites, toggleFavorite } = useApp();
  const navigate = useNavigate();
  const saved = SHOWS.filter((show) => favorites.includes(show.id));

  useEffect(() => {
    if (!user) navigate({ to: "/profile", replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <Link to="/profile" aria-label="Back" className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-[#5C1420] text-gold">
        <ArrowLeft size={18} strokeWidth={1.5} />
      </Link>
      <h1 className="text-[28px] text-white">Favorites</h1>
      {saved.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={<Heart size={26} strokeWidth={1.5} />}
            title="No saved shows yet"
            body="Open a show on the schedule and tap Remind Me — or save one below — and it will wait here."
          />
          <div className="mt-4 space-y-2">
            {SHOWS.filter((show) => show.id !== "night-watch").slice(0, 4).map((show) => (
              <button
                key={show.id}
                type="button"
                onClick={() => toggleFavorite(show.id)}
                className="flex w-full items-center justify-between bg-surface px-3 py-3 text-left"
              >
                <span>
                  <span className="block text-[14px] font-bold tracking-wide text-white uppercase">{show.name}</span>
                  <span className="text-[12px] text-rose">{show.host} · {formatClock(show.start)}</span>
                </span>
                <Heart size={18} strokeWidth={1.5} className="text-gold" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ul className="mt-5 space-y-2">
          {saved.map((show) => (
            <li key={show.id} className="flex items-center gap-3 bg-surface">
              <img src={show.image} alt="" className="h-16 w-16 object-cover" />
              <div className="min-w-0 flex-1 py-2">
                <p className="text-[14px] font-bold tracking-wide text-white uppercase">{show.name}</p>
                <p className="text-[12px] text-rose">{show.host} · {formatClock(show.start)}</p>
              </div>
              <button type="button" aria-label={`Remove ${show.name}`} onClick={() => toggleFavorite(show.id)} className="px-3 text-gold">
                <Heart size={18} strokeWidth={1.5} fill="#FACD05" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
