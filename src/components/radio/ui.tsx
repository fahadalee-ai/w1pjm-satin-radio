import logo from "@/img/logo.png";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import type { ReactNode } from "react";

export function Waveform({
  bars = 22,
  active = true,
  className,
}: {
  bars?: number;
  active?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full items-end justify-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn("w-[3px] rounded-[1px] bg-gold", active && "eq-bar")}
          style={{
            height: `${28 + ((i * 37) % 72)}%`,
            animationDuration: active ? `${0.55 + (i % 5) * 0.12}s` : undefined,
            animationDelay: active ? `${(i % 7) * 0.06}s` : undefined,
            opacity: active ? 1 : 0.4,
            transform: active ? undefined : "scaleY(0.3)",
          }}
        />
      ))}
    </div>
  );
}

export function StationLogo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="W1PJM Satin Radio"
      className={cn("mx-auto w-[220px] max-w-full object-contain mix-blend-lighten", className)}
    />
  );
}

export function GoldButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[50px] w-full items-center justify-center rounded-[14px] bg-gold px-5 text-[17px] font-semibold tracking-normal text-maroon normal-case transition-opacity active:opacity-70 disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[50px] w-full items-center justify-center rounded-[14px] border border-gold bg-transparent px-5 text-[17px] font-semibold tracking-normal text-gold normal-case active:opacity-70",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-rose uppercase">{children}</span>
  );
}

export const fieldClass =
  "min-h-11 w-full rounded-[10px] border border-[#5C1420] bg-surface px-3 py-3 text-[17px] text-white outline-none placeholder:text-rose/50 focus:border-gold";

export function Toasts() {
  const { toasts, dismissToast } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 z-50 w-[min(100%-2rem,398px)] -translate-x-1/2 space-y-2">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismissToast(toast.id)}
          className="pointer-events-auto w-full border border-gold/40 bg-surface px-3 py-3 text-left"
        >
          <p className="text-[13px] font-bold tracking-wide text-gold uppercase">{toast.title}</p>
          {toast.body && <p className="mt-1 text-[13px] text-rose">{toast.body}</p>}
        </button>
      ))}
    </div>
  );
}

export function ScreenHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      {kicker && (
        <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">{kicker}</p>
      )}
      <h1 className="mt-1 text-[28px] text-white">{title}</h1>
      {subtitle && <p className="mt-2 text-[15px] leading-relaxed text-rose normal-case tracking-normal font-normal">{subtitle}</p>}
    </header>
  );
}

export function EmptyState({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-[#5C1420] bg-surface px-6 py-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-gold">{icon}</div>
      <h2 className="text-[16px] text-white">{title}</h2>
      <p className="mt-2 text-[14px] leading-relaxed font-normal tracking-normal text-rose normal-case">{body}</p>
    </div>
  );
}

export function Toggle({
  on,
  label,
  onClick,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={cn("relative h-7 w-12 shrink-0 border", on ? "border-gold bg-gold" : "border-[#5C1420] bg-maroon")}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 transition-all",
          on ? "left-6 bg-maroon" : "left-0.5 bg-rose",
        )}
      />
    </button>
  );
}
