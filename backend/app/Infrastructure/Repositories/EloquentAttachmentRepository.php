<?php

namespace App\Infrastructure\Repositories;

use App\Application\Attachment\Queries\GetEntityAttachmentsQuery;
use App\Domains\Attachment\Entities\Attachment;
use App\Domains\Attachment\Repositories\AttachmentRepository;
use App\Infrastructure\Mappers\AttachmentMapper;
use App\Infrastructure\Models\AttachmentModel;
use App\Shared\DTO\PageResult;
use App\Shared\ValueObjects\EntityRef;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class EloquentAttachmentRepository implements AttachmentRepository
{
    public function __construct(private readonly AttachmentMapper $mapper) {}

    public function nextIdentifier(): string
    {
        return Str::ulid();
    }

    public function save(Attachment $attachment): Attachment
    {
        $model = $this->mapper->fromEntity($attachment);
        $model = $model->updateOrCreate(['id' => $attachment->id], $model->toArray());

        return $this->mapper->toEntity($model);
    }

    public function linkTmpAttachmentsToEntity(array $attachmentIds, EntityRef $entityRef): Collection
    {
        $models = AttachmentModel::query()
            ->whereIn('id', $attachmentIds)
            ->where('is_temp', true)
            ->get();

        if ($models->isEmpty()) {
            return collect();
        }

        $result = collect();
        foreach ($models as $model) {
            $model->is_temp = false;
            $model->entity_name = $entityRef->entityName;
            $model->entity_id = $entityRef->id;
            $model->save();
            $result->push($this->mapper->toEntity($model));
        }

        return $result;
    }

    public function paginateEntityAttachments(GetEntityAttachmentsQuery $query): PageResult
    {
        $result = AttachmentModel::query()
            ->where('entity_id', $query->entityRef->id)
            ->where('entity_name', $query->entityRef->entityName)
            ->orderBy($query->sortParams->field, $query->sortParams->direction)
            ->paginate(
                perPage: $query->paginationParams->perPage,
                page: $query->paginationParams->page,
            );

        $attachments = $result->getCollection()
            ->map(fn (AttachmentModel $model) => $this->mapper->toEntity($model));

        return new PageResult(
            data: $attachments,
            page: $result->currentPage(),
            perPage: $result->perPage(),
            total: $result->total(),
            lastPage: $result->lastPage(),
            hasMore: $result->hasMorePages(),
        );
    }

    public function getEntityAttachments(EntityRef $entityRef): Collection
    {
        $models = AttachmentModel::query()
            ->where('entity_id', $entityRef->id)
            ->where('entity_name', $entityRef->entityName)
            ->get();

        return $models->map(fn (AttachmentModel $model) => $this->mapper->toEntity($model));
    }

    public function deleteEntityAttachments(EntityRef $entityRef): void
    {
        AttachmentModel::query()
            ->where('entity_id', $entityRef->id)
            ->where('entity_name', $entityRef->entityName)
            ->delete();
    }
}
