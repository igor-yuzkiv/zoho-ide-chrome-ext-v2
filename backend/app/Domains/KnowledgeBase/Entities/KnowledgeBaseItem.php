<?php

namespace App\Domains\KnowledgeBase\Entities;

use App\Domains\Tag\Entity\Tag;
use App\Shared\Contracts\EntityReferable;
use App\Shared\ValueObjects\EntityRef;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class KnowledgeBaseItem implements EntityReferable
{
    /**
     * @param  Collection<Tag>  $tags
     */
    public function __construct(
        public string $id,
        public string $title,
        public ?string $content,
        public ?string $parentId,
        public ?string $createdBy = null,
        public ?string $updatedBy = null,
        public ?Carbon $createdAt = null,
        public ?Carbon $updatedAt = null,
        public Collection $tags = new Collection
    ) {}

    public function getEntityRef(): EntityRef
    {
        return new EntityRef(
            entityName: 'knowledge_base_item',
            id: $this->id,
        );
    }
}
