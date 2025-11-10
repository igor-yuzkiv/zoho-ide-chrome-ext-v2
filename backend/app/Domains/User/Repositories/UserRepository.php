<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\DTO\SaveUserDto;
use App\Domains\User\Entities\User;

interface UserRepository
{
    public function nextIdentifier(): string;

    public function find(string $id): ?User;

    public function save(SaveUserDto $dto): User;
}
