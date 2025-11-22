<?php

namespace App\Infrastructure\Auth;

use App\Application\Auth\Commands\LoginCommand;
use App\Application\Auth\Contracts\AuthGateway;
use App\Domains\User\Entities\User;
use App\Infrastructure\Mappers\UserMapper;
use App\Infrastructure\Models\UserModel;
use Illuminate\Support\Facades\Auth;

readonly class LaravelAuthGateway implements AuthGateway
{
    public function __construct(private UserMapper $userMapper) {}

    public function attempt(LoginCommand $command): bool
    {
        return Auth::attempt([
            'email'    => $command->email,
            'password' => $command->password,
        ], $command->remember);
    }

    public function id(): ?string
    {
        return Auth::id();
    }

    public function user(): ?User
    {
        $userModel = Auth::user();
        if (!$userModel) {
            return null;
        }

        return $this->userMapper->makeFromModel($userModel);
    }

    public function createToken(User $user): string
    {
        $userModel = UserModel::findOrFail($user->id);

        return $userModel->createToken('auth_token')->plainTextToken;
    }
}
