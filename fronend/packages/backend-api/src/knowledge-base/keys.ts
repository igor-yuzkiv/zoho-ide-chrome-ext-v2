export const KnowledgeBaseQueryKeys = {
    all: ['knowledge-base'],
    items: () => [...KnowledgeBaseQueryKeys.all, 'items'],
    item: (itemId: string | number) => [...KnowledgeBaseQueryKeys.all, 'item', itemId],
}
