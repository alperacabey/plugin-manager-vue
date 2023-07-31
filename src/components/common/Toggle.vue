<template>
    <div class="toggle">
        <label class="toggle__container">
            <input v-bind="$attrs" class="toggle__input" type="checkbox" :checked="isChecked" @change="handleChange" />
            <span class="toggle__slider"></span>
        </label>

        <span
            v-if="showStatus"
            :class="{
                toggle__status: true,
                'toggle__status--allowed': isChecked,
                'toggle__status--blocked': !isChecked,
            }"
        >
            {{ isChecked ? "Allowed" : "Blocked" }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({
    name: "ToggleComponent",
    props: {
        label: {
            type: String,
            default: "",
        },
        value: {
            type: Boolean,
            required: true,
        },
        showStatus: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["change"],
    setup(props, { emit }) {
        const isChecked = computed(() => props.value)

        const handleChange = (event: Event): void => {
            const target = event.target as HTMLInputElement
            emit("change", target.checked)
        }

        return {
            isChecked,
            handleChange,
        }
    },
})
</script>
