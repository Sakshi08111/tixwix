
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  MapPin,
  Music2,
  PhoneCall,
  Search,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  Wine,
  UtensilsCrossed,
  X,
} from "lucide-react";

import "./Events.css";

/*
  Current real event.
  More approved events can be added here later
  or fetched from your backend.
*/
const approvedEvents = [
  {
    id: "the-mehfil-2026",
    title: "The Mehfil",
    subtitle: "Pre-Diwali Edition",
    organizer: "The Skyline Stay",
    category: "Music & Nightlife",
    date: "2026-11-04",
    time: "7:00 PM onwards",
    venue: "The Twelve by The Skyline Stay",
    city: "Nashik",
    location: "Nashik, Maharashtra",
    price: 999,
    poster: "/the-mehfil-poster.png",
    description:
      "An intimate pre-Diwali evening featuring Ishan Livee, soulful music, festive ambience and delicious food.",
    contact: "9168793154",
    features: [
      "Food included",
      "Live music",
      "BYOB",
      "Premium space",
      "Traditional / Indo-Western outfits",
    ],
  },
];

const categories = [
  "Music & Nightlife",
  "Workshops",
  "Business & Networking",
  "Creator Events",
  "Food & Experiences",
  "Festivals & Culture",
  "Comedy & Theatre",
  "Sports & Outdoors",
  "Community & Meetups",
];

