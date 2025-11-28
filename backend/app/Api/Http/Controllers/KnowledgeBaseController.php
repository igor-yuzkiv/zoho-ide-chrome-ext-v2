<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\KnowledgeBase\SaveKbItemRequest;
use App\Api\Resources\KnowledgeBaseItemResource;
use App\Application\Auth\Contracts\AuthGateway;
use App\Application\KnowledgeBase\Handlers\CreateKbItemHandler;
use App\Application\KnowledgeBase\Handlers\UpdateKbItemHandler;
use App\Shared\Http\Controller;

class KnowledgeBaseController extends Controller
{
    public function __construct(protected AuthGateway $authGateway) {}

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
