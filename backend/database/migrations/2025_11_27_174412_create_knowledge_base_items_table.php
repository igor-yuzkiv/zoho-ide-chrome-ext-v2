<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('knowledge_base_items', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->string('title');
            $table->text('content');

            $table->string('parent_id')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');

            $table->timestamps();
        });

        Schema::table('knowledge_base_items', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('knowledge_base_items')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('knowledge_base_items');
    }
};
