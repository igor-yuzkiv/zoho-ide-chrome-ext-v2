<?php

namespace App\Infrastructure\Services\Attachments;

use App\Domains\Attachment\Contracts\AttachmentsStorageService;
use App\Domains\Attachment\Entities\Attachment;
use App\Infrastructure\Services\Attachments\Exceptions\UploadFailedException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class LocalAttachmentsStorageService implements AttachmentsStorageService
{
    public function upload(Attachment $attachment, UploadedFile $file): bool
    {
        Storage::disk('attachments')->putFileAs(
            path: '',
            file: $file,
            name: $attachment->id.'.'.$attachment->extension,
        );

        if (!$this->isAttachmentFileExists($attachment)) {
            throw new UploadFailedException('Failed to upload attachment file.');
        }

        return true;
    }

    public function isAttachmentFileExists(Attachment $attachment): bool
    {
        return Storage::disk('attachments')->exists($attachment->id.'.'.$attachment->extension);
    }

    public function getPublicLink(Attachment $attachment): string
    {
        return url('/attachments/'.$attachment->id.'.'.$attachment->extension);
    }

    public function delete(Attachment $attachment): bool
    {
        if ($this->isAttachmentFileExists($attachment)) {
            return Storage::disk('attachments')->delete($attachment->id.'.'.$attachment->extension);
        }
        return false;
    }

    /**
     * @param  Collection<int, Attachment>  $attachments
     */
    public function deleteMany(Collection $attachments): void
    {
        $attachments->each(fn (Attachment $attachment) => $this->delete($attachment));
    }
}
