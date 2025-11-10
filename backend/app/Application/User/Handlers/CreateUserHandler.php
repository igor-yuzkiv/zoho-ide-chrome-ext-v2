<?php

namespace App\Application\User\Handlers;

use App\Application\User\Command\CreateUserCommand;
use App\Domains\User\DTO\SaveUserDto;
use App\Domains\User\Entities\User;
use App\Domains\User\Repositories\UserRepository;

readonly class CreateUserHandler
{
    public function __construct(private UserRepository $userRepository) {}

    public function __invoke(CreateUserCommand $command): User
    {
        $user = new User(
            id: $this->userRepository->nextIdentifier(),
            name: $command->name,
            email: $command->email,
        );

        return $this->userRepository->save(new SaveUserDto(
            user: $user,
            password: $command->password
        ));
    }
}
