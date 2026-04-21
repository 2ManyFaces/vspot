<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BlogPost extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'title',
        'author_id',
        'featured_image_url',
        'body',
        'tags',
        'related_venue_ids',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'related_venue_ids' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function author()
    {
        return $this->belongsTo(Admin::class, 'author_id');
    }
}
