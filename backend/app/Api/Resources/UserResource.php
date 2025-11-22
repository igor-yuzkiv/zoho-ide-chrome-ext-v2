<?php

namespace App\Api\Resources;

use App\Domains\User\Entities\User;
use App\Support\Utils\StringUtil;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */ class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'      => $this->id,
            'name'    => $this->name,
            'email'   => $this->email,
            'acronym' => StringUtil::acronym($this->name, 2),
        ];
    }
}
