<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Place;
use App\Models\Event;
use App\Models\User;
use App\Models\Review;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function stats(Request $request)
    {
        // Simple analytics dashboard metrics
        $stats = [
            'total_users' => User::count(),
            'total_places' => Place::count(),
            'total_events' => Event::count(),
            'total_reviews' => Review::count(),
        ];

        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }
}
