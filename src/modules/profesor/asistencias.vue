<script setup>
import AsistenciaTable from '@/components/AsistenciaTable.vue'
</script>

<template>
    <div class="container-btn flex items-center space-x-4">
        <div class="relative max-w-sm">
            <input type="date" v-model="selectedDate" :min="today"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-size-18 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Seleccionar fecha">
        </div>
        <button @click="handleSave" class="btn-add flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Guardar
        </button>
    </div>
    <div class="flex justify-center mt-[15px]">
        <AsistenciaTable/>
    </div>
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

.container-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}
@media screen and (max-width: 750px) {
   .container-btn{
    flex-direction: column;
    justify-content: center;
   }
}
</style>