<?php

namespace App\Application\Tag\Handlers;

use App\Application\Tag\Commands\CreateTagCommand;
use App\Domains\Tag\Entity\Tag;
use App\Domains\Tag\Repositories\TagRepository;

readonly class CreateTagHandler
{
    public function __construct(private TagRepository $tagRepository) {}

    public function __invoke(CreateTagCommand $command): Tag
    {
        $tag = new Tag(
            id: $this->tagRepository->nextIdentifier(),
            name: $command->name,
            color: $command->color
        );

        return $this->tagRepository->save($tag);
    }
}
