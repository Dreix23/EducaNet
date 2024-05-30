<script setup>
import { ref, watch, onMounted } from 'vue';
import { ChevronLeft, ChevronRight, FilePenLine } from 'lucide-vue-next';
import EditarAlumnoDialog from '@/dialogs/EditarAlumnoDialog.vue';
import { db } from '@/services/firebase';
import { doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/services/userService.js';

const { currentUser, userSchool } = useAuth();

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

const editarModalActive = ref(false);
const alumnoSeleccionado = ref({});

const toggleModal = (alumno, index) => {
  console.log("Alumno seleccionado:", alumno);
  alumnoSeleccionado.value = { ...alumno, index: index };
  localStorage.setItem('alumnoSeleccionado', JSON.stringify({ ...alumno, index: index }));
  editarModalActive.value = true;
};

const cargarDatosDesdeFirebase = async (start, perPage) => {
  if (!userSchool.value) {
    console.error('userSchool no está definido');
    return;
  }

  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  if (!selectedGrade || !selectedSection) {
    console.error('selectedGrade o selectedSection no están definidos');
    return;
  }

  const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade}${selectedSection}`);
  try {
    isLoading.value = true;
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const alumnos = docSnap.data();
      const alumnosArray = Object.entries(alumnos)
          .map(([key, value]) => ({ ...value, index: key }))
          .slice(start - 1, start - 1 + perPage);

      props.data.splice(0, props.data.length, ...alumnosArray);

      props.pagination.total = Object.keys(alumnos).length;
      props.pagination.hasPrevPage = start > 1;
      props.pagination.hasNextPage = start - 1 + perPage < props.pagination.total;

      isLoading.value = false;
    } else {
      console.log(`No se encontró el documento: ${selectedGrade}${selectedSection}`);
      isLoading.value = false;
    }
  } catch (error) {
    console.error('Error al cargar datos desde Firebase:', error);
    isLoading.value = false;
  }
};

const guardarAlumnoEditado = async (alumnoEditado) => {
  console.log("Alumno editado:", alumnoEditado);

  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  if (alumnoEditado.index !== undefined) {
    console.log("Grado seleccionado:", selectedGrade);
    console.log("Sección seleccionada:", selectedSection);

    alumnoEditado.NOM_ALUMNO = alumnoEditado.NOM_ALUMNO.toUpperCase();
    await updateAlumnoInFirebase(alumnoEditado, selectedGrade, selectedSection, alumnoEditado.index);

    editarModalActive.value = false;
  } else {
    console.error("El índice del alumno es indefinido.");
  }
};

const updateAlumnoInFirebase = async (alumno, grade, section, alumnoIndex) => {
  const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${grade}${section}`);
  await updateDoc(docRef, { [alumnoIndex]: alumno });
  console.log(`Alumno actualizado en Firebase: ${grade}${section} - ${alumnoIndex}`, alumno);
};

onMounted(() => {
  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  if (!selectedGrade || !selectedSection) {
    console.error('selectedGrade o selectedSection no están definidos');
    return;
  }

  const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade}${selectedSection}`);
  onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const alumnos = docSnap.data();
      const alumnosArray = Object.entries(alumnos)
          .map(([key, value]) => ({ ...value, index: key }))
          .slice(props.pagination.start - 1, props.pagination.start - 1 + props.pagination.perPage);

      props.data.splice(0, props.data.length, ...alumnosArray);

      props.pagination.total = Object.keys(alumnos).length;
      props.pagination.hasPrevPage = props.pagination.start > 1;
      props.pagination.hasNextPage = props.pagination.start - 1 + props.pagination.perPage < props.pagination.total;

      isLoading.value = false;
    } else {
      console.log(`No se encontró el documento: ${selectedGrade}${selectedSection}`);
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
      <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td class="px-6 py-4 text-center">{{ pagination.start + rowIndex }}</td>
        <td class="px-6 py-4">{{ row.NOM_ALUMNO }}</td>
        <td class="px-6 py-4">{{ row.QR }}</td>
        <td class="px-6 py-4">{{ row.TURNO }}</td>
        <td class="px-6 py-4 text-center">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="toggleModal(row, rowIndex + pagination.start - 1)">
            <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
  <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center">
      Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.start }}-{{ pagination.end }}</span> de <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span>
    </span>
    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <a href="#" @click.prevent="prevPage" :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg', { 'cursor-not-allowed opacity-50': !pagination.hasPrevPage }]" :disabled="!pagination.hasPrevPage">
          <ChevronLeft />
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="nextPage" :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg', { 'cursor-not-allowed opacity-50': !pagination.hasNextPage }]" :disabled="!pagination.hasNextPage">
          <ChevronRight />
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
</template>

<style scoped>
/* Custom styles here if needed */
</style>
