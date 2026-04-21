import Link from 'next/link';
import HeroSearch from '@/components/home/HeroSearch';
import CategoryGrid from '@/components/home/CategoryGrid';
import VenueCard from '@/components/cards/VenueCard';
import { ArrowRight, TrendingUp, Star, Sparkles } from 'lucide-react';

async function getVenues(params?: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/venues?${params || ''}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function Home() {
  const [trendingRes, newRes] = await Promise.all([
    getVenues('sort=rating_desc'),
    getVenues('sort=newest'),
  ]);

  const trending = trendingRes.data?.slice(0, 4) || [];
  const newest = newRes.data?.slice(0, 4) || [];

  return (
    <div className="flex flex-col">

      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden hero-glow">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border"
            style={{ color: 'var(--muted)', borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            Discover Dhaka's Best — Phase 1: DNCC &amp; DSCC
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
              Find Your{' '}
              <span className="text-gradient">Vibe.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
              Explore rooftop cafes, heritage trails, live gigs, and secret spots&nbsp;—
              all curated by the Dhaka community.
            </p>
          </div>

          {/* Search */}
          <HeroSearch />

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-2">
            {[
              { num: '800+', label: 'Places' },
              { num: '150+', label: 'Events' },
              { num: '12K+', label: 'Reviews' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-extrabold text-brand-500">{num}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 max-w-7xl mx-auto w-full">
        <SectionHeader
          eyebrow="Browse by type"
          title="What are you looking for?"
          subtitle="Eight categories covering every corner of Dhaka's vibrant city life."
        />
        <CategoryGrid />
      </section>

      {/* ─── TRENDING VENUES ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 max-w-7xl mx-auto w-full">
        <SectionHeader
          eyebrow="Community Picks"
          title="Trending Right Now"
          subtitle="Highest-rated spots this week, voted by the community."
          action={{ href: '/venues', label: 'View All Venues' }}
          icon={<TrendingUp className="h-4 w-4 text-brand-500" />}
        />
        <VenueGrid venues={trending} />
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section
        className="py-14 border-y"
        style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <SectionHeader
            eyebrow="Freshly Added"
            title="New on VibeSpot"
            subtitle="Newly listed venues waiting to be explored first."
            action={{ href: '/venues?sort=newest', label: 'See All New' }}
            icon={<Star className="h-4 w-4 text-brand-500" />}
          />
          <VenueGrid venues={newest} />
        </div>
      </section>

      {/* ─── EDITORIAL CTA ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--card-border)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-violet-500 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566418876127-6f0a0bc4c6a2?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center mix-blend-overlay opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="relative z-10 py-20 px-8 sm:px-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-lg">
              <p className="text-brand-200 text-sm font-semibold uppercase tracking-widest mb-3">Editorial</p>
              <h2 className="text-4xl font-extrabold leading-tight mb-4">Explore our curated city guides</h2>
              <p className="text-white/80 text-base leading-relaxed">
                From "Best Rooftop Cafés in Dhanmondi" to "A Night Out in Old Dhaka" — our editors have you covered.
              </p>
            </div>
            <Link
              href="/blog"
              className="flex-shrink-0 bg-white text-brand-700 hover:bg-brand-50 font-bold px-8 py-4 rounded-2xl transition-all duration-200 flex items-center gap-2 shadow-xl"
            >
              Read the Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── Helper Components ─── */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  icon,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: { href: string; label: string };
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-500">
          {icon}
          {eyebrow}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
          {title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{subtitle}</p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-400 transition-colors"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function VenueGrid({ venues }: { venues: any[] }) {
  if (!venues.length) {
    return (
      <div
        className="text-center py-16 rounded-2xl border"
        style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}
      >
        <p style={{ color: 'var(--muted)' }}>No venues available. Make sure the backend is running.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {venues.map((venue: any) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
