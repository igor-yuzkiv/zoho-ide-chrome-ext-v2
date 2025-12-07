<?php

namespace App\Api\Http\Controllers\KnowledgeBase;

use App\Api\Http\Requests\KnowledgeBase\CreateKbItemFromTemplateRequest;
use App\Api\Http\Requests\KnowledgeBase\SaveKbItemRequest;
use App\Api\Resources\KnowledgeBase\KnowledgeBaseItemResource;
use App\Api\Resources\KnowledgeBase\KnowledgeBaseItemWithRelationsResource;
use App\Application\Auth\Contracts\AuthGateway;
use App\Application\KnowledgeBase\Handlers\CreateKbItemFromTemplateHandler;
use App\Application\KnowledgeBase\Handlers\CreateKbItemHandler;
use App\Application\KnowledgeBase\Handlers\UpdateKbItemHandler;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseTemplateRepository;
use App\Shared\Http\Controller;
use Illuminate\Http\JsonResponse;

class KnowledgeBaseController extends Controller
{
    public function __construct(
        protected AuthGateway $authGateway,
        protected KnowledgeBaseItemRepository $kbItemRepository,
        protected KnowledgeBaseTemplateRepository $templateRepository
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

    public function create(SaveKbItemRequest $request, CreateKbItemHandler $handler): KnowledgeBaseItemResource
    {
        $command = $request->toCommand($this->authGateway->user());
        $item = $handler($command);

        return new KnowledgeBaseItemResource($item);
    }

    public function createFromTemplate(string $templateId, CreateKbItemFromTemplateRequest $request, CreateKbItemFromTemplateHandler $handler)
    {
        $template = $this->templateRepository->find($templateId);
        if (!$template) {
            return $this->noContentResponse('Template not found');
        }

        $command = $request->toCommand($template, $this->authGateway->user());
        $item = $handler($command);

        return new KnowledgeBaseItemResource($item);
    }

    public function update(string $itemId, SaveKbItemRequest $request, UpdateKbItemHandler $handler): KnowledgeBaseItemResource
    {
        $command = $request->toCommand($this->authGateway->user());
        $item = $handler($itemId, $command);

        return new KnowledgeBaseItemResource($item);
    }

    public function deleteById(string $id): JsonResponse
    {
        $status = $this->kbItemRepository->deleteById($id);

        return response()->json([
            'status'  => $status,
            'message' => $status ? 'Article deleted successfully' : 'Article not found',
        ]);
    }
}
