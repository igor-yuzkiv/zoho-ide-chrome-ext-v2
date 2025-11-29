<?php

namespace App\Shared\Contracts;

use App\Shared\ValueObjects\EntityRef;

/**
 * An interface for entities that can be referenced by an EntityRef.
 */
interface EntityReferable
{
    public function getEntityRef(): EntityRef;
}
