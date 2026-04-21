"use client";

import { useState, useEffect } from 'react';
import { Search, MapPin, Tag } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [area, setArea] = useState(searchParams.get('area') || 'All');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category !== 'All') params.set('category', category);
      if (area !== 'All') params.set('area', area);

      router.push(`/venues?${params.toString()}`, { scroll: false });
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, category, area, router]);

  const categories = ['All', 'Food & Drinks', 'Entertainment', 'Culture', 'Outdoors'];
  const areas = ['All', 'Gulshan', 'Banani', 'Dhanmondi', 'Mirpur'];

  return (
    <div className="glass p-6 rounded-2xl sticky top-24 border border-zinc-800">
      <h3 className="text-xl font-bold mb-6 text-white">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 bg-zinc-900 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition shadow-inner"
              placeholder="Search venues..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4" /> Category
          </label>
          <div className="space-y-3">
            {categories.map((c) => (
              <label key={c} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category"
                  value={c}
                  checked={category === c}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-4 h-4 text-brand-500 bg-zinc-900 border-zinc-700 focus:ring-brand-500 accent-brand-500"
                />
                <span className={`text-sm ${category === c ? 'text-white font-semibold flex items-center gap-2 before:w-1 before:h-1 before:bg-brand-500 before:rounded-full before:inline-block' : 'text-zinc-500 group-hover:text-zinc-300'} transition-all`}>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Area Zone
          </label>
          <div className="space-y-3">
            {areas.map((a) => (
              <label key={a} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="area"
                  value={a}
                  checked={area === a}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-4 h-4 text-brand-500 bg-zinc-900 border-zinc-700 focus:ring-brand-500 accent-brand-500"
                />
                <span className={`text-sm ${area === a ? 'text-white font-semibold flex items-center gap-2 before:w-1 before:h-1 before:brand-bg-500 before:rounded-full before:inline-block' : 'text-zinc-500 group-hover:text-zinc-300'} transition-all`}>{a}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
