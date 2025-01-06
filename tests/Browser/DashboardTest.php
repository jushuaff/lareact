<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class DashboardTest extends DuskTestCase
{
    use DatabaseTransactions;

    public function test_dashboard_contains_search_and_table()
    {
        $user = User::first(); // Fetch the first user

        // Ensure a user exists before the test
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt('12345678'),
            ]);
        }

        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/dusk/login/' . $user->id)
                    ->visit('/dashboard')
                    
                    ->assertPresent('table');      // Assert the table element exists
        });
    }
}
