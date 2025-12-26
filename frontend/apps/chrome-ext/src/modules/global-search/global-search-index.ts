import type { GlobalSearchDocument } from '@/modules/global-search/global-search.types.ts'
import { Document } from 'flexsearch'

export const globalSearchIndex = new Document<GlobalSearchDocument>({
    document: {
        id: 'id',
        index: ['title', 'content'],
        store: ['id', 'title', 'module', 'content'],
    },
    tokenize: 'full',
    cache: true,
})
