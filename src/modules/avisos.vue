<script setup>
import { ref } from 'vue';
import { CirclePlus } from 'lucide-vue-next';
import AddAviso from "@/dialogs/AddAvisoDirectorDialog.vue";

import TableAvisos from '@/components/TableGeneralAvisos.vue';


const dialogRef = ref(null);


const openDialog = () => {
    if (dialogRef.value) {
        dialogRef.value.openDialog();
    }
}
</script>
<template>
    <h1 class="title">Avisos Generales</h1>
    <div class="container-avisos mt-[15px]">
        <button class="btn-add flex gap-[10px] items-center text-size-14" @click="openDialog">
            <CirclePlus />
            Agregar aviso
        </button>
        <div class="contianer-table mt-[20px]">
            <TableAvisos />
        </div>
    </div>
    <AddAviso ref="dialogRef" />
</template>
<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
}

.container-avisos {
    background: #fff;
    padding: 20px;
    border-radius: 20px;
}

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
