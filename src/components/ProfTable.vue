<script setup>
import { ref } from 'vue';
import { ChevronLeft, ChevronRight, FilePenLine, ArrowBigRightDash } from 'lucide-vue-next';
import ProfesorDialog from '@/dialogs/ProfesorDialog.vue';

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

const isLoading = ref(false);

// Funciones de paginación
const prevPage = () => {
  props.data.splice(0, props.data.length);
  props.pagination.start -= props.pagination.perPage;
  props.pagination.end -= props.pagination.perPage;
  // Aquí se cargarían los datos correspondientes a la página anterior
};

const nextPage = () => {
  props.data.splice(0, props.data.length);
  props.pagination.start += props.pagination.perPage;
  props.pagination.end += props.pagination.perPage;
  // Aquí se cargarían los datos correspondientes a la siguiente página
};

const editarModalActive = ref(false);
const profesorSeleccionado = ref({});
const isEditing = ref(false);

// Función para abrir el modal de edición o adición
const toggleModal = (profesor = {}) => {
  profesorSeleccionado.value = { ...profesor };
  isEditing.value = !!profesor && Object.keys(profesor).length > 0;
  editarModalActive.value = true;
};

const handleProfessorClick = (id) => {
  if (id) {
    localStorage.setItem('selectedProfessorUID', id);
    console.log('UID del profesor guardado en localStorage:', id);
  } else {
    console.error('El UID del profesor es undefined');
  }
};
</script>

<template>
  <div v-if="!isLoading" class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3 text-center">#</th>
        <th scope="col" class="px-6 py-3">CÓDIGO</th>
        <th scope="col" class="px-6 py-3">NOMBRE</th>
        <th scope="col" class="px-6 py-3">CORREO</th>
        <th scope="col" class="px-6 py-3 text-center">ACCIONES</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in props.data" :key="row.cod" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td class="px-6 py-4 text-center">{{ index + 1 }}</td>
        <td class="px-6 py-4">{{ row.cod }}</td>
        <td class="px-6 py-4">{{ row.nombre }}</td>
        <td class="px-6 py-4">{{ row.correo }}</td>
        <td class="px-6 py-4 text-center flex justify-center gap-[10px]">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="toggleModal(row)">
            <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out" />
          </button>
          <router-link :to="'/profeCode'" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click.native="handleProfessorClick(row.id)">
            <ArrowBigRightDash class="hover:scale-[1.5] transition-transform duration-300 ease-in-out" />
          </router-link>
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
  <ProfesorDialog :modalActive="editarModalActive" :profesorSeleccionado="profesorSeleccionado" :isEditing="isEditing" @closeModal="editarModalActive = false" />
</template>

<style scoped>
/* Custom styles can be added aquí si es necesario */
</style>
