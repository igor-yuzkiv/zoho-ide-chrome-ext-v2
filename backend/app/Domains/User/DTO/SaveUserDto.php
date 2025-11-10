<?php

namespace App\Domains\User\DTO;

use App\Domains\User\Entities\User;

readonly class SaveUserDto
{
    public function __construct(
        public User $user,
        public ?string $password = null
    ) {}
}
