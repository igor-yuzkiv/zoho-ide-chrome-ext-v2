<?php

namespace App\Application\KnowledgeBase\Handlers;

use App\Application\KnowledgeBase\Commands\CreateKbItemFromTemplateCommand;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseItem;

readonly class CreateKbItemFromTemplateHandler
{
    public function __construct(private CreateKbItemHandler $createKbItemHandler) {}

    public function __invoke(CreateKbItemFromTemplateCommand $command): KnowledgeBaseItem
    {
        $content = $this->renderTemplateContent($command->template->content, $command->attributes);

        $saveCommand = $command->saveCommand;
        $saveCommand->content = $content;

        return ($this->createKbItemHandler)($saveCommand);
    }

    public function renderTemplateContent(string $content, array $attributes): string
    {
        $wrappedAttributes = collect($attributes)
            ->mapWithKeys(fn ($value, $key) => ["{{{$key}}}" => $value])
            ->toArray();

        return strtr($content, $wrappedAttributes);
    }
}
