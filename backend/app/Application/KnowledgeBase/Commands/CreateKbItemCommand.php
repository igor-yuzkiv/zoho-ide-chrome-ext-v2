<?php

namespace App\Application\KnowledgeBase\Commands;

use App\Domains\User\Entities\User;

final class CreateKbItemCommand
{
    public function __construct(
        public string $title,
        public ?string $content,
        public ?string $parentId,
        public ?User $user
    ) {}
}
