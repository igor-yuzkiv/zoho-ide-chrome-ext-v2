<?php

namespace App\Infrastructure\Mappers;

use App\Domains\Attachment\Entities\Attachment;
use App\Infrastructure\Models\AttachmentModel;
use App\Shared\ValueObjects\EntityRef;

class AttachmentMapper
{
    public function toEntity(AttachmentModel $model): Attachment
    {
        $ref = ($model->entity_name && $model->entity_id) ? new EntityRef(
            entityName: $model->entity_name,
            id: $model->entity_id,
        ) : null;

        return new Attachment(
            id: $model->id,
            fileName: $model->file_name,
            extension: $model->extension,
            entityRef: $ref,
            mimeType: $model->mime_type,
            size: $model->size,
            role: $model->role,
            isTemp: $model->is_temp,
            createdAt: $model->created_at,
            updatedAt: $model->updated_at,
        );
    }

    public function fromEntity(Attachment $attachment, AttachmentModel $model = new AttachmentModel): AttachmentModel
    {
        $model->id = $attachment->id;
        $model->file_name = $attachment->fileName;
        $model->entity_name = $attachment->entityRef?->entityName;
        $model->entity_id = $attachment->entityRef?->id;
        $model->extension = $attachment->extension;
        $model->mime_type = $attachment->mimeType;
        $model->size = $attachment->size;
        $model->role = $attachment->role;
        $model->is_temp = $attachment->isTemp;

        return $model;
    }
}
