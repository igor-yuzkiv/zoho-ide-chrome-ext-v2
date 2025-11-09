import { WfSchemaNodeType } from '@/config/workflows.config.ts'
import type { Edge, Node } from '@vue-flow/core'
import type { Result } from '@/shared/types/result.types.ts'
import type { Maybe } from '@/shared/types/result.types.ts'
import { assertCrmWorkflowFromEntity } from '@/shared/integrations/zoho-crm/mappers/crm.workflows.mapper.ts'
import type {
    WfAction,
    WfCondition,
    WfCriteria,
    WfCriteriaGroup,
    WfExecuteWhen,
} from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'
import type {
    WfActionNodeData,
    WfConditionNodeData,
    WfWhenStatementNodeData,
} from '@/capabilities/workflow/workflow-schema.types.ts'
import type { IWorkflowEntity } from '@/capabilities/workflow/workflow.types.ts'

export function stringifyWfCriteria(criteria: WfCriteria): string {
    // TODO: handle - ${ANYVALUE}, ${EMPTY}, ${NOTEMPTY}

    const comparator = criteria.comparator === '${ANYVALUE}' ? 'is any value' : criteria.comparator

    const value = criteria.comparator === '${ANYVALUE}' ? '' : criteria.value

    return `${criteria.field.api_name} ${comparator} ${value}`.trim()
}

export function stringifyWfCriteriaGroup(criteriaGroup: Maybe<WfCriteriaGroup>): string[] {
    if (!criteriaGroup || !('group' in criteriaGroup)) {
        return []
    }

    const result: string[] = []

    for (const criteria of criteriaGroup.group) {
        if (!criteria) continue

        const str = stringifyWfCriteria(criteria)

        if (result.length === 0) {
            result.push(str)
        } else {
            result.push(`${criteriaGroup.group_operator} ${str}`)
        }
    }

    return result
}

export function stringifyWfCriteriaOrGroup(criteriaOrGroup: Maybe<WfCriteria | WfCriteriaGroup>): string[] {
    if (!criteriaOrGroup) {
        return []
    }

    if ('group' in criteriaOrGroup) {
        return stringifyWfCriteriaGroup(criteriaOrGroup)
    }

    return [stringifyWfCriteria(criteriaOrGroup)]
}

export function buildZohoCrmWhenNode(
    whenStatement: WfExecuteWhen,
    position: { x: number; y: number },
    id: string = 'when'
): Node<WfWhenStatementNodeData> {
    const defaultCriteria = 'This rule will execute whenever the trigger event occurs'

    const criteria = whenStatement.details?.criteria
        ? stringifyWfCriteriaOrGroup(whenStatement.details?.criteria)
        : [defaultCriteria]

    return {
        id,
        type: WfSchemaNodeType.when,
        position,
        data: {
            moduleName: whenStatement.details.trigger_module.api_name,
            trigger: whenStatement.type,
            criteria: criteria.length > 0 ? criteria : [defaultCriteria],
            repeat: whenStatement.details.repeat,
        },
        style: { width: '400px' },
    }
}

export function buildZohoCrmConditionNode(
    condition: WfCondition,
    position: { x: number; y: number },
    index: number = 1
): Node<WfConditionNodeData> {
    const defaultCriteria = 'No criteria defined'

    const criteria = condition.criteria_details?.criteria
        ? stringifyWfCriteriaOrGroup(condition.criteria_details?.criteria)
        : [defaultCriteria]

    return {
        id: 'condition-' + index,
        type: WfSchemaNodeType.condition,
        position,
        data: {
            label: `Condition ${index}`,
            criteria: criteria,
        },
        style: { width: '400px' },
    }
}

export function buildWfActionNode(
    action: WfAction,
    position: { x: number; y: number },
    id: string,
    label: string = 'Action'
): Node<WfActionNodeData> {
    return {
        id,
        type: WfSchemaNodeType.action,
        position,
        data: {
            label: label,
            type: action.type,
            name: action.name,
        },
    }
}

function makeEdge(from: string, to: string, label?: string, animated: boolean = true): Edge {
    return {
        id: `edge-${from}-to-${to}`,
        source: from,
        target: to,
        label,
        animated: animated,
    }
}

export function zohoCrmWorkflowSchemaBuilder(workflow: IWorkflowEntity): Result<{ nodes: Node[]; edges: Edge[] }> {
    const crmWorkflow = assertCrmWorkflowFromEntity(workflow)

    if (!crmWorkflow || !crmWorkflow?.conditions?.length || !crmWorkflow?.execute_when) {
        return { ok: false, error: 'Invalid Zoho CRM workflow entity' }
    }

    const x = 10
    let y = 10

    const edges: Edge[] = []
    const nodes: Node[] = []

    const whenNode = buildZohoCrmWhenNode(crmWorkflow.execute_when, { x, y })
    nodes.push(whenNode)

    if (!crmWorkflow.conditions.length) {
        return { ok: true, value: { nodes, edges } }
    }

    for (let i = 0; i < crmWorkflow.conditions.length; i++) {
        const condition = crmWorkflow.conditions[i]
        if (!condition) {
            continue
        }

        const conditionNode = buildZohoCrmConditionNode(condition, { x: x + 500, y }, i + 1)

        edges.push(makeEdge(whenNode.id, conditionNode.id))
        nodes.push(conditionNode)

        if (condition.instant_actions.actions.length) {
            condition.instant_actions.actions.forEach((action, actionIndex) => {
                const position = { x: x + 1000, y: y }
                const actionId = `c_${i + 1}_a_${actionIndex + 1}`
                const label = `Action #${actionIndex + 1}`

                const actionNode = buildWfActionNode(action, position, actionId, label)
                edges.push(makeEdge(conditionNode.id, actionNode.id))
                nodes.push(actionNode)

                y += 150
            })
        }

        y += 150
    }

    return { ok: true, value: { nodes, edges } }
}
