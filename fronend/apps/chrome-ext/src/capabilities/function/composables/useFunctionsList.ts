import type { IFunctionEntity } from '@/capabilities/function/function.types.ts'
import { CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { IEntity } from '@zoho-ide/shared'
import { type MaybeRef, toValue } from 'vue'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'

export function useFunctionsList<TOrigin extends IEntity = IEntity>(providerId: MaybeRef<string>) {
    const { isPending, data } = useQuery<IFunctionEntity<TOrigin>[]>({
        queryKey: [CapabilityType.FUNCTIONS, providerId],
        placeholderData: keepPreviousData,
        queryFn: () => {
            return selectProviderRecordsQuery<IFunctionEntity<TOrigin>>(toValue(providerId), CapabilityType.FUNCTIONS)
        },
        initialData: [],
    })

    return {
        isPending,
        data,
    }
}
