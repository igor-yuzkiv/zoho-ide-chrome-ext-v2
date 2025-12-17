import type { IEntity } from '../../../../types'
import type { IBaseCapabilityRecordEntity } from '../base.capability.types.ts'

export interface IModuleMetadataRecordEntity<TOrigin extends IEntity = IEntity> extends IBaseCapabilityRecordEntity {
    apiName: string
    originEntity: TOrigin
}

export interface IModuleFieldMetadataRecordEntity<TOrigin extends IEntity = IEntity>
    extends IBaseCapabilityRecordEntity {
    apiName: string
    moduleApiName: string
    moduleId: string
    dataType: string
    displayDataType: string
    originEntity: TOrigin
}
