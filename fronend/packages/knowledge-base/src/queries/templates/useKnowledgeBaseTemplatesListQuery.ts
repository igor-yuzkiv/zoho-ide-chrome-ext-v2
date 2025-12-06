import { fetchKbTemplatesRequest } from '../../api'
import { KnowledgeBaseQueryKeys } from '../../knowledge-base.constants.ts'
import { IKnowledgeBaseTemplate } from '../../types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export function useKnowledgeBaseTemplatesListQuery() {
    const { isPending, isFetching, data } = useQuery<IKnowledgeBaseTemplate[]>({
        queryKey: KnowledgeBaseQueryKeys.templates(),
        placeholderData: keepPreviousData,
        queryFn: () => fetchKbTemplatesRequest(),
        initialData: [],
    })

    function findById(id: string): IKnowledgeBaseTemplate | undefined {
        return data.value.find((template) => template.id === id)
    }

    return {
        isPending,
        isFetching,
        data,
        findById,
    }
}
