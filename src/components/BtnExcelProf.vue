<script setup>
import { FileUp } from 'lucide-vue-next';
</script>

<template>
    <button
        class="py-[13px] px-[21px] flex justify-center items-center gap-[5px] bg-white hover:bg-color-green text-size-16 font-semibold text-color-text hover:text-color-white rounded-[12px] dashbutton ">
        <FileUp />
        Cargar Excel
    </button>
</template>

<style scoped>
.dashbutton {
    transition: .3s all ease-in-out;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
