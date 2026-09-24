import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedListeners, type Listener } from "./mock-data";
import { clearStorage, readJson, readStorage, writeJson, writeStorage } from "./storage";

export type Toast = { id: number; title: string; body?: string };

export type Prefs = {
  breakingNews: boolean;
  showReminders: boolean;
};

type Store = {
  hydrated: boolean;
  users: Listener[];
  user: Listener | null;
  guest: boolean;
  onboarded: boolean;
  playing: boolean;
  started: boolean;
  volume: number;
  favorites: string[];
  reminders: string[];
  prefs: Prefs;
  toasts: Toast[];
  markOnboarded: () => void;
  login: (emailOrPhone: string, password: string) => { ok: true };
  register: (input: {
    name: string;
    email: string;
    phone: string;
    password: string;
    alerts: boolean;
  }) => { ok: true };
  loginSocial: (provider: "apple" | "google") => void;
  continueAsGuest: () => void;
  logout: () => void;
  updateUser: (patch: Partial<Pick<Listener, "name" | "phone" | "alerts">>) => void;
  togglePlay: () => void;
  setVolume: (value: number) => void;
  toggleFavorite: (showId: string) => boolean;
  toggleReminder: (showId: string) => boolean;
  togglePref: (key: keyof Prefs) => void;
  pushToast: (title: string, body?: string) => void;
  dismissToast: (id: number) => void;
};

const Ctx = createContext<Store | null>(null);

const DEFAULT_PREFS: Prefs = { breakingNews: true, showReminders: true };

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [users, setUsers] = useState<Listener[]>(seedListeners);
  const [user, setUser] = useState<Listener | null>(null);
  const [guest, setGuest] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const storedUsers = readJson<Listener[]>("users") ?? seedListeners;
    const session = readStorage("session");
    const found = storedUsers.find((u) => u.id === session) ?? null;
    setUsers(storedUsers);
    setUser(found);
    setGuest(!found && readStorage("guest") === "1");
    setOnboarded(readStorage("onboarded") === "1" || !!found);
    setFavorites(readJson<string[]>("favorites") ?? []);
    setReminders(readJson<string[]>("reminders") ?? []);
    setPrefs(readJson<Prefs>("prefs") ?? DEFAULT_PREFS);
    const storedVolume = readStorage("volume");
    if (storedVolume) setVolumeState(Number(storedVolume) || 0.8);
    setHydrated(true);
  }, []);

  const value = useMemo<Store>(() => {
    const pushToast = (title: string, body?: string) => {
      const id = Date.now() + Math.random();
      setToasts((list) => [...list, { id, title, body }]);
      setTimeout(() => setToasts((list) => list.filter((item) => item.id !== id)), 3200);
    };

    const persistUser = (next: Listener | null, list?: Listener[]) => {
      setUser(next);
      if (list) {
        setUsers(list);
        writeJson("users", list);
      }
      if (next) {
        writeStorage("session", next.id);
        clearStorage("guest");
        setGuest(false);
      }
    };

    return {
      hydrated,
      users,
      user,
      guest,
      onboarded,
      playing,
      started,
      volume,
      favorites,
      reminders,
      prefs,
      toasts,
      markOnboarded: () => {
        setOnboarded(true);
        writeStorage("onboarded", "1");
      },
      login: (emailOrPhone, password) => {
        const key = emailOrPhone.trim().toLowerCase();
        const found = key
          ? users.find(
              (u) => u.email.toLowerCase() === key || u.phone.replace(/\D/g, "") === key.replace(/\D/g, ""),
            )
          : undefined;
        if (found) {
          persistUser(found);
        } else {
          const typed = emailOrPhone.trim();
          const created: Listener = {
            id: `u${Date.now()}`,
            name: typed || "Listener",
            email: typed.includes("@") ? typed.toLowerCase() : typed ? `${typed.replace(/\s/g, "")}@w1pjm.com` : "listener@w1pjm.com",
            phone: typed.includes("@") ? "" : typed,
            password,
            alerts: true,
          };
          persistUser(created, [...users, created]);
        }
        writeStorage("onboarded", "1");
        setOnboarded(true);
        return { ok: true };
      },
      register: (input) => {
        const email = input.email.trim().toLowerCase() || `listener${Date.now()}@w1pjm.com`;
        const created: Listener = {
          id: `u${Date.now()}`,
          name: input.name.trim() || "Listener",
          email,
          phone: input.phone.trim(),
          password: input.password,
          alerts: input.alerts,
        };
        const list = [...users, created];
        persistUser(created, list);
        writeStorage("onboarded", "1");
        setOnboarded(true);
        if (input.alerts) {
          const next = { ...prefs, breakingNews: true, showReminders: true };
          setPrefs(next);
          writeJson("prefs", next);
        }
        return { ok: true };
      },
      loginSocial: (provider) => {
        const email = provider === "apple" ? "listener@icloud.com" : "listener@gmail.com";
        const existing = users.find((u) => u.email === email);
        if (existing) {
          persistUser(existing);
        } else {
          const created: Listener = {
            id: `u${Date.now()}`,
            name: provider === "apple" ? "Apple Listener" : "Google Listener",
            email,
            phone: "",
            password: "",
            alerts: false,
          };
          persistUser(created, [...users, created]);
        }
        writeStorage("onboarded", "1");
        setOnboarded(true);
      },
      continueAsGuest: () => {
        setUser(null);
        setGuest(true);
        clearStorage("session");
        writeStorage("guest", "1");
        writeStorage("onboarded", "1");
        setOnboarded(true);
      },
      logout: () => {
        setUser(null);
        setGuest(false);
        setPlaying(false);
        setStarted(false);
        clearStorage("session");
        clearStorage("guest");
      },
      updateUser: (patch) => {
        if (!user) return;
        const next = { ...user, ...patch };
        const list = users.map((u) => (u.id === next.id ? next : u));
        setUser(next);
        setUsers(list);
        writeJson("users", list);
      },
      togglePlay: () => {
        setStarted(true);
        setPlaying((on) => !on);
      },
      setVolume: (value) => {
        setVolumeState(value);
        writeStorage("volume", String(value));
      },
      toggleFavorite: (showId) => {
        if (!user) return false;
        setFavorites((list) => {
          const next = list.includes(showId) ? list.filter((id) => id !== showId) : [...list, showId];
          writeJson("favorites", next);
          return next;
        });
        return true;
      },
      toggleReminder: (showId) => {
        if (!user) return false;
        setReminders((list) => {
          const next = list.includes(showId) ? list.filter((id) => id !== showId) : [...list, showId];
          writeJson("reminders", next);
          return next;
        });
        pushToast("Reminder updated");
        return true;
      },
      togglePref: (key) => {
        setPrefs((current) => {
          const next = { ...current, [key]: !current[key] };
          writeJson("prefs", next);
          return next;
        });
      },
      pushToast,
      dismissToast: (id) => setToasts((list) => list.filter((item) => item.id !== id)),
    };
  }, [hydrated, users, user, guest, onboarded, playing, started, volume, favorites, reminders, prefs, toasts]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
