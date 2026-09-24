import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/radio/ContactForm";
import { useRequireListener } from "@/components/radio/guard";
import { IMAGES, TESTIMONIALS } from "@/lib/mock-data";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — W1PJM" }] }),
  component: AboutScreen,
});

function AboutScreen() {
  useRequireListener();

  return (
    <div>
      <img src={IMAGES.coast} alt="Cape Cod shoreline" className="h-52 w-full object-cover" />
      <div className="px-4 pt-5">
        <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">Station Story</p>
        <h1 className="mt-2 text-[28px] text-white">About Us</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-rose">
          W1PJM Home Town Radio Station was created to give Cape Cod Massachusetts its own authentic voice on the airwaves. As an independent local station, our mission is to celebrate our neighbors, highlight small businesses, and bring people together through the power of community radio.
        </p>
        <div className="mt-5 border border-[#5C1420] bg-surface px-4 py-4">
          <h2 className="text-[13px] tracking-[0.16em] text-gold">Mission</h2>
          <p className="mt-2 text-[15px] leading-relaxed font-normal tracking-normal text-white normal-case">
            We keep Cape Cod informed, entertained, and united — live music, local news, and the events happening on this sandbar, heard wherever you are.
          </p>
        </div>
        <h2 className="mt-6 text-[13px] tracking-[0.16em] text-white">From the town</h2>
        <div className="mt-3 space-y-3">
          {TESTIMONIALS.map((item) => (
            <blockquote key={item.name} className="border border-[#5C1420] px-4 py-4">
              <p className="text-[14px] leading-relaxed text-white">“{item.quote}”</p>
              <footer className="mt-3 text-[12px] font-bold tracking-[0.14em] text-gold uppercase">{item.name}</footer>
            </blockquote>
          ))}
        </div>
        <h2 className="mt-6 text-[13px] tracking-[0.16em] text-white">Contact the studio</h2>
        <p className="mt-2 mb-4 text-[14px] text-rose">
          W1PJM Home Town Radio Station, Cape Cod, Massachusetts
          <br />
          <a href="mailto:w1pjm@ymail.com" className="text-gold">
            w1pjm@ymail.com
          </a>
        </p>
        <ContactForm />
        <div className="h-6" />
      </div>
    </div>
  );
}
