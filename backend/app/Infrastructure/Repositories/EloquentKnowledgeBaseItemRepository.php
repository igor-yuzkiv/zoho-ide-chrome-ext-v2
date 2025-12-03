<?php

namespace App\Infrastructure\Repositories;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use App\Infrastructure\Mappers\KnowledgeBaseItemMapper;
use App\Infrastructure\Models\KnowledgeBaseItemModel;
use App\Shared\DTO\PageResult;
use App\Shared\DTO\PaginationParams;
use App\Shared\DTO\SortParams;
use Illuminate\Support\Str;

readonly class EloquentKnowledgeBaseItemRepository implements KnowledgeBaseItemRepository
{
    public function __construct(private KnowledgeBaseItemMapper $mapper) {}

    public function nextIdentifier(): string
    {
        return Str::ulid();
    }

    public function list(PaginationParams $paginationParams, SortParams $sortParams): PageResult
    {
        $result = KnowledgeBaseItemModel::query()
            ->select(['id', 'title', 'parent_id', 'created_at', 'updated_at'])
            ->orderBy($sortParams->field, $sortParams->direction)
            ->paginate(
                perPage: $paginationParams->perPage,
                page: $paginationParams->page,
            );

        $data = $result->getCollection()->map(fn (KnowledgeBaseItemModel $model) => $this->mapper->makeFromModel($model));

        return new PageResult(
            data: $data,
            page: $result->currentPage(),
            perPage: $result->perPage(),
            total: $result->total(),
            lastPage: $result->lastPage(),
            hasMore: $result->hasMorePages(),
        );
    }

    public function find(string $id): ?KnowledgeBaseItem
    {
        $model = KnowledgeBaseItemModel::query()
            ->with(['tags'])
            ->find($id);

        if (!$model) {
            return null;
        }

        return $this->mapper->makeFromModel($model);
    }

    private function updateOrCreate(KnowledgeBaseItem $item): KnowledgeBaseItemModel
    {
        $attributes = $this->mapper->mapToModelAttributes($item);

        return KnowledgeBaseItemModel::updateOrCreate(
            ['id' => $item->id],
            $attributes
        );
    }

    public function save(KnowledgeBaseItem $item): KnowledgeBaseItem
    {
        $model = $this->updateOrCreate($item);

        return $this->mapper->makeFromModel($model);
    }

    public function saveWithTags(KnowledgeBaseItem $item, array $tagIds): KnowledgeBaseItem
    {
        $model = $this->updateOrCreate($item);
        $model->tags()->sync($tagIds);

        return $this->mapper->makeFromModel($model->load('tags'));
    }

    public function deleteById(string $id): bool
    {
        $deleted = KnowledgeBaseItemModel::query()
            ->where('id', $id)
            ->delete();

        return $deleted > 0;
    }
}
