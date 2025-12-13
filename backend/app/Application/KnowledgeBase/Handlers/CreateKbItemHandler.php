<?php

namespace App\Application\KnowledgeBase\Handlers;

use App\Application\KnowledgeBase\Commands\SaveKbItemCommand;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;

readonly class CreateKbItemHandler
{
    public function __construct(
        private KnowledgeBaseItemRepository $repository
    ) {}

    public function __invoke(SaveKbItemCommand $command): KnowledgeBaseItem
    {
        $item = new KnowledgeBaseItem(
            id: $this->repository->nextIdentifier(),
            title: $command->title,
            content: $command->content,
            parentId: $command->parentId,
            category: $command->category,
            createdBy: $command->user?->id,
        );

        return $this->repository->saveWithTags($item, $command->tagIds);
    }
}
