<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { PageHeader } from '@zoho-ide/ui-kit/components'

const userId = useRouteParams('id')
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <PageHeader title="UserDetailsPage"/>
        <div class="flex flex-col w-full h-full bg-primary p-2 rounded-lg">
            {{ userId }}
        </div>
    </div>
</template>

<style scoped></style>
