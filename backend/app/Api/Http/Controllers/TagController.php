<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Requests\Tag\SaveTagRequest;
use App\Api\Http\Requests\Tag\SearchTagsRequest;
use App\Api\Resources\TagResource;
use App\Application\Tag\Handlers\CreateTagHandler;
use App\Application\Tag\Handlers\SearchTagsHandler;
use App\Shared\Http\Controller;

class TagController extends Controller
{
    public function search(SearchTagsRequest $request, SearchTagsHandler $handler)
    {
        return TagResource::collection(
            $handler($request->toQuery())
        );
    }

    public function create(SaveTagRequest $request, CreateTagHandler $handler)
    {
        return new TagResource(
            $handler($request->toCreateCommand())
        );
    }
}
