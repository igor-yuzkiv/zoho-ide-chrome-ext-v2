<?php

namespace App\Domains\KnowledgeBase\Repositories;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;

interface KnowledgeBaseItemRepository
{
    public function nextIdentifier(): string;

    public function find(string $id): ?KnowledgeBaseItem;

    public function save(KnowledgeBaseItem $item): KnowledgeBaseItem;
}
