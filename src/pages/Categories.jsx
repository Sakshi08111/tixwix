import { useNavigate, Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  BriefcaseBusiness,
  Clapperboard,
  Compass,
  Music2,
  Palette,
  Sparkles,
  Utensils,
  Users,
  Dumbbell,
  Mic2,
  CheckCircle2,
} from "lucide-react";

import { categories } from "../data/events.js";
import "./Categories.css";

const extras = [
  {
    title: "Comedy & Theatre",
    subtitle: "Laugh, watch, and feel the moment",
    icon: Mic2,
  },
  {
    title: "Sports & Outdoors",
    subtitle: "Move more, cheer louder",
    icon: Dumbbell,
  },
  {
    title: "Community & Meetups",
    subtitle: "Find people on your wavelength",
    icon: Users,
  },
];

const categoryImages = {
  "Music & Nightlife":
    "/images/categories-live-music.png",

  Workshops:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",

  "Business & Networking":
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",

  "Creator Events":
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85",

  "Food & Experiences":
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",

  "Festivals & Culture":
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",

  "Comedy & Theatre":
    "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=85",

  "Sports & Outdoors":
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",

  "Community & Meetups":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",
};

export default function Categories() {
  const navigate = useNavigate();
  const allCategories = [...categories, ...extras];

  const exploreCategory = (category) => {
    navigate(`/events?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="categories-page">
      {/* HERO */}
      <section className="categories-hero">
        <div className="categories-hero-overlay" aria-hidden="true" />

        <div className="page-wrap categories-hero-content">
          <div className="categories-hero-text">
            <span className="categories-hero-kicker">
              <Compass size={15} />
              FIND YOUR KIND OF EXPERIENCE
            </span>

            <h1>
              Explore <span>Categories.</span>
            </h1>

            <p>
              From live music to creative experiences, discover events that
              match your interests, your mood, and your kind of fun.
            </p>

            <nav className="categories-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Categories</strong>
            </nav>
          </div>
        </div>
      </section>

      {/* ABOUT CATEGORY SECTION */}
      <section className="categories-intro-section">
        <div className="page-wrap">
          <div className="categories-intro">
            <div className="category-photo-collage">
              <div className="category-photo-main">
                <img
                  src="/images/categories-live-music.png"
                  alt="People enjoying a live music event"
                  loading="lazy"
                />
              </div>

              <div className="category-photo-top">
                <img
                  src="/images/categories-workshop.png"
                  alt="People attending a conference"
                  loading="lazy"
                />
              </div>

              <div className="category-photo-bottom">
                <img
                  src="/images/categories-food-festival.png"
                  alt="Food and culinary experience"
                  loading="lazy"
                />
              </div>

              <div className="category-collage-sticker">
                <Sparkles size={20} />
                <span>
                  FIND YOUR
                  <br />
                  THING
                </span>
              </div>
            </div>

            <div className="categories-intro-copy">
              <span className="categories-section-label">
                <Sparkles size={15} />
                WHY EXPLORE BY CATEGORY?
              </span>

              <h2>
                Your interests.
                <br />
                <span className="gradient-text">Your experiences.</span>
              </h2>

              <p>
                Everyone enjoys something different. That’s why Tixwix
                organizes events into categories — so people can quickly
                discover what actually excites them.
              </p>

              <p>
                Whether you are into live music, creative workshops, food
                experiences, business networking or cultural events, categories
                help you find the right vibe faster.
              </p>

              <div className="category-intro-benefits">
                <span>
                  <CheckCircle2 size={16} />
                  Explore by interest
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Find better event matches
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Discover something new
                </span>
              </div>

              <button
                type="button"
                className="btn btn-primary category-intro-button"
                onClick={() => navigate("/events")}
              >
                Explore all events
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="categories-list-section">
        <div className="page-wrap">
          <div className="categories-list-heading">
            <div>
              <span className="categories-section-label">
                <Sparkles size={14} />
                DISCOVER YOUR PASSION
              </span>

              <h2>
                Find your <span className="gradient-text">kind of thing.</span>
              </h2>

              <p>
                Nine ways to explore unforgettable experiences. Choose what
                excites you.
              </p>
            </div>

            <span className="categories-total">
              {allCategories.length} Categories
            </span>
          </div>

          <div className="all-category-grid">
            {allCategories.map((item, index) => {
              return (
                <button
                  type="button"
                  key={item.title}
                  className={`all-category-card ${
                    index % 2 === 0 ? "tone-rose" : "tone-blue"
                  }`}
                  style={{
                    "--category-image": `url("${categoryImages[item.title]}")`,
                  }}
                  onClick={() => exploreCategory(item.title)}
                >
                  <span className="category-image-bg" aria-hidden="true" />
                  <span className="category-image-overlay" aria-hidden="true" />

                  <span className="all-category-top">
                    <span className="all-category-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>

                  <span className="all-category-details">
                    <span className="category-card-title">{item.title}</span>

                    <span className="category-card-description">
                      {item.subtitle}
                    </span>

                    <span className="category-card-button">
                      Explore category
                      <ArrowUpRight size={17} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="category-bottom-note">
            <div className="category-bottom-icon">
              <Sparkles size={22} />
            </div>

            <div className="category-bottom-copy">
              <strong>Don’t see your kind of event?</strong>
              <p>
                From intimate gatherings to large-scale festivals, there’s room
                for every great idea. Bring your event to Tixwix.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/create-event")}
            >
              List your event
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}