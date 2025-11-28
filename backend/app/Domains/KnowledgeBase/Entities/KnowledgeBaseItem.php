<?php

namespace App\Domains\KnowledgeBase\Entities;

use Carbon\Carbon;

class KnowledgeBaseItem
{
    public function __construct(
        public string $id,
        public string $title,
        public ?string $content,
        public ?string $parentId,
        public ?string $createdBy = null,
        public ?string $updatedBy = null,
        public ?Carbon $createdAt = null,
        public ?Carbon $updatedAt = null,
    ) {}
}
