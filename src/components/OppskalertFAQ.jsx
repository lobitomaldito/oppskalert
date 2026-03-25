import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Hvorfor trenger bedriften min en nettside?",
    a: "Nettsiden er den første tingen folk sjekker før de tar kontakt — enten det er en potensiell kunde, samarbeidspartner eller ny medarbeider. Har du ingen, mister du troverdighet på stedet. Har du en utdatert eller treg en, mister du dem til konkurrenten. En god nettside jobber for deg døgnet rundt.",
  },
  {
    q: "Hva gjør dere annerledes enn andre webbyrå?",
    a: "Vi bygger ferdig demo-siden din før vi tar kontakt — du ser resultatet fra dag én, ikke etter måneder med møter og tilbud. Vi spesialiserer oss på vekst, ikke bare design: siden er optimalisert for søkemotorer, konvertering og mobil fra starten av.",
  },
  {
    q: "Er siden optimalisert for Google og mobil?",
    a: "Ja, alltid. Alle nettsider vi leverer er bygget med SEO i bunn — riktig struktur, metadata, innhold og hastighet. De er også fullt responsive, noe som betyr at de ser perfekte ut og fungerer sømløst på mobil, nettbrett og desktop.",
  },
  {
    q: "Tar dere hånd om sikkerhet?",
    a: "Alle nettsidene vi leverer er kryptert med SSL-sertifikat. Det beskytter deg og besøkende dine mot cybertrusler, og gir Google et ekstra grønt lys. Ingen sensitiv informasjon ligger eksponert.",
  },
  {
    q: "Kan dere hjelpe med trafikk og analyse etter lansering?",
    a: "Ja. Vi setter opp trafikkovervåkning slik at du kan se hvor besøkende kommer fra, hva de klikker på og når de faller av. Det gir deg innsikt i kjøpsreisen og gjør det enklere å ta gode beslutninger fremover.",
  },
  {
    q: "Hva koster det, og hvilke pakker tilbyr dere?",
    a: "Vi tilbyr pakker som passer ulike behov og budsjetter — fra en enkel, profesjonell presentasjonsside til en fullstendig vekstplattform med analyse, SEO og løpende support. Ta kontakt for en uforpliktende prat, så finner vi noe som passer deg.",
  },
];

export default function OppskalertFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
    // Refresh ScrollTrigger after the transition is mostly done to avoid "lag" and sync sticky elements
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
  };

  return (
    <section id="faq" ref={container} className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-background text-white border-t border-primary/5">
      <div className="max-w-3xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Lurer du på noe?</span>
          <h2 className="font-sans font-bold text-5xl md:text-6xl tracking-tighter text-center">Spørsmål og svar.</h2>
        </div>
        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item border-primary/10 ${i === 0 ? "border-y" : "border-b"}`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full bg-transparent border-none cursor-pointer flex justify-between items-center py-6 text-left gap-6 overflow-hidden group"
                aria-expanded={openIndex === i}
              >
                <span className="font-sans font-medium text-xl group-hover:text-accent transition-colors duration-300">
                  {item.q}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 text-primary ${
                    openIndex === i ? "rotate-45 bg-primary/10 border-primary/40" : "group-hover:bg-primary/5 group-hover:border-primary/30"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === i ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="font-mono text-sm md:text-base leading-relaxed text-white/50 pb-8 pr-12">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
