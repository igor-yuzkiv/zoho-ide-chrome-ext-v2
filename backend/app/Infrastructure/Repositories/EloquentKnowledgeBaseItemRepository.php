<?php

namespace App\Infrastructure\Repositories;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use App\Infrastructure\Mappers\KnowledgeBaseItemMapper;
use App\Infrastructure\Models\KnowledgeBaseItemModel;
use Illuminate\Support\Str;

readonly class EloquentKnowledgeBaseItemRepository implements KnowledgeBaseItemRepository
{
    public function __construct(private KnowledgeBaseItemMapper $mapper) {}

    public function nextIdentifier(): string
    {
        return Str::ulid();
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
