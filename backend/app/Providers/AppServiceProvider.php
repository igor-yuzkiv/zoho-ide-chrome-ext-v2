<?php

namespace App\Providers;

use App\Api\Console\Commands\IgorTestCommand;
use App\Api\Console\Commands\KnowledgeBase\ImportKnowledgeBaseTemplatesCommand;
use App\Domains\Attachment\Contracts\AttachmentsStorageService;
use App\Infrastructure\Services\Attachments\LocalAttachmentsStorageService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AttachmentsStorageService::class, LocalAttachmentsStorageService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->commands([
            IgorTestCommand::class,
            ImportKnowledgeBaseTemplatesCommand::class,
        ]);
    }
}
