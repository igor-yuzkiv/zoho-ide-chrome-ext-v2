import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { fetchKbItemByIdRequest, KnowledgeBaseQueryKeys } from '@zoho-ide/backend-api/knowledge-base'
import type { IKnowledgeBaseItem } from '@zoho-ide/shared/entities/knowledge-base'
import { type MaybeRefOrGetter, toValue } from 'vue'

export function useKbItemDetails(itemId: MaybeRefOrGetter<string>) {
    const { isPending, isFetching, data, isError } = useQuery<IKnowledgeBaseItem>({
        queryKey: [...KnowledgeBaseQueryKeys.item(itemId)],
        placeholderData: keepPreviousData,
        queryFn: () => fetchKbItemByIdRequest(toValue(itemId)).then((res) => res.data),
    })

    return {
        isPending,
        isFetching,
        isError,
        data,
    }
}
