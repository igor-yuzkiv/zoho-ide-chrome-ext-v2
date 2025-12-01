<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class AttachmentModel extends Model
{
    use HasUlids;

    public $timestamps = true;

    protected $table = 'attachments';

    protected $fillable = [
        'id',
        'file_name',
        'extension',
        'mime_type',
        'size',
        'role',
        'is_temp',

        // TODO: refactor to polymorphic relation
        'entity_name',
        'entity_id',
    ];

    protected $casts = [
        'size'    => 'float',
        'is_temp' => 'boolean',
    ];
}
