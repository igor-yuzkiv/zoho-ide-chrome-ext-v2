<?php

namespace App\Providers;

use App\Domains\Attachment\Repositories\AttachmentRepository;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use App\Domains\User\Repositories\UserRepository;
use App\Infrastructure\Repositories\EloquentAttachmentRepository;
use App\Infrastructure\Repositories\EloquentKnowledgeBaseItemRepository;
use App\Infrastructure\Repositories\EloquentUserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    private const REGISTER = [
        UserRepository::class              => EloquentUserRepository::class,
        KnowledgeBaseItemRepository::class => EloquentKnowledgeBaseItemRepository::class,
        AttachmentRepository::class => EloquentAttachmentRepository::class,
    ];

    public function register(): void
    {
        foreach (self::REGISTER as $interface => $concrete) {
            $this->app->bind($interface, $concrete);
        }
    }

    public function boot(): void {}
}
