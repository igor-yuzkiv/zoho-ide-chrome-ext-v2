<?php

namespace App\Application\Attachment\Command;

use Illuminate\Http\UploadedFile;

class UploadTmpAttachment
{
    public function __construct(
        public UploadedFile $file,
        public ?string $role = null,
    ) {}
}
