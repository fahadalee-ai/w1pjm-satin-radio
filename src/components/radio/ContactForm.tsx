import { useState } from "react";
import { GoldButton, fieldClass, FieldLabel } from "./ui";
import { useApp } from "@/lib/store";

export function ContactForm() {
  const { pushToast, user } = useApp();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="border border-gold/40 bg-surface px-4 py-4 text-[14px] text-rose">
        Message received. The studio will read it at w1pjm@ymail.com.
      </p>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
        pushToast("Message sent", "The studio has your note.");
      }}
    >
      <label className="block">
        <FieldLabel>Name</FieldLabel>
        <input required name="name" defaultValue={user?.name ?? ""} className={fieldClass} />
      </label>
      <label className="block">
        <FieldLabel>Email</FieldLabel>
        <input required type="email" name="email" defaultValue={user?.email ?? ""} className={fieldClass} />
      </label>
      <label className="block">
        <FieldLabel>Message</FieldLabel>
        <textarea required name="message" rows={4} className={fieldClass} />
      </label>
      <GoldButton type="submit">Submit</GoldButton>
    </form>
  );
}
