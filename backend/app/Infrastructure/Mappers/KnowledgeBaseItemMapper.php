<?php

namespace App\Infrastructure\Mappers;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Infrastructure\Models\KnowledgeBaseItemModel;

class KnowledgeBaseItemMapper
{
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
