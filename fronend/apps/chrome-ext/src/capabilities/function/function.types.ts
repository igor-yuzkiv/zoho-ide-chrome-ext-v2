import type { IEntity } from '@zoho-ide/shared/types'
import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'

export type FunctionType = 'button' | 'standalone' | 'dynamic' | 'automation' | 'scheduler' | 'unknown'

export interface IFunctionEntity<TOrigin extends IEntity = IEntity> extends ICapabilityEntity {
    id: string
    type: FunctionType
    displayName: string
    originEntity: TOrigin
    script?: string | null
}

export type FunctionMetadata = {
    type: FunctionType
    icon: string
}
