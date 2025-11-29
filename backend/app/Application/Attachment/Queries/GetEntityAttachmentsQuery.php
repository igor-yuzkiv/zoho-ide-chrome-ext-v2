<?php

namespace App\Application\Attachment\Queries;

use App\Shared\ValueObjects\EntityRef;
use App\Shared\DTO\PaginationParams;
use App\Shared\DTO\SortParams;

class GetEntityAttachmentsQuery
{
    public function __construct(
        public EntityRef $entityRef,
        public PaginationParams $paginationParams = new PaginationParams,
        public SortParams $sortParams = new SortParams
    ) {}
}
