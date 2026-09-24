import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { StationLogo, Waveform } from "@/components/radio/ui";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "W1PJM Satin Radio | Home Town Radio Station" },
      { name: "description", content: "The true voice of Cape Cod. Listen live to W1PJM Home Town Radio Station." },
    ],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const { hydrated, user, guest, onboarded } = useApp();
  const navigate = useNavigate();
  const started = useRef(Date.now());

  useEffect(() => {
    if (!hydrated) return;
    const wait = Math.max(0, 1700 - (Date.now() - started.current));
    const timer = window.setTimeout(() => {
      if (user || guest) navigate({ to: "/home", replace: true });
      else if (!onboarded) navigate({ to: "/onboarding", replace: true });
      else navigate({ to: "/auth", replace: true });
    }, wait);
    return () => window.clearTimeout(timer);
  }, [hydrated, user, guest, onboarded, navigate]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-maroon px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <StationLogo />
      <div className="mt-8 h-12 w-40">
        <Waveform bars={16} active />
      </div>
      <p className="mt-auto text-[11px] font-bold tracking-[0.28em] text-gold uppercase">
        The true voice of Cape Cod
      </p>
    </div>
  );
}
