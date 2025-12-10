<?php

namespace App\Application\KnowledgeBase\Commands;

use App\Domains\KnowledgeBase\Entities\KnowledgeBaseTemplate;

class CreateKbItemFromTemplateCommand
{
    public function __construct(
        public KnowledgeBaseTemplate $template,
        public SaveKbItemCommand $saveCommand,
        public array $attributes = []
    ) {}
}
