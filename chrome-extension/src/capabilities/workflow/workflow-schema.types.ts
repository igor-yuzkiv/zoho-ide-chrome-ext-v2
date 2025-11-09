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
