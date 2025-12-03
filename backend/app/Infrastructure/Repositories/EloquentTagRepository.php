<?php

namespace App\Infrastructure\Repositories;

use App\Application\Tag\Queries\SearchTagsQuery;
use App\Domains\Tag\Entity\Tag;
use App\Domains\Tag\Repositories\TagRepository;
use App\Infrastructure\Mappers\TagMapper;
use App\Infrastructure\Models\TagModel;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class EloquentTagRepository implements TagRepository
{
    public function __construct(private readonly TagMapper $mapper) {}

    public function nextIdentifier(): string
    {
        return Str::ulid();
    }

    public function search(SearchTagsQuery $query): Collection
    {
        $models = TagModel::search($query->searchTerm)
            ->take($query->limit)
            ->get();

        return $this->mapper->toEntityCollection($models);
    }

    public function save(Tag $tag): Tag
    {
        $model = $this->mapper->mapToModel($tag);
        $model->updateOrCreate(['id' => $tag->id], $model->toArray());

        return $this->mapper->makeFromModel($model);
    }
}
