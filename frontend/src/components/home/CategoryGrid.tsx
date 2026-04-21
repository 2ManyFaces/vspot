import Link from 'next/link';

const categories = [
  { label: 'Food & Drinks', emoji: '🍜', href: '/venues?category=Food+%26+Drinks', count: '240+' },
  { label: 'Entertainment', emoji: '🎭', href: '/venues?category=Entertainment', count: '120+' },
  { label: 'Culture',        emoji: '🎨', href: '/venues?category=Culture',        count: '80+' },
  { label: 'Heritage',       emoji: '🏛️', href: '/venues?category=Heritage',       count: '50+' },
  { label: 'Outdoors',       emoji: '🌿', href: '/venues?category=Outdoors',       count: '60+' },
  { label: 'Events',         emoji: '🎉', href: '/events',                         count: '30+' },
  { label: 'Cinema',         emoji: '🎬', href: '/venues?category=Cinema',         count: '15+' },
  { label: 'Shopping',       emoji: '🛍️', href: '/venues?category=Shopping',       count: '190+' },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {categories.map((cat) => (
        <Link key={cat.label} href={cat.href}>
          <div
            className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl text-center cursor-pointer transition-all duration-250 hover:-translate-y-1"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <span className="text-2xl leading-none select-none">{cat.emoji}</span>
            <div>
              <p className="text-[11px] font-semibold leading-tight group-hover:text-brand-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                {cat.label}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{cat.count} spots</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
