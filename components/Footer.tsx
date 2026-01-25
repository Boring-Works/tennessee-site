import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-gradient text-white mt-auto">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Site Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent" aria-hidden="true">★</span>
              <h3 className="font-serif text-xl font-bold">
                Rocky Mount
              </h3>
            </div>
            <p className="text-accent font-serif text-sm mb-4">
              Where Tennessee Began
            </p>
            <address className="text-sm text-white not-italic leading-relaxed">
              200 Hyder Hill Road
              <br />
              Piney Flats, TN 37686
            </address>
            <p className="text-xs text-white/90 mt-4 uppercase tracking-widest">
              Est. 1770
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/events" className="text-white hover:text-accent transition-colors link-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm">
                  2026 Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/lectures" className="text-white hover:text-accent transition-colors link-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm">
                  Lecture Series
                </Link>
              </li>
              <li>
                <Link href="/first-250" className="text-white hover:text-accent transition-colors link-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm">
                  First 250 Program
                </Link>
              </li>
              <li>
                <Link href="/visit" className="text-white hover:text-accent transition-colors link-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm">
                  Plan Your Visit
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+14235387396"
                  className="hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                >
                  (423) 538-7396
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a
                  href="https://rockymountmuseum.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                >
                  rockymountmuseum.com
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            </ul>

            {/* America 250 Badge */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-xs text-white/90 uppercase tracking-widest mb-2">
                Official Partner
              </p>
              <p className="text-sm text-accent font-semibold">
                America 250 | Tennessee 230
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/90 leading-relaxed">
            &copy; 2026 Rocky Mount Historical Association
          </p>
          <p className="text-xs text-white/80 mt-2">
            A Tennessee Historical Commission property operated by the nonprofit Rocky Mount Historical Association
          </p>
        </div>
      </div>
    </footer>
  );
}
