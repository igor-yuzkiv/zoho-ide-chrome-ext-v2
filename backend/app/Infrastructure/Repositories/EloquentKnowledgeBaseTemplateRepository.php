<?php

namespace App\Infrastructure\Repositories;

use App\Domains\KnowledgeBase\DTO\ImportKnowledgeBaseTemplateDto;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseTemplate;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseTemplateRepository;
use App\Infrastructure\Mappers\KnowledgeBaseTemplateMapper;
use App\Infrastructure\Models\KnowledgeBaseTemplateModel;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

readonly class EloquentKnowledgeBaseTemplateRepository implements KnowledgeBaseTemplateRepository
{
    public function __construct(private KnowledgeBaseTemplateMapper $mapper) {}

    public function nextIdentifier(): string
    {
        return Str::ulid();
    }

    public function all(): Collection
    {
        $models = KnowledgeBaseTemplateModel::all();

        return $models->map(fn (KnowledgeBaseTemplateModel $model) => $this->mapper->makeFromModel($model));
    }

    public function import(ImportKnowledgeBaseTemplateDto $dto): KnowledgeBaseTemplate
    {
        $model = KnowledgeBaseTemplateModel::firstOrCreate(
            ['key' => $dto->key],
            [
                'id'       => $this->nextIdentifier(),
                'key'      => $dto->key,
                'name'     => $dto->name,
                'content'  => $dto->content,
                'category' => $dto->category,
            ]
        );

        return $this->mapper->makeFromModel($model);
    }
}
