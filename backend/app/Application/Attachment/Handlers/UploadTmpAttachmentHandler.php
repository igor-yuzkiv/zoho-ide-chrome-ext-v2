<?php

namespace App\Application\Attachment\Handlers;

use App\Application\Attachment\Command\UploadTmpAttachment;
use App\Domains\Attachment\Contracts\AttachmentsStorageService;
use App\Domains\Attachment\Entities\Attachment;
use App\Domains\Attachment\Repositories\AttachmentRepository;

readonly class UploadTmpAttachmentHandler
{
    public function __construct(
        private AttachmentRepository $attachmentRepository,
        private AttachmentsStorageService $storageService,
    ) {}

    public function __invoke(UploadTmpAttachment $command): Attachment
    {
        $attachment = new Attachment(
            id: $this->attachmentRepository->nextIdentifier(),
            fileName: $command->file->getClientOriginalName(),
            extension: $command->file->getClientOriginalExtension(),
            mimeType: $command->file->getMimeType(),
            size: $command->file->getSize(),
            role: $command->role,
            isTemp: true,
        );

        $this->storageService->upload($attachment, $command->file);

        return $this->attachmentRepository->save($attachment);
    }
}
