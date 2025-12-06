<?php

namespace App\Api\Resources;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItemWithRelations;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin KnowledgeBaseItemWithRelations */ class KnowledgeBaseItemWithRelationsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->item->id,
            'title'      => $this->item->title,
            'content'    => $this->item->content ?? '',
            'parent_id'  => $this->item->parentId,
            'created_by' => $this->item->createdBy,
            'update_by'  => $this->item->updatedBy,
            'created_at' => $this->item->createdAt?->toIso8601String(),
            'updated_at' => $this->item->updatedAt?->toIso8601String(),

            'tags'            => TagResource::collection($this->tags),
            'created_by_user' => $this->createdBy ? new UserResource($this->createdBy) : null,
            'updated_by_user' => $this->updatedBy ? new UserResource($this->updatedBy) : null,
        ];
    }
}
