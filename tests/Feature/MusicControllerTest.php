<?php
use App\Models\User;
use App\Models\Music;

test('add music view is displayed for authenticated user', function () {
    // Create a user
    $user = User::factory()->create();
    $response = $this
        ->actingAs($user)
        ->get(route('music.addview'));

    $response->assertOk();
    $response->assertInertia(fn ($inertia) => $inertia->component('Music/AddMusic'));
});

test('authenticated user can delete music', function () {
    $user = User::factory()->create();
    $music = Music::factory()->create();
    $response = $this
        ->actingAs($user)
        ->get(route('music.delete', ['music_id' => $music->id]));
    $this->assertDatabaseMissing('music', ['id' => $music->id]);

    $response->assertRedirect(route('dashboard'));
    $response->assertSessionHas('success', 'Music deleted successfully.');
});