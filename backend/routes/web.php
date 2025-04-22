<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FavoriteController;

Route::get('/favorites', [FavoriteController::class, 'index']);
Route::post('/favorites', [FavoriteController::class, 'store']);
Route::delete('/favorites/{tmdb_id}', [FavoriteController::class, 'destroy']);
