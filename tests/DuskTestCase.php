<?php

namespace Tests;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Laravel\Dusk\TestCase as BaseTestCase;
use Illuminate\Support\Collection;
use PHPUnit\Framework\Attributes\BeforeClass;

abstract class DuskTestCase extends BaseTestCase
{
    #[BeforeClass]
    public static function prepare(): void
    {
        if (! static::runningInSail()) {
            static::startChromeDriver(['--port=9515']);
        }
    }

    protected function driver(): RemoteWebDriver
    {
        $options = (new ChromeOptions)->addArguments(collect([
            '--disable-search-engine-choice-screen',
            '--disable-gpu',
            '--headless=new',
            '--window-size=1920,1080',
        ])->all());

        return RemoteWebDriver::create(
            $_ENV['DUSK_DRIVER_URL'] ?? env('DUSK_DRIVER_URL') ?? 'http://localhost:9515',
            DesiredCapabilities::chrome()->setCapability(
                ChromeOptions::CAPABILITY, $options
            )
        );
    }

    protected function setUp(): void
    {
        parent::setUp();

        // Migrate and seed the database
        $this->artisan('migrate', ['--env' => 'dusk.local']);
        if (!User::exists()) {
            User::factory()->create(); // Seed one user if table is empty
        }

        // Add a custom route for logging in during tests
        Route::get('/dusk/login/{user}', function (User $user) {
            Auth::login($user);
            return redirect('/dashboard');
        })->name('dusk.login');
    }
}