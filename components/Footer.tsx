"use client";

import Link from "next/link";
import styles from "./Footer/Footer.module.css";

// Period-authentic quill icon
const QuillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles["footer-icon"]}>
    <path d="M20 2c-2 2-4 6-4 10l-3-1" />
    <path d="M13 11l-3 3-2 8 8-2 3-3" />
    <path d="M16 8c-2 2-1 4 0 6" strokeWidth="1" opacity="0.5" />
  </svg>
);

// Compass icon for location
const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles["footer-icon"]}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" fill="currentColor" opacity="0.2" />
  </svg>
);

// Clock icon for hours
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles["footer-icon"]}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

// Social media icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles["footer-social-icon"]}>
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles["footer-social-icon"]}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Back to top scroll function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className={styles["site-footer"]} role="contentinfo">
      {/* Back to Top Button */}
      <button
        type="button"
        className={styles["footer-back-to-top"]}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span className={styles["footer-back-to-top-text"]}>Return to Top</span>
      </button>

      {/* Decorative top border with flourishes */}
      <div className={styles["footer-border"]} aria-hidden="true">
        <span className={styles["footer-border-line"]} />
        <span className={styles["footer-border-flourish"]}>❧</span>
        <span className={styles["footer-border-ornament"]}>✦</span>
        <span className={`${styles["footer-border-flourish"]} ${styles["footer-border-flourish--flip"]}`}>❧</span>
        <span className={styles["footer-border-line"]} />
      </div>

      {/* Corner bracket decorations */}
      <span className={`${styles["footer-corner"]} ${styles["footer-corner--tl"]}`} aria-hidden="true" />
      <span className={`${styles["footer-corner"]} ${styles["footer-corner--tr"]}`} aria-hidden="true" />
      <span className={`${styles["footer-corner"]} ${styles["footer-corner--bl"]}`} aria-hidden="true" />
      <span className={`${styles["footer-corner"]} ${styles["footer-corner--br"]}`} aria-hidden="true" />

      <div className={styles["footer-container"]}>
        <div className={styles["footer-grid"]}>
          {/* Site Info with Wax Seal */}
          <div className={styles["footer-brand"]}>
            {/* Wax seal */}
            <div className={styles["footer-seal"]} aria-hidden="true">
              <span className={styles["footer-seal-inner"]}>RM</span>
            </div>

            <h3 className={styles["footer-title"]}>
              <span className={styles["footer-title-main"]}>Rocky Mount</span>
              <span className={styles["footer-title-sub"]}>State Historic Site</span>
            </h3>

            <p className={styles["footer-tagline"]}>Where Tennessee Began</p>

            <address className={styles["footer-address"]}>
              <CompassIcon />
              <span>
                200 Hyder Hill Road<br />
                Piney Flats, TN 37686
              </span>
            </address>

            {/* Social Media Links */}
            <div className={styles["footer-social"]}>
              <a
                href="https://www.facebook.com/rockymountmuseum"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer-social-link"]}
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/rockymountmuseum"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer-social-link"]}
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon />
              </a>
            </div>

            <p className={styles["footer-established"]}>
              <span className={styles["footer-established-line"]} aria-hidden="true" />
              Est. 1770
              <span className={styles["footer-established-line"]} aria-hidden="true" />
            </p>
          </div>

          {/* Quick Links */}
          <nav className={styles["footer-nav"]} aria-label="Footer navigation">
            <h3 className={styles["footer-nav-title"]}>
              <QuillIcon />
              Explore
            </h3>
            <ul className={styles["footer-nav-list"]}>
              <li>
                <Link href="/events" className={styles["footer-link"]}>
                  <span className={styles["footer-link-bullet"]} aria-hidden="true">◆</span>
                  2026 Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/lectures" className={styles["footer-link"]}>
                  <span className={styles["footer-link-bullet"]} aria-hidden="true">◆</span>
                  Lecture Series
                </Link>
              </li>
              <li>
                <Link href="/first-250" className={styles["footer-link"]}>
                  <span className={styles["footer-link-bullet"]} aria-hidden="true">◆</span>
                  First 250 Program
                </Link>
              </li>
              <li>
                <Link href="/visit" className={styles["footer-link"]}>
                  <span className={styles["footer-link-bullet"]} aria-hidden="true">◆</span>
                  Plan Your Visit
                </Link>
              </li>
              <li>
                <Link href="/almanac" className={styles["footer-link"]}>
                  <span className={styles["footer-link-bullet"]} aria-hidden="true">◆</span>
                  Almanac
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact & Hours */}
          <div className={styles["footer-contact"]}>
            <h3 className={styles["footer-nav-title"]}>
              <QuillIcon />
              Contact
            </h3>
            <ul className={styles["footer-contact-list"]}>
              <li>
                <a href="tel:+14235387396" className={styles["footer-contact-link"]}>
                  <svg className={styles["footer-contact-icon"]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  (423) 538-7396
                </a>
              </li>
              <li>
                <a href="mailto:info@rockymountmuseum.com" className={styles["footer-contact-link"]}>
                  <svg className={styles["footer-contact-icon"]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  info@rockymountmuseum.com
                </a>
              </li>
              <li>
                <a
                  href="https://rockymountmuseum.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["footer-contact-link"]}
                >
                  <svg className={styles["footer-contact-icon"]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                  rockymountmuseum.com
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            </ul>

            {/* Hours of Operation */}
            <div className={styles["footer-hours"]}>
              <h4 className={styles["footer-hours-title"]}>
                <ClockIcon />
                Hours
              </h4>
              <dl className={styles["footer-hours-list"]}>
                <div className={styles["footer-hours-row"]}>
                  <dt>Tue – Sat</dt>
                  <dd>10:00 AM – 5:00 PM</dd>
                </div>
                <div className={styles["footer-hours-row"]}>
                  <dt>Sunday</dt>
                  <dd>1:00 PM – 5:00 PM</dd>
                </div>
                <div className={`${styles["footer-hours-row"]} ${styles["footer-hours-row--closed"]}`}>
                  <dt>Monday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* America 250 Badge - Enhanced */}
          <div className={styles["footer-commemoration"]}>
            <div className={`${styles["footer-badge"]} ${styles["footer-badge--prominent"]}`}>
              <div className={styles["footer-badge-seal"]} aria-hidden="true">
                <span className={styles["footer-badge-seal-inner"]}>250</span>
              </div>
              <div className={styles["footer-badge-content"]}>
                <p className={styles["footer-badge-label"]}>Official Partner</p>
                <p className={styles["footer-badge-text"]}>America&apos;s 250th Anniversary</p>
                <p className={styles["footer-badge-subtext"]}>Tennessee&apos;s 230th Statehood</p>
              </div>
              <div className={styles["footer-badge-years"]} aria-hidden="true">
                <span className={styles["footer-badge-year"]}>1776</span>
                <span className={styles["footer-badge-divider"]}>—</span>
                <span className={styles["footer-badge-year"]}>2026</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className={styles["footer-newsletter"]}>
              <h4 className={styles["footer-newsletter-title"]}>Stay Informed</h4>
              <p className={styles["footer-newsletter-desc"]}>Receive news of events & lectures</p>
              <form className={styles["footer-newsletter-form"]} action="#" method="POST">
                <div className={styles["footer-newsletter-input-wrapper"]}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={styles["footer-newsletter-input"]}
                    aria-label="Email address for newsletter"
                    required
                  />
                  <button type="submit" className={styles["footer-newsletter-btn"]} aria-label="Subscribe to newsletter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar with decorative rule */}
        <div className={styles["footer-bottom"]}>
          <div className={styles["footer-bottom-rule"]} aria-hidden="true">
            <span className={styles["footer-bottom-rule-line"]} />
            <span className={styles["footer-bottom-rule-star"]}>★</span>
            <span className={styles["footer-bottom-rule-line"]} />
          </div>

          <p className={styles["footer-copyright"]}>
            &copy; 2026 Rocky Mount Historical Association
          </p>
          <p className={styles["footer-legal"]}>
            A Tennessee Historical Commission property operated by the nonprofit Rocky Mount Historical Association
          </p>
        </div>
      </div>
    </footer>
  );
}
