<?php
namespace Database\Factories;

use App\Models\Music;
use Illuminate\Database\Eloquent\Factories\Factory;

class MusicFactory extends Factory
{
    protected $model = Music::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(),
            'artist' => $this->faker->name(),
            'music_link' => $this->faker->url(),
        ];
    }
}