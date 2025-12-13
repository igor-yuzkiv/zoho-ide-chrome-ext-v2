<?php

namespace App\Domains\Attachment\Repositories;

use App\Application\Attachment\Queries\GetEntityAttachmentsQuery;
use App\Domains\Attachment\Entities\Attachment;
use App\Shared\DTO\PageResult;
use App\Shared\ValueObjects\EntityRef;
use Illuminate\Support\Collection;

interface AttachmentRepository
{
    public function nextIdentifier(): string;

    public function save(Attachment $attachment): Attachment;

    /**
     * @return Collection<int, Attachment>
     */
    public function linkTmpAttachmentsToEntity(array $attachmentIds, EntityRef $entityRef): Collection;

    /**
     * @return PageResult<Attachment>
     */
    public function paginateEntityAttachments(GetEntityAttachmentsQuery $query): PageResult;

    /**
     * @return Collection<int, Attachment>
     */
    public function getEntityAttachments(EntityRef $entityRef): Collection;

    public function deleteEntityAttachments(EntityRef $entityRef): void;
}
