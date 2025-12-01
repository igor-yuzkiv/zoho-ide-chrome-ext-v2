<?php

namespace App\Domains\Tag\Repositories;

use App\Application\Tag\Queries\SearchTagsQuery;
use App\Domains\Tag\Entity\Tag;
use Illuminate\Support\Collection;

interface TagRepository
{
    public function nextIdentifier(): string;

    public function save(Tag $tag): Tag;

    /**
     * @return Collection<Tag>
     */
    public function search(SearchTagsQuery $query): Collection;
}
