<?php

namespace App\Application\KnowledgeBase\Commands;

use App\Domains\User\Entities\User;

final class UpdateKbItemCommand
{
    public function __construct(
        public string $id,
        public string $title,
        public ?string $content,
        public ?string $parentId,
        public ?User $user
    ) {}
}
