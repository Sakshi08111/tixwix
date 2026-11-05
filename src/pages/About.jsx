
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Ticket,
  Users,
  Sparkles,
  MapPin,
  Play,
} from "lucide-react";

import "./About.css";

const benefits = [
  {
    icon: CalendarDays,
    title: "Discover More",
    description:
      "From live music to creative workshops, find experiences worth stepping out for.",
  },
  {
    icon: Ticket,
    title: "Book with Ease",
    description:
      "Explore events, compare ticket options and make your next plan simpler.",
  },
  {
    icon: Users,
    title: "Bring People Together",
    description:
      "Helping organizers, creators and communities connect through real experiences.",
  },
];

export default function About() {
  return (
    <main className="about-page">

      {/* ==========================
          CINEMATIC HERO
      ========================== */}

      <section className="about-cinematic-hero">
        <div className="about-hero-shade" />

        <div className="page-wrap about-cinematic-content">
          <div className="about-hero-copy">

            <span className="about-eyebrow">
              <Sparkles size={15} />
              WELCOME TO Tixwix
            </span>

            <h1>
              More than tickets.
              <br />
              <span className="about-gradient">
                More reasons to go.
              </span>
            </h1>

            <p>
              Discover experiences. Meet your people.
              Make memories that last beyond the event.
            </p>

            <div className="about-hero-actions">
              <Link to="/events" className="btn btn-primary">
                Explore events <ArrowUpRight size={17} />
              </Link>

              <Link
                to="/create-event"
                className="btn btn-outline"
              >
                Host an event
              </Link>
            </div>

            <div className="about-hero-location">
              <MapPin size={14} />
              Starting in Nashik, India
            </div>

          </div>
        </div>
      </section>

      {/* ==========================
          OUR INTRODUCTION
      ========================== */}

      <section className="about-story-section">
        <div className="page-wrap about-story-layout">

          <div className="about-story-images">

            <div className="about-story-photo about-photo-main">
              <img
                src="/images/about-community-moments.png"
                alt="Crowd enjoying a live event"
                loading="lazy"
              />
            </div>

            <div className="about-story-photo about-photo-secondary">
              <img
                src="/images/about-live-experience.png"
                alt="Conference and networking experience"
                loading="lazy"
              />
            </div>

            <div className="about-story-sticker">
              <Sparkles size={18} />
              <span>GOOD TIMES START HERE</span>
            </div>

          </div>

          <div className="about-story-copy">
            <span className="about-eyebrow">
              THE STORY BEHIND THE IDEA
            </span>

            <h2>
              Life is better
              <br />
              <span className="about-gradient">
                when we show up.
              </span>
            </h2>

            <p>
              Great experiences bring people together.
              Yet finding events, booking tickets and
              connecting with the right audience can
              sometimes feel complicated.
            </p>

            <p>
              Tixwix is being built to change that —
              one place for discovering events, supporting
              organizers and making memorable plans.
            </p>

            <div className="about-story-pill">
              <MapPin size={16} />
              Born with a vision in Nashik
            </div>

          </div>

        </div>
      </section>

      {/* ==========================
          WHY Tixwix
      ========================== */}

      <section className="about-why">
        <div className="page-wrap">

          <div className="about-section-heading">
            <span className="about-eyebrow">
              <Sparkles size={14} />
              THE Tixwix EXPERIENCE
            </span>

            <h2>
              Made for <span className="about-gradient">
                unforgettable moments.
              </span>
            </h2>

            <p>
              One idea. More experiences. Better connections.
            </p>
          </div>

          <div className="about-benefits">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="about-benefit-card"
                  key={item.title}
                >
                  <span className="about-benefit-number">
                    0{index + 1}
                  </span>

                  <div className="about-benefit-icon">
                    <Icon size={24} strokeWidth={1.7} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================
          FINAL CTA
      ========================== */}

      <section className="about-final">
        <div className="page-wrap">
          <div className="about-final-card">

            <div className="about-final-content">
              <span className="about-eyebrow">
                YOUR NEXT EXPERIENCE STARTS HERE
              </span>

              <h2>
                Find your people.
                <br />
                <span className="about-gradient">
                  Make your moment.
                </span>
              </h2>

              <p>
                Discover your next event or bring your own
                experience to the crowd.
              </p>

              <div className="about-final-actions">
                <Link
                  to="/events"
                  className="btn btn-primary"
                >
                  Explore events
                  <ArrowUpRight size={16} />
                </Link>

                <Link
                  to="/create-event"
                  className="btn btn-outline"
                >
                  Create your event
                </Link>
              </div>
            </div>

            <div className="about-final-art" aria-hidden="true">
              <div className="about-final-art-circle">
                <Ticket size={76} strokeWidth={1.2} />
              </div>
              <Sparkles
                className="about-final-sparkle"
                size={36}
              />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
