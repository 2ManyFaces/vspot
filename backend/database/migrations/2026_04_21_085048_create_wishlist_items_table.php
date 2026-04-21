<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wishlist_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('wishlistable_type', 10);
            $table->foreignId('venue_id')->nullable()->constrained('venues')->onDelete('cascade');
            $table->foreignId('event_id')->nullable()->constrained('events')->onDelete('cascade');
            $table->timestamp('added_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wishlist_items');
    }
};
