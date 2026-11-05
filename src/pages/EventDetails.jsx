
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  PhoneCall,
  Ticket,
  Music2,
  ConciergeBell,
  Wine,
  UsersRound,
  Shirt,
  Sparkles,
  CheckCircle2,
  Info,
  ExternalLink,
} from "lucide-react";

import "./EventDetails.css";

const event = {
  title: "The Mehfil",
  edition: "Pre-Diwali Edition",
  organizer: "The Skyline Stay",
  performer: "Ishan Livee",
  date: "Wednesday, 4 November 2026",
  time: "7:00 PM onwards",
  venue: "The Twelve by The Skyline Stay",
  city: "Nashik, Maharashtra",
  price: 999,
  phone: "9168793154",
  image: "/the-mehfil-poster.png",
};

const highlights = [
  {
    icon: ConciergeBell,
    title: "Delicious Food",
    description: "Vegetarian and non-vegetarian food included",
  },
  {
    icon: Music2,
    title: "Soulful Music",
    description: "Live performance and unplugged vibes",
  },
  {
    icon: Wine,
    title: "BYOB",
    description: "Bring your own bottle",
  },
  {
    icon: UsersRound,
    title: "Premium Space",
    description: "An intimate setting to celebrate together",
  },
  {
    icon: Shirt,
    title: "Dress Code",
    description: "Traditional or Indo-Western",
  },
];

export default function EventDetails() {
  return (
    <main className="ed-page">

      {/* TOP NAVIGATION */}
      <div className="page-wrap ed-topbar">
        <Link to="/events" className="ed-back">
          <ArrowLeft size={17} />
          Back to events
        </Link>

        <span className="ed-topbar-caption">
          Tixwix / NASHIK
        </span>
      </div>

      {/* MAIN EVENT DISPLAY */}
      <section className="page-wrap ed-main">

        {/* LEFT COLUMN */}
        <div className="ed-poster-column">
          <div className="ed-poster-frame">
            <img
              src={event.image}
              alt="The Mehfil Pre-Diwali Edition official event poster"
              className="ed-poster"
            />
          </div>

          <p className="ed-poster-caption">
            Official promotional artwork supplied for the event
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="ed-event-content">

          <div className="ed-tags">
            <span className="ed-event-tag">
              <Music2 size={13} />
              MUSIC & NIGHTLIFE
            </span>

            <span className="ed-city-tag">
              <MapPin size={13} />
              NASHIK
            </span>
          </div>

          <span className="ed-presenter">
            {event.organizer.toUpperCase()} PRESENTS
          </span>

          <h1 className="ed-title">
            The <span>Mehfil.</span>
          </h1>

          <p className="ed-edition">
            PRE-DIWALI EDITION
          </p>

          <p className="ed-lead">
            A beautiful evening of soulful melodies,
            festive ambience, delicious food and
            unforgettable moments.
          </p>

          <div className="ed-performer">
            <Sparkles size={17} />
            Featuring <strong>{event.performer}</strong>
          </div>

          {/* EVENT FACTS */}
          <div className="ed-event-facts">
            <div className="ed-fact">
              <span className="ed-fact-icon">
                <CalendarDays size={19} />
              </span>
              <div>
                <small>DATE</small>
                <strong>{event.date}</strong>
              </div>
            </div>

            <div className="ed-fact">
              <span className="ed-fact-icon">
                <Clock3 size={19} />
              </span>
              <div>
                <small>TIME</small>
                <strong>{event.time}</strong>
              </div>
            </div>

            <div className="ed-fact">
              <span className="ed-fact-icon">
                <MapPin size={19} />
              </span>
              <div>
                <small>VENUE</small>
                <strong>{event.venue}</strong>
                <span>{event.city}</span>
              </div>
            </div>
          </div>

          {/* PRICE / ENQUIRY PANEL */}
          <div className="ed-booking-panel">

            <div className="ed-booking-top">
              <div>
                <span className="ed-price-label">
                  EVENT PASS
                </span>

                <div className="ed-price">
                  ₹{event.price.toLocaleString("en-IN")}
                  <span>/ person</span>
                </div>
              </div>

              <span className="ed-food-badge">
                <CheckCircle2 size={14} />
                Food included
              </span>
            </div>

            <a
              href={`tel:+91${event.phone}`}
              className="ed-book-btn"
              aria-label={`Call ${event.phone} to enquire about passes`}
            >
              <PhoneCall size={17} />
              Enquire about passes
              <ArrowUpRight size={17} />
            </a>

            <p className="ed-call-number">
              For bookings:{" "}
              <a href={`tel:+91${event.phone}`}>
                +91 {event.phone}
              </a>
            </p>

            <p className="ed-booking-disclaimer">
              Bookings are handled directly by the event
              organizer. Tixwix does not currently
              collect payment or issue tickets for this event.
            </p>

          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="ed-highlights-section">
        <div className="page-wrap">

          <div className="ed-section-heading">
            <span className="ed-eyebrow">
              <Sparkles size={14} />
              THE EXPERIENCE
            </span>

            <h2>
              More than just{" "}
              <span>an evening.</span>
            </h2>

            <p>
              Everything that makes The Mehfil special.
            </p>
          </div>

          <div className="ed-highlights-grid">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="ed-highlight-card"
                  key={item.title}
                >
                  <div className="ed-highlight-icon">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* DESCRIPTION AND VENUE */}
      <section className="ed-information-section">
        <div className="page-wrap ed-information-grid">

          <div className="ed-about-event">
            <span className="ed-eyebrow">
              ABOUT THIS EVENT
            </span>

            <h2>
              An evening to{" "}
              <span>remember.</span>
            </h2>

            <p>
              Nashik, you loved The Mehfil — now get
              ready for the magic of Diwali!
            </p>

            <p>
              The Twelve returns with soulful melodies,
              festive vibes and a special Pre-Diwali
              Mehfil featuring Ishan Livee.
            </p>

            <p>
              Enjoy music, food and a warm festive
              atmosphere at The Twelve by The Skyline Stay.
            </p>
          </div>

          <aside className="ed-location-card">
            <span className="ed-eyebrow">
              <MapPin size={14} />
              THE VENUE
            </span>

            <h3>{event.venue}</h3>

            <p>{event.city}</p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${event.venue}, ${event.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-maps-link"
            >
              Find location on Google Maps
              <ExternalLink size={16} />
            </a>

            <div className="ed-location-note">
              <Info size={16} />
              <span>
                Confirm venue directions and entry details
                with the organizer before travelling.
              </span>
            </div>
          </aside>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="ed-final-section">
        <div className="page-wrap">

          <div className="ed-final-card">
            <div>
              <span className="ed-eyebrow">
                LIMITED SEATS ADVERTISED
              </span>

              <h2>
                Ready for <span>The Mehfil?</span>
              </h2>

              <p>
                Contact the organizer directly to check
                pass availability and booking details.
              </p>
            </div>

            <a
              href={`tel:+91${event.phone}`}
              className="ed-final-button"
            >
              <Ticket size={18} />
              Enquire about passes
              <ArrowUpRight size={17} />
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}
