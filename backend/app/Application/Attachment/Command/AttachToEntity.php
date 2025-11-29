<?php

namespace App\Application\Attachment\Command;

use App\Shared\ValueObjects\EntityRef;
use Illuminate\Http\UploadedFile;

class AttachToEntity
{
    public function __construct(
        public EntityRef $entityRef,
        public UploadedFile $file,
        public ?string $role = null,
    ) {}
}
