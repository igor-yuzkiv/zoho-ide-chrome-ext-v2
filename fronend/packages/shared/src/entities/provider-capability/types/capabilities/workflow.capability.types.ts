import type { Edge, Node } from '@vue-flow/core'
import type { IEntity, Result } from '../../../../types'
import type { ICapabilityEntity } from '../base.capability.types.ts'

export interface IWorkflowEntity<TOrigin extends IEntity = IEntity> extends ICapabilityEntity {
    description: string
    originEntity: TOrigin
}

export type WorkflowSchemaBuilder = (workflow: IWorkflowEntity) => Result<{ nodes: Node[]; edges: Edge[] }>

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
