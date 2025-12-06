<?php

namespace App\Application\KnowledgeBase\Commands;

use App\Domains\User\Entities\User;

final class SaveKnowledgeBaseItemCommand
{
    public function __construct(
        public string $title,
        public ?string $content,
        public ?string $parentId,
        public ?User $user,
        public array $tagIds = []
    ) {}
}
