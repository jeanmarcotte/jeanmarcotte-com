import Link from "next/link";

const quickLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Venues", href: "/venues" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const serviceAreas = [
  "Toronto",
  "Vaughan",
  "Woodbridge",
  "Maple",
  "Markham",
  "Scarborough",
  "Mississauga",
  "Hamilton",
  "Cambridge",
  "Niagara",
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/jeanmarcotte",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/jeanmarcottephoto",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/jeanmarcotte",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.97 9.12-.02-.71.01-1.56.18-2.33l1.3-5.51s-.33-.66-.33-1.63c0-1.53.89-2.67 1.99-2.67.94 0 1.39.7 1.39 1.55 0 .94-.6 2.35-.91 3.66-.26 1.1.55 1.99 1.63 1.99 1.96 0 3.27-2.52 3.27-5.49 0-2.26-1.52-3.95-4.29-3.95-3.13 0-5.08 2.33-5.08 4.94 0 .9.26 1.53.67 2.02.19.22.22.31.15.56l-.23.91c-.07.29-.3.39-.55.28-1.45-.59-2.13-2.18-2.13-3.97 0-2.95 2.49-6.49 7.43-6.49 3.97 0 6.58 2.87 6.58 5.95 0 4.08-2.27 7.13-5.61 7.13-1.12 0-2.18-.61-2.54-1.3l-.73 2.89c-.22.83-.66 1.66-1.06 2.32.94.28 1.93.43 2.96.43 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="section-dark border-t border-charcoal-800"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl tracking-tight text-ivory-50"
            >
              Jean Marcotte
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-gray-400">
              Timeless, editorial wedding photography for couples who value
              artistry and authenticity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-label mb-6 text-ivory-300">Navigation</h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray-400 transition-colors duration-300 hover:text-ivory-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-label mb-6 text-ivory-300">Service Areas</h3>
            <ul className="space-y-3" role="list">
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  className="text-sm text-warm-gray-400"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-label mb-6 text-ivory-300">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-700 text-warm-gray-400 transition-all duration-300 hover:border-gold-400/60 hover:text-gold-300"
                  aria-label={`Follow on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-warm-gray-500">
              hello@jeanmarcotte.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-charcoal-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-warm-gray-600">
              &copy; {currentYear} Jean Marcotte Photography. All rights
              reserved.
            </p>
            <p className="text-xs text-warm-gray-600">
              Toronto &amp; GTA &middot; Available Worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
