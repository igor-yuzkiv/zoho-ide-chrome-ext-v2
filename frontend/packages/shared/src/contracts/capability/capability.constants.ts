import type { MaybeRefOrGetter } from '@vueuse/core'

export const ProviderCapabilityType = {
    FUNCTIONS: 'functions',
    WORKFLOWS: 'workflows',
    MODULES: 'modules',
    FIELDS: 'fields',
} as const

export const CAPABILITY_DEFAULT_ICON = 'carbon:undefined'

export const ProviderCapabilityQueryKeys = {
    all: ['provider', 'capabilities'],
    forProvider: (providerId: MaybeRefOrGetter<string>) => [...ProviderCapabilityQueryKeys.all, providerId],
    forType: (capabilityType: MaybeRefOrGetter<string>) => [...ProviderCapabilityQueryKeys.all, capabilityType],
    forProviderAndType: (providerId: MaybeRefOrGetter<string>, capabilityType: MaybeRefOrGetter<string>) => [
        ...ProviderCapabilityQueryKeys.all,
        providerId,
        capabilityType,
    ],
    forCapabilityRecord: (
        providerId: MaybeRefOrGetter<string>,
        capabilityType: MaybeRefOrGetter<string>,
        recordId: MaybeRefOrGetter<string>
    ) => [...ProviderCapabilityQueryKeys.all, providerId, capabilityType, recordId],
}
