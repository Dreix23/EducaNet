<script setup>
import {ref, watch, onMounted} from 'vue';
import {ChevronLeft, ChevronRight, FilePenLine, Trash2, CircleIcon} from 'lucide-vue-next';
import EditarAlumnoDialog from '@/dialogs/EditarAlumnoDialog.vue';
import Alert from '@/components/Alert.vue';
import {db} from '@/services/firebase';
import {doc, updateDoc, getDoc, onSnapshot, deleteField} from 'firebase/firestore';
import {useAuth} from '@/services/userService.js';
import {logInfo, logError, logDebug} from '@/utils/logger.js';

const {currentUser, userSchool} = useAuth();

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  pagination: {
    type: Object,
    required: true
  }
});

const isLoading = ref(true);
const editarModalActive = ref(false);
const alumnoSeleccionado = ref({});
const showDeleteAlert = ref(false);
const alumnoToDelete = ref(null);

const prevPage = async () => {
  if (!props.pagination.hasPrevPage) return;
  props.pagination.start -= props.pagination.perPage;
  props.pagination.end -= props.pagination.perPage;
  await cargarDatosDesdeFirebase(props.pagination.start, props.pagination.perPage);
};

const nextPage = async () => {
  if (!props.pagination.hasNextPage) return;
  props.pagination.start += props.pagination.perPage;
  props.pagination.end += props.pagination.perPage;
  await cargarDatosDesdeFirebase(props.pagination.start, props.pagination.perPage);
};

const toggleModal = (alumno, index) => {
  alumnoSeleccionado.value = {...alumno, index};
  editarModalActive.value = true;
};

const cargarDatosDesdeFirebase = async (start, perPage) => {
  if (!userSchool.value) {
    logError('userSchool no está definido');
    return;
  }

  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  if (!selectedGrade || !selectedSection) {
    logError('selectedGrade o selectedSection no están definidos');
    return;
  }

  const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade}${selectedSection}`);
  try {
    isLoading.value = true;
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const alumnos = docSnap.data();
      const alumnosArray = Object.entries(alumnos)
          .map(([key, value]) => ({...value, id: key}))
          .slice(start - 1, start - 1 + perPage);

      props.data.splice(0, props.data.length, ...alumnosArray);

      props.pagination.total = Object.keys(alumnos).length;
      props.pagination.hasPrevPage = start > 1;
      props.pagination.hasNextPage = start - 1 + perPage < props.pagination.total;

      isLoading.value = false;
    } else {
      logError(`No se encontró el documento: ${selectedGrade}${selectedSection}`);
      isLoading.value = false;
    }
  } catch (error) {
    logError('Error al cargar datos desde Firebase:', error);
    isLoading.value = false;
  }
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
  const {id, ...alumnoData} = alumno;
  await updateDoc(docRef, {[id]: alumnoData});
  logInfo(`Alumno actualizado en Firebase: ${grade}${section} - ${id}`, alumnoData);
};

const confirmDelete = (alumno) => {
  alumnoToDelete.value = alumno;
  showDeleteAlert.value = true;
};

const handleDeleteConfirm = async () => {
  if (alumnoToDelete.value) {
    const selectedGrade = localStorage.getItem('selectedGrade');
    const selectedSection = localStorage.getItem('selectedSection');

    if (!selectedGrade || !selectedSection) {
      logError('selectedGrade o selectedSection no están definidos');
      return;
    }

    const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade}${selectedSection}`);
    try {
      await updateDoc(docRef, {
        [alumnoToDelete.value.id]: deleteField()
      });
      logInfo(`Alumno eliminado: ${alumnoToDelete.value.NOM_ALUMNO}`);
    } catch (error) {
      logError('Error al eliminar alumno:', error);
    }
  }
  showDeleteAlert.value = false;
  alumnoToDelete.value = null;
};

const handleDeleteCancel = () => {
  showDeleteAlert.value = false;
  alumnoToDelete.value = null;
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
          .map(([key, value]) => ({...value, id: key}))
          .slice(props.pagination.start - 1, props.pagination.start - 1 + props.pagination.perPage);

      props.data.splice(0, props.data.length, ...alumnosArray);

      props.pagination.total = Object.keys(alumnos).length;
      props.pagination.hasPrevPage = props.pagination.start > 1;
      props.pagination.hasNextPage = props.pagination.start - 1 + props.pagination.perPage < props.pagination.total;

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
        <th scope="col" class="px-6 py-3 text-center">#</th>
        <th scope="col" class="px-6 py-3">NOMBRE</th>
        <th scope="col" class="px-6 py-3">CÓDIGO QR</th>
        <th scope="col" class="px-6 py-3">TURNO</th>
        <th scope="col" class="px-6 py-3 text-center">ACCIONES</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in data" :key="row.id"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td class="px-6 py-4 text-center">{{ pagination.start + rowIndex }}</td>
        <td class="px-6 py-4">{{ row.NOM_ALUMNO }}</td>
        <td class="px-6 py-4">{{ row.QR }}</td>
        <td class="px-6 py-4">{{ row.TURNO }}</td>
        <td class="px-6 py-4 text-center">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                  @click="toggleModal(row, row.id)">
            <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out"/>
          </button>
          <button class="font-medium text-red-600 dark:text-red-500 hover:underline" @click="confirmDelete(row)">
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
  <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
    <span
        class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center">
      Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.start }}-{{
        pagination.end
      }}</span> de <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span>
    </span>
    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <a href="#" @click.prevent="prevPage"
           :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg', { 'cursor-not-allowed opacity-50': !pagination.hasPrevPage }]"
           :disabled="!pagination.hasPrevPage">
          <ChevronLeft/>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="nextPage"
           :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg', { 'cursor-not-allowed opacity-50': !pagination.hasNextPage }]"
           :disabled="!pagination.hasNextPage">
          <ChevronRight/>
        </a>
      </li>
    </ul>
  </nav>
  <EditarAlumnoDialog
      :modalActive="editarModalActive"
      :alumnoSeleccionado="alumnoSeleccionado"
      @closeModal="editarModalActive = false"
      @editarAlumno="guardarAlumnoEditado"
  />
  <Alert
      v-if="showDeleteAlert"
      Type="alert"
      TitleAlert="Confirmar eliminación"
      :InfoAlert="`¿Estás seguro de que deseas eliminar al alumno ${alumnoToDelete?.NOM_ALUMNO}?`"
      ButonText="Eliminar"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
      @close="handleDeleteCancel"
  />
</template>

<style scoped>
/* Custom styles here if needed */
</style>
