<template>
    <dialog :id popover>
        <div class="container">
            <slot></slot>
        </div>
    </dialog>
</template>

<script setup>
const { id } = defineProps({
    id: String,
})
</script>

<style scoped>
*:popover-open {
    background-color: inherit;
    border: none;
    width: 100%;
    height: 100%;
    padding: 0;
}

*::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
}

.container {
    background-color: var(--color-white);
    width: calc(100% - 3.2rem);
    max-width: 54.4rem;
    height: fit-content;
    position: fixed;
    inset: 0;
    margin: auto;
    border-radius: 0.8rem;
    padding: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>