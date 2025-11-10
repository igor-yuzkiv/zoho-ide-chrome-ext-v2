<?php

namespace App\Shared\DTO;

class SortParams
{
    public function __construct(
        public string $field = 'created_at',
        public string $direction = 'desc',
    ) {}
}
