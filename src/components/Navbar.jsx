
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, UserRound, Ticket } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="heyeve-navbar">
      <div className="heyeve-nav-container">

        <Link
          to="/"
          className="heyeve-nav-brand"
          onClick={closeMenu}
        >
          <span className="heyeve-nav-logo">
            <img src="/images/tixwix-ticket-icon.png" alt="" aria-hidden="true" />
          </span>

          <span className="heyeve-nav-brand-name">
            <img src="/images/tixwix-wordmark.png" alt="Tixwix" />
          </span>
        </Link>

        <nav
          className={`heyeve-nav-links ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `heyeve-nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="heyeve-organizer-btn"
            onClick={closeMenu}
          >
            <UserRound size={17} />
            <span>Organizer Login</span>
          </Link>
        </nav>

        <button
          type="button"
          className="heyeve-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
    </header>
  );
}
