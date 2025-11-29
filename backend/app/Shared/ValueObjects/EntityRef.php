<?php

namespace App\Shared\ValueObjects;

use Illuminate\Contracts\Support\Arrayable;

final class EntityRef implements Arrayable
{
    public function __construct(
        public string $entityName,
        public string $id,
    ) {}

    public function toArray(): array
    {
        return [
            'entity_name' => $this->entityName,
            'id'          => $this->id,
        ];
    }
}
