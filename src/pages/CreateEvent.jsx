
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ImagePlus,
  Plus,
  Trash2,
  MapPin,
  Ticket,
  UploadCloud,
  X,
} from "lucide-react";

import { categories } from "../data/events.js";
import "./CreateEvent.css";
import "./CreateEventPasses.css";

const initialForm = {
  name: "",
  category: "",
  city: "Nashik",
  date: "",
  venue: "",
  email: "",
  description: "",
};

const ENTRY_TYPES = ["Single entry", "Re-entry allowed", "Multi-day pass", "Wristband pass", "Other"];
const makePass = (id) => ({ id, name: "", price: "0", quantity: "", entryType: "Single entry", customEntry: "" });

const formatDate = (value) => {
  if (!value) return "Date to be announced";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function CreateEvent() {
  const [form, setForm] = useState(initialForm);
  const [passes, setPasses] = useState([makePass(1)]);
  const [nextPassId, setNextPassId] = useState(2);

  const updatePass = (id, key, value) => {
    setPasses((previous) => previous.map((pass) =>
      pass.id === id ? { ...pass, [key]: value } : pass
    ));
    setMessage("");
  };

  const addPass = () => {
    setPasses((previous) => [...previous, makePass(nextPassId)]);
    setNextPassId((id) => id + 1);
    setMessage("");
  };

  const removePass = (id) => {
    setPasses((previous) => previous.length > 1
      ? previous.filter((pass) => pass.id !== id) : previous);
    setMessage("");
  };

  const prices = passes.filter((pass) => pass.price !== "" && Number.isFinite(Number(pass.price)))
    .map((pass) => Number(pass.price));
  const startingPrice = prices.length ? Math.min(...prices) : null;
  const [poster, setPoster] = useState("");
  const [posterName, setPosterName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      if (poster) URL.revokeObjectURL(poster);
    };
  }, [poster]);

  const update = (key) => (event) => {
    setForm((previous) => ({
      ...previous,
      [key]: event.target.value,
    }));
    setMessage("");
  };

  const addPoster = (file) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Upload a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("The poster must be smaller than 5 MB.");
      return;
    }

    setPoster(URL.createObjectURL(file));
    setPosterName(file.name);
    setMessage("");
  };

  const removePoster = () => {
    setPoster("");
    setPosterName("");
  };

  const submit = (event) => {
    event.preventDefault();

    // Frontend demo only. No organizer account,
    // upload service or event database is connected.
    setMessage(
      "Your event details are ready for review. Sign-in, secure draft saving and admin submission will be connected in the backend phase."
    );
  };

  return (
    <main className="create-page">
      {/* COMPACT HEADER */}
      <section className="create-hero">
        <div className="page-wrap">
          <span className="create-eyebrow">
            <Ticket size={15} />
            FOR EVENT ORGANIZERS
          </span>

          <h1>
            Bring your <span>event to life.</span>
          </h1>

          <p>
            Add your event details, upload a poster
            and see how your listing will appear.
          </p>
        </div>
      </section>

      <section className="create-content">
        <div className="page-wrap create-layout">

          {/* LEFT: EVENT FORM */}
          <form
            className="create-form"
            onSubmit={submit}
          >
            <div className="create-form-heading">
              <div>
                <span className="create-eyebrow">
                  EVENT SETUP / 01
                </span>
                <h2>Create your event</h2>
              </div>
              <small>* Required</small>
            </div>

            <div className="create-field">
              <label htmlFor="create-name">
                Event name *
              </label>
              <input
                id="create-name"
                required
                maxLength={100}
                value={form.name}
                onChange={update("name")}
                placeholder="Give your event a memorable name"
              />
            </div>

            <div className="create-field-row">
              <div className="create-field">
                <label htmlFor="create-category">
                  Category *
                </label>
                <select
                  id="create-category"
                  required
                  value={form.category}
                  onChange={update("category")}
                >
                  <option value="">Choose a category</option>
                  {categories.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create-field">
                <label htmlFor="create-city">
                  City *
                </label>
                <input
                  id="create-city"
                  required
                  value={form.city}
                  onChange={update("city")}
                  placeholder="Event city"
                />
              </div>
            </div>

            <div className="create-field-row">
              <div className="create-field">
                <label htmlFor="create-date">
                  Event date *
                </label>
                <input
                  id="create-date"
                  type="date"
                  required
                  min={new Date().toLocaleDateString("en-CA")}
                  value={form.date}
                  onChange={update("date")}
                />
              </div>

              <div className="create-field">
                <label htmlFor="create-venue">
                  Venue or location *
                </label>
                <input
                  id="create-venue"
                  required
                  value={form.venue}
                  onChange={update("venue")}
                  placeholder="Venue / area"
                />
              </div>
            </div>

            <div className="create-field">
              <label htmlFor="create-email">Organizer email *</label>
              <input
                id="create-email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
              />
            </div>

            {/* TICKETS & PASSES */}
            <div className="create-passes-section">
              <div className="create-passes-heading">
                <div>
                  <span className="create-eyebrow">TICKETING / 02</span>
                  <h3>Tickets &amp; passes</h3>
                  <p>Start with one pass. Add more only if your event needs them.</p>
                </div>
                <Ticket size={21} aria-hidden="true" />
              </div>

              {passes.map((pass, index) => (
                <div className="create-pass-card" key={pass.id}>
                  <div className="create-pass-card-head">
                    <strong>Pass {index + 1}</strong>
                    {passes.length > 1 && (
                      <button className="create-pass-remove" type="button" onClick={() => removePass(pass.id)}>
                        <Trash2 size={15} /> Remove
                      </button>
                    )}
                  </div>
                  <div className="create-field-row">
                    <div className="create-field">
                      <label htmlFor={`pass-name-${pass.id}`}>Pass name *</label>
                      <input
                        id={`pass-name-${pass.id}`}
                        placeholder="e.g. General, VIP, Early Bird"
                        maxLength={60}
                        value={pass.name}
                        onChange={(e) => updatePass(pass.id, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="create-field">
                      <label htmlFor={`pass-price-${pass.id}`}>Price (₹) *</label>
                      <input
                        id={`pass-price-${pass.id}`}
                        type="number" min="0" step="1" required
                        value={pass.price}
                        onChange={(e) => updatePass(pass.id, "price", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="create-field-row">
                    <div className="create-field">
                      <label htmlFor={`pass-quantity-${pass.id}`}>Available passes *</label>
                      <input
                        id={`pass-quantity-${pass.id}`}
                        type="number" min="1" step="1" required
                        placeholder="e.g. 100"
                        value={pass.quantity}
                        onChange={(e) => updatePass(pass.id, "quantity", e.target.value)}
                      />
                    </div>
                    <div className="create-field">
                      <label htmlFor={`pass-entry-${pass.id}`}>Entry type *</label>
                      <select
                        id={`pass-entry-${pass.id}`}
                        value={pass.entryType}
                        onChange={(e) => updatePass(pass.id, "entryType", e.target.value)}
                      >
                        {ENTRY_TYPES.map((name) => <option key={name} value={name}>{name}</option>)}
                      </select>
                    </div>
                  </div>
                  {pass.entryType === "Other" && (
                    <div className="create-field create-custom-entry">
                      <label htmlFor={`pass-custom-${pass.id}`}>Describe your custom entry type *</label>
                      <input
                        id={`pass-custom-${pass.id}`}
                        required maxLength={80}
                        placeholder="e.g. Weekend camping access"
                        value={pass.customEntry}
                        onChange={(e) => updatePass(pass.id, "customEntry", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}

              <button className="create-add-pass" type="button" onClick={addPass}>
                <Plus size={18} /> Add another pass
              </button>
            </div>

            {/* POSTER UPLOAD */}
            <div className="create-field">
              <label htmlFor="create-poster">
                Event poster / cover image
              </label>

              <div
                className={`create-upload ${
                  dragging ? "is-dragging" : ""
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  addPoster(e.dataTransfer.files[0]);
                }}
              >
                <input
                  id="create-poster"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    addPoster(e.target.files[0]);
                    e.target.value = "";
                  }}
                />

                <UploadCloud size={27} />
                <strong>
                  {posterName || "Drop your poster here"}
                </strong>
                <span>or click to browse</span>
                <small>
                  JPG, PNG or WebP · Max 5 MB
                </small>
              </div>

              {poster && (
                <button
                  className="create-remove"
                  type="button"
                  onClick={removePoster}
                >
                  <X size={14} /> Remove image
                </button>
              )}
            </div>

            <div className="create-field">
              <label htmlFor="create-description">
                Tell people what makes it special
              </label>
              <textarea
                id="create-description"
                rows={4}
                maxLength={1500}
                value={form.description}
                onChange={update("description")}
                placeholder="What will attendees experience?"
              />
            </div>

            <button
              className="create-submit"
              type="submit"
            >
              Review event details
              <ArrowUpRight size={18} />
            </button>

            {message && (
              <p className="create-message" role="status">
                {message}
              </p>
            )}

            <small className="create-disclaimer">
              Frontend preview only. Events are not yet
              saved or submitted to the admin.
            </small>
          </form>

          {/* RIGHT: LIVE PREVIEW */}
          <aside className="create-preview-column">
            <div className="create-preview-heading">
              <span className="create-eyebrow">
                <ImagePlus size={15} />
                LIVE EVENT PREVIEW
              </span>
              <p>
                This is how your event could appear
                to visitors.
              </p>
            </div>

            <div className="create-preview-card">
              <div className="create-preview-image">
                {poster ? (
                  <img
                    src={poster}
                    alt="Uploaded event cover preview"
                  />
                ) : (
                  <div className="create-preview-placeholder">
                    <Ticket size={50} strokeWidth={1.2} />
                    <span>Tixwix</span>
                    <strong>YOUR EVENT. YOUR CROWD.</strong>
                    <small>Upload your event cover</small>
                  </div>
                )}

                <span className="create-preview-tag">
                  {form.category || "Event category"}
                </span>
              </div>

              <div className="create-preview-body">
                <span className="create-preview-date">
                  <CalendarDays size={14} />
                  {formatDate(form.date)}
                </span>

                <h3>{form.name || "Your event name"}</h3>

                <p className="create-preview-location">
                  <MapPin size={14} />
                  {form.venue || "Event venue"},{" "}
                  {form.city || "City"}
                </p>

                {form.description && (
                  <p className="create-preview-description">
                    {form.description}
                  </p>
                )}

                <div className="create-preview-passes">
                  <strong>Ticket options</strong>
                  {passes.map((pass, index) => (
                    <div className="create-preview-pass" key={pass.id}>
                      <div>
                        <b>{pass.name.trim() || `Pass ${index + 1}`}</b>
                        <small>{pass.entryType === "Other"
                          ? (pass.customEntry.trim() || "Custom entry")
                          : pass.entryType}</small>
                      </div>
                      <span>{pass.price === "" ? "—" : Number(pass.price) === 0
                        ? "Free" : `₹${Number(pass.price).toLocaleString("en-IN")}`}</span>
                    </div>
                  ))}
                </div>

                <div className="create-preview-bottom">
                  <div>
                    <small>Starting from</small>
                    <strong>
                      {startingPrice === null
                        ? "Add a pass price"
                        : startingPrice === 0
                          ? "Free"
                          : `₹${startingPrice.toLocaleString("en-IN")}`}
                    </strong>
                  </div>
                  <span>
                    View event <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>

            <div className="create-preview-note">
              <CheckCircle2 size={18} />
              <p>
                Your listing will be visible to the public
                only after organizer authentication and
                admin approval are implemented.
              </p>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}
