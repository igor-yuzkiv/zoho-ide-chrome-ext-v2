<?php

namespace App\Domains\User\Entities;

class User
{
    public function __construct(
        public string $id,
        public string $name,
        public string $email,
    ) {}
}
