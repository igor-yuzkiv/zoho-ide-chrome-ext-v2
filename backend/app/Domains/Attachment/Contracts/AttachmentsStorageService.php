<?php

namespace App\Domains\Attachment\Contracts;

use App\Domains\Attachment\Entities\Attachment;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface AttachmentsStorageService
{
    public function upload(Attachment $attachment, UploadedFile $file): bool;

    public function isAttachmentFileExists(Attachment $attachment): bool;

    public function getPublicLink(Attachment $attachment): string;

    public function delete(Attachment $attachment): bool;

    /**
     * @param  Collection<int, Attachment>  $attachmentIds
     */
    public function deleteMany(Collection $attachments): void;
}
