<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Update the authenticated user's profile details.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'display_name' => 'sometimes|required|string|max:100',
            'bio' => 'nullable|string|max:1000',
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->has('display_name')) {
            $user->display_name = $validated['display_name'];
        }

        if ($request->has('bio')) {
            $user->bio = $validated['bio'];
        }

        if ($request->hasFile('profile_photo')) {
            // Delete old photo if it's a local storage path
            if ($user->profile_photo_url && !str_starts_with($user->profile_photo_url, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->profile_photo_url));
            }
            
            $path = $request->file('profile_photo')->store('profiles', 'public');
            $user->profile_photo_url = '/storage/' . $path;
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }

    /**
     * Retrieve the authenticated user's activity history.
     */
    public function activity(Request $request)
    {
        $user = $request->user();

        // Load relations. Assuming User model has these methods.
        // We eager load 'place' inside wishlistItems and checkIns,
        // and 'reviewable' inside reviews (which represents a Place).
        $user->load([
            'reviews.place', 
            'wishlistItems.place', 
            'checkIns.place'
        ]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'reviews' => $user->reviews,
                'wishlist' => $user->wishlistItems,
                'check_ins' => $user->checkIns,
                'stats' => [
                    'review_count' => $user->reviews->count(),
                    'wishlist_count' => $user->wishlistItems->count(),
                    'check_in_count' => $user->checkIns->count(),
                ]
            ]
        ]);
    }
}
