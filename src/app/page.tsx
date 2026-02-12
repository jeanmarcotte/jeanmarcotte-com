"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const GALLERY = [
  { src: "/images/toronto-wedding-photography-149.jpg", alt: "Wedding venue aerial view in the GTA", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-137.jpg", alt: "Romantic couple portrait at Toronto wedding", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-125.jpg", alt: "Elegant bridal moment captured candidly", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-119.jpg", alt: "Wedding ceremony at beautiful Toronto venue", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-116.jpg", alt: "Bride and groom first look portrait", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-106.jpg", alt: "Wedding reception celebration moment", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-100.jpg", alt: "First dance at elegant reception hall", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-089.jpg", alt: "Emotional wedding day moment", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-069.jpg", alt: "Couple in stunning park setting", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-048.jpg", alt: "Wedding party group portrait", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-038.jpg", alt: "Bridal detail shot with bouquet", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-034.jpg", alt: "Intimate ceremony exchange of vows", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-029.jpg", alt: "Getting ready bridal portrait", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-020.jpg", alt: "Sunset couple portrait in Vaughan", span: "normal" as const },
  { src: "/images/toronto-wedding-photography-017.jpg", alt: "Candid wedding day laughter", span: "normal" as const },
];

const TESTIMONIALS = [
  { quote: "Jean captured moments we didn\u2019t even know were happening. Every photo tells a story we\u2019ll cherish forever.", couple: "Sara & Rocco", venue: "La Primavera", year: "2026" },
  { quote: "From our engagement session to the last dance, Jean was everywhere and nowhere \u2014 exactly where a great photographer should be.", couple: "Carmela & James", venue: "Chateau Le Jardin", year: "2026" },
  { quote: "The photos are absolutely stunning. Jean has an eye that no one else has. Worth every penny.", couple: "Alannah & Anthony", venue: "Hazelton Manor", year: "2025" },
];

