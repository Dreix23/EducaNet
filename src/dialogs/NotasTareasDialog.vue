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

            <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl z-10 relative">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-blue-600 text-center flex-grow">Notas</h2>
                    <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="container-notas">

                    <div class="relative overflow-x-auto h-60">
                        <table
                            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-max">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-4 py-2">
                                        Nombre
                                    </th>
                                    <th scope="col" class="px-4 py-2 text-center">
                                        Nota
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        María García con otro nombre largo
                                    </th>
                                    <td class="px-4 py-2 flex justify-center">
                                        <input type="number"
                                            class="w-full min-w-[60px]  max-w-[100px] border border-gray-300 rounded-[5px] py-1 px-2">
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        María García con otro nombre largo
                                    </th>
                                    <td class="px-4 py-2 flex justify-center">
                                        <input type="number"
                                            class="w-full min-w-[60px]  max-w-[100px] border border-gray-300 rounded-[5px] py-1 px-2">
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        María García con otro nombre largo
                                    </th>
                                    <td class="px-4 py-2 flex justify-center">
                                        <input type="number"
                                            class="w-full min-w-[60px]  max-w-[100px] border border-gray-300 rounded-[5px] py-1 px-2">
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        María García con otro nombre largo
                                    </th>
                                    <td class="px-4 py-2 flex justify-center">
                                        <input type="number"
                                            class="w-full min-w-[60px]  max-w-[100px] border border-gray-300 rounded-[5px] py-1 px-2">
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        María García con otro nombre largo
                                    </th>
                                    <td class="px-4 py-2 flex justify-center">
                                        <input type="number"
                                            class="w-full min-w-[60px]  max-w-[100px] border border-gray-300 rounded-[5px] py-1 px-2">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

                <p v-if="message" class="mt-4 text-center"
                    :class="{ 'text-green-500': !message.startsWith('Error'), 'text-red-500': message.startsWith('Error') }">
                    {{ message }}
                </p>

                <div class="flex justify-center gap-[15px]">
                    <button class="btn-add">Guardar</button>
                    <button class="btn-add btn-cancelar">Cancelar</button>
                </div>
            </div>

        </div>
    </transition>
</template>

<style scoped>
.btn-add {
    margin-top: 20px;
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

.btn-cancelar {
    color: #FC5C5C;
    background: transparent;
    border: 1px solid #FC5C5C;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.relative.overflow-x-auto.h-60 {
    overflow-y: auto;
}

.min-w-max {
    min-width: max-content;
}
</style>
