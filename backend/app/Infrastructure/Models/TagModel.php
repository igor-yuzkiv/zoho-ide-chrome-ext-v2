<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class TagModel extends Model
{
    use HasUlids, Searchable;

    protected $table = 'tags';

    public $timestamps = false;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'color',
    ];

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
