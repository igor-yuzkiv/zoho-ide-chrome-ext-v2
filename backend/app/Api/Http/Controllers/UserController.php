<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\User\CreateUserRequest;
use App\Api\Resources\UserResource;
use App\Application\User\Handlers\CreateUserHandler;
use App\Shared\Http\Controller;

class UserController extends Controller
{
    public function index() {}

    public function show() {}

    public function create(CreateUserRequest $request, CreateUserHandler $handler): UserResource
    {
        $user = $handler($request->toCommand());

        return new UserResource($user);
    }

    public function update() {}
}
