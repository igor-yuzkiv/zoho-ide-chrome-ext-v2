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

    public function paginate(PaginationParams $paginationParams, SortParams $sortParams): PageResult
    {
        $result = KnowledgeBaseItemModel::query()
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
        $model = KnowledgeBaseItemModel::find($id);

        if (!$model) {
            return null;
        }

        return $this->mapper->makeFromModel($model);
    }

    public function save(KnowledgeBaseItem $item): KnowledgeBaseItem
    {
        $attributes = $this->mapper->mapToModelAttributes($item);

        $model = KnowledgeBaseItemModel::updateOrCreate(
            ['id' => $item->id],
            $attributes
        );

        return $this->mapper->makeFromModel($model);
    }
}
