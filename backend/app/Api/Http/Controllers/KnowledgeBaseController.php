<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\KnowledgeBase\SaveKbItemRequest;
use App\Api\Resources\KnowledgeBaseItemResource;
use App\Application\Auth\Contracts\AuthGateway;
use App\Application\KnowledgeBase\Handlers\CreateKbItemHandler;
use App\Application\KnowledgeBase\Handlers\UpdateKbItemHandler;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use App\Shared\Http\Controller;

class KnowledgeBaseController extends Controller
{
    public function __construct(
        protected AuthGateway $authGateway,
        protected KnowledgeBaseItemRepository $kbItemRepository
    ) {}

    public function index()
    {
        $pageResult = $this->kbItemRepository->paginate(
            paginationParams: $this->getPaginationParams(),
            sortParams: $this->getSortParams(),
        );

        if ($pageResult->isEmpty()) {
            return $this->noContentResponse();
        }

        return KnowledgeBaseItemResource::collection($pageResult->data)->additional(['meta' => $pageResult->getMetadata()]);
    }

    public function show(string $itemId): KnowledgeBaseItemResource
    {
        $item = $this->kbItemRepository->find($itemId);
        if (!$item) {
            return $this->noContentResponse('Article not found');
        }

        return new KnowledgeBaseItemResource($item);
    }

    public function create(SaveKbItemRequest $request, CreateKbItemHandler $handler): KnowledgeBaseItemResource
    {
        $command = $request->toCreateCommand($this->authGateway->user());
        $item = $handler($command);

        return new KnowledgeBaseItemResource($item);
    }

    public function update(string $itemId, SaveKbItemRequest $request, UpdateKbItemHandler $handler): KnowledgeBaseItemResource
    {
        $command = $request->toUpdateCommand($itemId, $this->authGateway->user());
        $item = $handler($command);

        return new KnowledgeBaseItemResource($item);
    }
}
