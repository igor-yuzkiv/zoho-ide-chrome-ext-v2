<?php

namespace App\Domains\KnowledgeBase\Entities;

use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;

class KnowledgeBaseTemplate
{
    public function __construct(
        public string $id,
        public string $key,
        public string $name,
        public string $content,
        public ?KnowledgeBaseCategory $category = null,
    ) {}
}
