<?php

namespace App\Api\Resources\KnowledgeBase;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin KnowledgeBaseItem */ class KnowledgeBaseItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'content'    => $this->content ?? '',
            'parent_id'  => $this->parentId,
            'category'   => $this->category,
            'created_by' => $this->createdBy,
            'update_by'  => $this->updatedBy,
            'created_at' => $this->createdAt?->toIso8601String(),
            'updated_at' => $this->updatedAt?->toIso8601String(),
        ];
    }
}
