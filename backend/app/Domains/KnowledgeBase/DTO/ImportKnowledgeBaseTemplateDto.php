<?php

namespace App\Domains\KnowledgeBase\DTO;

use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;

class ImportKnowledgeBaseTemplateDto
{
    public function __construct(
        public string $key,
        public string $name,
        public string $content,
        public ?KnowledgeBaseCategory $category = null,
    ) {}
}