const VENUES = ["La Primavera", "Chateau Le Jardin", "Hazelton Manor", "Paradise Banquet Hall", "Fontana Primavera", "Universal EventSpace", "Venetian Banquet Hall", "Arlington Estate"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-4">
      <div className="h-px w-10 bg-gold-400" />
      <span className="text-label text-gold-500">{children}</span>
    </div>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-charcoal-950">
      <div className="absolute inset-0">
        <Image src="/images/toronto-wedding-photography-001.jpg" alt="Toronto wedding photography by Jean Marcotte" fill priority sizes="100vw"
          className="object-cover object-[center_30%]"
          style={{ opacity: loaded ? 0.55 : 0, transform: loaded ? "scale(1)" : "scale(1.05)", transition: "opacity 1.5s ease, transform 8s ease" }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,12,0.3) 0%, rgba(13,13,12,0.1) 40%, rgba(13,13,12,0.6) 80%, rgba(13,13,12,0.95) 100%)" }} />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-[clamp(60px,10vh,120px)] md:px-10 lg:px-20">
        <div className="mb-6 bg-gold-400/60" style={{ width: 1, height: loaded ? 60 : 0, transition: "height 1s ease 0.5s" }} />
        <h1 className="max-w-[800px] font-serif text-[clamp(36px,6vw,72px)] font-normal leading-[1.1] tracking-tight text-ivory-50"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "opacity 1s ease 0.8s, transform 1s ease 0.8s" }}>
          Timeless Photographs.<br />
          <span className="italic text-gold-300">Unforgettable</span> Moments.
        </h1>
        <p className="mt-5 max-w-[520px] font-sans text-[clamp(14px,1.2vw,18px)] font-light leading-relaxed text-ivory-50/65"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(15px)", transition: "opacity 1s ease 1.2s, transform 1s ease 1.2s" }}>
          Premium wedding photography serving Toronto, the GTA, and beyond. Over 25 years of capturing love stories with artistry and heart.
        </p>
        <div className="mt-8 flex flex-wrap gap-4" style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.5s" }}>
          <Link href="/portfolio" className="bg-gold-400 px-8 py-3.5 text-label text-charcoal-950 transition-all duration-300 hover:bg-gold-300">View Portfolio</Link>
          <Link href="/contact" className="border border-gold-400/40 px-8 py-3.5 text-label text-gold-300 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-200">Book a Consultation</Link>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" style={{ opacity: loaded ? 0.4 : 0, transition: "opacity 1s ease 2s" }}>
        <span className="text-label text-[9px] text-ivory-50">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="rgba(253,249,243,0.5)" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <circle cx="8" cy="7" r="2" fill="rgba(253,249,243,0.5)">
            <animate attributeName="cy" values="7;17" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="section-ivory px-6 py-[clamp(60px,10vw,120px)] md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn><SectionLabel>About Jean</SectionLabel></FadeIn>
        <div className="mt-4 grid items-center gap-[clamp(40px,5vw,80px)] md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div>
              <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] font-normal leading-[1.2] tracking-tight text-charcoal-900">
                Your story deserves<br /><span className="italic text-gold-600">more than photos</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-warm-gray-600">
                With over 25 years behind the lens, I have learned that the best wedding photography does not come from posing — it comes from presence. I am there for the nervous laughter before the ceremony, the quiet glance across the room, the tears your father tries to hide.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-warm-gray-600">
                Every wedding is a once-in-a-lifetime event. I treat it that way — with care, artistry, and the kind of attention that only comes from thousands of weddings and a genuine love for what I do.
              </p>
              <Link href="/about" className="mt-7 inline-block border-b border-gold-400 pb-1 text-label text-charcoal-900 transition-colors duration-300 hover:text-gold-700">
                More About Jean →
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/toronto-wedding-photography-083.jpg" alt="Jean Marcotte photographing a wedding ceremony in Toronto" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute bottom-0 right-0 h-20 w-20 border-b-2 border-r-2 border-gold-400/50" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section-dark px-6 py-[clamp(60px,10vw,100px)] md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="mt-2 font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ivory-50">
              A glimpse of <span className="italic text-gold-300">real moments</span>
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-3 gap-1.5 md:grid-cols-5 md:auto-rows-[220px]">
          {GALLERY.map((img, i) => (
            <FadeIn key={i} delay={i * 0.08} className={`overflow-hidden ${img.span === "tall" ? "row-span-2" : ""} ${img.span === "wide" ? "col-span-2" : ""}`}>
              <div className="group relative h-full w-full cursor-pointer overflow-hidden">
                <Image src={img.src} alt={img.alt} fill sizes={img.span === "wide" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"} loading="lazy"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]" />
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <div className="mt-12 text-center">
            <Link href="/portfolio" className="inline-block border border-gold-400/40 px-10 py-3.5 text-label text-gold-300 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10">
              View Full Portfolio
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 6000); return () => clearInterval(t); }, []);

  return (
    <section className="section-ivory px-6 py-[clamp(60px,10vw,100px)] md:px-10 lg:px-20">
      <div className="mx-auto max-w-[900px] text-center">
        <FadeIn>
          <SectionLabel>Kind Words</SectionLabel>
          <div className="relative mt-5 min-h-[220px]">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={i === active ? "relative" : "absolute inset-x-0 top-0"}
                style={{ opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.6s ease, transform 0.6s ease", pointerEvents: i === active ? "auto" : "none" }}>
                <div className="-mb-5 font-serif text-[80px] leading-none text-gold-300/30">&ldquo;</div>
                <blockquote className="font-serif text-[clamp(18px,2.2vw,26px)] font-normal italic leading-relaxed text-charcoal-800">{t.quote}</blockquote>
                <div className="mt-6 text-label text-charcoal-900">{t.couple}</div>
                <div className="mt-1 text-[12px] text-warm-gray-500">{t.venue} &middot; {t.year}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: i === active ? 28 : 8, backgroundColor: i === active ? "var(--color-gold-400)" : "var(--color-warm-gray-200)" }} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const steps = [
    { num: "01", title: "Consultation", desc: "We meet to discuss your vision, timeline, and how to make your day uniquely yours." },
    { num: "02", title: "Engagement Session", desc: "A relaxed session at a location you love — the start of your visual story." },
    { num: "03", title: "Wedding Day", desc: "Discreet, artful coverage from preparations through the last dance." },
    { num: "04", title: "Your Gallery", desc: "Professionally edited images delivered within 4-7 days, with prints and albums to follow." },
  ];

  return (
    <section className="section-warm border-t border-warm-gray-100 px-6 py-[clamp(60px,10vw,100px)] md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <SectionLabel>The Experience</SectionLabel>
          <h2 className="mb-12 font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-charcoal-900">
            From first hello to <span className="italic text-gold-600">forever prints</span>
          </h2>
        </FadeIn>
        <div className="grid gap-[clamp(20px,3vw,40px)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="border-t-2 border-gold-400 pt-8">
                <div className="text-label mb-3 text-gold-500">{step.num}</div>
                <h3 className="mb-3 font-serif text-[22px] font-medium text-charcoal-900">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-warm-gray-600">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function VenuesSection() {
  return (
    <section className="section-dark px-6 py-[clamp(50px,8vw,80px)] md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px] text-center">
        <FadeIn>
          <SectionLabel>Venues</SectionLabel>
          <p className="mt-2 font-serif text-[clamp(18px,2vw,24px)] italic text-ivory-200">
            Trusted by Toronto&apos;s finest venues for over two decades
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {VENUES.map((v, i) => (<span key={i} className="py-2 text-[13px] tracking-wide text-warm-gray-400">{v}</span>))}
          </div>
          <Link href="/venues" className="mt-7 inline-block border-b border-gold-400/30 pb-1 text-label text-gold-300 transition-colors duration-300 hover:border-gold-400 hover:text-gold-200">
            Browse All Venues →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="section-ivory px-6 py-[clamp(60px,10vw,100px)] md:px-10 lg:px-20">
      <div className="mx-auto max-w-[800px] text-center">
        <FadeIn>
          <SectionLabel>Investment</SectionLabel>
          <h2 className="mt-2 font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-charcoal-900">
            Packages from <span className="italic text-gold-600">$5,000</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-warm-gray-600">
            Every package includes an engagement session, full-day coverage, professional editing, and a personal online gallery. Albums, prints, and wall art available.
          </p>
        </FadeIn>
        <div className="flex justify-center py-14">
          <div className="flex items-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold-400" />
            <div className="h-1.5 w-1.5 rounded-full border border-gold-400/60" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
        </div>
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="bg-charcoal-900 px-8 py-3.5 text-label text-ivory-50 transition-colors duration-300 hover:bg-charcoal-800">View Packages</Link>
            <Link href="/contact" className="border border-charcoal-300 px-8 py-3.5 text-label text-charcoal-900 transition-all duration-300 hover:border-charcoal-500">Get in Touch</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-dark relative overflow-hidden px-6 py-[clamp(80px,12vw,140px)] text-center md:px-10 lg:px-20">
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(228,184,78,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(228,184,78,0.03) 0%, transparent 50%)" }} />
      <div className="relative z-10 mx-auto max-w-[700px]">
        <FadeIn>
          <div className="mx-auto mb-8 h-10 w-px bg-gold-400/50" />
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-normal leading-[1.2] text-ivory-50">
            Let&apos;s tell <span className="italic text-gold-300">your story</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-warm-gray-400">
            Only a limited number of weddings accepted per year to ensure every couple receives my full attention and artistry.
          </p>
          <Link href="/contact" className="mt-9 inline-block bg-gold-400 px-10 py-4 text-label text-charcoal-950 transition-all duration-300 hover:bg-gold-300">
            Book Your Consultation
          </Link>
          <p className="mt-5 text-[12px] text-warm-gray-600">
            Text <a href="sms:+14168318942" className="text-gold-400 transition-colors hover:text-gold-300">416-831-8942</a> &middot; <a href="mailto:hello@jeanmarcotte.com" className="text-gold-400 transition-colors hover:text-gold-300">hello@jeanmarcotte.com</a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <GallerySection />
      <TestimonialsSection />
      <ExperienceSection />
      <VenuesSection />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
