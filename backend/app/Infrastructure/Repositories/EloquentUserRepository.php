<?php

namespace App\Infrastructure\Repositories;

use App\Domains\User\DTO\SaveUserDto;
use App\Domains\User\Entities\User;
use App\Domains\User\Repositories\UserRepository;
use App\Infrastructure\Mappers\UserMapper;
use App\Infrastructure\Models\UserModel;
use App\Shared\DTO\PageResult;
use App\Shared\DTO\PaginationParams;
use App\Shared\DTO\SortParams;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

readonly class EloquentUserRepository implements UserRepository
{
    public function __construct(private UserMapper $mapper) {}

    public function nextIdentifier(): string
    {
        return Str::ulid();
    }

    public function paginate(PaginationParams $paginationParams, SortParams $sortParams): PageResult
    {
        $result = UserModel::query()
            ->orderBy($sortParams->field, $sortParams->direction)
            ->paginate(
                perPage: $paginationParams->perPage,
                page: $paginationParams->page,
            );

        $users = $result->getCollection()->map(fn (UserModel $model) => $this->mapper->makeFromModel($model));

        return new PageResult(
            data: $users,
            page: $result->currentPage(),
            perPage: $result->perPage(),
            total: $result->total(),
            lastPage: $result->lastPage(),
            hasMore: $result->hasMorePages(),
        );
    }

    public function find(string $id): ?User
    {
        $model = UserModel::find($id);
        if (!$model) {
            return null;
        }

        return $this->mapper->makeFromModel($model);
    }

    public function save(SaveUserDto $dto): User
    {
        $attributes = $this->mapper->mapToModelAttributes($dto->user);
        if ($dto->password) {
            $attributes['password'] = Hash::make($dto->password);
        }

        $model = UserModel::updateOrCreate(['id' => $dto->user->id], $attributes);

        return $this->mapper->makeFromModel($model);
    }

    public function delete(string $userId): bool
    {
        return UserModel::where('id', $userId)->delete() > 0;
    }
}
