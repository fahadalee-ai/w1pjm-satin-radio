import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthFooter, PasswordField, SocialRow, TextField } from "@/components/radio/auth-bits";
import { GoldButton, Toggle, Waveform } from "@/components/radio/ui";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Join — W1PJM" }] }),
  component: RegisterScreen,
});

function RegisterScreen() {
  const { register, loginSocial } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [alerts, setAlerts] = useState(true);
  const [terms, setTerms] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    register({ name, email, phone, password, alerts });
    setConfirming(true);
    window.setTimeout(() => navigate({ to: "/home", replace: true }), 1400);
  };

  if (confirming) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-maroon px-6">
        <div className="h-16 w-44">
          <Waveform active />
        </div>
        <h1 className="mt-6 text-center text-[28px] text-white">You’re on the air</h1>
        <p className="mt-2 text-center text-[15px] font-normal tracking-normal text-rose normal-case">
          Account created. Taking you to the live board.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-maroon px-5 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">W1PJM</p>
      <h1 className="mt-2 text-[32px] text-white">Join the Station</h1>
      <p className="mt-2 text-[15px] font-normal tracking-normal text-rose normal-case">Create your free W1PJM account</p>

      <form onSubmit={submit} className="mt-8">
        <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          placeholder="Optional — local alert opt-in"
        />
        <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        <PasswordField label="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />

        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="text-[14px] text-white">Send me local news & on-air alerts</span>
          <Toggle on={alerts} label="Local news and on-air alerts" onClick={() => setAlerts((value) => !value)} />
        </div>

        <p className="mb-5 text-[12px] leading-relaxed text-rose">
          By creating an account, you agree to our{" "}
          <button type="button" className="text-gold underline underline-offset-2" onClick={() => setTerms(true)}>
            Terms & Privacy Policy
          </button>
        </p>
        <GoldButton type="submit">Create Account</GoldButton>
      </form>

      {terms && (
        <div className="mt-4 border border-[#5C1420] bg-surface p-4 text-[13px] leading-relaxed text-rose">
          <p>
            W1PJM uses your name and email to keep your listener profile, saved shows, and the alerts you opt into. We don’t sell the list. Studio mail goes to w1pjm@ymail.com.
          </p>
          <button type="button" className="mt-3 text-gold" onClick={() => setTerms(false)}>
            Close
          </button>
        </div>
      )}

      <SocialRow
        onApple={() => {
          loginSocial("apple");
          setConfirming(true);
          window.setTimeout(() => navigate({ to: "/home", replace: true }), 1400);
        }}
        onGoogle={() => {
          loginSocial("google");
          setConfirming(true);
          window.setTimeout(() => navigate({ to: "/home", replace: true }), 1400);
        }}
      />
      <AuthFooter>
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-gold">
          Log In
        </Link>
      </AuthFooter>
    </div>
  );
}
