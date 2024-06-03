<script setup>
import { ref } from 'vue';
import UpdateTareaDialog from '@/dialogs/UpdateTareaDialog.vue'
import NotasTareasDialog from '@/dialogs/NotasTareasDialog.vue'
import { FilePenLine, Trash2, ChevronRight, ChevronLeft } from 'lucide-vue-next'

const dialogRef = ref(null);
const dialogRef2 = ref(null);

const openDialog = () => {
    if (dialogRef.value) {
        dialogRef.value.openDialog();
    }
};
const openDialog2 = () => {
    if (dialogRef2.value) {
        dialogRef2.value.openDialog();
    }
};

</script>

<template>

    <div class="relative overflow-x-auto  sm:rounded-lg mt-[25px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="text-center">
                    <th scope="col" class="px-6 py-3">
                        Titulo de Tarea
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Descripción
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Fecha de inicio
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Fecha límite
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Aciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Solo
                    </th>
                    <td class="px-6 py-4">
                        Es una tarea
                    </td>
                    <td class="px-6 py-4 text-center">
                        10-10-2024
                    </td>
                    <td class="px-6 py-4 text-center">
                        30-10-24
                    </td>
                    <td class="px-6 py-4 flex gap-[15px] justify-center">
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            @click="openDialog">
                            <FilePenLine class="icon" />
                        </button>
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <Trash2 class="icon text-color-alert" />
                        </button>
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"  @click="openDialog2">
                            Ver Notas
                        </button>
                    </td>
                </tr>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Solo
                    </th>
                    <td class="px-6 py-4">
                        Es una tarea
                    </td>
                    <td class="px-6 py-4 text-center">
                        10-10-2024
                    </td>
                    <td class="px-6 py-4 text-center">
                        30-10-24
                    </td>
                    <td class="px-6 py-4 flex gap-[15px] justify-center">
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            @click="openDialog">
                            <FilePenLine class="icon" />
                        </button>
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <Trash2 class="icon text-color-alert" />
                        </button>
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"  @click="openDialog2">
                            Ver Notas
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation">
            <span
                class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrando
                datos
                <span class="font-semibold text-gray-900 dark:text-white">1-10</span> de <span
                    class="font-semibold text-gray-900 dark:text-white">1000</span></span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <ChevronLeft />
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <ChevronRight />
                    </a>
                </li>
            </ul>
        </nav>
    </div>

    <UpdateTareaDialog ref="dialogRef" />
    <NotasTareasDialog ref="dialogRef2" />


</template>

<style scoped>
.icon {
    transition: .3s transform ease-in-out;
}

.icon:hover {
    transform: scale(1.2);

}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
