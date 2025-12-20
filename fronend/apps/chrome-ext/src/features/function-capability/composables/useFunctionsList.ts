import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { ProviderCapabilityQueryKeys, ProviderCapabilityType } from '@zoho-ide/shared'
import type { IFunctionRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { type MaybeRef, toValue } from 'vue'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'

export function useFunctionsList<TOrigin extends IEntity = IEntity>(providerId: MaybeRef<string>) {
    const { isPending, data } = useQuery<IFunctionRecordEntity<TOrigin>[]>({
        queryKey: ProviderCapabilityQueryKeys.forProviderAndType(providerId, ProviderCapabilityType.FUNCTIONS),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return selectProviderRecordsQuery<IFunctionRecordEntity<TOrigin>>(
                toValue(providerId),
                ProviderCapabilityType.FUNCTIONS
            )
        },
        initialData: [],
    })

    return {
        isPending,
        data,
    }
}
