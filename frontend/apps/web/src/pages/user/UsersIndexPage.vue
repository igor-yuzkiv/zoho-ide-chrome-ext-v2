<script setup lang="ts">
import { NoDataMessage } from '@zoho-ide/shared'
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden w-full gap-1">
        <div class="flex items-center justify-center w-full h-full app-card">
            <NoDataMessage icon="fa:user" title="Users" message="Select a user to view details" />
        </div>
    </div>
</template>

<style scoped></style>
