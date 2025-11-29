import type { IEntity } from '../../types'

export interface IUser extends IEntity {
    id: string
    name: string
    email: string
    acronym: string
}
