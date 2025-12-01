<?php

namespace App\Api\Http\Requests\Tag;

use App\Application\Tag\Queries\SearchTagsQuery;
use Illuminate\Foundation\Http\FormRequest;

class SearchTagsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'search_term'   => 'nullable|string|max:255',
            'limit'         => 'sometimes|integer|min:1|max:100',
            'exclude_ids'   => 'sometimes|array',
            'exclude_ids.*' => 'string|distinct',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toQuery(): SearchTagsQuery
    {
        return new SearchTagsQuery(
            searchTerm: $this->input('search_term') ?? '',
            limit: $this->input('limit', 10),
            excludeIds: $this->input('exclude_ids', []),
        );
    }
}
