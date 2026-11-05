
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Send,
  Ticket,
  Music2,
  Sparkles,
  Headphones,
} from 'lucide-react';
import './Footer.css';

function InstagramIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1A4.1 4.1 0 0 1 16.8 8c4 0 4.7 2.6 4.7 6V21h-3.8v-6.2c0-1.5 0-3.5-2.2-3.5s-2.5 1.7-2.5 3.4V21H9.4V9Z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">

      {/* PREMIUM AURORA WAVE */}
      <div className="footer-wave" aria-hidden="true">
        <div className="footer-wave-glow" />

        <svg
          className="footer-wave-svg"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="footerAurora"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00B8F4" />
              <stop offset="48%" stopColor="#8358F0" />
              <stop offset="100%" stopColor="#FF2D95" />
            </linearGradient>

            <linearGradient
              id="footerAuroraFill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#06314C" />
              <stop offset="45%" stopColor="#271747" />
              <stop offset="100%" stopColor="#42132F" />
            </linearGradient>

            <linearGradient
              id="footerWaveFront"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#0B1322" />
              <stop offset="50%" stopColor="#121022" />
              <stop offset="100%" stopColor="#1B0F20" />
            </linearGradient>
          </defs>

          {/* Back gradient wave */}
          <path
            d="M0 95 C210 15 400 150 630 75 S1070 12 1440 92 V180 H0Z"
            fill="url(#footerAuroraFill)"
            opacity="0.82"
          />

          {/* Middle darker wave */}
          <path
            d="M0 126 C240 65 400 160 660 115 S1090 65 1440 125 V180 H0Z"
            fill="#171127"
            opacity="0.90"
          />

          {/* Front wave blends into footer */}
          <path
            d="M0 144 C220 105 470 170 720 133 S1180 115 1440 150 V180 H0Z"
            fill="url(#footerWaveFront)"
          />

          {/* Soft gradient highlight */}
          <path
            d="M0 126 C240 65 400 160 660 115 S1090 65 1440 125"
            fill="none"
            stroke="url(#footerAurora)"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>

        <Music2 className="footer-floating-icon footer-icon-music" />
        <Headphones className="footer-floating-icon footer-icon-headphones" />
        <Sparkles className="footer-floating-icon footer-icon-sparkle" />
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="footer-top page-wrap">

        {/* BRAND */}
        <div className="footer-brand-col">

          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">
              <Ticket size={22} strokeWidth={2.3} />
            </span>

            <span className="brand-word">
              EVENT <b>ROCKERZ</b><i>.</i>
            </span>
          </Link>

          <p>
            Find your people. Try something new.
            Make the city yours.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.linkedin.com/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>

            <a
              href="https://wa.me/"
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <Send size={17} />
            </a>
          </div>
        </div>

        {/* DISCOVER LINKS */}
        <div className="footer-col">
          <h4>Discover</h4>

          <Link to="/">Home</Link>
          <Link to="/events">Explore events</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/events">Offers &amp; deals</Link>
        </div>

        {/* ORGANIZER LINKS */}
        <div className="footer-col">
          <h4>For organizers</h4>

          <Link to="/create-event">
            Create an event <ArrowUpRight size={13} />
          </Link>

          <Link to="/about">
            Why Tixwix?
          </Link>

          <Link to="/contact">Partnerships</Link>
          <Link to="/contact">Event services</Link>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter">

          <span className="footer-kicker">
            GET EVENT DROPS
          </span>

          <h3>
            Good plans.
            <br />
            <span className="footer-gradient">
              Straight to you.
            </span>
          </h3>

          <p>
            Be the first to hear about exciting experiences,
            curated picks and launch offers.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.alert(
                'Newsletter signup will be connected to the backend later.'
              );
            }}
          >
            <input
              type="email"
              aria-label="Email address"
              placeholder="Your email address"
              required
            />

            <button
              aria-label="Subscribe"
              type="submit"
            >
              <ArrowUpRight size={18} />
            </button>
          </form>

          <small>
            Demo form — email subscriptions are not connected yet.
          </small>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom page-wrap">

        <span>
          © {currentYear} Tixwix.
          All good things reserved.
        </span>

        <div>
          <Link to="/contact">Help &amp; support</Link>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>

        <span className="footer-location">
          Starting in Nashik, India <span>✦</span>
        </span>
      </div>

    </footer>
  );
}
