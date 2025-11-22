<?php

namespace App\Application\Auth\DTO;

use App\Domains\User\Entities\User;

readonly class UserWithTokenDto
{
    public function __construct(
        public User $user,
        public string $token,
    ) {}
}
