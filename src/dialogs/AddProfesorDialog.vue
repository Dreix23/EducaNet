<script setup>
import { ref, watch } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next'
defineEmits(["close-modal"]);
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    },
    titleCard: {
        type: String,
        default: ''
    }
});

const showPassword = ref(false);
const password = ref('');

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
function onPasswordInput(event) {
    password.value = event.target.value;
    logDebug(`Contraseña ingresada: ${password.value}`);
}
</script>

<template>
    <Teleport to="body" >
        <Transition name="modal-outer" >
            <div v-show="modalActive" 
                class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-50 " >
                <Transition name="modal-inner">
                    <div v-if="modalActive"
                        class="container-all p-4 self-start mt-32 max-w-screen-md relative bg-white rounded-[20px] shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div
                            class="flex items-center justify-between p-3 md:p-2 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                {{ titleCard }}
                            </h3>
                            <button type="button" @click="$emit('close-modal')"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Form -->
                        <form class="p-4 md:p-5">
                            <div class="grid gap-4 mb-4 grid-cols-1">
                                <div class="col-span-2">
                                    <label for="cod"
                                        class="block mb-2 text-sm text-size-14 text-gray-900 dark:text-white">Código</label>
                                    <input :type="type" name="cod" id="cod"
                                        class="input text-color-text bg-color-white focus:bg-gray-50 transition-colors duration-300 ease-in-out"
                                        placeholder="Código" required="">
                                </div>
                                <div class="col-span-2">
                                    <label for="name"
                                        class="block mb-2 text-sm text-size-14 text-gray-900 dark:text-white">Nombre</label>
                                    <input :type="type" name="name" id="name"
                                        class="input text-color-text bg-color-white focus:bg-gray-50 transition-colors duration-300 ease-in-out"
                                        placeholder="Nombre" required="">
                                </div>
                                <div class="col-span-2">
                                    <label for="espacialidad"
                                        class="block mb-2 text-sm text-size-14 text-gray-900 dark:text-white">Especialidad</label>
                                    <input :type="type" name="espacialidad" id="espacialidad"
                                        class="input text-color-text bg-color-white focus:bg-gray-50 transition-colors duration-300 ease-in-out"
                                        placeholder="Especialidad" required="">
                                </div>
                                <div class="col-span-2">
                                    <label for="password" class="text-sm text-gray-900">Contraseña</label>
                                    <div class="input-group col-span-2 mt-[8px]">
                                        <input class="input" :type="showPassword ? 'text' : 'password'"
                                            placeholder="Contraseña" v-model="password" @input="onPasswordInput">
                                        <button type="button" class="password-toggle" @click="toggleShowPassword">
                                            <Eye v-if="!showPassword" />
                                            <EyeOff v-else />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <button type="submit"
                                    class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                    :disabled="loading">
                                    <span v-if="!loading">Guardar Profesor</span>
                                    <span v-else>
                                        <svg class="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        Guardando...
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.container-all {
    width: 500px;
}

.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}


.input-group {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9E9E9E;
    z-index: 1;
    width: 20px;
    height: 20px;
}

.input-group input {
    position: relative;
    z-index: 2;
    background: transparent;
    border: 1px solid #DFEAF2;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #9E9E9E;
    z-index: 3;
}

.password-toggle:focus {
    outline: none;
}
</style>