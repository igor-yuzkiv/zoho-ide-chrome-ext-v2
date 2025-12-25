import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { capabilityRecordsStorageFactory, ProviderCapabilityQueryKeys, ProviderCapabilityType } from '@zoho-ide/shared';
import type { IFunctionRecordEntity } from '@zoho-ide/shared';
import type { IEntity } from '@zoho-ide/shared';
import { computed, type MaybeRef, ref, toValue, watch } from 'vue'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

export function useFunctionDetails<TOrigin extends IEntity = IEntity>(
    providerId: MaybeRef<string>,
    functionId: MaybeRef<string>
) {
    const script = ref<string>('')

    const { isPending, data } = useQuery<IFunctionRecordEntity<TOrigin>>({
        queryKey: ProviderCapabilityQueryKeys.forCapabilityRecord(
            providerId,
            ProviderCapabilityType.FUNCTIONS,
            functionId
        ),
        placeholderData: keepPreviousData,
        queryFn: () => {
            return localCapabilityStorage.findById<IFunctionRecordEntity<TOrigin>>(toValue(functionId))
        },
        enabled: computed(() => !!toValue(providerId) && !!toValue(functionId)),
    })

    watch(data, (newValue) => (script.value = newValue?.script || ''))

    return {
        isPending,
        data,
        script,
    }
}
