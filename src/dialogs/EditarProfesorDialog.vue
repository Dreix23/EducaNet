<script setup>
import { ref, watch } from 'vue';

import {  Eye, EyeOff } from 'lucide-vue-next'

const props = defineProps({
    modalActive: {
        type: Boolean,
        required: true
    },
    alumnoSeleccionado: {
        type: Object,
        required: true,
        default: () => ({})
    },
    titleCard: {
        type: String,
        default: 'Editar Profesor'
    }
});

const emit = defineEmits(['closeModal', 'editarAlumno']);

const tempNombre = ref('');
const tempQR = ref('');
const tempTurno = ref('');
const loading = ref(false);
const showPassword = ref(false);
const password = ref('');

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
function onPasswordInput(event) {
    password.value = event.target.value;
    logDebug(`Contraseña ingresada: ${password.value}`);
}
watch(() => props.alumnoSeleccionado, (newAlumno) => {
    tempNombre.value = newAlumno.NOM_ALUMNO || '';
    tempQR.value = newAlumno.QR || '';
    tempTurno.value = newAlumno.TURNO || '';
});

const closeModal = () => {
    emit('closeModal');
};

const editarAlumno = () => {
    loading.value = true;

    setTimeout(() => {
        const alumnoEditado = {
            NOM_ALUMNO: tempNombre.value,
            QR: tempQR.value,
            TURNO: tempTurno.value
        };
        emit('editarAlumno', alumnoEditado);
        loading.value = false;
    }, 1000);
};

// Función para convertir el texto a mayúsculas
const convertirAMayusculas = (event) => {
    event.target.value = event.target.value.toUpperCase();
};
</script>
<template>
    <div v-if="modalActive" class="fixed inset-0 flex items-center justify-center z-50" >
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-white rounded-[20px] shadow-lg w-11/12 md:w-1/2 lg:w-1/3 z-10 p-[16px] ">
            <div class="flex justify-between items-center p-[8px] border-b">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ titleCard }}</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <div class="p-6">
                <form @submit.prevent="editarAlumno">
                    <div class="grid gap-6 mb-6">
                        <div class="grid grid-cols-3 gap-4 items-center">
                            <label for="cod" class="text-sm text-gray-900">Código</label>
                            <input v-model="tempNombre" @input="convertirAMayusculas" type="text" id="cod"
                                placeholder="Código"
                                class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                        </div>
                        <div class="grid grid-cols-3 gap-4 items-center">
                            <label for="nombre" class="text-sm text-gray-900">Nombre</label>
                            <input v-model="tempNombre" @input="convertirAMayusculas" type="text" id="nombre"
                                placeholder="Nombre"
                                class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                        </div>
                        <div class="grid grid-cols-3 gap-4 items-center">
                            <label for="especialidad" class="text-sm text-gray-900">Especialidad</label>
                            <input v-model="tempQR" @input="convertirAMayusculas" type="text" id="especialidad"
                                placeholder="Especialidad"
                                class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                        </div>
                        <div class="grid grid-cols-3 gap-4 items-center">
                            <label for="password" class="text-sm text-gray-900">Contraseña</label>
                            <input v-model="tempTurno" @input="convertirAMayusculas" type="text" id="password"
                                placeholder="Contraseña"
                                class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                        </div>
                        <div class="grid grid-cols-3 gap-4 items-center">
                            <label for="password" class="text-sm text-gray-900">Contraseña</label>
                            <div class="input-group col-span-2">
                                <input class="input" :type="showPassword ? 'text' : 'password'" placeholder="Contraseña"
                                    v-model="password" @input="onPasswordInput">
                                <button type="button" class="password-toggle" @click="toggleShowPassword">
                                    <Eye v-if="!showPassword" />
                                    <EyeOff v-else />
                                </button>
                            </div>
                        </div>



                        <div class="grid grid-cols-3 gap-4 items-center">
                            <span for="password" class="text-sm text-gray-900">Estado</span>
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer">
                                <div
                                    class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>

                    </div>

                    <div class="flex justify-center mt-6">
                        <button type="submit"
                            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                            :disabled="loading">
                            <span v-if="!loading">Editar Profesor</span>
                            <span v-else>
                                <svg class="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Editando...
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
    border-color: #6B7280;
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