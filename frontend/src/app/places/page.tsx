import PlaceCard from "@/components/cards/PlaceCard";
import FiltersSidebar from "@/components/filters/FiltersSidebar";
import CategorySlider from "@/components/sliders/CategorySlider";
import { Suspense } from "react";

async function getPlaces(searchParams: any) {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const res = await fetch(`http://127.0.0.1:8000/api/places?${query}`, { 
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

export default async function PlacesPage({ searchParams }: { searchParams: Promise<any> }) {
  const resolvedParams = await searchParams;
  const { data: places } = await getPlaces(resolvedParams);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>Explore Places</h1>
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
          Discover {places?.length || 0} spots matching your vibe based on community picks.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <Suspense fallback={<div className="empty-state h-[400px] rounded-2xl animate-pulse"></div>}>
            <FiltersSidebar />
          </Suspense>
        </div>
        
        <div className="w-full lg:w-3/4">
          {places && places.length > 0 ? (
            <div className="flex flex-col gap-12">
              {Object.entries(
                places.reduce((acc: any, place: any) => {
                  if (!acc[place.category]) acc[place.category] = [];
                  acc[place.category].push(place);
                  return acc;
                }, {})
              ).map(([category, catPlaces]: [string, any]) => (
                <CategorySlider key={category} category={category} places={catPlaces} />
              ))}
            </div>
          ) : (
            <div className="empty-state text-center py-32 rounded-2xl flex flex-col items-center justify-center">
              <div className="bg-brand-500/10 p-4 rounded-full mb-4 inline-flex items-center justify-center">
                <p className="text-brand-500 font-bold text-3xl">😞</p>
              </div>
              <p className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>No places found</p>
              <p className="mt-2 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or searching for something else to discover more locations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
