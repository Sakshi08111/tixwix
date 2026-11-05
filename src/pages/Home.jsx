import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronDown,
  Clapperboard,
  MapPin,
  Music2,
  Palette,
  Search,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  UserRoundPlus,
  Utensils,
  Zap,
  Clock3,
  PhoneCall,
  ConciergeBell,
Wine,
Shirt,
} from 'lucide-react';
import './Home.css';
import celebrationGlasses from '../assets/celebration-glasses.png';
import glassLeft from '../assets/glass-left.png';
import glassRight from '../assets/glass-right.png';
// Place the image in /public/the-mehfil-poster.png.
const mehfilPoster = '/the-mehfil-poster.png';

// Home-only category data; no changes to src/data/events.js required.
const categories = [
  { title: 'Music & Nightlife', subtitle: 'Gigs, DJs and live shows', color: 'rose' },
  { title: 'Workshops', subtitle: 'Learn something new', color: 'blue' },
  { title: 'Business & Networking', subtitle: 'Meet your next collaborator', color: 'rose' },
  { title: 'Creator Events', subtitle: 'Creators, fans and communities', color: 'blue' },
  { title: 'Food & Experiences', subtitle: 'Taste, explore, repeat', color: 'rose' },
  { title: 'Festivals & Culture', subtitle: 'Celebrate what brings us together', color: 'blue' },
];

