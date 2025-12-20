import { CapabilityQueryKeys, CapabilityType } from '@zoho-ide/shared'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { type MaybeRef, toValue } from 'vue'
import { findCapabilityRecordQuery } from '@/entities/capability/cache'

export function useModuleDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    moduleId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IModuleMetadataRecordEntity<TOrigin>>({
        queryKey: CapabilityQueryKeys.forCapabilityRecord(providerId, CapabilityType.MODULES, moduleId),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return findCapabilityRecordQuery<IModuleMetadataRecordEntity<TOrigin>>(
                toValue(providerId),
                CapabilityType.MODULES,
                toValue(moduleId)
            )
        },
    })

    return {
        isPending,
        data,
    }
}
