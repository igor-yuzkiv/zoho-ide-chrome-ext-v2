<?php

namespace App\Domains\KnowledgeBase\Entities;

use App\Domains\User\Entities\User;
use Illuminate\Support\Collection;

class KnowledgeBaseItemWithRelations
{
    public function __construct(
        public KnowledgeBaseItem $item,
        public Collection $tags,
        public ?User $createdBy,
        public ?User $updatedBy,
    ) {}
}
