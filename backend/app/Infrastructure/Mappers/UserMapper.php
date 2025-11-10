<?php

namespace App\Infrastructure\Mappers;

use App\Domains\User\Entities\User;
use App\Infrastructure\Models\UserModel;

final readonly class UserMapper
{
    public function makeFromModel(UserModel $model): User
    {
        return new User(
            id: $model->id,
            name: $model->name,
            email: $model->email,
        );
    }

    public function mapToModelAttributes(User $user): array
    {
        return [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
        ];
    }

    public function mapToModel(User $user, UserModel $model = new UserModel): UserModel
    {
        $model->fill($this->mapToModelAttributes($user));

        return $model;
    }
}
