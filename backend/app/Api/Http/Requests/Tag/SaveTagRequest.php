<?php

namespace App\Api\Http\Requests\Tag;

use App\Application\Tag\Commands\CreateTagCommand;
use Illuminate\Foundation\Http\FormRequest;

class SaveTagRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:255', 'unique:tags,name'],
            'color' => ['nullable', 'string', 'max:7'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toCreateCommand(): CreateTagCommand
    {
        return new CreateTagCommand(
            name: $this->input('name'),
            color: $this->input('color')
        );
    }
}
