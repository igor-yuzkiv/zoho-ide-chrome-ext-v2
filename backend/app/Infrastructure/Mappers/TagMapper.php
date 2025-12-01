<?php

namespace App\Infrastructure\Mappers;

use App\Domains\Tag\Entity\Tag;
use App\Infrastructure\Models\TagModel;
use Illuminate\Support\Collection;

class TagMapper
{
    public function toEntity(TagModel $model): Tag
    {
        return new Tag(
            id: $model->id,
            name: $model->name,
            color: $model->color,
        );
    }

    /**
     * @param  Collection<TagModel>  $models
     * @return Collection<Tag>
     */
    public function toEntityCollection(Collection $models): Collection
    {
        return $models->map(fn (TagModel $model) => $this->toEntity($model));
    }

    public function fromEntity(Tag $tag, TagModel $model = new TagModel): TagModel
    {
        $model->id = $tag->id;
        $model->name = $tag->name;
        $model->color = $tag->color;

        return $model;
    }
}
