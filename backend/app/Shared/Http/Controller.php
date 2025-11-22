<?php

namespace App\Shared\Http;

use App\Shared\DTO\PaginationParams;
use App\Shared\DTO\SortParams;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

abstract class Controller
{
    protected function getPaginationParams(): PaginationParams
    {
        return new PaginationParams(
            page: request()->input('page', 1),
            perPage: request()->input('per_page', 10),
        );
    }

    protected function getSortParams(): SortParams
    {
        return new SortParams(
            field: request()->input('sort_by', 'updated_at'),
            direction: request()->input('sort_order', 'desc'),
        );
    }

    public function notFoundResponse(string $message = 'Resource Not Found'): JsonResponse
    {
        return response()->json(['message' => $message], Response::HTTP_NOT_FOUND);
    }

    public function noContentResponse(string $message = 'No Content'): JsonResponse
    {
        return response()->json(['message' => $message], Response::HTTP_NO_CONTENT);
    }

    public function serverErrorResponse(string $message = 'Internal Server Error'): JsonResponse
    {
        return response()->json(['message' => $message], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function validationErrorResponse(string $message = 'Validation Error', array $errors = []): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'errors'  => $errors,
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function unauthorizedResponse(string $message = 'Unauthorized'): JsonResponse
    {
        return response()->json(['message' => $message], Response::HTTP_UNAUTHORIZED);
    }
}
