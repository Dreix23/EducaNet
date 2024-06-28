<script setup>
import TableAsistencias from '@/components/TableAsistenciasDirector.vue';
</script>
<template>
    <h1 class="title">Asistencias Generales</h1>
    <div class="container-asistencias mt-[15px]">
        <div class="flex items-center gap-[20px]">
            <div>
                <input type="date" v-model="selectedDate"
                    class="bg-gray-50 border border-gray-300 h-[54.2px] text-gray-900 text-size-18 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Seleccionar fecha">
            </div>
            <div>
                <div class=" bg-white dark:bg-gray-900">
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div
                            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search"
                            class="block pt-2 ps-10 h-[54.2px] text-size-16 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar por Código o nombre">
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-[20px]">
            <TableAsistencias />
        </div>

    </div>


</template>
<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
}

.container-asistencias {
    background: #fff;
    padding: 20px;
    border-radius: 20px;
}
</style>
