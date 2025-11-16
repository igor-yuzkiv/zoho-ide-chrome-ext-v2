import type { RouteLocationRaw } from 'vue-router'

export type TopMenuItem = {
    title: string
    route: RouteLocationRaw
}

export type TopMenuProps = {
    items: TopMenuItem[]
}
