<?php

namespace App\Application\Auth\Handlers;

use App\Application\Auth\Commands\LoginCommand;
use App\Application\Auth\Contracts\AuthGateway;
use App\Application\Auth\DTO\UserWithTokenDto;
use App\Application\Auth\Exceptions\LoginException;

readonly class LoginHandler
{
    public function __construct(private AuthGateway $authGateway) {}

    public function __invoke(LoginCommand $command): UserWithTokenDto
    {
        if (!$this->authGateway->attempt($command)) {
            throw new LoginException;
        }

        $user = $this->authGateway->user();
        $token = $this->authGateway->createToken($user);

        return new UserWithTokenDto(user: $user, token: $token);
    }
}
