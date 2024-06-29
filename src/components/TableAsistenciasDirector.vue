<script setup>
import { ref, computed } from 'vue';
import { ChevronRight, ChevronLeft } from 'lucide-vue-next';
import { logError, logInfo } from '@/utils/logger.js';

const props = defineProps({
  asistencias: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
});

const currentPage = ref(1);
const itemsPerPage = 10;

const filteredAsistencias = computed(() => {
  return props.asistencias.filter(asistencia =>
      asistencia.codigo.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      asistencia.info.nombre.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

const paginatedAsistencias = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAsistencias.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredAsistencias.value.length / itemsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    logInfo(`Página cambiada a: ${currentPage.value}`);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    logInfo(`Página cambiada a: ${currentPage.value}`);
  }
};

const formatTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  } catch (error) {
    logError(`Error al formatear la hora: ${error.message}`);
    return 'Hora inválida';
  }
};
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">#</th>
        <th scope="col" class="px-6 py-3">Nombre</th>
        <th scope="col" class="px-6 py-3">Código QR</th>
        <th scope="col" class="px-6 py-3 text-center">Sección</th>
        <th scope="col" class="px-6 py-3">Entrada</th>
        <th scope="col" class="px-6 py-3">Salida</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(asistencia, index) in paginatedAsistencias" :key="asistencia.codigo"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ (currentPage - 1) * itemsPerPage + index + 1 }}
        </th>
        <td class="px-6 py-4">{{ asistencia.info.nombre }}</td>
        <td class="px-6 py-4">{{ asistencia.codigo }}</td>
        <td class="px-6 py-4 text-center">{{ asistencia.grupo }}</td>
        <td class="px-6 py-4">{{ formatTime(asistencia.info.entrada) }}</td>
        <td class="px-6 py-4">{{ formatTime(asistencia.info.salida) }}</td>
      </tr>
      </tbody>
    </table>
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Mostrando
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredAsistencias.length) }}
        </span>
        de
        <span class="font-semibold text-gray-900 dark:text-white">{{ filteredAsistencias.length }}</span>
      </span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a href="#" @click.prevent="prevPage"
             class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg"
             :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
            <ChevronLeft />
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="nextPage"
             class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg"
             :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
            <ChevronRight />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
