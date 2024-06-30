<script setup>
import { ref, watch } from 'vue';
import { CircleIcon } from 'lucide-vue-next';
import { logInfo, logError } from '@/utils/logger.js';

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
    default: 'Editar Alumno'
  }
});

const emit = defineEmits(['closeModal', 'editarAlumno']);

const tempNombre = ref('');
const tempQR = ref('');
const tempTurno = ref('');
const loading = ref(false);

watch(() => props.alumnoSeleccionado, (newAlumno) => {
  tempNombre.value = newAlumno.NOM_ALUMNO || '';
  tempQR.value = newAlumno.QR || '';
  tempTurno.value = newAlumno.TURNO || 'MATUTINO';
});

const closeModal = () => {
  emit('closeModal');
};

const editarAlumno = () => {
  loading.value = true;

  setTimeout(() => {
    const alumnoEditado = {
      NOM_ALUMNO: tempNombre.value.toUpperCase(),
      QR: tempQR.value,
      TURNO: tempTurno.value,
      id: props.alumnoSeleccionado.id
    };
    emit('editarAlumno', alumnoEditado);
    loading.value = false;
    logInfo("Alumno editado con éxito");
  }, 500);
};

const convertirAMayusculas = (event) => {
  event.target.value = event.target.value.toUpperCase();
};
</script>

<template>
  <transition name="fade" appear>
    <div v-if="modalActive" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="bg-white rounded-[20px] shadow-lg w-11/12 md:w-1/2 lg:w-1/3 z-10 p-[16px]">
        <div class="flex justify-between items-center p-[8px] border-b">
          <h2 class="text-lg font-semibold text-gray-900">{{ titleCard }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="editarAlumno">
            <div class="grid gap-6 mb-6">
              <div class="grid grid-cols-3 gap-4 items-center">
                <label for="nombre" class="text-sm text-gray-900">Nombre</label>
                <input v-model="tempNombre" @input="convertirAMayusculas" type="text" id="nombre" placeholder="Nombre"
                       class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              </div>
              <div class="grid grid-cols-3 gap-4 items-center">
                <label for="codigoQR" class="text-sm text-gray-900">Código QR</label>
                <input v-model="tempQR" @input="convertirAMayusculas" type="text" id="codigoQR" placeholder="Código QR"
                       class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              </div>
              <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm text-gray-900">Turno</label>
                <div class="col-span-2 flex space-x-4">
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="tempTurno" value="MATUTINO" class="form-radio text-blue-600">
                    <span class="ml-2">MATUTINO</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="tempTurno" value="VESPERTINO" class="form-radio text-blue-600">
                    <span class="ml-2">VESPERTINO</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-8">
              <button type="submit"
                      class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
                      :disabled="loading">
                <span v-if="!loading">Editar Alumno</span>
                <span v-else class="flex items-center">
                  <CircleIcon class="animate-spin h-5 w-5 mr-3"/>
                  Editando...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
</style>
