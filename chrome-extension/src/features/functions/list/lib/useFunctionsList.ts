import { CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, toValue } from 'vue'
import type { IEntity } from '@/shared/types/entitiy.types.ts'
import type { IFunctionEntity } from '@/entities/function/model/function.types.ts'
import { selectProviderRecordsQuery } from '@/core/cache'

export function useFunctionsList<TOrigin extends IEntity = IEntity>(providerId: MaybeRef<string>) {
    const { isPending, data } = useQuery<IFunctionEntity<TOrigin>[]>({
        queryKey: [CapabilityType.FUNCTIONS, providerId],
        placeholderData: keepPreviousData,
        queryFn: () =>
            selectProviderRecordsQuery<IFunctionEntity<TOrigin>>(toValue(providerId), CapabilityType.FUNCTIONS),
    })

    return {
        isPending,
        data,
    }
}
