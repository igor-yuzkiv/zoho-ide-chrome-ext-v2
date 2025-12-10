import { fetchKbTemplatesRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import { IKnowledgeBaseTemplate, KnowledgeBaseCategory } from '../types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export function useKbTemplatesListQuery() {
    const { isPending, isFetching, data } = useQuery<IKnowledgeBaseTemplate[]>({
        queryKey: KnowledgeBaseQueryKeys.templates(),
        placeholderData: keepPreviousData,
        queryFn: () => fetchKbTemplatesRequest(),
        initialData: []
    })

    function findById(id: string): IKnowledgeBaseTemplate | undefined {
        return data.value.find((template) => template.id === id)
    }

    function findByCategory(category: KnowledgeBaseCategory): IKnowledgeBaseTemplate[] {
        return data.value.filter((template) => template.category === category)
    }

    return {
        isPending,
        isFetching,
        data,
        findById,
        findByCategory,
    }
}
