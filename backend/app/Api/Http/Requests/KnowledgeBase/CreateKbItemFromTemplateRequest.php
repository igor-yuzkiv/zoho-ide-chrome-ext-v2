<?php

namespace App\Api\Http\Requests\KnowledgeBase;

use App\Application\KnowledgeBase\Commands\CreateKbItemFromTemplateCommand;
use App\Application\KnowledgeBase\Commands\SaveKbItemCommand;
use App\Domains\KnowledgeBase\Entities\KnowledgeBaseTemplate;
use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use App\Domains\User\Entities\User;
use Illuminate\Foundation\Http\FormRequest;

class CreateKbItemFromTemplateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title'     => 'required|string|max:255',
            'content'   => 'nullable|string',
            'parent_id' => 'nullable|string|exists:knowledge_base_items,id',

            'tags_ids'   => 'nullable|array',
            'tags_ids.*' => 'string|exists:tags,id',

            'attributes'   => 'nullable|array',
            'attributes.*' => 'string',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toCommand(KnowledgeBaseTemplate $template, ?User $user): CreateKbItemFromTemplateCommand
    {
        $saveCommand = new SaveKbItemCommand(
            title: $this->input('title'),
            content: $this->input('content'),
            parentId: $this->input('parent_id'),
            category: $template->category ?? KnowledgeBaseCategory::General,
            user: $user,
            tagIds: $this->input('tags_ids', []),
        );

        return new CreateKbItemFromTemplateCommand(
            template: $template,
            saveCommand: $saveCommand,
            attributes: $this->input('attributes', []),
        );
    }
}
