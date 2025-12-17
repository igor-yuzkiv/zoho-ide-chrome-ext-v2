import { CapabilityQueryKeys, CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { IModuleMetadataEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { type MaybeRef, toValue } from 'vue'
import { findCapabilityRecordQuery } from '@/entities/capability/cache'

export function useModuleDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    moduleId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IModuleMetadataEntity<TOrigin>>({
        queryKey: CapabilityQueryKeys.forCapabilityRecord(providerId, CapabilityType.MODULES, moduleId),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return findCapabilityRecordQuery<IModuleMetadataEntity<TOrigin>>(
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
