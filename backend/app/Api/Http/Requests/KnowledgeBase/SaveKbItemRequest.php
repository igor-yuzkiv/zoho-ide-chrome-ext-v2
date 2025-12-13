<?php

namespace App\Api\Http\Requests\KnowledgeBase;

use App\Application\KnowledgeBase\Commands\SaveKbItemCommand;
use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use App\Domains\User\Entities\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveKbItemRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title'     => 'required|string|max:255',
            'content'   => 'nullable|string',
            'parent_id' => 'nullable|string|exists:knowledge_base_items,id',
            'category'  => ['nullable', Rule::enum(KnowledgeBaseCategory::class)],

            'tags_ids'   => 'nullable|array',
            'tags_ids.*' => 'string|exists:tags,id',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toCommand(?User $user): SaveKbItemCommand
    {
        return new SaveKbItemCommand(
            title: $this->input('title'),
            content: $this->input('content'),
            parentId: $this->input('parent_id'),
            category: $this->input('category') ? KnowledgeBaseCategory::from($this->input('category')) : KnowledgeBaseCategory::General,
            user: $user,
            tagIds: $this->input('tags_ids', []),
        );
    }
}
