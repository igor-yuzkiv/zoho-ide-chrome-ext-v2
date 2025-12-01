<?php

namespace App\Api\Http\Requests\KnowledgeBase;

use App\Application\KnowledgeBase\Commands\SaveKbItemCommand;
use App\Domains\User\Entities\User;
use Illuminate\Foundation\Http\FormRequest;

class SaveKbItemRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'parent_id' => 'nullable|string|exists:knowledge_base_items,id',

            'tags_ids' => 'nullable|array',
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
            user: $user,
            tagIds: $this->input('tags_ids', []),
        );
    }
}
