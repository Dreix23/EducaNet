<script setup>
import { defineProps, ref } from 'vue';
import UpdateAvisoDialog from '@/dialogs/UpdateAvisoDialog.vue';
import Alert from '@/components/Alert.vue';
import { FilePenLine, Trash2 } from 'lucide-vue-next';
import { logInfo, logError } from '@/utils/logger.js';

const props = defineProps({
  avisos: Array,
  isLoading: Boolean,
  curso: String,
  grupo: String
});

const emit = defineEmits(['deleteAviso']);

const updateDialogRef = ref(null);
const showDeleteAlert = ref(false);
const avisoToDelete = ref(null);

const openUpdateDialog = (aviso) => {
  if (updateDialogRef.value) {
    logInfo('Abriendo diálogo de actualización para el aviso:', aviso);
    updateDialogRef.value.openDialog(aviso);
  }
};

const confirmDelete = (aviso) => {
  avisoToDelete.value = aviso;
  showDeleteAlert.value = true;
};

const handleDeleteConfirm = () => {
  try {
    emit('deleteAviso', avisoToDelete.value.id);
    logInfo(`Solicitud de eliminación enviada para el aviso: ${avisoToDelete.value.id}`);
  } catch (error) {
    logError(`Error al solicitar la eliminación del aviso: ${error.message}`);
  } finally {
    showDeleteAlert.value = false;
    avisoToDelete.value = null;
  }
};

const handleDeleteCancel = () => {
  showDeleteAlert.value = false;
  avisoToDelete.value = null;
};
</script>


<template>
  <div class="mt-6">
    <table class="w-full text-size-14 text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Titulo</th>
        <th scope="col" class="px-6 py-3">Descripción</th>
        <th scope="col" class="px-6 py-3 text-center">Fecha de Publicación</th>
        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="isLoading">
        <td colspan="4" class="px-6 py-4 text-center">
          <div class="flex justify-center items-center">
            <svg class="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando avisos...
          </div>
        </td>
      </tr>
      <tr v-if="!isLoading && avisos.length === 0">
        <td colspan="4" class="px-6 py-4 text-center">No hay avisos disponibles</td>
      </tr>
      <tr v-for="aviso in avisos" :key="aviso.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ aviso.titulo }}
        </th>
        <td class="px-6 py-4">{{ aviso.descripcion }}</td>
        <td class="px-6 py-4 text-center">{{ aviso.fechaPublicacion }}</td>
        <td class="px-6 py-4 flex gap-4 justify-center">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  @click="openUpdateDialog(aviso)">
            <FilePenLine class="icon"/>
          </button>
          <button class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  @click="confirmDelete(aviso)">
            <Trash2 class="icon"/>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <UpdateAvisoDialog ref="updateDialogRef" :curso="props.curso" :grupo="props.grupo"/>

  <Alert
      v-if="showDeleteAlert"
      Type="alert"
      TitleAlert="Confirmar eliminación"
      :InfoAlert="`¿Estás seguro de que deseas eliminar el aviso '${avisoToDelete?.titulo}'?`"
      ButonText="Eliminar"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
      @close="handleDeleteCancel"
  />
</template>

<style scoped>
.icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
