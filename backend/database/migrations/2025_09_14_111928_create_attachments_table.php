<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->string('file_name');
            $table->string('extension', 10);
            $table->string('mime_type')->nullable();
            $table->float('size')->nullable();
            $table->string('role')->nullable();
            $table->string('entity_name')->nullable();
            $table->string('entity_id')->nullable();
            $table->boolean('is_temp')->default(false);

            $table->index(['entity_name', 'entity_id']);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attachments');
    }
};
