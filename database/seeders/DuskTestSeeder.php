<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DuskTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('12345678'),
        ]);
    }
}
