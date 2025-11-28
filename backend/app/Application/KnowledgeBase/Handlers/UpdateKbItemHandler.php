<?php

namespace App\Application\KnowledgeBase\Handlers;

use App\Application\KnowledgeBase\Commands\UpdateKbItemCommand;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;

readonly class UpdateKbItemHandler
{
    public function __construct(
        private KnowledgeBaseItemRepository $repository
    ) {}

    public function __invoke(UpdateKbItemCommand $command): KnowledgeBaseItem
    {
        $item = $this->repository->find($command->id);
        if (!$item) {
            throw new \RuntimeException('Knowledge base item not found');
        }

        $item->title = $command->title;
        $item->content = $command->content;
        $item->parentId = $command->parentId;
        $item->updatedBy = $command->user?->id;

        return $this->repository->save($item);
    }
}
