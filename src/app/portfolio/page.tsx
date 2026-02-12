"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const STORIES = [
  { couple: "Alannah & Anthony", venue: "Holland Marsh Winery", photos: [4,3,2,5,6] },
  { couple: "Alexa & Naz", venue: "Venetian Manor", photos: [7,8,9,153] },
  { couple: "Alex & Derado", venue: "", photos: [13,14,15,16,17,18] },
  { couple: "Alicia & Emilio", venue: "", photos: [19,20,21,22,23,24] },
  { couple: "Detail Shots", venue: "Dr's House", photos: [25,26] },
  { couple: "Anissa & Joel", venue: "Dundurn Castle National Historic Site", photos: [28,29,30,31] },
  { couple: "Ashley & Erik", venue: "Eglinton West Gallery", photos: [32,33,34,35] },
  { couple: "Brittania & Andrew", venue: "Mississauga Convention Centre", photos: [36,37,38,39] },
  { couple: "Cassandra & Brandon", venue: "Paradise Banquet Hall", photos: [40,41,42,43] },
  { couple: "Crissy & Jesse", venue: "Guelph Sikh Society", photos: [44,45,46,47,48,49,50,51] },
  { couple: "Danielle & Michael", venue: "Mississauga Grand", photos: [53,54,55,56] },
  { couple: "Jody & Will", venue: "Bradford Barn", photos: [76,75,77,78] },
  { couple: "Mill Pond Park", venue: "Mill Pond Park", photos: [80,93,101,151,152] },
  { couple: "Lindsay & Jason", venue: "Newmarket EventMrkt", photos: [85,86,87,88,89,90,91,92] },
  { couple: "Maria & Michael", venue: "Casa Loma", photos: [94,95,96,97,98,99,100] },
  { couple: "Morgan & Aaron", venue: "", photos: [102,103,104,105,106,107,108,109] },
  { couple: "Nicole & Gabriel", venue: "Carmen's Lakeview", photos: [110,111,112,113,114,115,116,117,118] },
  { couple: "Stephanie & Carmelo", venue: "Caledon Valley Estate Barn", photos: [121,122,123,124,125,126] },
  { couple: "Stephanie & Jason", venue: "Hazelton Manor", photos: [127,128,129,130,131,132,133,134,135,136,137] },
  { couple: "Stephanie & TJ", venue: "1 King West Hotel", photos: [138,139,140,141,142,143,144,145,146,147,148,149] },
];

function pad(n: number) { return String(n).padStart(3, "0"); }
function src(n: number) { return `/images/toronto-wedding-photography-${pad(n)}.jpg`; }

function useInView(threshold = 0.1) {
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

function Lightbox({ photo, onClose }: { photo: number | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/95 backdrop-blur-sm" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-ivory-50/60 hover:text-ivory-50 transition-colors text-2xl font-light" aria-label="Close">&#x2715;</button>
      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <Image src={src(photo)} alt="Wedding photography by Jean Marcotte" width={1400} height={1000} className="max-h-[90vh] w-auto object-contain" />
      </div>
    </div>
  );
}

function WeddingStory({ couple, venue, photos, onPhotoClick }: {
  couple: string; venue: string; photos: number[]; onPhotoClick: (n: number) => void;
}) {
  const hero = photos[0];
  const rest = photos.slice(1);
  const cols = rest.length <= 3 ? rest.length : rest.length <= 6 ? 3 : 4;

  return (
    <FadeIn>
      <div className="mb-20">
        <div className="relative aspect-[16/7] cursor-pointer overflow-hidden" onClick={() => onPhotoClick(hero)}>
          <Image src={src(hero)} alt={`${couple} wedding photography by Jean Marcotte`} fill sizes="100vw" className="object-cover transition-transform duration-700 hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <h2 className="font-serif text-[clamp(24px,3vw,42px)] font-normal text-ivory-50">{couple}</h2>
            {venue && <p className="mt-1 text-[13px] tracking-wide text-ivory-50/60">{venue}</p>}
          </div>
        </div>
        {rest.length > 0 && (
          <div className="mt-1.5 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {rest.map((p, i) => (
              <div key={i} className="group relative aspect-[4/3] cursor-pointer overflow-hidden" onClick={() => onPhotoClick(p)}>
                <Image src={src(p)} alt={`${couple} wedding photo`} fill sizes={`(max-width: 768px) 50vw, ${Math.round(100/cols)}vw`} loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

export default function PortfolioPage() {
  const [lightboxPhoto, setLightboxPhoto] = useState<number | null>(null);

  return (
    <>
      <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      <section className="section-dark px-6 pt-32 pb-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-3 flex items-center gap-4">
            <div className="h-px w-10 bg-gold-400" />
            <span className="text-label text-gold-500">Portfolio</span>
          </div>
          <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1.1] tracking-tight text-ivory-50">
            Real weddings.<br />
            <span className="italic text-gold-300">Real love.</span>
          </h1>
          <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-warm-gray-400">
            Every wedding is a unique story. Browse through these real celebrations
            from venues across Toronto and the GTA.
          </p>
        </div>
      </section>
      <section className="bg-charcoal-950 px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          {STORIES.map((story, i) => (
            <WeddingStory key={i} {...story} onPhotoClick={setLightboxPhoto} />
          ))}
        </div>
      </section>
      <section className="section-dark px-6 py-20 text-center md:px-10 lg:px-20">
        <div className="mx-auto max-w-[600px]">
          <div className="mx-auto mb-6 h-8 w-px bg-gold-400/50" />
          <h2 className="font-serif text-[clamp(24px,3vw,40px)] font-normal text-ivory-50">
            Ready to create <span className="italic text-gold-300">your story</span>?
          </h2>
          <p className="mt-3 text-[14px] text-warm-gray-400">Packages from $5,000 · Limited availability per year</p>
          <Link href="/contact" className="mt-8 inline-block bg-gold-400 px-10 py-4 text-label text-charcoal-950 transition-all duration-300 hover:bg-gold-300">
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
