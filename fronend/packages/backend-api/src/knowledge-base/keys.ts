import type { MaybeRefOrGetter } from 'vue'

export const KnowledgeBaseQueryKeys = {
    all: ['knowledge-base'],
    items: () => [...KnowledgeBaseQueryKeys.all, 'items'],
    item: (itemId: MaybeRefOrGetter) => [...KnowledgeBaseQueryKeys.all, 'item', itemId],
}
