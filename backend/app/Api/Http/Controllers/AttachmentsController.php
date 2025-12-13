<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\Attachments\AttachToEntityRequest;
use App\Api\Http\Requests\Attachments\UploadTmpAttachmentRequest;
use App\Api\Resources\AttachmentResource;
use App\Application\Attachment\Command\AttachToEntity;
use App\Application\Attachment\Handlers\AttachToEntityHandler;
use App\Application\Attachment\Handlers\UploadTmpAttachmentHandler;
use App\Application\Attachment\Queries\GetEntityAttachmentsQuery;
use App\Domains\Attachment\Repositories\AttachmentRepository;
use App\Shared\Http\Controller;
use App\Shared\ValueObjects\EntityRef;

class AttachmentsController extends Controller
{
    public function __construct(private readonly AttachmentRepository $repository) {}

    public function getEntityAttachments(
        string $entity,
        string $entityId,
    ) {
        $query = new GetEntityAttachmentsQuery(
            entityRef: new EntityRef(entityName: $entity, id: $entityId),
            paginationParams: $this->getPaginationParams(),
            sortParams: $this->getSortParams(),
        );

        $pageResult = $this->repository->paginateEntityAttachments($query);

        return AttachmentResource::collection($pageResult->data)->additional(['meta' => $pageResult->getMetadata()]);
    }

    public function attachToEntity(
        string $entityName,
        string $entityId,
        AttachToEntityRequest $request,
        AttachToEntityHandler $handler,
    ) {
        $command = new AttachToEntity(
            entityRef: new EntityRef(entityName: $entityName, id: $entityId),
            file: $request->file('file'),
            role: $request->input('role'),
        );

        return new AttachmentResource($handler($command));
    }

    public function uploadTmpAttachment(UploadTmpAttachmentRequest $request, UploadTmpAttachmentHandler $handler)
    {
        $command = $request->toCommand();

        return new AttachmentResource($handler($command));
    }
}
