import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldLabel, fieldClass } from "./ui";

export function TextField({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="mb-4 block">
      <FieldLabel>{label}</FieldLabel>
      <input {...props} className={fieldClass} />
    </label>
  );
}

export function PasswordField({
  label,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string }) {
  const [show, setShow] = useState(false);
  return (
    <label className="mb-4 block">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <input {...props} type={show ? "text" : "password"} className={`${fieldClass} pr-12`} />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((value) => !value)}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-2 text-gold"
        >
          {show ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
        </button>
      </div>
    </label>
  );
}

export function SocialRow({ onApple, onGoogle }: { onApple: () => void; onGoogle: () => void }) {
  return (
    <div>
      <p className="my-5 text-center text-[12px] tracking-[0.16em] text-rose uppercase">— or continue with —</p>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={onApple} className="flex min-h-[50px] items-center justify-center gap-2 rounded-[14px] border border-gold text-[17px] font-semibold text-gold active:opacity-70">
          <AppleMark /> Apple
        </button>
        <button type="button" onClick={onGoogle} className="flex min-h-[50px] items-center justify-center gap-2 rounded-[14px] border border-gold text-[17px] font-semibold text-gold active:opacity-70">
          <GoogleMark /> Google
        </button>
      </div>
    </div>
  );
}

function AppleMark() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden>
      <path
        fill="#FACD05"
        d="M11.1 8.4c0-1.7 1.4-2.5 1.5-2.6-0.8-1.2-2.1-1.3-2.5-1.4-1.1-.1-2.1.6-2.6.6s-1.4-.6-2.3-.6c-1.2 0-2.3.7-2.9 1.8-1.2 2.2-.3 5.4.9 7.2.6.9 1.3 1.8 2.2 1.8.9 0 1.2-.6 2.3-.6s1.4.6 2.3.6 1.5-.9 2.1-1.8c.7-1 .9-1.9 1-2-.0-.0-1.9-.7-2-2.6zM9.3 3.2c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 .1-.5-.6-.8-1.4-.7-2.2.8.1 1.5.5 2 1.1z"
      />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path fill="#FACD05" d="M15.7 8.2c0-.5-.0-1-.1-1.5H8v2.8h4.3c-.2 1-.8 1.9-1.6 2.5v2h2.6c1.5-1.4 2.4-3.5 2.4-5.8z" />
      <path fill="#FACD05" d="M8 16c2.2 0 4-0.7 5.3-1.9l-2.6-2c-.7.5-1.6.8-2.7.8-2.1 0-3.8-1.4-4.5-3.3H.9v2.1C2.2 14.3 4.9 16 8 16z" />
      <path fill="#FACD05" d="M3.5 9.6A4.8 4.8 0 0 1 3.2 8c0-.6.1-1.1.3-1.6V4.3H.9A8 8 0 0 0 0 8c0 1.3.3 2.5.9 3.7l2.6-2.1z" />
      <path fill="#FACD05" d="M8 3.2c1.2 0 2.2.4 3.1 1.2l2.3-2.3C12 0.8 10.2 0 8 0 4.9 0 2.2 1.7.9 4.3l2.6 2.1C4.2 4.6 5.9 3.2 8 3.2z" />
    </svg>
  );
}

export function AuthFooter({ children }: { children: ReactNode }) {
  return <p className="mt-8 text-center text-[14px] text-rose">{children}</p>;
}
