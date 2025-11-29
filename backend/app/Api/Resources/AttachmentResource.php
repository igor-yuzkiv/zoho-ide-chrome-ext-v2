<?php

namespace App\Api\Resources;

use App\Domains\Attachment\Contracts\AttachmentsStorageService;
use App\Domains\Attachment\Entities\Attachment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Attachment */ class AttachmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'file_name'   => $this->fileName,
            'extension'   => $this->extension,
            'mime_type'   => $this->mimeType,
            'size'        => $this->size,
            'role'        => $this->role,
            'entity_ref'  => $this->entityRef?->toArray(),
            'public_link' => app(AttachmentsStorageService::class)->getPublicLink($this->resource),
            'created_at'  => $this->createdAt->toDateTimeString(),
            'updated_at'  => $this->updatedAt->toDateTimeString(),
        ];
    }
}
