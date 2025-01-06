<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Music;

class MusicTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $music = [
            [
                'title' => 'Goodness of God',
                'artist' => 'Jenn Johnson',
                'music_link' => 'https://www.youtube.com/watch?v=n0FBb6hnwTo',
            ],
            [
                'title' => 'Remembrance',
                'artist' => 'Brooke Ligertwood',
                'music_link' => 'https://www.youtube.com/watch?v=_Q_T5KU9QgY',
            ],
            [
                'title' => 'Praise',
                'artist' => 'Elevation Worship',
                'music_link' => 'https://www.youtube.com/watch?v=f2oxGYpuLkw',
            ],
        ];

        foreach ($music as $song) {
            Music::create($song);
        }
    }
}
