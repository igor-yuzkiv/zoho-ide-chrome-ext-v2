<?php

namespace App\Infrastructure\Models;

use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class KnowledgeBaseTemplateModel extends Model
{
    use HasUlids;

    protected $table = 'knowledge_base_templates';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'key',
        'name',
        'content',
        'category',
    ];

    protected $casts = [
        'category' => KnowledgeBaseCategory::class,
    ];
}
