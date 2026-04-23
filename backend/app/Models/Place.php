<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Place extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'category',
        'area_name',
        'area_zone',
        'address',
        'latitude',
        'longitude',
        'description',
        'cover_image_url',
        'images',
        'operating_hours',
        'tags',
        'budget_tier',
        'budget_label',
        'budget_range',
        'average_rating',
        'total_reviews',
        'is_published',
        'created_by',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'images' => 'array',
        'operating_hours' => 'array',
        'tags' => 'array',
        'average_rating' => 'decimal:2',
        'is_published' => 'boolean',
    ];

    public function creator()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }
    public function events()
    {
        return $this->hasMany(Event::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function checkIns()
    {
        return $this->hasMany(CheckIn::class);
    }
    public function wishlistItems()
    {
        return $this->hasMany(WishlistItem::class);
    }
}
