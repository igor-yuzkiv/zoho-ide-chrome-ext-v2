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
        public ?string $createdBy,
        public ?string $updatedBy,
        public Carbon $createdAt,
        public ?Carbon $updatedAt,
    ) {}
}
