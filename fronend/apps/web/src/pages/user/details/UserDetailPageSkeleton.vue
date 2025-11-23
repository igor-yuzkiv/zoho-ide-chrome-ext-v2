<script setup lang="ts">
import { PageHeaderSkeleton } from '@zoho-ide/ui-kit/components'
import { Skeleton } from 'primevue'

</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <PageHeaderSkeleton />
        <div class="flex flex-col w-full h-full p-2 app-card">
            <Skeleton width="100%" height="100%" class="rounded-lg" />
        </div>
    </div>
</template>

<style scoped></style>
