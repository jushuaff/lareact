<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

if (app()->environment('local', 'testing')) {
    Route::get('/dusk/login/{user}', function (\App\Models\User $user) {
        auth()->login($user);
        return redirect()->route('dashboard');
    })->name('dusk.login');
}

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [MusicController::class, 'loadMusic'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
Route::get('add/musicview',[MusicController::class,'addMusicView'])->name('music.addview');
Route::get('edit/music/{music_id}',[MusicController::class,'editMusicView'])->name('music.editview');
Route::post('add/music',[MusicController::class,'addMusic'])->name('music.add');
Route::post('edit/music',[MusicController::class,'editMusic'])->name('music.update');
Route::get('delete/music/{music_id}',[MusicController::class,'deleteMusic'])->name('music.delete');

//Route
Route::get('users/',[UserController::class,'loadUsers'])->name('users.index');
Route::post('edit/user',[UserController::class,'editUser'])->name('users.update');
Route::get('edit/user/{user_id}',[UserController::class,'loadEditForm'])->name('users.edit');
Route::get('delete/user/{user_id}',[UserController::class,'deleteUser'])->name('users.delete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
