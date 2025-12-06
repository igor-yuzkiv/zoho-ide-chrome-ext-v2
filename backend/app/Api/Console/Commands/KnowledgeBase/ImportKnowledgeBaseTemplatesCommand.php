<?php

namespace App\Api\Console\Commands\KnowledgeBase;

use App\Domains\KnowledgeBase\DTO\ImportKnowledgeBaseTemplateDto;
use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseTemplateRepository;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class ImportKnowledgeBaseTemplatesCommand extends Command
{
    protected $signature = 'knowledge-base:import-templates';

    protected $description = 'Import knowledge base templates from storage.';

    public function __construct(
        private readonly KnowledgeBaseTemplateRepository $templateRepository,
    ) {
        parent::__construct();
    }

    public function handle(): void
    {
        $templatesData = $this->loadTemplatesFromStorage();
        if ($templatesData->isEmpty()) {
            $this->info('No templates found to import.');

            return;
        }

        $templatesData->each(
            fn (ImportKnowledgeBaseTemplateDto $dto) => $this->templateRepository->import($dto)
        );

        $this->info(sprintf('Imported %d knowledge base templates.', $templatesData->count()));
    }

    /**
     * @return Collection<ImportKnowledgeBaseTemplateDto>
     */
    public function loadTemplatesFromStorage(): Collection
    {
        $result = Collection::make();
        $directories = Storage::disk('data')->directories('knowledge-base-templates');

        if (empty($directories)) {
            return $result;
        }

        foreach ($directories as $templateDirectoryPath) {
            [, $templateDirectoryName] = array_pad(explode('/', $templateDirectoryPath), 2, null);
            if (!$templateDirectoryName) {
                continue;
            }

            $metadata = $this->loadTemplateMetadata($templateDirectoryName);

            $result->put(
                $templateDirectoryName,
                new ImportKnowledgeBaseTemplateDto(
                    key: $templateDirectoryName,
                    name: $metadata['name'] ?? $templateDirectoryName,
                    content: $this->loadTemplateContent($templateDirectoryName),
                    category: isset($metadata['category']) ? KnowledgeBaseCategory::tryFrom($metadata['category']) : null,
                ),
            );
        }

        return $result;
    }

    private function loadTemplateContent(string $templateKey): string
    {
        return Storage::disk('data')->get("knowledge-base-templates/{$templateKey}/content.md");
    }

    private function loadTemplateMetadata(string $templateKey): array
    {
        $jsonData = Storage::disk('data')->get("knowledge-base-templates/{$templateKey}/metadata.json");

        return json_decode($jsonData, true) ?? [];
    }
}
