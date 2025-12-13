<?php

namespace App\Application\Attachment\Handlers;

use App\Domains\Attachment\Contracts\AttachmentsStorageService;
use App\Domains\Attachment\Repositories\AttachmentRepository;
use App\Shared\ValueObjects\EntityRef;

readonly class RemoveEntityAttachmentsHandler
{
    public function __construct(private AttachmentRepository $repository, private AttachmentsStorageService $storageService) {}

    public function __invoke(EntityRef $entityRef): void
    {
        $attachments = $this->repository->getEntityAttachments($entityRef);
        if ($attachments->isEmpty()) {
            return;
        }

        $this->storageService->deleteMany($attachments);
        $this->repository->deleteEntityAttachments($entityRef);
    }
}
