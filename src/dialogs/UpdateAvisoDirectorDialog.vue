<script setup>
import { defineExpose, ref } from 'vue';


const titulo = ref('');
const descripcion = ref('');
const fechaPublicacion = ref('');
const isDialogOpen = ref(false);
const isLoading = ref(false);

const openDialog = () => {
    isDialogOpen.value = true;
};

const closeDialog = () => {
    isDialogOpen.value = false;
    titulo.value = '';
    descripcion.value = '';
    fechaPublicacion.value = '';
};


defineExpose({
    openDialog,
    closeDialog
});
</script>

<template>
    <transition name="fade" appear>
        <div v-if="isDialogOpen" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-gray-900 opacity-50" @click="closeDialog"></div>
            <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md z-10 relative">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-blue-600 text-center flex-grow">Editar Aviso</h2>
                    <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="addAviso">
                    <div class="mb-6 relative">
                        <label for="titulo"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                        <input id="titulo" v-model="titulo" required placeholder="Título"
                            class="w-full pl-3 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none focus:border-color-gray" />
                    </div>
                    <div class="mb-6 relative">
                        <label for="descripcion"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <textarea id="descripcion" v-model="descripcion" rows="4"
                            class="w-full pl-3 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none focus:border-color-gray"
                            placeholder="Descripción del Aviso"></textarea>
                    </div>
                    <div class="mb-6 relative">
                        <label for="fechaPublicacion"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de
                            Publicación</label>
                        <input type="date" id="fechaPublicacion" v-model="fechaPublicacion"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Seleccionar fecha">
                    </div>
                    <div class="flex justify-center">
                        <button type="submit"
                            class="bg-color-primary hover:bg-color-blue transition-colors duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-[9px]"
                            :disabled="isLoading">
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<style scoped>
</style>
