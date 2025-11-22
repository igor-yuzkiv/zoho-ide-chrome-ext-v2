<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\DTO\SaveUserDto;
use App\Domains\User\Entities\User;
use App\Shared\DTO\PageResult;
use App\Shared\DTO\PaginationParams;
use App\Shared\DTO\SortParams;

interface UserRepository
{
    public function nextIdentifier(): string;

    /**
     * @return PageResult<User>
     */
    public function paginate(PaginationParams $paginationParams, SortParams $sortParams): PageResult;

    public function find(string $id): ?User;

    public function save(SaveUserDto $dto): User;

    public function delete(string $userId): bool;
}
