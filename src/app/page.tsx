export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-charcoal-950 px-6 text-center">
      {/* Decorative element */}
      <div className="mb-8">
        <div className="mx-auto h-px w-16 bg-gold-400/60" />
      </div>

      {/* Brand Name */}
      <h1 className="font-serif text-5xl tracking-tight text-ivory-50 md:text-7xl">
        Jean Marcotte
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-label tracking-widest text-warm-gray-400">
        Premium Wedding Photography
      </p>

      {/* Coming Soon */}
      <div className="mt-12">
        <p className="text-lg text-ivory-200/80">
          A new experience is on its way.
        </p>
        <p className="mt-2 text-sm text-warm-gray-500">
          Timeless, editorial photography for your most important day.
        </p>
      </div>

      {/* Decorative element */}
      <div className="mt-12">
        <div className="mx-auto h-px w-16 bg-gold-400/60" />
      </div>

      {/* CTA */}
      <a
        href="/contact"
        className="mt-10 inline-block rounded-sm border border-gold-400/60 px-8 py-3 text-label text-gold-300 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-200"
      >
        Get in Touch
      </a>
    </div>
  );
}
