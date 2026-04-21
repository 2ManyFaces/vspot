import { Star, MapPin, Clock, Tag } from 'lucide-react';

async function getVenue(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/venues/${id}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function VenueDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const response = await getVenue(resolvedParams.id);
  
  if (!response || !response.data) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass p-10 text-center rounded-2xl max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2">Venue Not Found</h2>
          <p className="text-zinc-400">The venue you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const venue = response.data;

  return (
    <div className="pb-24">
      {/* Immersive Media Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full mt-[-64px]">
        {/* We use mt-[-64px] to render under the sticky transparent navbar */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10 z-10" />
        <img 
          src={venue.cover_image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80'} 
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 w-full z-20 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-600/90 border border-brand-500/50 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                  {venue.category}
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg leading-none">
                  {venue.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 mt-6">
                  <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-700/50">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xl font-bold text-white">{venue.average_rating}</span>
                    <span className="text-zinc-400 text-sm">({venue.total_reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 px-3 py-1.5">
                    <MapPin className="h-5 w-5 text-brand-400" />
                    <span className="text-lg font-medium tracking-wide">{venue.area_name}, {venue.area_zone}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="glass hover:bg-brand-600/20 px-6 py-3 rounded-full text-white font-medium transition-all duration-300">
                  Write a Review
                </button>
                <button className="bg-brand-600 hover:bg-brand-500 px-6 py-3 rounded-full text-white font-medium shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300">
                  Check In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-brand-500 rounded-full inline-block"></span>
                About this vibe
              </h2>
              <div className="glass shadow-2xl p-8 rounded-3xl text-zinc-300/90 leading-loose text-lg font-light tracking-wide border-t border-zinc-700/60">
                {venue.description || 'No description provided.'}
              </div>
            </section>
            
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-white">Tags & Highlights</h2>
              <div className="flex flex-wrap gap-3">
                {venue.tags ? venue.tags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-2 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 px-4 py-2 rounded-xl text-brand-300 text-sm shadow">
                    <Tag className="h-3 w-3 text-brand-500" />
                    {tag}
                  </span>
                )) : (
                  <>
                    <span className="flex items-center gap-2 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 px-4 py-2 rounded-xl text-brand-300 text-sm shadow">Wifi</span>
                    <span className="flex items-center gap-2 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 px-4 py-2 rounded-xl text-brand-300 text-sm shadow">Live Music</span>
                    <span className="flex items-center gap-2 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 px-4 py-2 rounded-xl text-brand-300 text-sm shadow">AC</span>
                  </>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8 mt-[-100px] relative z-20">
            <div className="glass shadow-2xl p-8 rounded-3xl border border-zinc-700/60 bg-zinc-900/90">
              <h3 className="text-lg font-bold text-white mb-6 text-center tracking-tight">At a Glance</h3>
              <ul className="space-y-6">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Current Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-inner">
                    <Clock className="h-4 w-4" /> Open Now
                  </span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Budget Tier</span>
                  <span className="text-brand-400 font-extrabold bg-brand-500/10 px-3 py-1.5 rounded-lg border border-brand-500/20 shadow-inner text-base tracking-widest">
                    {venue.budget_tier || '$$$'}
                  </span>
                </li>
                <li className="flex flex-col gap-2 text-sm pt-4 border-t border-zinc-800 text-center">
                  <span className="text-zinc-400">Full Address</span>
                  <span className="text-white text-base leading-relaxed">{venue.address}</span>
                </li>
              </ul>
            </div>
            
            {/* Map Placeholder */}
            <div className="h-56 rounded-3xl bg-zinc-900/80 border border-zinc-800 overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-20 mix-blend-overlay"></div>
              <div className="flex flex-col items-center justify-center h-full text-brand-500/60 space-y-3 z-10 relative">
                <MapPin className="h-10 w-10 text-brand-500 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                <span className="text-sm font-medium uppercase tracking-widest text-zinc-400">Interactive Map</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
