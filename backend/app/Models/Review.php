<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'user_id',
        'reviewable_type',
        'venue_id',
        'event_id',
        'rating',
        'body',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
