import { CapabilityQueryKeys, CapabilityType } from '@/config/capabilities.config.ts'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { IModuleFieldMetadataEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { computed, type MaybeRef, toValue } from 'vue'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'

export function useModuleFields<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    moduleId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IModuleFieldMetadataEntity<TOrigin>[]>({
        queryKey: [
            ...CapabilityQueryKeys.forProviderAndType(providerId, CapabilityType.FIELDS),
            'module.fields',
            moduleId,
        ],
        placeholderData: keepPreviousData,
        queryFn: () => {
            return selectProviderRecordsQuery<IModuleFieldMetadataEntity<TOrigin>>(
                toValue(providerId),
                CapabilityType.FIELDS
            ).then((records) => {
                return records.filter((record) => record.moduleId === toValue(moduleId))
            })
        },
        enabled: computed(() => !!toValue(providerId) && !!toValue(moduleId)),
    })

    return { isPending, data }
}
