import type { IEntity } from '../../common'
import type { IBaseCapabilityRecordEntity } from '../base.capability.types.ts'

export type FunctionType = 'button' | 'standalone' | 'dynamic' | 'automation' | 'scheduler' | 'unknown'

export type FunctionParams = {
    name: string
    type: string
}

export interface IFunctionRecordEntity<TOrigin extends IEntity = IEntity> extends IBaseCapabilityRecordEntity {
    type: FunctionType
    origin_entity: TOrigin
    script?: string | null
    params?: FunctionParams[] | null
}

export type FunctionMetadata = {
    type: FunctionType
    icon: string
}
