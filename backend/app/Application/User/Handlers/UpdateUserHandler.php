<?php

namespace App\Application\User\Handlers;

use App\Application\User\Command\UpdateUserCommand;
use App\Domains\User\DTO\SaveUserDto;
use App\Domains\User\Entities\User;
use App\Domains\User\Repositories\UserRepository;

readonly class UpdateUserHandler
{
    public function __construct(private UserRepository $userRepository) {}

    public function __invoke(UpdateUserCommand $command): User
    {
        $user = $this->userRepository->find($command->userId);
        if (!$user) {
            throw new \RuntimeException('User not found');
        }

        $user->name = $command->name;
        $user->email = $command->email;

        $this->userRepository->save(new SaveUserDto(user: $user));

        return $user;
    }
}
