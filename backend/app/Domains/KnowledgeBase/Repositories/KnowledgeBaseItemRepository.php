<?php

namespace App\Domains\KnowledgeBase\Repositories;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;

interface KnowledgeBaseItemRepository
{
    public function nextIdentifier(): string;

    public function save(KnowledgeBaseItem $item): KnowledgeBaseItem;
}
