<?php

namespace App\Infrastructure\Models;

use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class KnowledgeBaseItemModel extends Model
{
    use HasUlids;

    protected $table = 'knowledge_base_items';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'title',
        'content',
        'parent_id',
        'category',
        'created_by',
        'updated_by',
    ];

    protected $attributes = [
        'category' => 'general',
    ];

    protected $casts = [
        'category' => KnowledgeBaseCategory::class,
    ];

    public function parent(): HasOne
    {
        return $this->hasOne(KnowledgeBaseItemModel::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(KnowledgeBaseItemModel::class, 'parent_id');
    }

    public function createdBy(): HasOne
    {
        return $this->hasOne(UserModel::class, 'id', 'created_by');
    }

    public function updatedBy(): HasOne
    {
        return $this->hasOne(UserModel::class, 'id', 'updated_by');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(TagModel::class, 'taggable', 'taggables', 'taggable_id', 'tag_id');
    }
}
