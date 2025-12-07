<?php

namespace App\Application\KnowledgeBase\Handlers;

use App\Application\KnowledgeBase\Commands\CreateKbItemFromTemplateCommand;
use App\Application\KnowledgeBase\Commands\SaveKbItemCommand;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;

readonly class CreateKbItemFromTemplateHandler
{
    public function __construct(private SaveKbItemCommand $saveCommandHandler) {}

    public function __invoke(CreateKbItemFromTemplateCommand $command): KnowledgeBaseItem
    {
        $content = $this->renderTemplateContent($command->template->content, $command->attributes);

        $saveCommand = $command->saveCommand;
        $saveCommand->content = $content;

        return ($this->saveCommandHandler)($saveCommand);
    }

    public function renderTemplateContent(string $content, array $attributes): string
    {
        return strtr($content, $attributes);
    }
}
