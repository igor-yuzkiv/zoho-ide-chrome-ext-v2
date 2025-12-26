import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { capabilityRecordsStorageFactory, ProviderCapabilityQueryKeys, ProviderCapabilityType } from '@zoho-ide/shared'
import type { IModuleMetadataRecordEntity } from '@zoho-ide/shared'
import type { IEntity } from '@zoho-ide/shared'
import { computed, type MaybeRef, toValue } from 'vue'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

export function useModuleDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    moduleId: MaybeRef<string>
) {
    const { isPending, data } = useQuery<IModuleMetadataRecordEntity<TOrigin>>({
        queryKey: ProviderCapabilityQueryKeys.forCapabilityRecord(providerId, ProviderCapabilityType.MODULES, moduleId),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return localCapabilityStorage.findById<IModuleMetadataRecordEntity<TOrigin>>(toValue(moduleId))
        },
        enabled: computed(() => !!toValue(providerId) && !!toValue(moduleId)),
    })

    return {
        isPending,
        data,
    }
}
