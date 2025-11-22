<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\Auth\LoginRequest;
use App\Api\Resources\UserResource;
use App\Application\Auth\Contracts\AuthGateway;
use App\Application\Auth\Exceptions\LoginException;
use App\Application\Auth\Handlers\LoginHandler;
use App\Shared\Http\Controller;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(protected AuthGateway $authRepository) {}

    public function login(LoginRequest $request, LoginHandler $handler): UserResource|JsonResponse
    {
        try {
            $userWithToken = $handler($request->toCommand());

            $response = new UserResource($userWithToken->user);
            $response->additional(['token' => $userWithToken->token]);

            return $response;
        } catch (LoginException $e) {
            return $this->validationErrorResponse($e->getMessage());
        }
    }

    public function me()
    {
        $user = $this->authRepository->user();
        if (!$user) {
            return $this->unauthorizedResponse();
        }

        return new UserResource($user);
    }
}
