<?php

namespace App\Api\Http\Controllers\KnowledgeBase;

use App\Api\Http\Requests\KnowledgeBase\SaveKnowledgeBaseItemRequest;
use App\Api\Resources\KnowledgeBase\KnowledgeBaseItemWithRelationsResource;
use App\Api\Resources\KnowledgeBase\KnowledgeBaseItemResource;
use App\Application\Auth\Contracts\AuthGateway;
use App\Application\KnowledgeBase\Handlers\CreateKnowledgeBaseItemHandler;
use App\Application\KnowledgeBase\Handlers\UpdateKnowledgeBaseItemHandler;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use App\Shared\Http\Controller;
use Illuminate\Http\JsonResponse;

class KnowledgeBaseController extends Controller
{
    public function __construct(
        protected AuthGateway $authGateway,
        protected KnowledgeBaseItemRepository $kbItemRepository
    ) {}

    public function index()
    {
        $pageResult = $this->kbItemRepository->list(
            paginationParams: $this->getPaginationParams(),
            sortParams: $this->getSortParams(),
        );

        if ($pageResult->isEmpty()) {
            return $this->noContentResponse();
        }

        return KnowledgeBaseItemResource::collection($pageResult->data)->additional(['meta' => $pageResult->getMetadata()]);
    }

    public function show(string $itemId): KnowledgeBaseItemWithRelationsResource|JsonResponse
    {
        $item = $this->kbItemRepository->findWithRelations($itemId);
        if (!$item) {
            return $this->noContentResponse('Article not found');
        }

        return new KnowledgeBaseItemWithRelationsResource($item);
    }

    public function create(SaveKnowledgeBaseItemRequest $request, CreateKnowledgeBaseItemHandler $handler): KnowledgeBaseItemResource
    {
        $command = $request->toCommand($this->authGateway->user());
        $item = $handler($command);

        return new KnowledgeBaseItemResource($item);
    }

    public function update(string $itemId, SaveKnowledgeBaseItemRequest $request, UpdateKnowledgeBaseItemHandler $handler): KnowledgeBaseItemResource
    {
        $command = $request->toCommand($this->authGateway->user());
        $item = $handler($itemId, $command);

        return new KnowledgeBaseItemResource($item);
    }

    public function deleteById(string $id): JsonResponse
    {
        $deleted = $this->kbItemRepository->deleteById($id);
        if (!$deleted) {
            return $this->noContentResponse('Article not found');
        }

        return $this->successResponse([
            'status'  => 'success',
            'message' => 'Article deleted successfully',
        ]);
    }
}
