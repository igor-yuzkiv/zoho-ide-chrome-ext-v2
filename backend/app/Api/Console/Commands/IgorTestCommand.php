<?php

namespace App\Api\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class IgorTestCommand extends Command
{
    protected $signature = 'igor:test';

    protected $description = 'Command description';

    public function handle(): void {
        Storage::disk('data')->put('test.txt', 'test');
    }
}
