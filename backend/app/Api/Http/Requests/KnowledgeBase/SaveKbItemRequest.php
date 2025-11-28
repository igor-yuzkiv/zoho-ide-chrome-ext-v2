<?php

namespace App\Api\Http\Requests\KnowledgeBase;

use App\Application\KnowledgeBase\Commands\CreateKbItemCommand;
use App\Application\KnowledgeBase\Commands\UpdateKbItemCommand;
use App\Domains\User\Entities\User;
use Illuminate\Foundation\Http\FormRequest;

class SaveKbItemRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title'     => 'required|string|max:255',
            'content'   => 'nullable|string',
            'parent_id' => 'nullable|string|exists:knowledge_base_items,id',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toCreateCommand(?User $user): CreateKbItemCommand
    {
        return new CreateKbItemCommand(
            title: $this->input('title'),
            content: $this->input('content'),
            parentId: $this->input('parent_id'),
            user: $user
        );
    }

    public function toUpdateCommand(string $id, ?User $user): UpdateKbItemCommand
    {
        return new UpdateKbItemCommand(
            id: $id,
            title: $this->input('title'),
            content: $this->input('content'),
            parentId: $this->input('parent_id'),
            user: $user
        );
    }
}
