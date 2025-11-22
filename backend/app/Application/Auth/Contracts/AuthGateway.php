<?php

namespace App\Application\Auth\Contracts;

use App\Application\Auth\Commands\LoginCommand;
use App\Domains\User\Entities\User;

interface AuthGateway
{
    public function attempt(LoginCommand $command): bool;

    public function id(): ?string;

    public function user(): ?User;

    public function createToken(User $user): string;
}
