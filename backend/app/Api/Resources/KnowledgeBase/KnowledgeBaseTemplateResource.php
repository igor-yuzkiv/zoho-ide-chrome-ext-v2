<?php

namespace App\Api\Resources\KnowledgeBase;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseTemplate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin KnowledgeBaseTemplate */ class KnowledgeBaseTemplateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'key'      => $this->key,
            'name'     => $this->name,
            'content'  => $this->content,
            'category' => $this->category?->value,
        ];
    }
}
