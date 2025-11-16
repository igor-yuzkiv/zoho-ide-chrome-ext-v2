import type { IEntity } from '@/shared/types/entitiy.types.ts'
import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'

export interface IModuleMetadataEntity<TOrigin extends IEntity = IEntity> extends ICapabilityEntity {
    apiName: string
    originEntity: TOrigin
}

export interface IModuleFieldMetadataEntity<TOrigin extends IEntity = IEntity> extends ICapabilityEntity {
    apiName: string
    moduleApiName: string
    moduleId: string
    dataType: string
    displayDataType: string
    originEntity: TOrigin
}
