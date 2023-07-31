<template>
    <div :class="{ card: true, 'card--disabled': plugin.isDisabled }">
        <div class="card__content">
            <h3 class="card__title">{{ plugin.title }}</h3>
            <div class="card__description">
                {{ plugin.description }}
            </div>
        </div>
        <div class="card__action">
            <Toggle :value="plugin.isActive" show-status @change="handleChange" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import Toggle from "@/components/common/Toggle.vue"
import { Plugin } from "@/types"

export default defineComponent({
    name: "CardComponent",
    props: {
        plugin: {
            type: Object as PropType<Plugin>,
            required: true,
        },
    },
    components: {
        Toggle,
    },
    emits: ["change"],
    setup(props, { emit }) {
        const handleChange = (value: boolean): void => {
            emit("change", {
                id: props.plugin.id,
                isActive: value,
            })
        }

        return {
            handleChange,
        }
    },
})
</script>
