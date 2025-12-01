<?php

namespace App\Domains\Tag\Entity;

class Tag
{
    public function __construct(
        public string $id,
        public string $name,
        public ?string $color = null,
    ) {}
}
