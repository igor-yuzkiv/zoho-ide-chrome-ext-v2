<?php

namespace App\Api\Http\Controllers\KnowledgeBase;

use App\Api\Http\Requests\KnowledgeBase\CreateKbItemFromTemplateRequest;
use App\Api\Http\Requests\KnowledgeBase\SaveKbItemRequest;
use App\Api\Resources\KnowledgeBase\KnowledgeBaseItemResource;
use App\Api\Resources\KnowledgeBase\KnowledgeBaseItemWithRelationsResource;
use App\Application\Auth\Contracts\AuthGateway;
use App\Application\KnowledgeBase\Commands\RemoveKbItemByIdHandler;
use App\Application\KnowledgeBase\Handlers\CreateKbItemFromTemplateHandler;
use App\Application\KnowledgeBase\Handlers\CreateKbItemHandler;
use App\Application\KnowledgeBase\Handlers\UpdateKbItemHandler;
use App\Application\KnowledgeBase\Queries\SearchKnowledgeBaseItemsQuery;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseTemplateRepository;
use App\Shared\Http\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class KnowledgeBaseController extends Controller
{
    public function __construct(
        protected AuthGateway $authGateway,
        protected KnowledgeBaseItemRepository $kbItemRepository,
        protected KnowledgeBaseTemplateRepository $templateRepository
    ) {}

    public function index(): AnonymousResourceCollection|JsonResponse
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

    public function search(Request $request): AnonymousResourceCollection|JsonResponse
    {
        $searchTerm = $request->input('search_term', '');

        $pageResult = $this->kbItemRepository->search(
            new SearchKnowledgeBaseItemsQuery(
                searchTerm: $searchTerm,
                paginationParams: $this->getPaginationParams(),
            )
        );

        if ($pageResult->isEmpty()) {
            return $this->noContentResponse();
        }

        return KnowledgeBaseItemResource::collection($pageResult->data)->additional([
            'meta'        => $pageResult->getMetadata(),
            'search_term' => $searchTerm,
        ]);
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

    public function createFromTemplate(string $templateId, CreateKbItemFromTemplateRequest $request, CreateKbItemFromTemplateHandler $handler): KnowledgeBaseItemResource|JsonResponse
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

    public function deleteById(string $id, RemoveKbItemByIdHandler $handler): JsonResponse
    {
        $item = $this->kbItemRepository->find($id);
        if (!$item) {
            return $this->noContentResponse('Article not found');
        }

        $status = $handler($item);

        return response()->json([
            'status'  => $status,
            'message' => $status ? 'Article deleted successfully' : 'Failed to delete article',
        ]);
    }
}
