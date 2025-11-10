<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\User\CreateUserRequest;
use App\Api\Resources\UserResource;
use App\Application\User\Handlers\CreateUserHandler;
use App\Domains\User\Repositories\UserRepository;
use App\Shared\Http\Controller;

class UserController extends Controller
{
    public function __construct(private readonly UserRepository $userRepository) {}

    public function index()
    {
        $pageResult = $this->userRepository->paginate(
            paginationParams: $this->getPaginationParams(),
            sortParams: $this->getSortParams(),
        );

        if ($pageResult->isEmpty()) {
            return response()->noContent();
        }

        return UserResource::collection($pageResult->data)->additional(['meta' => $pageResult->getMetadata()]);
    }

    public function show() {}

    public function create(CreateUserRequest $request, CreateUserHandler $handler): UserResource
    {
        $user = $handler($request->toCommand());

        return new UserResource($user);
    }

    public function update() {}
}
