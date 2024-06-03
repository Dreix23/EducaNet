<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';
import { EyeIcon, EyeOffIcon, SchoolIcon, MailIcon, LockIcon, UserIcon } from 'lucide-vue-next';

const schoolCT = ref('');
const schoolName = ref('');
const directorName = ref('');
const directorEmail = ref('');
const directorPassword = ref('');
const message = ref('');
const isDialogOpen = ref(false);
const isLoading = ref(false);
const showPassword = ref(false);

const openDialog = () => {
    isDialogOpen.value = true;
};

const closeDialog = () => {
    isDialogOpen.value = false;
    schoolCT.value = '';
    schoolName.value = '';
    directorName.value = '';
    directorEmail.value = '';
    directorPassword.value = '';
    message.value = '';
};

const selectedDate = ref('');

const today = new Date().toISOString().split('T')[0];

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
                    <h2 class="text-2xl font-bold text-blue-600 text-center flex-grow">Nueva Tarea</h2>
                    <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="addSchool">
                    <div class="mb-6 relative">
                        <label for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                        <input id="schoolCT" v-model="schoolCT" @input="schoolCT = $event.target.value.toUpperCase()"
                            required placeholder="Titulo"
                            class="w-full pl-3 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none  focus:border-color-gray" />
                    </div>
                    <div class="mb-6 relative">
                        <label for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <textarea id="message" rows="4"
                            class="w-full pl-3 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none  focus:border-color-gray"
                            placeholder="Descripción de la Tarea"></textarea>
                    </div>
                    <div class="mb-6 relative">
                        <label for="datepicker"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                        <div class="relative max-w-sm">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input type="date" v-model="selectedDate" :min="today"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Seleccionar fecha">
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button type="submit"
                            class="bg-color-primary hover:bg-color-blue transition-colors duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-[9px]"
                            :disabled="isLoading">
                            {{ isLoading ? 'Agregando...' : 'Agregar' }}
                        </button>
                    </div>
                </form>
                <p v-if="message" class="mt-4 text-center"
                    :class="{ 'text-green-500': !message.startsWith('Error'), 'text-red-500': message.startsWith('Error') }">
                    {{ message }}
                </p>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
