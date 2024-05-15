<script setup>
import { ref } from 'vue';
import { ChevronLeft, ChevronRight, FilePenLine } from 'lucide-vue-next';
import { defineProps } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import DashInput from '@/components/DashInput.vue';
// Definir propiedades que acepta el componente
const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    pagination: {
        type: Object,
        required: true
    }
});

const prevPage = () => {
    if (props.pagination.hasPrevPage) {
        props.pagination.onPrevPage();
    }
};

const nextPage = () => {
    if (props.pagination.hasNextPage) {
        props.pagination.onNextPage();
    }
};

const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};


</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th v-for="(column, index) in columns" :key="index" scope="col" class="px-6 py-3">
                        {{ column }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex"
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th v-for="(cell, cellIndex) in row" :key="cellIndex" scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ cell }}
                    </th>
                    <td class="px-6 py-4">
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            @click="toggleModal">
                            <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span
            class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.start }}-{{ pagination.end
                }}</span> de <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span>
        </span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" @click.prevent="prevPage"
                    :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg', { 'cursor-not-allowed opacity-50': !pagination.hasPrevPage }]"
                    :disabled="!pagination.hasPrevPage">
                    <ChevronLeft />
                </a>
            </li>
            <li>
                <a href="#"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" @click.prevent="nextPage"
                    :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg', { 'cursor-not-allowed opacity-50': !pagination.hasNextPage }]"
                    :disabled="!pagination.hasNextPage">
                    <ChevronRight />
                </a>
            </li>
        </ul>
    </nav>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal" title-card="Editar Alumno">
        <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
                <DashInput type="text" label="Nombre" placeholder="Nombre" />

                <DashInput type="text" label="Código QR" placeholder="QR" class="col-span-2 sm:col-span-1" />

                <DashInput type="text" label="DNI" placeholder="DNI" class="col-span-2 sm:col-span-1" />

                <DashInput type="text" label="Dirección" placeholder="Dirección" class="col-span-2 sm:col-span-1" />

                <DashInput type="tel" label="Teléfono(Padre)" placeholder="900 505 052"
                    class="col-span-2 sm:col-span-1" />
            </div>
            <BaseButton type="submit" icon-type="" button-text="Editar Alumno" class="text-size-14" />
        </form>
    </BaseModal>
</template>

<style scoped>
/* Estilos personalizados aquí si es necesario */
</style>