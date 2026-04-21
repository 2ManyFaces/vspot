import { Star, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

interface VenueProps {
  venue: {
    id: number;
    name: string;
    category: string;
    area_name: string;
    cover_image_url: string;
    average_rating: number | string;
    budget_tier: string;
    total_reviews: number;
  };
}

export default function VenueCard({ venue }: VenueProps) {
  const rating = parseFloat(String(venue.average_rating));

  return (
    <Link href={`/venues/${venue.id}`}>
      <div className="vcard group cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={venue.cover_image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'}
            alt={venue.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-black/55 text-white backdrop-blur-sm">
              {venue.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-brand-600 text-white">
              {venue.budget_tier || '$$'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow gap-3">
          <div className="flex justify-between items-start gap-2">
            <h3
              className="text-sm font-bold leading-tight group-hover:text-brand-500 transition-colors line-clamp-2 flex-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {venue.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                {isNaN(rating) ? '—' : rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="mt-auto space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <MapPin className="h-3 w-3 text-brand-500 shrink-0" />
              <span>{venue.area_name}, Dhaka</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Clock className="h-3 w-3 text-emerald-500 shrink-0" />
              <span className="text-emerald-500 font-medium">Open Now</span>
              <span style={{ color: 'var(--text-muted)' }}>· {venue.total_reviews} reviews</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
