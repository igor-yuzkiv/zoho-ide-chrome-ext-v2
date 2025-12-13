<?php

namespace Database\Factories;

use App\Domains\KnowledgeBase\Enums\KnowledgeBaseCategory;
use App\Infrastructure\Models\KnowledgeBaseItemModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class KnowledgeBaseItemModelFactory extends Factory
{
    protected $model = KnowledgeBaseItemModel::class;

    public function definition(): array
    {
        return [
            'title'      => $this->faker->word(),
            'content'    => $this->faker->sentence(),
            'parent_id'  => null,
            'category'   => fake()->randomElement([KnowledgeBaseCategory::General, KnowledgeBaseCategory::CodeSamples]),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
