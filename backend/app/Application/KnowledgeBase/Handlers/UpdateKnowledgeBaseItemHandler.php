<?php

namespace App\Application\KnowledgeBase\Handlers;

use App\Application\KnowledgeBase\Commands\SaveKnowledgeBaseItemCommand;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;

readonly class UpdateKnowledgeBaseItemHandler
{
    public function __construct(
        private KnowledgeBaseItemRepository $repository
    ) {}

    public function __invoke(string $itemId, SaveKnowledgeBaseItemCommand $command): KnowledgeBaseItem
    {
        $item = $this->repository->find($itemId);
        if (!$item) {
            throw new \RuntimeException('Knowledge base item not found');
        }

        $item->title = $command->title;
        $item->content = $command->content;
        $item->parentId = $command->parentId;
        $item->updatedBy = $command->user?->id;

        return $this->repository->saveWithTags($item, $command->tagIds);
    }
}
