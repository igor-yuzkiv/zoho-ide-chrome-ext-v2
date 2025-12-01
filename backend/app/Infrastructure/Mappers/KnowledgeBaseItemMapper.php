<?php

namespace App\Infrastructure\Mappers;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Infrastructure\Models\KnowledgeBaseItemModel;
use Illuminate\Support\Collection;

class KnowledgeBaseItemMapper
{
    public function __construct(private readonly TagMapper $tagMapper) {}

    public function makeFromModel(KnowledgeBaseItemModel $model): KnowledgeBaseItem
    {
        return new KnowledgeBaseItem(
            id: $model->id,
            title: $model->title,
            content: $model->content,
            parentId: $model->parent_id,
            createdBy: $model->created_by,
            updatedBy: $model->updated_by,
            createdAt: $model->created_at,
            updatedAt: $model->updated_at,

            tags: $model->relationLoaded('tags')
                ? $model->tags->map(fn ($tagModel) => $this->tagMapper->toEntity($tagModel))
                : new Collection,
        );
    }

    public function mapToModelAttributes(KnowledgeBaseItem $item): array
    {
        return [
            'id'         => $item->id,
            'title'      => $item->title,
            'content'    => $item->content,
            'parent_id'  => $item->parentId,
            'created_by' => $item->createdBy,
            'updated_by' => $item->updatedBy,
        ];
    }
}
