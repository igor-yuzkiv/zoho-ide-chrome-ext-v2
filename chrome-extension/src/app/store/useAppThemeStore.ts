import { usePreferredDark, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAppThemeStore = defineStore('app.theme', () => {
    const isDark = ref(false)
    const isDarkPreferred = usePreferredDark()
    const localStorageValue = useStorage('theme', '')

    function toggleClass(value: boolean) {
        document.documentElement.classList.remove(value ? 'light' : 'dark')
        document.documentElement.classList.add(value ? 'dark' : 'light')
    }

    function toggle() {
        isDark.value = !isDark.value
        toggleClass(isDark.value)
    }

    function bootstrap() {
        let theme = localStorageValue.value
        if (!theme) {
            theme = isDarkPreferred.value ? 'dark' : 'light'
        }

        isDark.value = theme === 'dark'
        toggleClass(isDark.value)
    }

    watch(isDark, (newVal) => (localStorageValue.value = newVal ? 'dark' : 'light'))

    return { isDark, toggle, bootstrap }
})
