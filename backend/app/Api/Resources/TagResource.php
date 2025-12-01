<?php

namespace App\Api\Resources;

use App\Domains\Tag\Entity\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Tag */ class TagResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'color' => $this->color,
        ];
    }
}
