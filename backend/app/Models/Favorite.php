<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = ['tmdb_id', 'title', 'poster_path', 'genre_ids'];
}
