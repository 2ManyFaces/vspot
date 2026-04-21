<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'password_hash',
        'display_name',
        'is_active',
    ];

    protected $hidden = [
        'password_hash',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function venues()
    {
        return $this->hasMany(Venue::class, 'created_by');
    }
    public function events()
    {
        return $this->hasMany(Event::class, 'created_by');
    }
    public function blogPosts()
    {
        return $this->hasMany(BlogPost::class, 'author_id');
    }
}
