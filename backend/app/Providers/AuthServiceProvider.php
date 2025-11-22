<?php

namespace App\Providers;

use App\Application\Auth\Contracts\AuthGateway;
use App\Infrastructure\Auth\LaravelAuthGateway;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AuthGateway::class, LaravelAuthGateway::class);
    }

    public function boot(): void {}
}
