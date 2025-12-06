import type { KbItemFormData } from './types'
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
    tags: [],
})
