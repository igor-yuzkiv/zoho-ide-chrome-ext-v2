<?php

namespace App\Application\Tag\Queries;

class SearchTagsQuery
{
    public function __construct(
        public string $searchTerm = '',
        public int $limit = 10
    ) {}
}
