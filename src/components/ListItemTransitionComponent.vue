<template>
    <TransitionGroup name="list-item">
        <slot></slot>
    </TransitionGroup>
</template>
<script setup></script>
<style>
.list-item-enter-active,
.list-item-leave-active {
    transition: all 0.4s ease;
}

.list-item-leave-active {
    position: absolute;
}

.list-item-enter-from,
.list-item-leave-to {
    opacity: 0;
    transform: translateX(-4rem);
}
</style>