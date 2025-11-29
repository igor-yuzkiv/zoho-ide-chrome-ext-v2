<?php

namespace App\Api\Http\Requests\Attachments;

use Illuminate\Foundation\Http\FormRequest;

class AttachToEntityRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'file' => 'required|file|max:10240', // Max size 10MB
            'role' => 'nullable|string|max:255',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
