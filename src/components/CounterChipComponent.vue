<template>
    <span class="counter">
        <span class="done">{{ done || 0 }}</span><span> {{ separator }} </span><span>{{ total || 0 }}</span>
    </span>
</template>

<script setup>
const { done, separator, total } = defineProps({
    done: Number,
    separator: String,
    total: Number
})
</script>

<style scoped>
.counter {
    background-color: var(--color-gray-l4);
    padding: 1rem 0.8rem;
    border-radius: 1.6rem;
    display: flex;
    width: fit-content;
    gap: 0.2rem;

    & span {
        font-family: var(--font-english);
        font-size: 1.2rem;
        font-weight: bold;
    }
}

.done{
    color: var(--color-teal);
}
</style>