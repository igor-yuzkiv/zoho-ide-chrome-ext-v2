import type { FunctionMetadata, FunctionType } from '@/entities/function/model/function.types.ts'

export const FunctionTypeMetadataMap: Record<FunctionType, FunctionMetadata> = {
    button: { type: 'button', icon: 'mdi:button-pointer' },
    standalone: { type: 'standalone', icon: 'ph:code-fill' },
    dynamic: { type: 'dynamic', icon: 'material-symbols:extension' },
    automation: { type: 'automation', icon: 'mdi:workflow' },
    scheduler: { type: 'scheduler', icon: 'mingcute:time-fill' },
    unknown: { type: 'scheduler', icon: 'f7:question' },
}

export function getFunctionTypeMetadata(type: FunctionType): FunctionMetadata {
    return FunctionTypeMetadataMap[type] || FunctionTypeMetadataMap.unknown
}