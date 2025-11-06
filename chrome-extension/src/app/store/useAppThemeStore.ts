import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppThemeStore = defineStore('app.theme', () => {
    const isDark = ref(false)

    function toggle(value: boolean | undefined = undefined) {
        isDark.value = typeof value === 'boolean' ? value : !isDark.value

        document.documentElement.classList.remove(isDark.value ? 'light' : 'dark')
        document.documentElement.classList.add(isDark.value ? 'dark' : 'light')

        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    function init() {
        let theme = localStorage.getItem('theme')
        if (!theme) {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }

        toggle(theme === 'dark')
    }

    return { isDark, toggle, init }
})
