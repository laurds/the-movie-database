<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index()
    {
        return response()->json(Favorite::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'tmdb_id' => 'required|integer|unique:favorites',
            'title' => 'required|string',
            'poster_path' => 'nullable|string',
            'genre_ids' => 'nullable|array'
        ]);

        $favorite = Favorite::create([
            'tmdb_id' => $request->tmdb_id,
            'title' => $request->title,
            'poster_path' => $request->poster_path,
            'genre_ids' => json_encode($request->genre_ids),
        ]);

        return response()->json($favorite, 201);
    }

    public function destroy($tmdb_id)
    {
        $favorite = Favorite::where('tmdb_id', $tmdb_id)->first();

        if (!$favorite) {
            return response()->json(['message' => 'Filme não encontrado'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Removido com sucesso']);
    }
}
