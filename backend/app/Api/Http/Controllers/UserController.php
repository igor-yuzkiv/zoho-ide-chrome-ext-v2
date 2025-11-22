<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\User\CreateUserRequest;
use App\Api\Http\Requests\User\UpdateUserRequest;
use App\Api\Resources\UserResource;
use App\Application\User\Handlers\CreateUserHandler;
use App\Application\User\Handlers\RemoveUserHandler;
use App\Application\User\Handlers\UpdateUserHandler;
use App\Domains\User\Repositories\UserRepository;
use App\Shared\Http\Controller;
use Illuminate\Http\JsonResponse;

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
            return $this->noContentResponse();
        }

        return UserResource::collection($pageResult->data)->additional(['meta' => $pageResult->getMetadata()]);
    }

    public function show(string $userId): UserResource|JsonResponse
    {
        $user = $this->userRepository->find($userId);
        if (!$user) {
            return $this->notFoundResponse('User not found');
        }

        return new UserResource($user);
    }

    public function create(CreateUserRequest $request, CreateUserHandler $handler): UserResource
    {
        $user = $handler($request->toCommand());

        return new UserResource($user);
    }

    public function update(string $userId, UpdateUserRequest $request, UpdateUserHandler $handler): UserResource
    {
        $updatedUser = $handler($request->toCommand($userId));

        return new UserResource($updatedUser);
    }

    public function delete(string $userId, RemoveUserHandler $handler): JsonResponse
    {
        $status = $handler($userId);

        return response()->json(compact('status'));
    }
}
