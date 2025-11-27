<script setup lang="ts">
import { useRoute } from 'vue-router'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { AppFooter } from '@/widgets/app-footer'
import { AppTopMenu } from '@/widgets/app-top-menu'

const route = useRoute()
</script>

<template>
    <div class="relative bg-secondary flex h-screen w-full flex-col overflow-hidden">
        <AppTopMenu v-if="!route.meta?.hideTopbar" />

        <main
            class="flex h-full w-full flex-col overflow-hidden px-2"
            :class="{
                'pt-2': route.meta?.hideTopbar,
                'pb-2': route.meta?.hideFooter,
            }"
        >
            <Splitter
                class="flex h-full w-full overflow-hidden bg-transparent"
                :pt="{ gutter: { class: 'bg-transparent' } }"
            >
                <SplitterPanel
                    v-if="!route.meta?.hideSidebarMenu"
                    class="flex h-full overflow-hidden"
                    :size="5"
                    style="min-width: 10rem; max-width: 50rem"
                >
                    <div class="flex flex-col w-full h-full overflow-hidden app-card">
                        <router-view name="menu" />
                    </div>
                </SplitterPanel>
                <SplitterPanel class="flex flex-col w-full h-full overflow-hidden">
                    <router-view />
                </SplitterPanel>
            </Splitter>
        </main>

        <AppFooter v-if="!route.meta?.hideFooter" />
    </div>
</template>

<style scoped></style>
