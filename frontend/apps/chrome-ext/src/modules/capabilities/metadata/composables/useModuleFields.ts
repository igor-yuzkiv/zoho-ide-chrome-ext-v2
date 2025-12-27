import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { capabilityRecordsStorageFactory, ProviderCapabilityQueryKeys, ProviderCapabilityType } from '@zoho-ide/shared'
import type { IModuleFieldMetadataRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { computed, type MaybeRef, toValue } from 'vue'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

export function useModuleFields<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    moduleId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IModuleFieldMetadataRecordEntity<TOrigin>[]>({
        queryKey: [
            ...ProviderCapabilityQueryKeys.forProviderAndType(providerId, ProviderCapabilityType.FIELDS),
            'module.fields',
            moduleId,
        ],
        placeholderData: keepPreviousData,
        queryFn: () => {
            return localCapabilityStorage.findByParentId<IModuleFieldMetadataRecordEntity<TOrigin>>(toValue(moduleId))
        },
        enabled: computed(() => !!toValue(providerId) && !!toValue(moduleId)),
    })

    return { isPending, data }
}
