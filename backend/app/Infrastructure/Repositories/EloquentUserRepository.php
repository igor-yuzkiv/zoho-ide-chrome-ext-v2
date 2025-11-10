<?php

namespace App\Infrastructure\Repositories;

use App\Domains\User\DTO\SaveUserDto;
use App\Domains\User\Entities\User;
use App\Domains\User\Repositories\UserRepository;
use App\Infrastructure\Mappers\UserMapper;
use App\Infrastructure\Models\UserModel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

readonly class EloquentUserRepository implements UserRepository
{
    public function __construct(private UserMapper $mapper) {}

    public function nextIdentifier(): string
    {
        return Str::ulid();
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
}
