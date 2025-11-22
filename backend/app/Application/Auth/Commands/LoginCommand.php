<?php

namespace App\Application\Auth\Commands;

readonly class LoginCommand
{
    public function __construct(
        public string $email,
        public string $password,
        public bool $remember = false,
    ) {}
}
