<?php

namespace App\Api\Http\Controllers\KnowledgeBase;

use App\Api\Resources\KnowledgeBase\KnowledgeBaseTemplateResource;
use App\Domains\KnowledgeBase\Repositories\KnowledgeBaseTemplateRepository;
use App\Shared\Http\Controller;

class KnowledgeBaseTemplateController extends Controller
{
    public function __construct(private readonly KnowledgeBaseTemplateRepository $templateRepository) {}

    public function index()
    {
        $templates = $this->templateRepository->all();

        return KnowledgeBaseTemplateResource::collection($templates);
    }
}
