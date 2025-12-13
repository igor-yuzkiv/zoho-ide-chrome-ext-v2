import type { KbItemFormData, KnowledgeBaseCategoryMetadata } from './types'
import type { MaybeRefOrGetter } from 'vue'

export const KnowledgeBaseQueryKeys = {
    all: ['knowledge-base'],
    items: () => [...KnowledgeBaseQueryKeys.all, 'items'],
    item: (itemId: MaybeRefOrGetter) => [...KnowledgeBaseQueryKeys.all, 'item', itemId],
    templates: () => [...KnowledgeBaseQueryKeys.all, 'templates'],
}

export const KnowledgeBaseItemEntityType = 'knowledge_base_item'

export const defaultKbItemFormData = (): KbItemFormData => ({
    title: '',
    content: '',
    category: 'general',
    tags: [],
})

export const KnowledgeBaseCategoryOptions: KnowledgeBaseCategoryMetadata[] = [
    { label: 'General', value: 'general' },
    { label: 'Code Samples', value: 'code_samples' },
]
