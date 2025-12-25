import type { IEntity, Result } from '../../common'
import type { IBaseCapabilityRecordEntity } from '../base.capability.types.ts'
import type { Edge, Node } from '@vue-flow/core'

export interface IWorkflowRecordEntity<TOrigin extends IEntity = IEntity> extends IBaseCapabilityRecordEntity {
    description: string
    origin_entity: TOrigin
}

export type WorkflowSchemaBuilder = (workflow: IWorkflowRecordEntity) => Result<{ nodes: Node[]; edges: Edge[] }>

export type WfConditionNodeData = {
    label: string
    criteria: string[]
}

export type WfWhenStatementNodeData = {
    moduleName: string
    trigger: string
    criteria: string[]
    repeat: boolean
}

export type WfActionNodeData = {
    label: string
    type: string
    name: string
}
