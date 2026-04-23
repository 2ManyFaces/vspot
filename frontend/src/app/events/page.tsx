import EventCard from '@/components/cards/EventCard';
import { Calendar, Play, Clock } from 'lucide-react';

async function getEvents() {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/events`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function EventsPage() {
  const { data } = await getEvents();
  const events = data || [];

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const ongoingEvents = events.filter((event: any) => {
    const startDate = new Date(event.event_date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = event.end_date ? new Date(event.end_date) : startDate;
    endDate.setHours(23, 59, 59, 999);
    return now >= startDate && now <= endDate;
  });

  const upcomingEvents = events.filter((event: any) => {
    const startDate = new Date(event.event_date);
    startDate.setHours(0, 0, 0, 0);
    return startDate > now;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full flex flex-col gap-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-500">
          <Calendar className="h-4 w-4" />
          The Pulse of Dhaka
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Explore Events
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
          From cultural festivals to underground gigs, stay updated with everything happening in the city.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="empty-state text-center py-20 rounded-2xl">
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>No events found. Check back later!</p>
        </div>
      ) : (
        <>
          {/* Ongoing Section */}
          {ongoingEvents.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Currently Ongoing
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Don't miss out on these events happening right now!
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ongoingEvents.map((event: any) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Section */}
          {upcomingEvents.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Upcoming Vibes
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Mark your calendars for these upcoming experiences.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingEvents.map((event: any) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {ongoingEvents.length === 0 && upcomingEvents.length === 0 && (
            <div className="empty-state text-center py-20 rounded-2xl">
               <p className="text-lg" style={{ color: 'var(--text-muted)' }}>No current or future events found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
