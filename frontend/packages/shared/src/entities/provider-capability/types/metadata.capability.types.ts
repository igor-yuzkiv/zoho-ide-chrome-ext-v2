import type { IEntity } from '../../../types'
import type { IBaseCapabilityRecordEntity } from './base.capability.types.ts'

export interface IModuleMetadataRecordEntity<TOrigin extends IEntity = IEntity> extends IBaseCapabilityRecordEntity {
    api_name: string
    origin_entity: TOrigin
}

export interface IModuleFieldMetadataRecordEntity<TOrigin extends IEntity = IEntity>
    extends IBaseCapabilityRecordEntity {
    api_name: string
    module_api_name: string
    module_id: string
    data_type: string
    display_data_type: string
    origin_entity: TOrigin
}
