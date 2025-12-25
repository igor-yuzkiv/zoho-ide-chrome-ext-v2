import type { CapabilityId } from './base.capability.types.ts'

export function makeProviderCapabilityId(
    providerId: string,
    capabilityType: string,
    partials: string | string[]
): CapabilityId {
    const partialsArray = Array.isArray(partials) ? partials : [partials]
    return [providerId, capabilityType, ...partialsArray].join(':')
}
