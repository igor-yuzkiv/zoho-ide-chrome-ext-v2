<?php

namespace App\Application\Tag\Handlers;

use App\Application\Tag\Queries\SearchTagsQuery;
use App\Domains\Tag\Entity\Tag;
use App\Domains\Tag\Repositories\TagRepository;
use Illuminate\Support\Collection;

readonly class SearchTagsHandler
{
    public function __construct(private TagRepository $tagRepository) {}

    /**
     * @return Collection<Tag>
     */
    public function __invoke(SearchTagsQuery $query): Collection
    {
        return $this->tagRepository->search($query);
    }
}
