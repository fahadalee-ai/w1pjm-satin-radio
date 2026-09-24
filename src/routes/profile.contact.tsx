import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ContactForm } from "@/components/radio/ContactForm";
import { useRequireListener } from "@/components/radio/guard";

export const Route = createFileRoute("/profile/contact")({
  head: () => ({ meta: [{ title: "Contact Studio — W1PJM" }] }),
  component: ContactScreen,
});

function ContactScreen() {
  useRequireListener();

  return (
    <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <Link to="/profile" aria-label="Back" className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-[#5C1420] text-gold">
        <ArrowLeft size={18} strokeWidth={1.5} />
      </Link>
      <h1 className="text-[28px] text-white">Contact Studio</h1>
      <p className="mt-2 mb-5 text-[14px] leading-relaxed text-rose">
        W1PJM Home Town Radio Station
        <br />
        Cape Cod, Massachusetts
        <br />
        <a className="text-gold" href="mailto:w1pjm@ymail.com">
          w1pjm@ymail.com
        </a>
      </p>
      <ContactForm />
    </div>
  );
}
