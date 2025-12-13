<?php

namespace App\Application\KnowledgeBase\Commands;

use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use App\Domains\User\Entities\User;

final class SaveKbItemCommand
{
    public function __construct(
        public string $title,
        public ?string $content,
        public ?string $parentId,
        public ?KnowledgeBaseCategory $category,
        public ?User $user,
        public array $tagIds = []
    ) {}
}
