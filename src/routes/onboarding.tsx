import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { GoldButton } from "@/components/radio/ui";
import { ONBOARDING } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — W1PJM" }] }),
  component: OnboardingScreen,
});

function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const { markOnboarded } = useApp();
  const navigate = useNavigate();
  const slide = ONBOARDING[index]!;
  const last = index === ONBOARDING.length - 1;

  const finish = () => {
    markOnboarded();
    navigate({ to: "/auth", replace: true });
  };

  const next = () => {
    if (last) finish();
    else setIndex((n) => n + 1);
  };

  return (
    <div
      className="flex min-h-dvh flex-col bg-maroon"
      onPointerDown={(event) => {
        startX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (startX.current == null) return;
        const dx = event.clientX - startX.current;
        startX.current = null;
        if (dx < -48 && !last) setIndex((n) => n + 1);
        if (dx > 48 && index > 0) setIndex((n) => n - 1);
      }}
    >
      <div className="relative h-[58dvh] overflow-hidden">
        <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={finish}
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-4 text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
        >
          Skip
        </button>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <h1 className="text-[30px] text-white">{slide.heading}</h1>
        <p className="mt-3 text-[15px] leading-relaxed font-normal tracking-normal text-rose normal-case">{slide.body}</p>
        <div className="mt-5 flex items-center gap-1.5">
          {ONBOARDING.map((item, dot) => (
            <span key={item.heading} className={cn("h-1.5 bg-gold", dot === index ? "w-6" : "w-1.5 opacity-40")} />
          ))}
        </div>
        <div className="mt-auto pt-6">
          <GoldButton type="button" onClick={next}>
            {slide.cta}
          </GoldButton>
        </div>
      </div>
    </div>
  );
}
