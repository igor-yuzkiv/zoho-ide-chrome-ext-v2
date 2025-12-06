<?php

namespace App\Domains\KnowledgeBase\Repositories;

use App\Domains\KnowledgeBase\DTO\ImportKnowledgeBaseTemplateDto;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseTemplate;
use Illuminate\Support\Collection;

interface KnowledgeBaseTemplateRepository
{
    public function nextIdentifier(): string;

    /**
     * @return Collection<KnowledgeBaseTemplate>
     */
    public function all(): Collection;

    public function find(string $id): ?KnowledgeBaseTemplate;

    public function import(ImportKnowledgeBaseTemplateDto $dto): KnowledgeBaseTemplate;
}
