<script setup>
import { defineExpose, ref } from 'vue';
import { logInfo, logError } from '@/utils/logger.js';
import { useAuth } from '@/services/userService.js';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';

const { userSchool } = useAuth();

const isDialogOpen = ref(false);
const tempNombre = ref('');
const tempQR = ref('');
const tempTurno = ref('MATUTINO');
const loading = ref(false);

const selectedGrade = ref(localStorage.getItem('selectedGrade'));
const selectedSection = ref(localStorage.getItem('selectedSection'));

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  resetForm();
};

const resetForm = () => {
  tempNombre.value = '';
  tempQR.value = '';
  tempTurno.value = 'MATUTINO';
};

const convertirAMayusculas = (event) => {
  event.target.value = event.target.value.toUpperCase();
};

const agregarAlumno = async () => {
  loading.value = true;

  const nuevoAlumno = {
    NOM_ALUMNO: tempNombre.value.toUpperCase(),
    QR: tempQR.value,
    TURNO: tempTurno.value,
  };

  try {
    const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade.value}${selectedSection.value}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const newIndex = Object.keys(data).length;
      await updateDoc(docRef, {
        [newIndex]: nuevoAlumno
      });
    } else {
      await setDoc(docRef, {
        0: nuevoAlumno
      });
    }

    logInfo('Nuevo alumno agregado:', nuevoAlumno);
    closeDialog();
  } catch (error) {
    logError('Error al agregar alumno:', error);
  } finally {
    loading.value = false;
  }
};

defineExpose({
  openDialog,
  closeDialog
});
</script>

<template>
  <transition name="fade" appear>
    <div v-if="isDialogOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50" @click="closeDialog"></div>
      <div class="bg-white rounded-[20px] shadow-lg w-11/12 md:w-1/2 lg:w-1/3 z-10 p-[16px]">
        <div class="flex justify-between items-center p-[8px] border-b">
          <h2 class="text-lg font-semibold text-gray-900">Agregar Alumno</h2>
          <button @click="closeDialog" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="agregarAlumno">
            <div class="grid gap-6 mb-6">
              <div class="grid grid-cols-3 gap-4 items-center">
                <label for="nombre" class="text-sm text-gray-900">Nombre</label>
                <input v-model="tempNombre" @input="convertirAMayusculas" type="text" id="nombre"
                       placeholder="Nombre"
                       class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              </div>
              <div class="grid grid-cols-3 gap-4 items-center">
                <label for="codigoQR" class="text-sm text-gray-900">Código QR</label>
                <input v-model="tempQR" @input="convertirAMayusculas" type="text" id="codigoQR"
                       placeholder="Código QR"
                       class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              </div>
              <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm text-gray-900">Turno</label>
                <div class="col-span-2 flex gap-4">
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
            <div class="flex justify-center mt-6">
              <button type="submit"
                      class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      :disabled="loading">
                <span v-if="!loading">Agregar Alumno</span>
                <span v-else>
                                    <svg class="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Agregando...
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
