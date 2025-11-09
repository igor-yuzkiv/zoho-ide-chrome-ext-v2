import { CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, toValue } from 'vue'
import type { IEntity } from '@/shared/types/entitiy.types.ts'
import type { IModuleMetadataEntity } from '@/capabilities/metadata/metadata.types.ts'
import { findCapabilityRecordQuery } from '@/shared/cache'

export function useModuleDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    moduleId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IModuleMetadataEntity<TOrigin>>({
        queryKey: ['module.details', providerId, moduleId],
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
