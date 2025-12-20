import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { CapabilityQueryKeys, CapabilityType } from '@zoho-ide/shared'
import type { IModuleFieldMetadataRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { computed, type MaybeRef, toValue } from 'vue'
import { selectProviderRecordsQuery } from '@/entities/capability/cache'

export function useModuleFields<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    moduleId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IModuleFieldMetadataRecordEntity<TOrigin>[]>({
        queryKey: [
            ...CapabilityQueryKeys.forProviderAndType(providerId, CapabilityType.FIELDS),
            'module.fields',
            moduleId,
        ],
        placeholderData: keepPreviousData,
        queryFn: () => {
            return selectProviderRecordsQuery<IModuleFieldMetadataRecordEntity<TOrigin>>(
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
