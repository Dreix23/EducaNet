<script setup>
import { ref, onMounted } from 'vue';
import { FilePenLine, CircleIcon, Trash2 } from 'lucide-vue-next';
import EditarAlumnoDialog from '@/dialogs/EditarAlumnoDialog.vue';
import { db } from '@/services/firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/services/userService.js';
import { logInfo, logError } from '@/utils/logger.js';

const { userSchool } = useAuth();

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['eliminarAlumno']);

const isLoading = ref(true);
const editarModalActive = ref(false);
const alumnoSeleccionado = ref({});

const toggleModal = (alumno, index) => {
  alumnoSeleccionado.value = { ...alumno, index };
  editarModalActive.value = true;
};

const guardarAlumnoEditado = async (alumnoEditado) => {
  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  if (alumnoEditado.id) {
    alumnoEditado.NOM_ALUMNO = alumnoEditado.NOM_ALUMNO.toUpperCase();
    await updateAlumnoInFirebase(alumnoEditado, selectedGrade, selectedSection);
    editarModalActive.value = false;
  } else {
    logError("El ID del alumno es indefinido.");
  }
};

const updateAlumnoInFirebase = async (alumno, grade, section) => {
  const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${grade}${section}`);
  const { id, ...alumnoData } = alumno;
  await updateDoc(docRef, { [id]: alumnoData });
  logInfo(`Alumno actualizado en Firebase: ${grade}${section} - ${id}`, alumnoData);
};

const eliminarAlumno = (alumnoId) => {
  emit('eliminarAlumno', alumnoId);
};

onMounted(() => {
  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  if (!selectedGrade || !selectedSection) {
    logError('selectedGrade o selectedSection no están definidos');
    return;
  }

  const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade}${selectedSection}`);
  onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const alumnos = docSnap.data();
      const alumnosArray = Object.entries(alumnos)
          .map(([key, value]) => ({ ...value, id: key }));

      props.data.splice(0, props.data.length, ...alumnosArray);
      isLoading.value = false;
    } else {
      logError(`No se encontró el documento: ${selectedGrade}${selectedSection}`);
      isLoading.value = false;
    }
  });
});
</script>

<template>
  <div v-if="!isLoading" class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th v-for="column in columns" :key="column" scope="col" class="px-6 py-3">{{ column }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in data" :key="row.id"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td class="px-6 py-4 text-center">{{ rowIndex + 1 }}</td>
        <td class="px-6 py-4">{{ row.NOM_ALUMNO }}</td>
        <td class="px-6 py-4">{{ row.QR }}</td>
        <td class="px-6 py-4">{{ row.TURNO }}</td>
        <td class="px-6 py-4 text-center">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                  @click="toggleModal(row, row.id)">
            <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out"/>
          </button>
          <button class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  @click="eliminarAlumno(row.id)">
            <Trash2 class="hover:scale-[1.5] transition-transform duration-300 ease-in-out"/>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="flex justify-center items-center h-64">
    <CircleIcon class="animate-spin h-16 w-16 text-gray-900"/>
  </div>
  <EditarAlumnoDialog
      :modalActive="editarModalActive"
      :alumnoSeleccionado="alumnoSeleccionado"
      @closeModal="editarModalActive = false"
      @editarAlumno="guardarAlumnoEditado"
  />
</template>

<style scoped>
/* Estilos personalizados aquí si es necesario */
</style>
