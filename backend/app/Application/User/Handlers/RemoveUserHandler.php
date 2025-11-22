<?php

namespace App\Application\User\Handlers;

use App\Domains\User\Repositories\UserRepository;

readonly class RemoveUserHandler
{
    public function __construct(private UserRepository $userRepository) {}

    public function __invoke(string $userId): bool
    {
        return $this->userRepository->delete($userId);
    }
}
