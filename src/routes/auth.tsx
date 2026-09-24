import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GoldButton, OutlineButton, StationLogo } from "@/components/radio/ui";
import { IMAGES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Tune In — W1PJM" }] }),
  component: AuthGate,
});

function AuthGate() {
  const navigate = useNavigate();
  const { continueAsGuest } = useApp();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-maroon">
      <img src={IMAGES.auth} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-maroon/70" />
      <div className="relative flex min-h-dvh flex-col px-5 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <StationLogo className="w-[200px]" />
        <p className="mt-4 text-center text-[12px] font-bold tracking-[0.22em] text-gold uppercase">
          Home Town Radio Station
        </p>
        <div className="mt-auto space-y-3">
          <GoldButton type="button" onClick={() => navigate({ to: "/login" })}>
            Log In
          </GoldButton>
          <OutlineButton type="button" onClick={() => navigate({ to: "/register" })}>
            Create Account
          </OutlineButton>
          <button
            type="button"
            onClick={() => {
              continueAsGuest();
              navigate({ to: "/home", replace: true });
            }}
            className="mx-auto block pt-3 text-[14px] text-rose underline underline-offset-4"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
