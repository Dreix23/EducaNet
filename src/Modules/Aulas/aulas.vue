<script setup>
import DashButton from '@/components/DashButton.vue';
import GradoItem from '@/components/GradoItem.vue';
import { Sheet, FileUp } from 'lucide-vue-next';
</script>

<template>
    <div class="container-button-alumnos flex gap-[15px]">
        <DashButton iconType="FileUp" buttonText="Cargar Excel" class="bg-color-white hover:bg-color-green" />
        <!-- <DashButton icon-type="CirclePlus" button-text="" class="bg-white hover:bg-color-blue" /> -->
    </div>

    <div class="bg-color-white container-items-grado flex flex-col justify-center items-center gap-[10px]">
        <GradoItem :grade="1" :sections="['A', 'B', 'C', 'D']" />
        <GradoItem :grade="2" :sections="['A', 'B', 'C']" />
        <GradoItem :grade="3" :sections="['A', 'B', 'C', 'D', 'E']" />
    </div>

</template>

<style scoped>
.container-items-grado {
    margin-top: 18px;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
    padding: 25px 24px;
}

@media screen and (max-width: 750px) {
    .container-button-alumnos {
        justify-content: center;
    }
}
</style>