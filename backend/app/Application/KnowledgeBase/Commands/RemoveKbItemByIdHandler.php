<?php

namespace App\Application\KnowledgeBase\Commands;

use App\Application\Attachment\Handlers\RemoveEntityAttachmentsHandler;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;

readonly class RemoveKbItemByIdHandler
{
    public function __construct(
        private KnowledgeBaseItemRepository $kbItemRepository,
        private RemoveEntityAttachmentsHandler $removeAttachmentsHandler,
    ) {}

    public function __invoke(KnowledgeBaseItem $item): bool
    {
        $this->removeAttachments($item);

        return $this->kbItemRepository->deleteById($item->id);
    }

    private function removeAttachments(KnowledgeBaseItem $item): void
    {
        ($this->removeAttachmentsHandler)($item->getEntityRef());
    }
}
