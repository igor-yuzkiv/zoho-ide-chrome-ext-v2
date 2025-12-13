<?php

namespace Database\Seeders;

use App\Infrastructure\Models\KnowledgeBaseItemModel;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        KnowledgeBaseItemModel::factory()->count(200)->create();
    }
}
