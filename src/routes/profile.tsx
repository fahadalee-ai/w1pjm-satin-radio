import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronRight, Heart, Info, Mail, Pencil, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useRequireListener } from "@/components/radio/guard";
import { GoldButton, OutlineButton, fieldClass, FieldLabel } from "@/components/radio/ui";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — W1PJM" }] }),
  component: ProfileScreen,
});

function ProfileScreen() {
  useRequireListener();
  const { user, guest, logout, updateUser } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");

  if (guest || !user) {
    return (
      <div className="px-5 pt-[max(2rem,env(safe-area-inset-top))]">
        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold text-gold">
          <UserRound size={26} strokeWidth={1.5} />
        </div>
        <h1 className="text-[28px] text-white">Listener access</h1>
        <p className="mt-3 text-[15px] leading-relaxed font-normal tracking-normal text-rose normal-case">
          Guests can listen live. Favorites, notifications, and your profile open once you join the station.
        </p>
        <div className="mt-8 space-y-3">
          <GoldButton type="button" onClick={() => navigate({ to: "/login" })}>
            Log In
          </GoldButton>
          <OutlineButton type="button" onClick={() => navigate({ to: "/register" })}>
            Create Account
          </OutlineButton>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center bg-gold text-[20px] font-extrabold text-maroon">{initials}</div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[22px] tracking-normal normal-case text-white">{user.name}</h1>
          <p className="truncate text-[13px] text-rose">{user.email}</p>
        </div>
        <button type="button" aria-label="Edit name" onClick={() => { setName(user.name); setEditing(true); }} className="p-2 text-gold">
          <Pencil size={18} strokeWidth={1.5} />
        </button>
      </div>

      {editing && (
        <form
          className="mt-4 border border-[#5C1420] bg-surface p-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (name.trim()) updateUser({ name: name.trim() });
            setEditing(false);
          }}
        >
          <label className="block">
            <FieldLabel>Display name</FieldLabel>
            <input value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} />
          </label>
          <div className="mt-3">
            <GoldButton type="submit">Save</GoldButton>
          </div>
        </form>
      )}

      <div className="mt-6 border-t border-[#5C1420]">
        <Row to="/profile/notifications" icon={<Bell size={18} strokeWidth={1.5} />} label="Notifications" />
        <Row to="/profile/favorites" icon={<Heart size={18} strokeWidth={1.5} />} label="Favorites" />
        <Row to="/profile/contact" icon={<Mail size={18} strokeWidth={1.5} />} label="Contact Studio" />
        <Row to="/about" icon={<Info size={18} strokeWidth={1.5} />} label="About / Station Story" />
      </div>

      <button
        type="button"
        onClick={() => {
          logout();
          navigate({ to: "/auth", replace: true });
        }}
        className="mt-8 mb-4 w-full py-3 text-center text-[14px] font-semibold tracking-[0.12em] text-[#C45C68] uppercase"
      >
        Log Out
      </button>
    </div>
  );
}

function Row({ to, icon, label }: { to: "/profile/notifications" | "/profile/favorites" | "/profile/contact" | "/about"; icon: ReactNode; label: string }) {
  return (
    <Link to={to} className="flex min-h-14 items-center gap-3 border-b border-[#5C1420] text-white">
      <span className="text-gold">{icon}</span>
      <span className="flex-1 text-[15px]">{label}</span>
      <ChevronRight size={16} strokeWidth={1.5} className="text-rose" />
    </Link>
  );
}
