<?php

namespace App\Application\Tag\Commands;

class CreateTagCommand
{
    public function __construct(
        public string $name,
        public ?string $color = '#002eff',
    ) {}
}
