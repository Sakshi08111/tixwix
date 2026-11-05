import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import Categories from "./pages/Categories.jsx";

import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import OrganizerDashboard from "./pages/OrganizerDashboard";

import EmailVerified from "./pages/EmailVerified";

import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/categories" element={<Categories />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/events/the-mehfil-2026" element={<EventDetails />} />
          <Route path="/auth/confirmed" element={<EmailVerified />} />
          <Route
  path="/organizer/dashboard"
  element={<OrganizerDashboard />}
/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
