<?php

namespace App\Domains\Attachment\Contracts;

use App\Domains\Attachment\Entities\Attachment;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface AttachmentsStorageService
{
    public function upload(Attachment $attachment, UploadedFile $file): bool;

    public function isAttachmentFileExists(Attachment $attachment): bool;

    public function getPublicLink(Attachment $attachment): string;
}
