<?php

namespace App\Application\User\Command;

readonly class UpdateUserCommand
{
    public function __construct(
        public string $userId,
        public string $name,
        public string $email,
    ) {}
}
