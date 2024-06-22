<script setup>
import { defineProps, ref } from 'vue';
import UpdateAvisoDialog from '@/dialogs/UpdateAvisoDialog.vue';
import Alert from '@/components/Alert.vue';
import { FilePenLine, Trash2, ChevronRight, ChevronLeft } from 'lucide-vue-next';

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
    console.log('Abriendo diálogo de actualización para el aviso:', aviso);
    updateDialogRef.value.openDialog(aviso);
  }
};

const confirmDelete = (avisoId) => {
  avisoToDelete.value = avisoId;
  showDeleteAlert.value = true;
};

const handleDeleteConfirm = () => {
  emit('deleteAviso', avisoToDelete.value);
  showDeleteAlert.value = false;
  avisoToDelete.value = null;
};

const handleDeleteCancel = () => {
  showDeleteAlert.value = false;
  avisoToDelete.value = null;
};
</script>

<template>
  <div class="mt-6">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
        <td colspan="4" class="px-6 py-4 text-center">Cargando avisos...</td>
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
                  @click="confirmDelete(aviso.id)">
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
      InfoAlert="¿Estás seguro de que deseas eliminar este aviso?"
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
