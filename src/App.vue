<template>
    <div class="app">
        <LeftMenu :active-route="activeRoute" />
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"
import LeftMenu from "@/components/layout/LeftMenu.vue"
import "@/assets/styles/index.scss"

export default defineComponent({
    name: "App",
    components: {
        LeftMenu,
    },
    setup() {
        const route = useRoute()
        const activeRoute = computed(() => route.params.tab as string)

        return {
            activeRoute,
        }
    },
})
</script>
