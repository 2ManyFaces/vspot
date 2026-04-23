<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CheckIn;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CheckInController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'place_id' => 'nullable|exists:places,id',
            'event_id' => 'nullable|exists:events,id',
        ]);

        if (!$request->place_id && !$request->event_id) {
            return response()->json(['message' => 'Specify a place or event.'], 422);
        }

        $user = $request->user();

        // Check if already checked in recently (e.g. today) to prevent duplicates if needed
        // For now, let's just allow check-ins
        
        $checkIn = CheckIn::create([
            'user_id' => $user->id,
            'place_id' => $request->place_id,
            'event_id' => $request->event_id,
            'checked_in_at' => Carbon::now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Checked in successfully!',
            'data' => $checkIn
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $checkIns = CheckIn::where('user_id', $user->id)
            ->with(['place', 'event'])
            ->orderBy('checked_in_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $checkIns
        ]);
    }
}