const categoryEmojis = {
  'Music & Nightlife': '♫',
  Workshops: '✳',
  'Business & Networking': '↗',
  'Creator Events': '◉',
  'Food & Experiences': '✦',
  'Festivals & Culture': '✺',
};
const categoryArtIcons = {
  'Music & Nightlife': Music2,
  Workshops: Palette,
  'Business & Networking': BriefcaseBusiness,
  'Creator Events': Clapperboard,
  'Food & Experiences': Utensils,
  'Festivals & Culture': Sparkles,
};
export default function Home() {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState('');
  const [city, setCity] = useState('Nashik');
  const [eventDate, setEventDate] = useState('');

  // Visible, replayable entrance and scroll animations using the Web Animations API.
  useEffect(() => {
    const root = document.querySelector('.home-hero');
    if (!root) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof Element.prototype.animate !== 'function') return undefined;

    const animations = [];
    const heroSelectors = [
      '.hero-eyebrow', '.hero-copy h1', '.hero-description',
      '.hero-actions', '.hero-social-proof', '.hero-search-card',
      '.hero-bottom',
    ];
    const revealSelectors = [
      '.mehfil-section-head', '.mehfil-horizontal-card',
      '.category-section .section-head', '.category-card',
      '.why-home-image', '.why-home-content', '.host-premium-card',
      '.organizer-how-header', '.organizer-how-card',
    ];

    const playReveal = (element, delay = 0, distance = 56) => {
      const animation = element.animate(
        [
          { opacity: 0, transform: `translate3d(0, ${distance}px, 0) scale(.965)`, filter: 'blur(5px)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)' },
        ],
        { duration: 1050, delay, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' }
      );
      animations.push(animation);
    };

    // On each homepage mount, replay the above-the-fold animation.
    heroSelectors.forEach((selector, index) => {
      const el = root.querySelector(selector);
      if (el) playReveal(el, 120 + index * 145, index === 1 ? 80 : 48);
    });

    const reveals = revealSelectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector))
    );
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const index = reveals.indexOf(el);
          const stagger = el.matches('.category-card, .organizer-how-card') ? (index % 3) * 135 : 0;
          playReveal(el, stagger, 64);
          observer.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
      reveals.forEach((element) => observer.observe(element));
    } else {
      reveals.forEach((element) => playReveal(element, 0, 48));
    }

    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);


  const submitSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (eventType) params.set('category', eventType);
    if (city) params.set('city', city);
    if (eventDate) params.set('date', eventDate);
    navigate(`/events${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <>
      <section className="home-hero">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="er-hero-aurora" aria-hidden="true" />
        <div className="er-hero-orbit er-hero-orbit-one" aria-hidden="true" />
        <div className="er-hero-orbit er-hero-orbit-two" aria-hidden="true" />
        <div className="er-hero-particle er-hero-particle-one" aria-hidden="true">✦</div>
        <div className="er-hero-particle er-hero-particle-two" aria-hidden="true">✧</div>
        <div className="er-hero-particle er-hero-particle-three" aria-hidden="true">✦</div>
        <div className="hero-layout page-wrap">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span className="live-dot" /> NASHIK, LET'S GO <span className="eyebrow-divider">✳</span> YOUR CITY, YOUR SCENE</div>
            <h1><span className="er-title-line">Where every</span><span className="er-title-line">event <span className="hero-highlight">begins.</span></span></h1>
            <p className="hero-description">From live gigs and hands-on workshops to business meets and creator experiences — find your next reason to step out.</p>
            <div className="hero-actions">
              <button className="hero-primary" onClick={() => navigate('/events')}>Explore events <ArrowUpRight size={17} /></button>
              <button className="hero-secondary" onClick={() => navigate('/login')}>Host an event <ArrowRight size={16} /></button>
            </div>
            <div className="hero-social-proof">
              <div className="proof-symbols" aria-hidden="true"><span>♫</span><span>✳</span><span>↗</span></div>
              <div><strong>Find your people.</strong><small>Discover experiences across Nashik.</small></div>
            </div>
          </div>

          <div className="hero-search-column">
            <form className="hero-search-card" onSubmit={submitSearch}>
              <div className="search-card-heading">
                <span className="search-card-icon"><Search size={18} /></span>
                <div><h2>Find your next event</h2><p>Your next great plan is closer than you think.</p></div>
              </div>

              <label className="hero-form-field">
                <span className="hero-field-label">EVENT TYPE</span>
                <span className="hero-select-wrap"><Ticket size={17} /><select value={eventType} onChange={(e) => setEventType(e.target.value)}><option value="">All event types</option>{categories.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}</select><ChevronDown size={15} /></span>
              </label>

              <label className="hero-form-field">
                <span className="hero-field-label">LOCATION</span>
                <span className="hero-select-wrap"><MapPin size={17} /><select value={city} onChange={(e) => setCity(e.target.value)}><option value="Nashik">Nashik, Maharashtra</option><option value="Mumbai">Mumbai</option><option value="Pune">Pune</option><option value="All cities">All cities</option></select><ChevronDown size={15} /></span>
              </label>

              <label className="hero-form-field">
                <span className="hero-field-label">WHEN ARE YOU FREE?</span>
                <span className="hero-select-wrap"><CalendarDays size={17} /><input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} aria-label="Choose event date" /><ChevronDown size={15} /></span>
              </label>

              <button className="hero-search-submit" type="submit">Find events <ArrowUpRight size={18} /></button>
              <div className="search-card-note"><Check size={14} /> Explore concerts, workshops, meets & more</div>
            </form>
            <div className="floating-note"><span className="floating-note-star">✦</span><span><strong>Make plans happen.</strong><small>Good events. Good people. Good energy.</small></span></div>
          </div>
        </div>
        <div className="hero-bottom page-wrap"><div><span className="hero-bottom-line" /> BUILT FOR THE THINGS YOU LOVE</div><div className="hero-bottom-categories"><span>LIVE MUSIC</span><i>✳</i><span>WORKSHOPS</span><i>✳</i><span>BUSINESS MEETS</span><i>✳</i><span>CREATOR CORNER</span></div></div>
      </section>


      

{/* ==========================================
    FEATURED EVENTS — COMPACT PREMIUM CARDS
========================================== */}

{/* FEATURED EVENT — HORIZONTAL PREMIUM CARD */}

<section
  className="section featured-section mehfil-section"
  id="featured-event"
>
  <div className="page-wrap">

    <div className="section-head mehfil-section-head">
      <div>
        <span className="section-kicker">
          <Zap size={14} />
          DISCOVER WHAT'S HAPPENING
        </span>

        <h2 className="section-title">
          Experiences worth{" "}
          <span className="gradient-text">
            showing up for.
          </span>
        </h2>

        <p className="section-copy">
          Discover what's happening in Nashik.
        </p>
      </div>

      <button
        type="button"
        className="text-link"
        onClick={() => navigate("/events")}
      >
        View all events <ArrowRight size={17} />
      </button>
    </div>

    <div className="mehfil-horizontal-grid">

      <article className="mehfil-horizontal-card">

        {/* LEFT — FULL POSTER */}

        <div className="mehfil-horizontal-image">
          <img
            src="/the-mehfil-poster.png"
            alt="The Mehfil Pre-Diwali Edition official poster"
            loading="lazy"
          />

          <span className="mehfil-image-date">
            <strong>04</strong>
            <small>NOV</small>
          </span>
        </div>

        {/* RIGHT — EVENT INFORMATION */}

        <div className="mehfil-horizontal-content">

          <div className="mehfil-horizontal-heading">
            <span className="mehfil-horizontal-label">
              THE SKYLINE STAY PRESENTS
            </span>

            <h3>
              The <span>Mehfil.</span>
            </h3>

            <p>
              Pre-Diwali Edition · Featuring Ishan Livee
            </p>
          </div>

          <div className="mehfil-horizontal-meta">
            <span>
              <CalendarDays size={15} />
              Wed, 4 Nov 2026
            </span>

            <span>
              <Clock3 size={15} />
              7 PM onwards
            </span>

            <span className="mehfil-horizontal-venue">
              <MapPin size={15} />
              The Twelve by The Skyline Stay, Nashik
            </span>
          </div>

          {/* EVENT HIGHLIGHTS */}

          <div className="mehfil-horizontal-highlights">
            {[
              {
                icon: ConciergeBell,
                title: "Food Included",
                description: "Veg & non-veg",
              },
              {
                icon: Music2,
                title: "Live Music",
                description: "Soulful melodies",
              },
              {
                icon: Wine,
                title: "BYOB",
                description: "Bring your own bottle",
              },
              {
                icon: Users,
                title: "Premium Space",
                description: "Celebrate together",
              },
              {
                icon: Shirt,
                title: "Dress Code",
                description: "Traditional or Indo-Western",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="mehfil-horizontal-highlight"
                  key={item.title}
                >
                  <Icon size={20} strokeWidth={1.6} />

                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRICE AND BOOKING */}

          <div className="mehfil-horizontal-footer">
            <div className="mehfil-horizontal-price">
              <small>Price per person</small>
              <strong>₹999</strong>
            </div>

            <a
              href="tel:+919168793154"
              className="mehfil-horizontal-book"
              aria-label="Call the organizer about Mehfil passes"
            >
              <PhoneCall size={16} />
              Enquire about passes
              <ArrowUpRight size={16} />
            </a>
          </div>

          <p className="mehfil-horizontal-note">
            Pass bookings are handled directly by the event
            organizer. Confirm availability before booking.
          </p>

        </div>
      </article>

    </div>
  </div>
</section>


<section className="category-section section">
        <div className="page-wrap">
          <div className="section-head">
            <div><span className="section-kicker"><Sparkles size={14} /> Find your kind of fun</span><h2 className="section-title">What's your <span className="gradient-text">kind of thing?</span></h2><p className="section-copy">Big nights, new skills, fresh connections or something totally unexpected.</p></div>
            <button className="text-link" onClick={() => navigate('/categories')}>Explore all categories <ArrowRight size={17} /></button>
          </div>
<div className="category-grid">
  {categories.map((item, index) => {
    const ArtIcon = categoryArtIcons[item.title] || Sparkles;

    return (
      <button
        className={`category-card category-${item.color}`}
        key={item.title}
        onClick={() =>
          navigate(`/events?category=${encodeURIComponent(item.title)}`)
        }
      >
        <span className="category-icon category-emoji">
          {categoryEmojis[item.title] || '✦'}
        </span>

        <span className="category-number">0{index + 1}</span>

        <span className="category-card-art" aria-hidden="true">
          <ArtIcon size={96} strokeWidth={1.3} />
        </span>

        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>

        <ArrowUpRight className="category-arrow" size={17} />
      </button>
    );
  })}
</div>        </div>
      </section>

      {/* ======================================
    WHY Tixwix SECTION
====================================== */}

<section className="why-home-section">
  <div className="page-wrap why-home-layout">

    <div className="why-home-image">
      <img
        src="/images/Joyful Concert Crowd Singing Together.png"
        alt="People enjoying a live music event"
        loading="lazy"
      />

      <div className="why-image-tag">
        <Sparkles size={15} />
        Find your people
      </div>
    </div>

    <div className="why-home-content">
      <span className="section-kicker">
        <Sparkles size={14} />
        WHY Tixwix?
      </span>

      <h2>
        Good events.
        <br />
        <span className="gradient-text">
          Better memories.
        </span>
      </h2>

      <p>
        Life is better when you've got something to
        look forward to. From unforgettable gigs to
        inspiring workshops and local experiences,
        Tixwix brings exciting events and
        amazing people together.
      </p>

      <div className="why-home-features">
        <span><Ticket size={16} /> Discover</span>
        <span><CalendarDays size={16} /> Book</span>
        <span><Users size={16} /> Experience</span>
      </div>

      <button
        className="hero-primary why-home-button"
        onClick={() => navigate('/events')}
      >
        Explore events <ArrowUpRight size={17} />
      </button>
    </div>

  </div>
</section>


      <section className="host-section">
  <div className="page-wrap">

    <div className="host-premium-card">

      {/* LEFT CONTENT */}
      <div className="host-premium-content">
        <span className="host-premium-label">
          <Users size={15} />
          FOR EVENT ORGANIZERS
        </span>

        <h2>
          Got an event?
          <br />
          <span>Bring your people.</span>
        </h2>

        <p>
          Create your event, manage tickets,
          and connect with the right audience.
          Everything you need to bring your event to life.
        </p>

        <div className="host-premium-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/login')}
          >
            Start organizing
            <ArrowUpRight size={17} />
          </button>

          <button
            className="host-premium-secondary"
            onClick={() => document.getElementById('organizer-steps')?.scrollIntoView({ behavior: 'smooth' })}
          >
            How it works <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* CENTER 3D IMAGE */}
    <div className="host-premium-visual">
  <div className="host-premium-glow" />

  <div className="champagne-animation">
    <img
      src={glassLeft}
      alt="Champagne glass"
      className="champagne-glass glass-left"
    />

    <img
      src={glassRight}
      alt=""
      aria-hidden="true"
      className="champagne-glass glass-right"
    />

    <span className="champagne-spark" aria-hidden="true">
      ✦
    </span>
  </div>
</div>

      {/* RIGHT BENEFITS */}
      <div className="host-premium-benefits">
        <span className="host-premium-label">
          MADE FOR YOUR SUCCESS
        </span>

        <h3>
          Host better.
          <br />
          Grow bigger.
        </h3>

        <p>
          From publishing your event to reaching
          new audiences, Tixwix makes
          event management simpler.
        </p>

        <div className="host-premium-benefit-list">
          <div><Ticket size={16} /> Easy ticketing</div>
          <div><Users size={16} /> Audience discovery</div>
          <div><Sparkles size={16} /> Beautiful event listings</div>
        </div>
      </div>

    </div>
  </div>
</section>


{/* ==========================================
    HOW IT WORKS — EVENT ORGANIZERS
========================================== */}

<section id="organizer-steps" className="organizer-how-section">
  <div className="page-wrap">

    <div className="organizer-how-header">
      <div>
        <span className="section-kicker">
          <Sparkles size={15} />
          MADE FOR EVENT ORGANIZERS
        </span>

        <h2>
          You create the moments.
          <br />
          <span className="gradient-text">
            We simplify the rest.
          </span>
        </h2>

        <p>
          Your path from organizer registration to event-day check-in, in four simple steps.
        </p>
      </div>
    </div>

    <div className="organizer-how-grid">

      {[
        {
          number: "01",
          icon: UserRoundPlus,
          title: "Register",
          description:
            "Create your organizer account and get access to your dashboard.",
        },
        {
          number: "02",
          icon: CalendarPlus,
          title: "Create your event",
          description:
            "Add event details, upload your poster, and set ticket prices.",
        },
        {
          number: "03",
          icon: ShieldCheck,
          title: "Get approved",
          description:
            "Submit your event for admin review before it goes live.",
        },
        {
          number: "04",
          icon: ScanLine,
          title: "Manage & scan",
          description:
            "Track bookings and validate tickets at the event entrance.",
        },
      ].map((step, index) => {
        const Icon = step.icon;

        return (
          <div
            className="organizer-how-card"
            key={step.number}
          >
            <div className="organizer-how-card-top">
              <span className="organizer-how-icon">
                <Icon size={25} strokeWidth={1.6} />
              </span>

              <span className="organizer-how-number">
                {step.number}
              </span>
            </div>

            <h3>{step.title}</h3>
            <p>{step.description}</p>

            {index < 3 && (
              <span
                className="organizer-how-connector"
                aria-hidden="true"
              >
                <ArrowRight size={16} />
              </span>
            )}
          </div>
        );
      })}

    </div>
  </div>
</section>

 

      
        </>
  );
}
