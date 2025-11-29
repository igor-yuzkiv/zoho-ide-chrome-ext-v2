<?php

namespace App\Application\Attachment\Handlers;

use App\Application\Attachment\Command\AttachToEntity;
use App\Domains\Attachment\Contracts\AttachmentsStorageService;
use App\Domains\Attachment\Entities\Attachment;
use App\Domains\Attachment\Repositories\AttachmentRepository;

readonly class AttachToEntityHandler
{
    public function __construct(
        private AttachmentRepository $attachmentRepository,
        private AttachmentsStorageService $storageService,
    ) {}

    public function __invoke(AttachToEntity $command): Attachment
    {
        $attachment = new Attachment(
            id: $this->attachmentRepository->nextIdentifier(),
            fileName: $command->file->getClientOriginalName(),
            extension: $command->file->getClientOriginalExtension(),
            entityRef: $command->entityRef,
            mimeType: $command->file->getMimeType(),
            size: $command->file->getSize(),
            role: $command->role,
        );

        $this->storageService->upload($attachment, $command->file);

        return $this->attachmentRepository->save($attachment);
    }
}
