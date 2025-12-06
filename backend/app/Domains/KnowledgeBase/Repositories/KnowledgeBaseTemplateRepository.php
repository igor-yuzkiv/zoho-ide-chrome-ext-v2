<?php

namespace App\Domains\KnowledgeBase\Repositories;

use App\Domains\KnowledgeBase\DTO\ImportKnowledgeBaseTemplateDto;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseTemplate;

interface KnowledgeBaseTemplateRepository
{
    public function nextIdentifier(): string;

    public function import(ImportKnowledgeBaseTemplateDto $dto): KnowledgeBaseTemplate;
}
