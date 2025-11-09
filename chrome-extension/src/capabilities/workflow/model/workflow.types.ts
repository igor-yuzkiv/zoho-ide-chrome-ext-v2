import type { Edge, Node } from '@vue-flow/core'
import type { IEntity } from '@/shared/types/entitiy.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import type { ICapabilityEntity } from '@/core/types/capability.types.ts'

export interface IWorkflowEntity<TOrigin extends IEntity = IEntity> extends ICapabilityEntity {
    description: string
    originEntity: TOrigin
}

export type WorkflowSchemaBuilder = (workflow: IWorkflowEntity) => Result<{ nodes: Node[]; edges: Edge[] }>
