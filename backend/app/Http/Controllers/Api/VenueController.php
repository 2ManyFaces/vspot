<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function index(Request $request)
    {
        $query = Venue::where('is_published', true);

        if ($request->has('search') && !empty($request->search)) {
            $search = strtolower($request->search);
            $query->where(function($q) use ($search) {
                $q->whereRaw('LOWER(name) LIKE ?', ['%' . $search . '%'])
                  ->orWhereRaw('LOWER(description) LIKE ?', ['%' . $search . '%']);
            });
        }

        if ($request->has('category') && $request->category !== 'All' && !empty($request->category)) {
            $query->where('category', $request->category);
        }

        if ($request->has('area') && $request->area !== 'All' && !empty($request->area)) {
            $query->where('area_name', $request->area);
        }

        $sort = $request->get('sort', 'rating_desc');
        if ($sort === 'rating_desc') {
            $query->orderBy('average_rating', 'desc');
        } elseif ($sort === 'newest') {
            $query->orderBy('created_at', 'desc');
        }

        $venues = $query->paginate(12);
            
        return response()->json([
            'status' => 'success',
            'data' => $venues->items(),
            'meta' => [
                'current_page' => $venues->currentPage(),
                'last_page' => $venues->lastPage(),
                'total' => $venues->total()
            ]
        ]);
    }

    public function show($id)
    {
        $venue = Venue::findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $venue
        ]);
    }
}
