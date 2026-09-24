import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useRequireListener } from "@/components/radio/guard";
import { STORIES } from "@/lib/mock-data";

export const Route = createFileRoute("/news/$id")({
  head: () => ({ meta: [{ title: "Story — W1PJM" }] }),
  component: StoryScreen,
});

function StoryScreen() {
  useRequireListener();
  const { id } = Route.useParams();
  const story = STORIES.find((item) => item.id === id);

  if (!story) {
    return (
      <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <p className="text-rose">That story has left the board.</p>
        <Link to="/news" className="mt-4 inline-block text-gold">
          Back to news
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="relative">
        <img src={story.image} alt="" className="h-56 w-full object-cover" />
        <Link
          to="/news"
          aria-label="Back"
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-4 flex h-10 w-10 items-center justify-center bg-maroon text-gold"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </Link>
      </div>
      <div className="px-4 py-5">
        <p className="text-[11px] font-bold tracking-[0.16em] text-gold uppercase">
          {story.place ? `${story.place} · ` : ""}
          {story.time}
        </p>
        <h1 className="mt-2 text-[26px] leading-tight font-extrabold tracking-normal text-white normal-case">{story.title}</h1>
        <div className="mt-4 space-y-4">
          {story.body.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-relaxed text-rose">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
