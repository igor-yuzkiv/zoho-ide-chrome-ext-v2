<?php

namespace App\Api\Http\Requests\Attachments;

use App\Application\Attachment\Command\UploadTmpAttachment;
use Illuminate\Foundation\Http\FormRequest;

class UploadTmpAttachmentRequest extends FormRequest
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

    public function toCommand(): UploadTmpAttachment
    {
        return new UploadTmpAttachment(
            file: $this->file('file'),
            role: $this->input('role'),
        );
    }
}
