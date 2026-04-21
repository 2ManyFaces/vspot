import VenueCard from "@/components/cards/VenueCard";
import FiltersSidebar from "@/components/filters/FiltersSidebar";
import { Suspense } from "react";

async function getVenues(searchParams: any) {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const res = await fetch(`http://127.0.0.1:8000/api/venues?${query}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    return res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

export default async function VenuesPage({ searchParams }: { searchParams: Promise<any> }) {
  const resolvedParams = await searchParams;
  const { data: venues } = await getVenues(resolvedParams);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Explore Venues</h1>
        <p className="text-zinc-400 text-lg">
          Discover {venues?.length || 0} spots matching your vibe based on community picks.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <Suspense fallback={<div className="glass h-[400px] rounded-2xl animate-pulse"></div>}>
            <FiltersSidebar />
          </Suspense>
        </div>
        
        <div className="w-full lg:w-3/4">
          {venues && venues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {venues.map((venue: any) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 glass rounded-2xl flex flex-col items-center justify-center">
              <div className="bg-brand-500/10 p-4 rounded-full mb-4 inline-flex items-center justify-center">
                <p className="text-brand-500 font-bold text-3xl">😞</p>
              </div>
              <p className="text-2xl text-white font-bold tracking-tight">No venues found</p>
              <p className="text-zinc-400 mt-2 max-w-sm mx-auto">Try adjusting your filters or searching for something else to discover more locations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
