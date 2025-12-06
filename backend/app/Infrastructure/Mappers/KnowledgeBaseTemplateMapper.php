<?php

namespace App\Infrastructure\Mappers;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseTemplate;
use App\Infrastructure\Models\KnowledgeBaseTemplateModel;

class KnowledgeBaseTemplateMapper
{
    public function makeFromModel(KnowledgeBaseTemplateModel $model): KnowledgeBaseTemplate
    {
        return new KnowledgeBaseTemplate(
            id: $model->id,
            key: $model->key,
            name: $model->name,
            content: $model->content,
            category: $model->category,
        );
    }
}
