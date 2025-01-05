<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MusicTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('music')->insert([
            [
                'title' => 'Shape of You',
                'artist' => 'Ed Sheeran',
                'music_link' => 'https://example.com/shape-of-you',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Blinding Lights',
                'artist' => 'The Weeknd',
                'music_link' => 'https://example.com/blinding-lights',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Someone Like You',
                'artist' => 'Adele',
                'music_link' => 'https://example.com/someone-like-you',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
