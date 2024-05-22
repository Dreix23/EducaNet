<script setup>
import { ref } from 'vue';
import { ChevronLeft, ChevronRight, FilePenLine } from 'lucide-vue-next';
import { defineProps } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import DashInput from '@/components/DashInput.vue';

// Definir propiedades que acepta el componente
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

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
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
      <tr v-for="(row, rowIndex) in data" :key="rowIndex"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td class="px-6 py-4 text-center">{{ row.index }}</td>
        <td class="px-6 py-4">{{ row.NOM_ALUMNO }}</td>
        <td class="px-6 py-4">{{ row.QR }}</td>
        <td class="px-6 py-4">{{ row.TURNO }}</td>
        <td class="px-6 py-4 text-center">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  @click="toggleModal">
            <FilePenLine class="hover:scale-[1.5] transition-transform duration-300 ease-in-out" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
    <span
        class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center">
      Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.start }}-{{ pagination.end }}</span> de <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span>
    </span>
    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <a href="#" @click.prevent="prevPage"
           :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg', { 'cursor-not-allowed opacity-50': !pagination.hasPrevPage }]"
           :disabled="!pagination.hasPrevPage">
          <ChevronLeft />
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="nextPage"
           :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg', { 'cursor-not-allowed opacity-50': !pagination.hasNextPage }]"
           :disabled="!pagination.hasNextPage">
          <ChevronRight />
        </a>
      </li>
    </ul>
  </nav>
  <BaseModal :modalActive="modalActive" @close-modal="toggleModal" title-card="Editar Alumno">
    <form class="p-4 md:p-5">
      <div class="grid gap-4 mb-4 grid-cols-1">
        <DashInput type="text" label="Nombre" placeholder="Nombre" />
        <DashInput type="text" label="Código QR" placeholder="Código QR" />
        <DashInput type="text" label="Turno" placeholder="Turno" />
      </div>
      <BaseButton type="submit" icon-type="" button-text="Editar Alumno" class="text-size-14" />
    </form>
  </BaseModal>
</template>

<style scoped>
/* Estilos personalizados aquí si es necesario */
</style>