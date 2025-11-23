<script setup lang="ts">
import { useAppTheme } from '@zoho-ide/ui-kit/composables'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'

const route = useRoute()
const layoutComponent = computed(() => route.meta?.layout || DefaultLayout)

useAppTheme().initialize()
</script>

<template>
    <component :is="layoutComponent">
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </component>

    <Toast />
    <ConfirmDialog />
</template>

<style scoped></style>
