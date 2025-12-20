import type { KbItemFormData, TKnowledgeBaseCategory, TKnowledgeBaseCategoryMetadata } from './types'
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

export const KnowledgeBaseCategoryMetadata: Record<TKnowledgeBaseCategory, TKnowledgeBaseCategoryMetadata> = {
    general: { label: 'General', value: 'general', icon: 'carbon:ibm-watson-knowledge-catalog' },
    code_samples: { label: 'Code Samples', value: 'code_samples', icon: 'mingcute:code-fill' },
}