const formatDate = (value) => {
  const date = new Date(`${value}T12:00:00`);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function EventListingCard({ event }) {
  return (
    <article className="er-event-card">

      {/* Poster */}
    
<div className="er-event-media">
  <Link
    to={`/events/${event.id}`}
    className="er-event-poster-link"
    aria-label={`View details for ${event.title}`}
  >
    <img
      src={event.poster}
      alt={`${event.title} ${event.subtitle} event poster`}
      loading="lazy"
    />
  </Link>

  <span className="er-event-date-badge">
    <strong>04</strong>
    <small>NOV</small>
  </span>
</div>


      {/* Event information */}
      <div className="er-event-info">

        <div className="er-event-top">
          <span className="er-event-category">
            <Music2 size={13} />
            {event.category}
          </span>

          <span className="er-event-organizer">
            BY {event.organizer.toUpperCase()}
          </span>
        </div>

        <h3>{event.title}</h3>

        <p className="er-event-subtitle">
          {event.subtitle}
        </p>

        <p className="er-event-description">
          {event.description}
        </p>

        <div className="er-event-details">
          <span>
            <CalendarDays size={16} />
            {formatDate(event.date)}
          </span>

          <span>
            <Clock3 size={16} />
            {event.time}
          </span>

          <span className="er-event-location">
            <MapPin size={16} />
            {event.venue}, {event.city}
          </span>
        </div>

        <div className="er-event-features">
          <span>
            <UtensilsCrossed size={14} />
            Food Included
          </span>

          <span>
            <Music2 size={14} />
            Live Music
          </span>

          <span>
            <Wine size={14} />
            BYOB
          </span>
        </div>

        <div className="er-event-bottom">
          <div className="er-event-price">
            <small>PRICE PER PERSON</small>

            <strong>
              ₹{event.price.toLocaleString("en-IN")}
            </strong>

            <span>Veg & non-veg food included</span>
          </div>
<Link
  to={`/events/${event.id}`}
  className="er-event-book"
>
  View Event Details
  <ArrowUpRight size={16} />
</Link>
        </div>

      </div>
    </article>
  );
}

export default function Events() {
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(
    params.get("category") || ""
  );
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("soonest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const city = params.get("city") || "";
  const selectedDate = params.get("date") || "";

  useEffect(() => {
    setQuery(params.get("q") || "");
    setCategory(params.get("category") || "");
  }, [params]);

  const filteredEvents = useMemo(() => {
    let list = [...approvedEvents];
    const q = query.trim().toLowerCase();

    if (q) {
      list = list.filter((event) =>
        [
          event.title,
          event.subtitle,
          event.organizer,
          event.category,
          event.city,
          event.venue,
          event.description,
          ...event.features,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (category) {
      list = list.filter(
        (event) => event.category === category
      );
    }

    if (city && city !== "All cities") {
      list = list.filter(
        (event) =>
          event.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (selectedDate) {
      list = list.filter(
        (event) => event.date === selectedDate
      );
    }

    if (price === "free") {
      list = list.filter((event) => event.price === 0);
    }

    if (price === "under500") {
      list = list.filter((event) => event.price <= 500);
    }

    if (price === "500plus") {
      list = list.filter((event) => event.price > 500);
    }

    if (sort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    }

    if (sort === "soonest") {
      list.sort((a, b) => a.date.localeCompare(b.date));
    }

    return list;
  }, [query, category, price, sort, city, selectedDate]);

  const applySearch = (e) => {
    e.preventDefault();

    const next = new URLSearchParams(params);

    if (query.trim()) {
      next.set("q", query.trim());
    } else {
      next.delete("q");
    }

    if (category) {
      next.set("category", category);
    } else {
      next.delete("category");
    }

    setParams(next, { replace: true });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setPrice("all");
    setSort("soonest");
    setParams(new URLSearchParams(), { replace: true });
  };

  const hasFilters =
    Boolean(query.trim()) ||
    Boolean(category) ||
    Boolean(city && city !== "All cities") ||
    Boolean(selectedDate) ||
    price !== "all";

  return (
    <main className="er-events-page">

      {/* ======================================
          HERO
      ====================================== */}

      <section className="er-events-hero">
        <div className="er-events-hero-bg" />

        <div className="page-wrap er-events-hero-inner">

          <span className="er-events-eyebrow">
            <Sparkles size={14} />
            YOUR CITY. YOUR SCENE.
          </span>

          <h1>
            Discover your{" "}
            <span>next experience.</span>
          </h1>

          <p>
            Live music, unforgettable evenings and
            experiences worth showing up for.
          </p>

          <nav
            className="er-events-breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <span>/</span>
            <strong>Events</strong>
          </nav>

        </div>
      </section>

      {/* ======================================
          SEARCH BAR
      ====================================== */}

      <section className="er-events-search-section">
        <div className="page-wrap">

          <form
            className="er-events-searchbar"
            onSubmit={applySearch}
            role="search"
          >
            <Search size={20} />

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, artists or venues..."
              aria-label="Search events"
            />

            <button type="submit">
              Search events
              <ArrowRight size={17} />
            </button>
          </form>

        </div>
      </section>

      {/* ======================================
          EVENTS LISTING
      ====================================== */}

      <section className="er-events-list-section">
        <div className="page-wrap">

          <div className="er-events-section-head">
            <div>
              <span className="er-events-kicker">
                <Ticket size={14} />
                EXPLORE EVENTS
              </span>

              <h2>
                What's happening{" "}
                <span>in Nashik.</span>
              </h2>

              <p>
                Discover real event listings,
                with more experiences coming soon.
              </p>
            </div>

            <div className="er-events-count">
              <span className="er-events-pulse" />
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1
                ? "event found"
                : "events found"}
            </div>
          </div>

          {/* MOBILE FILTER TOGGLE */}

          <button
            type="button"
            className="er-filter-toggle"
            onClick={() =>
              setFiltersOpen((previous) => !previous)
            }
            aria-expanded={filtersOpen}
          >
            <Filter size={17} />
            Filters
            {filtersOpen ? (
              <X size={17} />
            ) : (
              <SlidersHorizontal size={17} />
            )}
          </button>

          <div className="er-events-layout">

            {/* FILTER SIDEBAR */}

            <aside
              className={`er-events-sidebar ${
                filtersOpen ? "is-open" : ""
              }`}
            >
              <div className="er-sidebar-title">
                <Filter size={17} />
                <h3>Filter Events</h3>
              </div>

              <div className="er-filter-group">
                <label htmlFor="er-category">
                  Event category
                </label>

                <select
                  id="er-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option value="">All categories</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="er-filter-group">
                <legend>Ticket price</legend>

                {[
                  ["all", "Any price"],
                  ["free", "Free events"],
                  ["under500", "Up to ₹500"],
                  ["500plus", "Above ₹500"],
                ].map(([value, label]) => (
                  <label
                    className="er-filter-radio"
                    key={value}
                  >
                    <input
                      type="radio"
                      name="ticket-price"
                      value={value}
                      checked={price === value}
                      onChange={() => setPrice(value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>

              <div className="er-filter-help">
                <CheckCircle2 size={18} />
                <p>
                  More listings will appear as new
                  events are approved and published.
                </p>
              </div>

              <button
                type="button"
                className="er-clear-filters"
                onClick={clearFilters}
              >
                Clear all filters
              </button>

            </aside>

            {/* MAIN RESULTS */}

            <div className="er-events-results">

              <div className="er-events-results-header">
                <span>
                  {filteredEvents.length === 1
                    ? "1 experience to discover"
                    : `${filteredEvents.length} experiences to discover`}
                </span>

                <label className="er-sort-select">
                  <SlidersHorizontal size={15} />

                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value)
                    }
                    aria-label="Sort events"
                  >
                    <option value="soonest">
                      Date: soonest
                    </option>
                    <option value="price-low">
                      Price: low to high
                    </option>
                    <option value="price-high">
                      Price: high to low
                    </option>
                  </select>
                </label>
              </div>

              {filteredEvents.length > 0 ? (
                <div className="er-events-grid">
                  {filteredEvents.map((event) => (
                    <EventListingCard
                      key={event.id}
                      event={event}
                    />
                  ))}
                </div>
              ) : (
                <div className="er-events-empty">
                  <Search size={32} />

                  <h3>No matching events found</h3>

                  <p>
                    {hasFilters
                      ? "Try clearing your filters to see available events."
                      : "New event listings will appear here soon."}
                  </p>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                    >
                      Show all events
                    </button>
                  )}
                </div>
              )}

              <div className="er-events-disclaimer">
                <CheckCircle2 size={16} />
                <p>
                  Pass enquiries for The Mehfil are
                  currently handled directly by its
                  organizer. Tixwix does not
                  collect payment or issue tickets for
                  this listing.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
