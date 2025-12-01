<?php

namespace App\Api\Console\Commands;

use App\Application\Tag\Commands\CreateTagCommand;
use App\Application\Tag\Handlers\CreateTagHandler;
use Illuminate\Console\Command;

class IgorTestCommand extends Command
{
    protected $signature = 'igor:test';

    protected $description = 'Command description';

    public function handle(): void
    {
        $handler = app(CreateTagHandler::class);

        for ($i = 0; $i < 10; $i++) {
            $handler(new CreateTagCommand('tag '.($i + 3), '#ff0000'));
        }
    }
}
