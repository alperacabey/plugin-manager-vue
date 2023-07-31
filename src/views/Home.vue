<template>
    <main class="page">
        <div class="page-wrapper">
            <h3 class="heading1">{{ tabData?.title }}</h3>
            <div class="page__content">
                <Card v-for="plugin in tabData?.plugins" :key="plugin.id" :plugin="plugin" @change="handleChange" />
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import Card from "@/components/common/Card.vue"
import useData, { updatePlugin } from "@/composables/useData"
import { useRoute } from "vue-router"
import { UpdateRequestModel } from "@/types"

export default defineComponent({
    name: "HomePage",
    components: {
        Card,
    },
    setup() {
        const { tabsData, fetchData, allEnabled } = useData()
        const route = useRoute()
        const activeRoute = computed(() => route.params.tab)

        const tabData = computed(() => {
            return tabsData.value.find((tab) => tab.title === activeRoute.value)
        })

        const handleChange = async (payload: { id: string; isActive: boolean }): Promise<void> => {
            if (tabData.value && tabData.value) {
                const requestModel: UpdateRequestModel = { ...payload, tabId: tabData.value.id }
                try {
                    await updatePlugin(requestModel)
                    fetchData()
                } catch (e) {
                    console.log(e)
                }
            }
        }

        return {
            tabData,
            allEnabled,
            handleChange,
        }
    },
})
</script>
