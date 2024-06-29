<script setup>
import { defineProps, ref, watch } from 'vue';
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

const editarModalActive = ref(false);
const profesorSeleccionado = ref({});
const isEditing = ref(false);

const toggleModal = (profesor = {}) => {
  profesorSeleccionado.value = {...profesor};
  isEditing.value = Object.keys(profesor).length > 0;
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

watch(() => props.data, (newData) => {
  console.log('Datos actualizados:', newData);
}, { deep: true });
</script>

<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 text-center">#</th>
          <th scope="col" class="px-6 py-3">CÓDIGO</th>
          <th scope="col" class="px-6 py-3">NOMBRE</th>
          <th scope="col" class="px-6 py-3">CORREO</th>
          <th scope="col" class="px-6 py-3">CONTRASEÑA</th>
          <th scope="col" class="px-6 py-3">TURNO</th>
          <th scope="col" class="px-6 py-3 text-center">ACCIONES</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) in props.data" :key="row.id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td class="px-6 py-4 text-center">{{ index + props.pagination.start }}</td>
          <td class="px-6 py-4">{{ row.code }}</td>
          <td class="px-6 py-4">{{ row.name }}</td>
          <td class="px-6 py-4">{{ row.email }}</td>
          <td class="px-6 py-4 relative group">
            <span class="password-cell">{{ '*'.repeat(row.password.length) }}</span>
            <span
                class="absolute top-0 left-0 px-6 py-4 bg-white dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{{
                row.password
              }}</span>
          </td>
          <td class="px-6 py-4">{{ row.turno }}</td>
          <td class="px-6 py-4 text-center flex justify-center gap-[10px]">
            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="toggleModal(row)">
              <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out"/>
            </button>
            <router-link :to="'/profeCode'" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                         @click.native="handleProfessorClick(row.id)">
              <ArrowBigRightDash class="hover:scale-[1.5] transition-transform duration-300 ease-in-out"/>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
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
          <a href="#" @click.prevent="pagination.onPrevPage"
             :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg', { 'cursor-not-allowed opacity-50': !pagination.hasPrevPage }]"
             :disabled="!pagination.hasPrevPage">
            <ChevronLeft/>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="pagination.onNextPage"
             :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg', { 'cursor-not-allowed opacity-50': !pagination.hasNextPage }]"
             :disabled="!pagination.hasNextPage">
            <ChevronRight/>
          </a>
        </li>
      </ul>
    </nav>
    <ProfesorDialog :modalActive="editarModalActive" :profesorSeleccionado="profesorSeleccionado" :isEditing="isEditing"
                    @closeModal="editarModalActive = false"/>
  </div>
</template>

<style scoped>
</style>
