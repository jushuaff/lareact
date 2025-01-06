<?php

namespace App\Http\Controllers;

use App\Models\Music;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class MusicController extends Controller
{
    public function loadMusic(Request $request) {
        $user = auth()->user();

        $musics = Music::query();

        if ($request->has('sort_by') && $request->has('sort_direction')) {
            $sortBy = $request->input('sort_by');
            $sortDirection = $request->input('sort_direction') === 'desc' ? 'desc' : 'asc';
            $musics = $musics->orderBy($sortBy, $sortDirection);
        } else {
            $musics = $musics->orderBy('title', 'asc');
        }

        if ($request->has('search') && $request->input('search') != '') {
            $search = $request->input('search');
            $musics = $musics->where('title', 'like', '%' . $search . '%')
                             ->orWhere('artist', 'like', '%' . $search . '%');
        }

        $musics = $musics->get();
        return Inertia::render('Dashboard', [
            'user' => $user,
            'musics' => $musics,
            'flash' => session()->get('success'),
        ]);
    }

    public function addMusicView(){
        $user = auth()->user();
        return ($user) ? Inertia::render('Music/AddMusic') : to_route('/');
    }

    public function editMusicView($music_id){
        $user = auth()->user();
        if(!$user) { return to_route('/'); }

        $music = Music::find($music_id);

        return Inertia::render('Music/EditMusic',[
            'music' => $music
        ]);
    }

    public function addMusic(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'music_link' => [
                'required',
                'string',
                'regex:/^https:\/\/(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/)[a-zA-Z0-9_-]{11}$/',
            ],
        ],[
            'music_link.regex' => 'The music link must be a valid YouTube URL.',
        ]);
        
        $music = Music::create([
            'title' => strip_tags($request->title),
            'artist' => strip_tags($request->artist),
            'music_link' => strip_tags($request->music_link),
        ]);
    
        return redirect()->route('dashboard')->with('success', 'Music added successfully!');
    }

    public function editMusic(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'music_link' => [
                'required',
                'string', 
                'regex:/^https:\/\/(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/)[a-zA-Z0-9_-]{11}$/',
            ],
        ],[
            'music_link.regex' => 'The music link must be a valid YouTube URL.',
        ]);

        $music = Music::find($request->music_id);
        if (!$music) {
            return redirect()->back()->withErrors(['error' => 'Music not found.']);
        }

        $music->update([
            'title' => strip_tags($request->title),
            'artist' => strip_tags($request->artist),
            'music_link' => strip_tags($request->music_link)
        ]);

        return to_route('dashboard')->with('success', 'Music updated successfully.');
    }

    public function deleteMusic($music_id) {
        $user = auth()->user();
        if(!$user) { return to_route('/'); }

        $music = Music::find($music_id);
        if (!$music) {
            return redirect()->back()->withErrors(['error' => 'Music not found.']);
        }

        $music->delete();

        return to_route('dashboard')->with('success', 'Music deleted successfully.');
    }
}
