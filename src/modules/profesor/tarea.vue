<script setup>
import { ref } from 'vue'
import { CirclePlus } from 'lucide-vue-next'
import TareaTable from "@/components/TareasTable.vue"
import AddTareaDialog from '@/dialogs/AddTareaDialog.vue';

const dialogRef = ref(null);

const openDialog = () => {
    if (dialogRef.value) {
        dialogRef.value.openDialog();
    }
};

</script>

<template>
    <button class="btn-add flex gap-[10px] items-center" @click="openDialog">
        <CirclePlus />
        Agregar tarea
    </button>
    <AddTareaDialog ref="dialogRef" />
    <TareaTable />
</template>

<style scoped>
.btn-add {
    padding: 12px 32px;
    background: #2D60FF;
    color: #fff;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 12px;
    transition: .3s all ease-in-out;
    font-weight: 600;
}

.btn-add:hover {
    background: #1814F3;
    color: #fff;
}
</style>