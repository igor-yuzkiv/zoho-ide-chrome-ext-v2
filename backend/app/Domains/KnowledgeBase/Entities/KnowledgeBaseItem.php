<?php

namespace App\Domains\KnowledgeBase\Entities;

use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use App\Shared\Contracts\EntityReferable;
use App\Shared\ValueObjects\EntityRef;
use Carbon\Carbon;

class KnowledgeBaseItem implements EntityReferable
{
    public function __construct(
        public string $id,
        public string $title,
        public ?string $content,
        public ?string $parentId,
        public ?KnowledgeBaseCategory $category = null,
        public ?string $createdBy = null,
        public ?string $updatedBy = null,
        public ?Carbon $createdAt = null,
        public ?Carbon $updatedAt = null
    ) {}

    public function getEntityRef(): EntityRef
    {
        return new EntityRef(
            entityName: 'knowledge_base_item',
            id: $this->id,
        );
    }
}
