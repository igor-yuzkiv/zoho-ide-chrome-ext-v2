<?php

namespace App\Application\KnowledgeBase\Queries;

use App\Shared\DTO\PaginationParams;

readonly class SearchKnowledgeBaseItemsQuery
{
    public function __construct(
        public ?string $searchTerm = '',
        public PaginationParams $paginationParams = new PaginationParams
    ) {}
}
