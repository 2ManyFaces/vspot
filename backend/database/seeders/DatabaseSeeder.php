<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Venue;
use App\Models\BlogPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Admin::factory()->create([
            'email' => 'admin@vibespot.com',
            'display_name' => 'VibeSpot Editorial'
        ]);

        Venue::factory(10)->create(['created_by' => $admin->id]);

        Venue::factory()->create([
            'name' => 'Neon Nights Rooftop',
            'category' => 'Food & Drinks',
            'area_name' => 'Banani',
            'area_zone' => 'DNCC',
            'address' => 'Road 11, Banani, Dhaka 1213',
            'description' => 'Experience the neon glow of Dhaka from the highest rooftop cafe in Banani. Signature mocktails and synthwave vibes every weekend.',
            'cover_image_url' => 'https://images.unsplash.com/photo-1566418876127-6f0a0bc4c6a2?auto=format&fit=crop&q=80&w=1200',
            'budget_tier' => '$$$',
            'average_rating' => 4.8,
            'total_reviews' => 642,
            'is_published' => true,
            'created_by' => $admin->id
        ]);

        $posts = [
            [
                'title' => 'Best Rooftop Cafés in Dhanmondi',
                'slug' => 'best-rooftop-cafes-in-dhanmondi',
                'featured_image_url' => 'https://images.unsplash.com/photo-1566418876127-6f0a0bc4c6a2?auto=format&fit=crop&w=1200&q=80',
                'body' => "Dhanmondi has quietly become Dhaka's rooftop café capital. Perched above the city's leafy avenues, these sky-high spots offer stunning views alongside world-class coffee and locally sourced bites.\n\n## Why Rooftops?\n\nDhaka's urban heat makes a breezy rooftop the ultimate escape. When the sun dips below the horizon, these terraces transform into social hubs buzzing with conversations, live acoustic sets, and the warm glow of string lights.\n\n## Our Top 5 Picks\n\n**1. The Perch** — Nestled above Satmasjid Road, The Perch serves specialty pour-overs and mezze platters as you look out over Lake Dhanmondi. A must-visit on weekend evenings.\n\n**2. Sky Garden Café** — A verdant rooftop paradise with hanging ferns and ambient lighting. Their cold brew and banana bread are legendary in the neighbourhood.\n\n**3. Altitude Lounge** — More upscale, Altitude caters to professionals unwinding after work. Think craft cocktails and sushi platters against the glittering city skyline.\n\n**4. Chai Stories** — For the tea enthusiast, Chai Stories curates 40+ single-origin blends alongside homemade snacks. Their evening storytelling sessions are a community favourite.\n\n**5. Roofscape** — The newest addition to the Dhanmondi scene, Roofscape prioritises local art. Gallery walls line the terrace perimeter, with rotating exhibitions every month.\n\n## Tips for Visiting\n\nVisit on weeknights to avoid queues. Many rooftop spots require reservations on Fridays and Saturdays. Most are cash-only, though newer venues now accept mobile payments.",
                'tags' => ['Rooftop', 'Café', 'Dhanmondi', 'Food & Drinks'],
            ],
            [
                'title' => 'A Night Out in Old Dhaka',
                'slug' => 'a-night-out-in-old-dhaka',
                'featured_image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
                'body' => "Old Dhaka doesn't sleep. As the rest of the city winds down, Puran Dhaka comes alive — its narrow alleys filling with the clatter of rickshaws, the sizzle of biriani pots, and the laughter of friends gathering around centuries-old tea stalls.\n\n## Starting Your Evening\n\nBegin at **Chawkbazar** as dusk sets in. This ancient marketplace has been the heart of Old Dhaka trade for over 400 years. In the evening, its stalls pivot to food — vendors setting up rows of iftari-style treats regardless of the season.\n\n## The Food Trail\n\nNo night in Puran Dhaka is complete without a pilgrimage to **Haji Biriani** on Nalgola Road. Their 100-year-old recipe of slow-cooked mutton biriani is the stuff of legend. Arrive before 8 PM — it sells out.\n\nNext, make your way to **Star Hotel** in Bangshal for their famous beef tehari — a flat-rice dish fragrant with whole spices. The communal seating and no-frills environment are part of the charm.\n\n## Walking Ahsan Manzil at Dusk\n\nThe Pink Palace — Ahsan Manzil — glows under floodlights against the Buriganga River. An evening stroll along the ghats here offers an entirely different perspective of Dhaka: quieter, contemplative, beautiful.\n\n## Wrapping Up\n\nEnd your night with a cup of Badam Milk or Borhani from one of the roadside vendors near Sadarghat. It's a sensory close to an unforgettable evening in the oldest part of our city.",
                'tags' => ['Heritage', 'Food', 'Old Dhaka', 'Night Out'],
            ],
            [
                'title' => 'Heritage Sites Near Lalbagh',
                'slug' => 'heritage-sites-near-lalbagh',
                'featured_image_url' => 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
                'body' => "The Lalbagh Fort area is one of Dhaka's most historically dense neighbourhoods. Within a kilometre radius, you'll find Mughal-era monuments, colonial-era mansions, and centuries-old mosques that tell the intertwined story of Bengal's past.\n\n## Lalbagh Fort (Qila-e-Aurangabad)\n\nConstruction of this sprawling fort complex began in 1678 under Prince Muhammad Azam, son of Aurangzeb. Though never completed, the fort contains three main structures: the Mosque of Shaista Khan, the Tomb of Bibi Pari, and the Audience Hall, now a museum.\n\nVisit in the early morning when light falls softly through the arched corridors. The fort gardens are impeccably maintained and offer a surprising green haven within the urban sprawl.\n\n## The Star Mosque (Tara Masjid)\n\nA short walk from Lalbagh, the Star Mosque is one of Dhaka's most visually striking buildings. Its exterior is covered in inlaid coloured tiles — a mosaic of blue, turquoise, and white — that shimmer brilliantly in sunlight. Built in the early 18th century, it was renovated and expanded in the early 20th century.\n\n## Husaini Dalan\n\nThis 17th-century imambara is the centre of Shia Muslim religious ceremony in Dhaka. Its distinctive architecture — double-storey colonnaded façade — makes it one of the most photogenic structures in Old Dhaka.\n\n## Armenian Church of the Holy Resurrection\n\nBuilt in 1781, this Georgian-style church stands as a testament to Dhaka's once-thriving Armenian merchant community. The cemetery behind it contains tombstones dating to the 18th century — an evocative reminder of the city's multicultural past.\n\n## Practical Tips\n\nWear comfortable shoes as the footpaths are uneven. The area is best navigated on foot or by rickshaw. Combine your visit with lunch at one of the traditional restaurants in Bangshal.",
                'tags' => ['Heritage', 'History', 'Lalbagh', 'Architecture'],
            ],
            [
                'title' => 'Gulshan\'s Hidden Café Scene',
                'slug' => 'gulshan-hidden-cafe-scene',
                'featured_image_url' => 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
                'body' => "Beyond the embassy row and shopping malls, Gulshan hides an extraordinary collection of intimate cafés that have quietly built devoted followings among creative professionals, diplomats, and neighbourhood regulars.\n\n## The Third-Wave Coffee Movement\n\nGulshan is leading Dhaka's third-wave coffee revolution. Cafés here are investing in single-origin beans, precision brewing equipment, and baristas trained abroad. The result: a cup of coffee that can genuinely stand alongside what you'd find in London or Singapore.\n\n## Must-Visit Spots\n\n**Blend Station** — A minimalist space on Gulshan 2, Blend Station's rotating seasonal menu features beans sourced directly from Sylhet and Chittagong hill farms. Their signature 'Bangladesh Blend' cold brew is exceptional.\n\n**The Reading Room** — Part bookshop, part café, The Reading Room is the closest Dhaka comes to a Parisian literary salon. Shelves of curated books line the walls; the café serves some of the best homemade pastries in the city.\n\n**Kafé Kathmandu** — An unexpected Nepal-inspired spot run by a Nepalese chef and her Bangladeshi husband. The fusion menu — momos alongside fuchka, masala chai alongside espresso — is gloriously eclectic.\n\n## For the Evenings\n\nAs afternoon fades, Gulshan's café scene transitions into evening mode. Many spots introduce live acoustic music, poetry readings, or open-mic nights on Thursdays and Fridays, making them natural pre-dinner gathering spots.",
                'tags' => ['Coffee', 'Café', 'Gulshan', 'Creative'],
            ],
            [
                'title' => 'Live Music Venues You Should Know',
                'slug' => 'live-music-venues-you-should-know',
                'featured_image_url' => 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
                'body' => "Dhaka's live music scene has exploded over the past five years. From intimate jazz lounges to rooftop concert venues, the city now offers a surprisingly diverse range of live performance spaces for every musical taste.\n\n## The Jazz Underground\n\nTucked into a basement on Banani Road 11, The Jazz Underground hosts live jazz and soul performances four nights a week. The venue's brick walls and low lighting create an atmosphere that feels transplanted from New Orleans. The performers rotate between in-house residents and international touring acts.\n\n## Dhaka Blues House\n\nA larger venue in Uttara, the Blues House books a mix of traditional blues, rock, and fusion acts. Their weekend double-headers — an early dinner show followed by a late-night set — draw audiences from across the city.\n\n## Acoustic Fridays at Café Noise\n\nCafé Noise in Dhanmondi runs a legendary weekly acoustic session called Acoustic Fridays. Local singer-songwriters perform original compositions in an intimate setting. It's a genuine community institution — no cover charge, donation-based.\n\n## The Banani Rooftop Sessions\n\nA newer format that's caught on rapidly: rooftop concert sessions hosted by various venues across Banani. Bands set up on rooftops, and the open-air acoustic experience beneath the Dhaka night sky is something genuinely special.\n\n## Upcoming Highlights\n\nKeep an eye on VibeSpot's Events section for live music listings updated weekly. The platform lists both recurring weekly shows and one-off special performances across all genres.",
                'tags' => ['Music', 'Entertainment', 'Live Events', 'Nightlife'],
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create([
                ...$post,
                'author_id' => $admin->id,
                'is_published' => true,
                'published_at' => now()->subDays(rand(1, 20)),
            ]);
        }
    }
}
