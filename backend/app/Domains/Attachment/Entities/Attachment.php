<?php

namespace App\Domains\Attachment\Entities;

use App\Shared\ValueObjects\EntityRef;
use Carbon\Carbon;

class Attachment
{
    public function __construct(
        public string $id,
        public string $fileName,
        public string $extension,
        public ?EntityRef $entityRef = null,
        public ?string $mimeType = null,
        public ?float $size = null,
        public ?string $role = null,
        public bool $isTemp = false,
        public ?Carbon $createdAt = null,
        public ?Carbon $updatedAt = null,
    ) {}
}
