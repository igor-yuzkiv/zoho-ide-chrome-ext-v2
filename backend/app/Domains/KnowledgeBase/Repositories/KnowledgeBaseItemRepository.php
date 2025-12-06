<?php

namespace App\Domains\KnowledgeBase\Repositories;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItemWithRelations;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;
use App\Shared\DTO\PageResult;
use App\Shared\DTO\PaginationParams;
use App\Shared\DTO\SortParams;

interface KnowledgeBaseItemRepository
{
    public function nextIdentifier(): string;

    public function list(PaginationParams $paginationParams, SortParams $sortParams): PageResult;

    public function find(string $id): ?KnowledgeBaseItem;

    public function findWithRelations(string $id): ?KnowledgeBaseItemWithRelations;

    public function save(KnowledgeBaseItem $item): KnowledgeBaseItem;

    public function saveWithTags(KnowledgeBaseItem $item, array $tagIds): KnowledgeBaseItem;

    public function deleteById(string $id): bool;
}
