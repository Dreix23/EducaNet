<script setup>
import { ref } from 'vue';
import { ChevronLeft, ChevronRight, FilePenLine } from 'lucide-vue-next';
import EditarAlumnoDialog from '@/dialogs/EditarAlumnoDialog.vue';
import { db } from '@/services/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

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

// Pagination functions
const prevPage = () => {
  if (props.pagination.hasPrevPage) {
    props.pagination.onPrevPage();
  }
};

const nextPage = () => {
  if (props.pagination.hasNextPage) {
    props.pagination.onNextPage();
  }
};

const editarModalActive = ref(false);
const alumnoSeleccionado = ref({});

// Function to open the edit modal
const toggleModal = (alumno) => {
  console.log("Alumno seleccionado:", alumno);
  alumnoSeleccionado.value = { ...alumno };
  localStorage.setItem('alumnoSeleccionado', JSON.stringify(alumno));
  editarModalActive.value = true;
};

// Function to load data from Firebase
const cargarDatosDesdeFirebase = async (grade, section) => {
  const docRef = doc(db, `alumnos/${grade}${section}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const alumnos = docSnap.data();
    // Convertir el objeto de alumnos a un array
    const alumnosArray = Object.keys(alumnos).map(key => ({ ...alumnos[key], index: parseInt(key) + 1 })); // Sumamos 1 al índice
    props.data.splice(0, props.data.length, ...alumnosArray);
    console.log("Datos cargados desde Firebase:", alumnosArray);
  } else {
    console.log(`No se encontró el documento: ${grade}${section}`);
  }
};

// Function to save the edited student
const guardarAlumnoEditado = async (alumnoEditado) => {
  console.log("Alumno editado:", alumnoEditado);

  // Get selected grade and section from localStorage
  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  console.log("Grado seleccionado:", selectedGrade);
  console.log("Sección seleccionada:", selectedSection);

  // Find the index of the student in the data list
  const alumnoIndex = props.data.findIndex(alumno => alumno.QR === alumnoEditado.QR);
  if (alumnoIndex !== -1) {
    // Add index to edited student
    alumnoEditado.index = props.data[alumnoIndex].index - 1; // Restamos 1 para obtener el índice original

    // Update data in Firebase
    await updateAlumnoInFirebase(alumnoEditado, selectedGrade, selectedSection, alumnoEditado.index);
    // Update local data list
    props.data[alumnoIndex] = { ...alumnoEditado, index: alumnoEditado.index + 1 }; // Sumamos 1 al mostrar el índice

    // Reload data from Firebase to ensure the index is updated
    await cargarDatosDesdeFirebase(selectedGrade, selectedSection);
  }
  editarModalActive.value = false;
};

// Function to update the student in Firebase
const updateAlumnoInFirebase = async (alumno, grade, section, index) => {
  const docRef = doc(db, `alumnos/${grade}${section}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const alumnos = docSnap.data();
    alumnos[index] = alumno; // Update the specific student data in the map
    await updateDoc(docRef, { [`${index}`]: alumno });
    console.log(`Alumno actualizado en Firebase: ${grade}${section} - ${index}`, alumno);
  } else {
    console.log(`No se encontró el documento: ${grade}${section}`);
  }
};

// Initial load of data
const selectedGrade = localStorage.getItem('selectedGrade');
const selectedSection = localStorage.getItem('selectedSection');
if (selectedGrade && selectedSection) {
  cargarDatosDesdeFirebase(selectedGrade, selectedSection);
}
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
        <td class="px-6 py-4 text-center">{{ row.index }}</td>
        <td class="px-6 py-4">{{ row.NOM_ALUMNO }}</td>
        <td class="px-6 py-4">{{ row.QR }}</td>
        <td class="px-6 py-4">{{ row.TURNO }}</td>
        <td class="px-6 py-4 text-center">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="toggleModal(row)">
            <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out" />
          </button>
        </td>
      </tr>
      </tbody>

    </table>
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
