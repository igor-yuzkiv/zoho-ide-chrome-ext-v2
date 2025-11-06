export function generateCacheRecordId(providerId: string, capability?: string, recordId?: string) {
    return [providerId, capability, recordId].filter(Boolean).join('::')
}
