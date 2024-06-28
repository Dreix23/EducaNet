<script setup>
import { ref } from 'vue'
import { FilePenLine, Trash2 } from 'lucide-vue-next';
import UpdateAviso from '@/dialogs/UpdateAvisoDirectorDialog.vue';


const dialogRef = ref(null);


const openDialog = () => {
    if (dialogRef.value) {
        dialogRef.value.openDialog();
    }
}


</script>
<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-size-14 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-size-14 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Titulo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Descripción
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha Publicación
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           Venir a la reunión
                        </th>
                        <td class="px-6 py-4">
                           No faltar
                        </td>
                        <td class="px-6 py-4">
                            17-08-2024
                        </td>
                        <td class="px-6 py-4 flex gap-4 justify-center">
                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                @click="openDialog">
                                <FilePenLine class="icon" />
                            </button>
                            <button class="font-medium text-red-600 dark:text-red-500 hover:underline">
                                <Trash2 class="icon" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <UpdateAviso ref="dialogRef" />
</template>
<style scoped></style>
