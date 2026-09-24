import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthFooter, PasswordField, SocialRow, TextField } from "@/components/radio/auth-bits";
import { GoldButton } from "@/components/radio/ui";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log In — W1PJM" }] }),
  component: LoginScreen,
});

function LoginScreen() {
  const { login, loginSocial } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [resetNote, setResetNote] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    login(email, password);
    navigate({ to: "/home", replace: true });
  };

  return (
    <div className="min-h-dvh bg-maroon px-5 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">W1PJM</p>
      <h1 className="mt-2 text-[32px] text-white">Welcome Back</h1>
      <p className="mt-2 text-[15px] font-normal tracking-normal text-rose normal-case">Tune back in to W1PJM</p>

      <form onSubmit={submit} className="mt-8">
        <TextField
          label="Email / Phone"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="username"
          placeholder="you@email.com"
        />
        <PasswordField
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          placeholder="Password"
        />
        <div className="mb-5 -mt-2 text-right">
          <button type="button" onClick={() => setForgot(true)} className="text-[13px] font-semibold text-gold">
            Forgot Password?
          </button>
        </div>
        <GoldButton type="submit">Log In</GoldButton>
      </form>

      {forgot && (
        <form
          className="mt-4 border border-[#5C1420] bg-surface p-4"
          onSubmit={(event) => {
            event.preventDefault();
            setResetNote("If that address is on file, a reset note is on its way to the studio inbox.");
          }}
        >
          <TextField label="Reset email" name="reset" placeholder="you@email.com" />
          <GoldButton type="submit">Send reset</GoldButton>
          {resetNote && <p className="mt-3 text-[13px] text-rose">{resetNote}</p>}
        </form>
      )}

      <SocialRow
        onApple={() => {
          loginSocial("apple");
          navigate({ to: "/home", replace: true });
        }}
        onGoogle={() => {
          loginSocial("google");
          navigate({ to: "/home", replace: true });
        }}
      />
      <AuthFooter>
        New to W1PJM?{" "}
        <Link to="/register" className="font-semibold text-gold">
          Sign Up
        </Link>
      </AuthFooter>
    </div>
  );
}
