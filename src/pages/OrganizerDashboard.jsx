import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Bell, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronRight, CircleAlert, Clock3, Copy, Edit3,
  Eye, FileText, ImagePlus, IndianRupee, LayoutDashboard, LogOut,
  MapPin, Menu, Plus, ScanLine, Search, Settings2, ShieldCheck,
  Smartphone, Sparkles, Ticket, Trash2, UploadCloud, UserRound,
  UsersRound, Wallet, X,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import "./OrganizerDashboard.css";

// Startup UI only: drafts are saved in THIS browser, not in Supabase.
// No bookings, payments, public event publishing or QR validation are simulated.
const STORAGE_KEY = "heyeve_organizer_local_drafts_v1";
const EMPTY_EVENT = {
  title: "", category: "Music & Concerts", description: "", venue: "",
  city: "Nashik", date: "", time: "", endTime: "", capacity: "",
  ticketName: "General Admission", price: "", instructions: "",
};
const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "events", label: "My Events", Icon: CalendarDays },
  { id: "create", label: "Create Event", Icon: Plus },
  { id: "bookings", label: "Bookings", Icon: Ticket },
  { id: "scanner", label: "QR Scanner", Icon: ScanLine },
];
const CATEGORIES = [
  "Music & Concerts", "Nightlife & Parties", "Comedy & Theatre",
  "Food & Drinks", "Sports & Outdoors", "Workshops", "Community & Meetups", "Other",
];

