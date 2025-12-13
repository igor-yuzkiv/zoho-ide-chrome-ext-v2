import { MaybeRefOrGetter } from '@vueuse/core'

export const CapabilityType = {
    FUNCTIONS: 'functions',
    WORKFLOWS: 'workflows',
    MODULES: 'modules',
    FIELDS: 'fields',
} as const

export const CAPABILITY_DEFAULT_ICON = 'carbon:undefined'

export const CapabilityQueryKeys = {
    all: ['provider', 'capabilities'],
    forProvider: (providerId: MaybeRefOrGetter<string>) => [...CapabilityQueryKeys.all, providerId],
    forType: (capabilityType: MaybeRefOrGetter<string>) => [...CapabilityQueryKeys.all, capabilityType],
    forProviderAndType: (providerId: MaybeRefOrGetter<string>, capabilityType: MaybeRefOrGetter<string>) => [
        ...CapabilityQueryKeys.all,
        providerId,
        capabilityType,
    ],
    forCapabilityRecord: (
        providerId: MaybeRefOrGetter<string>,
        capabilityType: MaybeRefOrGetter<string>,
        recordId: MaybeRefOrGetter<string>
    ) => [...CapabilityQueryKeys.all, providerId, capabilityType, recordId],
}
