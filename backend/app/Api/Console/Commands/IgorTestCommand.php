<?php

namespace App\Api\Console\Commands;

use App\Application\KnowledgeBase\Queries\SearchKnowledgeBaseItemsQuery;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseItemRepository;
use Illuminate\Console\Command;

class IgorTestCommand extends Command
{
    protected $signature = 'igor:test';

    protected $description = 'Command description';

    public function handle(): void
    {
        app(KnowledgeBaseItemRepository::class)
            ->search(new SearchKnowledgeBaseItemsQuery(
                searchTerm: 'ab'
            ));
    }
}