function readDrafts(userId) {
  try {
    const parsed = JSON.parse(localStorage.getItem(`${STORAGE_KEY}_${userId}`) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function saveDrafts(userId, drafts) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(drafts));
    return true;
  } catch {
    return false;
  }
}
function dateLabel(value) {
  if (!value) return "Date not selected";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function money(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value) || 0);
}
function initials(value = "Organizer") {
  return value.trim().split(/\s+/).slice(0, 2).map((x) => x.charAt(0)).join("").toUpperCase() || "O";
}
function EmptyState({ Icon, title, text, action }) {
  return (
    <div className="org-empty">
      <span className="org-empty-icon"><Icon size={27} /></span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}

export default function OrganizerDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(EMPTY_EVENT);
  const [editingId, setEditingId] = useState(null);
  const [poster, setPoster] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: "", organization_name: "", phone: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const fileRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    let alive = true;
    async function loadAccount() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!data.user) {
          navigate("/login", { replace: true });
          return;
        }
        const { data: profileData, error: profileError } = await supabase
          .from("organizer_profiles")
          .select("id,full_name,email,organization_name,phone,created_at")
          .eq("id", data.user.id)
          .single();
        if (profileError) throw profileError;
        if (!alive) return;
        setUser(data.user);
        setProfile(profileData);
        setProfileForm({
          full_name: profileData.full_name || "",
          organization_name: profileData.organization_name || "",
          phone: profileData.phone || "",
        });
        setDrafts(readDrafts(data.user.id));
      } catch (error) {
        if (alive) setAuthError(error.message || "Unable to load organizer account.");
      } finally {
        if (alive) setLoading(false);
      }
    }
    loadAccount();
    return () => { alive = false; };
  }, [navigate]);

  useEffect(() => {
    if (!feedback) return;
    messageRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  }, [feedback]);

  const visibleDrafts = useMemo(() => drafts.filter((event) =>
    `${event.title} ${event.venue} ${event.city}`.toLowerCase().includes(search.trim().toLowerCase())
  ), [drafts, search]);

  const show = (section) => {
    setActive(section);
    setMenuOpen(false);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const change = (event) => setForm((old) => ({ ...old, [event.target.name]: event.target.value }));
  const resetEvent = () => { setForm(EMPTY_EVENT); setEditingId(null); setPoster(null); if (fileRef.current) fileRef.current.value = ""; };
  const newEvent = () => { resetEvent(); show("create"); };
  const editEvent = (event) => {
    setForm({ ...EMPTY_EVENT, ...event });
    setEditingId(event.id);
    setPoster(null);
    show("create");
  };
  const selectPoster = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setFeedback({ type: "error", text: "Please select an image file." });
    if (file.size > 5 * 1024 * 1024) return setFeedback({ type: "error", text: "Please choose an image under 5 MB." });
    const reader = new FileReader();
    reader.onload = () => setPoster(String(reader.result || ""));
    reader.readAsDataURL(file);
  };
  const storeEvent = (event) => {
    event.preventDefault();
    setFeedback(null);
    if (!form.title.trim() || !form.venue.trim() || !form.date || !form.time) {
      return setFeedback({ type: "error", text: "Please complete the event title, date, time and venue." });
    }
    if (form.capacity && Number(form.capacity) <= 0) return setFeedback({ type: "error", text: "Capacity must be greater than zero." });
    const id = editingId || (crypto?.randomUUID?.() || `draft-${Date.now()}`);
    const now = new Date().toISOString();
    // Images are intentionally NOT persisted here: large image data would fill browser storage.
    // Event posters will be uploaded to Supabase Storage when backend integration is added.
    const record = { ...form, id, status: "Local draft", updatedAt: now };
    const next = editingId ? drafts.map((item) => item.id === editingId ? record : item) : [record, ...drafts];
    if (!saveDrafts(user.id, next)) return setFeedback({ type: "error", text: "This browser could not save the draft. Check your storage settings." });
    setDrafts(next);
    resetEvent();
    show("events");
    setFeedback({ type: "success", text: "Saved as a local draft. It is not submitted or visible to customers yet." });
  };
  const deleteDraft = (id) => {
    if (!window.confirm("Delete this local draft? This cannot be undone.")) return;
    const next = drafts.filter((item) => item.id !== id);
    if (!saveDrafts(user.id, next)) return setFeedback({ type: "error", text: "Couldn't delete draft from browser storage." });
    setDrafts(next);
    setFeedback({ type: "success", text: "Local draft deleted." });
  };
  const saveProfile = async (event) => {
    event.preventDefault();
    setFeedback(null);
    if (!profileForm.full_name.trim() || !profileForm.organization_name.trim()) {
      return setFeedback({ type: "error", text: "Full name and organization name are required." });
    }
    setProfileSaving(true);
    const values = {
      full_name: profileForm.full_name.trim(),
      organization_name: profileForm.organization_name.trim(),
      phone: profileForm.phone.trim(),
    };
    const { error } = await supabase.from("organizer_profiles").update(values).eq("id", user.id);
    setProfileSaving(false);
    if (error) return setFeedback({ type: "error", text: error.message });
    setProfile((old) => ({ ...old, ...values }));
    setFeedback({ type: "success", text: "Profile updated successfully." });
  };
  const signOut = async () => {
    setSaving(true);
    const { error } = await supabase.auth.signOut();
    setSaving(false);
    if (error) return setFeedback({ type: "error", text: error.message });
    navigate("/login", { replace: true });
  };
  const displayName = profile?.full_name?.trim() || user?.email?.split("@")[0] || "Organizer";
  const firstName = displayName.split(/\s+/)[0];
  const orgName = profile?.organization_name?.trim() || "My Organization";

  if (loading) return <main className="org-gate"><span className="org-loader" /><p>Opening your organizer workspace…</p></main>;
  if (authError) return (
    <main className="org-gate"><CircleAlert size={35} /><h2>Unable to open dashboard</h2><p>{authError}</p>
      <div className="org-gate-actions"><button className="org-btn org-btn-primary" onClick={() => window.location.reload()}>Try again</button><Link to="/login" className="org-btn org-btn-secondary">Go to Login</Link></div>
    </main>
  );

  return (
    <div className="org-app">
      <aside className={`org-sidebar ${menuOpen ? "org-sidebar-open" : ""}`}>
        <div className="org-sidebar-top">
          <Link className="org-logo" to="/" onClick={() => setMenuOpen(false)}>heyeve<span>.</span><small>ORGANIZER</small></Link>
          <button className="org-icon-btn org-sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <div className="org-sidebar-heading">WORKSPACE</div>
        <nav className="org-navigation" aria-label="Organizer navigation">
          {NAV.map(({ id, label, Icon }) => (
            <button key={id} type="button" className={`org-nav-link ${active === id ? "is-active" : ""}`} onClick={() => id === "create" ? newEvent() : show(id)}>
              <Icon size={19} strokeWidth={1.85} /><span>{label}</span>{id === "events" && drafts.length > 0 && <em>{drafts.length}</em>}
            </button>
          ))}
        </nav>
        <div className="org-sidebar-bottom">
          <button className={`org-nav-link ${active === "profile" ? "is-active" : ""}`} onClick={() => show("profile")}><Settings2 size={19} /><span>My Profile</span></button>
          <Link to="/" className="org-nav-link"><ArrowLeft size={19} /><span>Back to Website</span></Link>
          <div className="org-sidebar-user"><span className="org-avatar">{initials(displayName)}</span><div><strong>{displayName}</strong><small>{orgName}</small></div></div>
        </div>
      </aside>
      {menuOpen && <button className="org-mobile-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}

      <div className="org-main">
        <header className="org-topbar">
          <div className="org-topbar-left"><button className="org-icon-btn org-mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
            <div><span className="org-topbar-caption">ORGANIZER PORTAL</span><strong>{NAV.find((item) => item.id === active)?.label || "My Profile"}</strong></div>
          </div>
          <div className="org-topbar-right"><span className="org-topbar-organization">{orgName}</span><button className="org-topbar-avatar" onClick={() => show("profile")} title="My profile">{initials(displayName)}</button></div>
        </header>

        <main className="org-content">
          {feedback && <div ref={messageRef} role="status" className={`org-flash org-flash-${feedback.type}`}><span>{feedback.type === "success" ? <CheckCircle2 size={19}/> : <CircleAlert size={19}/>}</span><span>{feedback.text}</span><button onClick={() => setFeedback(null)} aria-label="Dismiss"><X size={17}/></button></div>}

          {active === "dashboard" && <>
            <div className="org-page-heading org-page-heading-main"><div><span className="org-eyebrow">YOUR EVENT WORKSPACE</span><h1>Welcome back, {firstName} <span className="org-wave">✦</span></h1><p>Everything you need to manage your events, in one place.</p></div><button className="org-btn org-btn-primary" onClick={newEvent}><Plus size={18}/> Create Event</button></div>
            <div className="org-hero-banner"><div><div className="org-hero-eyebrow"><Sparkles size={14}/> MAKE SOMETHING MEMORABLE</div><h2>Your next great event starts here.</h2><p>Create an event, set up your passes, and get ready to welcome your audience.</p><button className="org-btn org-btn-hero" onClick={newEvent}>Create your event <ArrowRight size={17}/></button></div><div className="org-hero-symbol" aria-hidden="true"><Ticket size={108} strokeWidth={0.9}/></div></div>
            <div className="org-stat-grid">
              <Stat Icon={CalendarDays} title="My Events" value={drafts.length.toString()} note="Local drafts" />
              <Stat Icon={Ticket} title="Tickets Sold" value="—" note="Available after launch" />
              <Stat Icon={IndianRupee} title="Total Sales" value="—" note="Connect payments first" />
            </div>
            <section className="org-panel"><div className="org-panel-heading"><div><h2>My Events</h2><p>Your most recent event drafts</p></div><button className="org-text-button" onClick={() => show("events")}>View all <ArrowRight size={16}/></button></div>
              {drafts.length ? <div className="org-event-list">{drafts.slice(0, 3).map((item) => <EventRow key={item.id} item={item} onEdit={() => editEvent(item)} onDelete={() => deleteDraft(item.id)} />)}</div> : <EmptyState Icon={CalendarDays} title="No events created yet" text="Your events will appear here once you create your first draft." action={<button className="org-btn org-btn-outline" onClick={newEvent}><Plus size={17}/> Create first event</button>} />}
            </section>
          </>}

          {active === "events" && <>
            <div className="org-page-heading"><div><span className="org-eyebrow">EVENT MANAGEMENT</span><h1>My Events</h1><p>Organize event details before submitting them for approval.</p></div><button className="org-btn org-btn-primary" onClick={newEvent}><Plus size={18}/> Create Event</button></div>
            <div className="org-panel"><div className="org-panel-heading"><div><h2>Event drafts <span className="org-count">{drafts.length}</span></h2><p>Drafts are stored only in this browser during development.</p></div>{drafts.length > 0 && <label className="org-search"><Search size={17}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events" aria-label="Search events" /></label>}</div>
              {visibleDrafts.length ? <div className="org-event-list">{visibleDrafts.map((item) => <EventRow key={item.id} item={item} onEdit={() => editEvent(item)} onDelete={() => deleteDraft(item.id)} />)}</div> : <EmptyState Icon={CalendarDays} title={drafts.length ? "No matching events" : "Your event list is empty"} text={drafts.length ? "Try a different search term." : "Start with your first event. It will remain private until we connect admin approval."} action={!drafts.length && <button className="org-btn org-btn-outline" onClick={newEvent}><Plus size={17}/> Create Event</button>} />}
            </div>
          </>}

          {active === "create" && <>
            <div className="org-page-heading"><div><span className="org-eyebrow">EVENT BUILDER</span><h1>{editingId ? "Edit Event" : "Create Event"}</h1><p>Add the basic details first. You can finish your event before publishing.</p></div><button className="org-btn org-btn-secondary" onClick={() => show("events")}><ArrowLeft size={17}/> My Events</button></div>
            <div className="org-build-layout"><form id="org-event-form" className="org-build-form" onSubmit={storeEvent}>
              <section className="org-panel org-form-panel"><div className="org-section-heading"><span className="org-step-number">01</span><div><h2>Event details</h2><p>Tell people what your event is about</p></div></div>
                <div className="org-fields"><Field label="Event name" required><input name="title" value={form.title} onChange={change} maxLength={90} required placeholder="e.g. The Mehfil — Live Music Night" /></Field>
                <Field label="Category" required><select name="category" value={form.category} onChange={change}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></Field>
                <Field label="Description"><textarea name="description" value={form.description} onChange={change} maxLength={1800} rows={4} placeholder="Describe the highlights, atmosphere, and what guests can expect." /></Field>
                </div>
              </section>
              <section className="org-panel org-form-panel"><div className="org-section-heading"><span className="org-step-number">02</span><div><h2>Date & location</h2><p>When and where will it happen?</p></div></div>
                <div className="org-fields"><div className="org-two-col"><Field label="Event date" required><input name="date" type="date" value={form.date} onChange={change} required /></Field><Field label="Start time" required><input name="time" type="time" value={form.time} onChange={change} required /></Field></div>
                <div className="org-two-col"><Field label="End time (optional)"><input name="endTime" type="time" value={form.endTime} onChange={change}/></Field><Field label="City"><input name="city" value={form.city} onChange={change} placeholder="Nashik" /></Field></div>
                <Field label="Venue / complete address" required><input name="venue" value={form.venue} onChange={change} maxLength={220} placeholder="Venue name, area and location" required /></Field></div>
              </section>
              <section className="org-panel org-form-panel"><div className="org-section-heading"><span className="org-step-number">03</span><div><h2>Tickets & passes</h2><p>Set up your first pass type</p></div></div>
                <div className="org-fields"><div className="org-two-col"><Field label="Pass name"><input name="ticketName" value={form.ticketName} onChange={change} placeholder="General Admission" /></Field><Field label="Price (₹)"><input name="price" type="number" min="0" step="1" value={form.price} onChange={change} placeholder="999" /></Field></div>
                <Field label="Total capacity"><input name="capacity" type="number" min="1" step="1" value={form.capacity} onChange={change} placeholder="e.g. 150" /></Field>
                <p className="org-help"><CircleAlert size={15}/> Multiple pass types, inventory and payment rules will be added with the booking backend.</p></div>
              </section>
              <section className="org-panel org-form-panel"><div className="org-section-heading"><span className="org-step-number">04</span><div><h2>Poster & additional info</h2><p>Give your event its finishing touches</p></div></div>
                <div className="org-fields"><label className="org-upload"><input ref={fileRef} type="file" accept="image/*" onChange={selectPoster}/>{poster ? <img src={poster} alt="Poster preview" className="org-upload-preview" /> : <><UploadCloud size={28}/><strong>Choose an event poster</strong><span>JPG or PNG • maximum 5 MB • preview only</span></>}</label>
                <Field label="Important instructions (optional)"><textarea name="instructions" value={form.instructions} onChange={change} rows={3} placeholder="Age restrictions, dress code, entry instructions, etc." /></Field>
                <p className="org-help"><CircleAlert size={15}/> Poster previews are not uploaded or saved yet. Connect Supabase Storage before submitting real events.</p></div>
              </section>
              <div className="org-form-actions"><button type="button" className="org-btn org-btn-secondary" onClick={() => show("events")}>Cancel</button><button className="org-btn org-btn-primary" type="submit"><Check size={18}/>{editingId ? "Save Changes" : "Save Local Draft"}</button></div>
            </form><aside className="org-builder-aside"><div className="org-panel org-preview-card"><div className="org-preview-cover">{poster ? <img src={poster} alt="Event poster" /> : <ImagePlus size={44}/>}</div><div className="org-preview-body"><span className="org-preview-label">LIVE PREVIEW</span><h3>{form.title || "Your event title"}</h3><p><CalendarDays size={15}/>{dateLabel(form.date)}{form.time ? ` • ${form.time}` : ""}</p><p><MapPin size={15}/>{form.venue || "Event venue"}</p><strong>{form.price === "" ? "Set ticket price" : money(form.price)}</strong></div></div><div className="org-builder-tip"><ShieldCheck size={20}/><div><strong>Drafts are private</strong><p>These are local previews. Public publishing and admin approval will be added with the backend.</p></div></div></aside></div>
          </>}

          {active === "bookings" && <><div className="org-page-heading"><div><span className="org-eyebrow">GUEST MANAGEMENT</span><h1>Bookings</h1><p>View attendees and their ticket details when booking goes live.</p></div></div><div className="org-stat-grid org-stat-grid-two"><Stat Icon={Ticket} title="Confirmed Bookings" value="—" note="Not connected"/><Stat Icon={UsersRound} title="Total Attendees" value="—" note="Not connected"/></div><section className="org-panel"><div className="org-panel-heading"><div><h2>Booking records</h2><p>Search, check-in status, and exports will appear here.</p></div></div><EmptyState Icon={Ticket} title="Bookings will appear here" text="Once the payment and ticketing backend is connected, confirmed customers and tickets will appear automatically." /></section></>}

          {active === "scanner" && <><div className="org-page-heading"><div><span className="org-eyebrow">EVENT ENTRY</span><h1>QR Scanner</h1><p>Check tickets at the entrance and prevent duplicate entry.</p></div></div><div className="org-scanner-layout"><section className="org-panel org-scanner-panel"><span className="org-scanner-frame"><ScanLine size={72}/></span><h2>Ticket scanner</h2><p>The scanner UI is ready. Secure QR validation will be enabled after ticket issuance and the booking API are connected.</p><button className="org-btn org-btn-secondary" type="button" disabled><ScanLine size={18}/> Start Scanning — Coming Soon</button></section><section className="org-panel org-scanner-guide"><h2>How entry validation will work</h2>{[{n:"01",t:"Select your event",d:"Choose the event you are checking guests into."},{n:"02",t:"Scan a QR ticket",d:"Use the phone camera or desktop scanner."},{n:"03",t:"Verify instantly",d:"Valid tickets are marked used; duplicates and invalid tickets are rejected."}].map((step)=><div key={step.n} className="org-guide-step"><span>{step.n}</span><div><strong>{step.t}</strong><p>{step.d}</p></div></div>)}<div className="org-safe-note"><ShieldCheck size={17}/> Validation must happen on the server so the same QR cannot be used twice.</div></section></div></>}

          {active === "profile" && <><div className="org-page-heading"><div><span className="org-eyebrow">ACCOUNT SETTINGS</span><h1>My Profile</h1><p>Manage the contact details for your organizer account.</p></div></div><div className="org-profile-layout"><section className="org-panel org-profile-panel"><div className="org-profile-head"><span className="org-profile-avatar">{initials(displayName)}</span><div><h2>{displayName}</h2><p>{orgName}</p><span className="org-profile-verified"><ShieldCheck size={14}/> Organizer Account</span></div></div><form onSubmit={saveProfile} className="org-fields"><Field label="Full name" required><input value={profileForm.full_name} required onChange={(e)=>setProfileForm((x)=>({...x,full_name:e.target.value}))}/></Field><Field label="Organization / Event company" required><input value={profileForm.organization_name} required onChange={(e)=>setProfileForm((x)=>({...x,organization_name:e.target.value}))}/></Field><Field label="Email address"><input value={user.email || ""} disabled/><small className="org-field-hint">Email is managed by Supabase Authentication.</small></Field><Field label="Contact number"><input value={profileForm.phone} onChange={(e)=>setProfileForm((x)=>({...x,phone:e.target.value}))}/></Field><button className="org-btn org-btn-primary" type="submit" disabled={profileSaving}>{profileSaving ? "Saving…" : "Save Profile"}<ArrowRight size={17}/></button></form></section><section className="org-panel org-account-panel"><h2>Account</h2><p>Signed in as</p><strong>{user.email}</strong><div className="org-account-divider"/><button className="org-btn org-btn-danger" onClick={signOut} disabled={saving}><LogOut size={17}/>{saving ? "Signing out…" : "Log Out"}</button><Link to="/" className="org-back-site">Back to Tixwix <ArrowRight size={16}/></Link></section></div></>}
        </main>
        <footer className="org-footer"><span>© Tixwix • Organizer Workspace</span><span>Made for better events.</span></footer>
      </div>
    </div>
  );
}

function Field({ label, children, required }) { return <div className="org-field"><label>{label} {required && <span>*</span>}</label>{children}</div>; }
function Stat({ Icon, title, value, note }) { return <div className="org-stat"><span className="org-stat-icon"><Icon size={20}/></span><div><p>{title}</p><strong>{value}</strong><small>{note}</small></div></div>; }
function EventRow({ item, onEdit, onDelete }) { return <div className="org-event-row"><span className="org-event-thumb"><CalendarDays size={23}/></span><div className="org-event-info"><h3>{item.title}</h3><p><CalendarDays size={14}/>{dateLabel(item.date)} <span>·</span> <MapPin size={14}/>{item.city || "Nashik"}</p></div><span className="org-status">Local draft</span><div className="org-event-actions"><button onClick={onEdit} aria-label={`Edit ${item.title}`} title="Edit"><Edit3 size={17}/></button><button onClick={onDelete} aria-label={`Delete ${item.title}`} title="Delete"><Trash2 size={17}/></button></div></div>; }
