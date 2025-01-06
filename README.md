<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Lareact Performative Trial Project Instructions
* Run npm i
* Run php artisan migrate
* Run the seeder below to add atleast 3 music on the list
    * php artisan db:seed --class=MusicTableSeeder
* Run php php artisan serve
* Run npm run dev

## Register
* I've used the default laravel breeze template, so by this time do create register an account and login
* Upon logging in the default dsahboard would be the music list dashboard where you can add music from youtube only

## Testing
* Make sure you have a firefox installed
* Run php artisan test for backend, I've only tested two functions here in on MusicController
    * php artisan test tests/Feature/MusicControllerTest.php
* Run npm run test:mocha for front end testing
