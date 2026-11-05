import { ArrowUpRight, CalendarDays, MapPin, Ticket } from 'lucide-react';
import './EventCard.css';

export default function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-image-wrap">
        <img src={event.image} alt="" className="event-image" loading="lazy" />
        <div className="event-image-shade" />
        <span className="event-tag">{event.tag}</span>
        <button className="event-save" aria-label={`Save ${event.title}`} onClick={() => window.alert('Sign in to save events — account features will be connected later.')}><span>♡</span></button>
        <div className="event-date-float"><CalendarDays size={14} /><span>{event.date}</span></div>
      </div>
      <div className="event-card-body">
        <span className="event-category">{event.category}</span>
        <h3>{event.title}</h3>
        <p className="event-description">{event.description}</p>
        <div className="event-meta"><MapPin size={14} /><span>{event.location}</span></div>
        <div className="event-card-bottom">
          <div><small>Tickets from</small><strong>{event.price === 0 ? 'Free' : `₹${event.price}`}</strong></div>
          <button className="event-arrow" aria-label={`View ${event.title}`} onClick={() => window.alert('Event detail and checkout pages will be wired up in the next development step.')}><ArrowUpRight size={18} /></button>
        </div>
      </div>
    </article>
  );
}
