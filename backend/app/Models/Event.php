<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'venue_id',
        'category',
        'area_name',
        'area_zone',
        'organiser_name',
        'description',
        'cover_image_url',
        'event_date',
        'start_time',
        'end_time',
        'average_rating',
        'total_reviews',
        'is_published',
        'created_by',
    ];

    protected $casts = [
        'event_date' => 'date',
        'average_rating' => 'decimal:2',
        'is_published' => 'boolean',
    ];

    public function creator()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function wishlistItems()
    {
        return $this->hasMany(WishlistItem::class);
    }
}
