<template>
    <nav class="left-menu">
        <div>
            <img src="logo.svg" alt="Logo" class="left-menu__logo" />
            <router-link v-for="tab in tabsData" :key="tab.id" :to="tab.title" :class="{ 'left-menu__nav-link': true, 'left-menu__nav-link--active': activeRoute === tab.title }">
                <img :src="`${tab.icon}.svg`" alt="Icon" class="left-menu__icon" />
                {{ tab.title }}
            </router-link>
        </div>
        <div :class="{ 'left-menu__action': true, 'left-menu__action--enabled': allEnabled }">
            <span class="left-menu__label">All plugins {{ allEnabled ? "enabled" : "disabled" }}</span>
            <Toggle :value="allEnabled" @change="handleChange" />
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Toggle from "@/components/common/Toggle.vue"
import useData from "@/composables/useData"
import { bulkUpdate } from "@/services/api"

export default defineComponent({
    components: { Toggle },
    name: "LeftMenu",
    props: {
        activeRoute: {
            type: String,
            required: true,
        },
    },
    setup() {
        const { tabsData, allEnabled, fetchData } = useData()

        const handleChange = async (value: boolean): Promise<void> => {
            try {
                await bulkUpdate({ allEnabled: value })
                allEnabled.value = value
                await fetchData()
            } catch (e) {
                console.log(e)
            }
        }

        return {
            allEnabled,
            tabsData,
            handleChange,
        }
    },
})
</script>
