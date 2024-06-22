<script setup>
import { defineProps, ref } from 'vue';
import UpdateTareaDialog from '@/dialogs/UpdateTareaDialog.vue';
import NotasTareasDialog from '@/dialogs/NotasTareasDialog.vue';
import Alert from '@/components/Alert.vue';
import { FilePenLine, Trash2, ChevronRight, ChevronLeft, Notebook } from 'lucide-vue-next';

const props = defineProps({
  tareas: Array,
  isLoading: Boolean,
  curso: String,
  grupo: String
});

const emit = defineEmits(['deleteTarea']);

const updateDialogRef = ref(null);
const notasDialogRef = ref(null);
const showDeleteAlert = ref(false);
const tareaToDelete = ref(null);

const openUpdateDialog = (tarea) => {
  if (updateDialogRef.value) {
    console.log('Abriendo diálogo de actualización para la tarea:', tarea);
    updateDialogRef.value.openDialog(tarea);
  }
};

const openNotasDialog = (tareaId) => {
  if (notasDialogRef.value) {
    notasDialogRef.value.openDialog(tareaId);
  }
};

const confirmDelete = (tareaId) => {
  tareaToDelete.value = tareaId;
  showDeleteAlert.value = true;
};

const handleDeleteConfirm = () => {
  emit('deleteTarea', tareaToDelete.value);
  showDeleteAlert.value = false;
  tareaToDelete.value = null;
};

const handleDeleteCancel = () => {
  showDeleteAlert.value = false;
  tareaToDelete.value = null;
};
</script>

<template>
  <div class="mt-6">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Titulo</th>
        <th scope="col" class="px-6 py-3">Descripción</th>
        <th scope="col" class="px-6 py-3 text-center">Inicio</th>
        <th scope="col" class="px-6 py-3 text-center">Límite</th>
        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="isLoading">
        <td colspan="5" class="px-6 py-4 text-center">Cargando tareas...</td>
      </tr>
      <tr v-if="!isLoading && tareas.length === 0">
        <td colspan="5" class="px-6 py-4 text-center">No hay tareas disponibles</td>
      </tr>
      <tr v-for="tarea in tareas" :key="tarea.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ tarea.titulo }}
        </th>
        <td class="px-6 py-4">{{ tarea.descripcion }}</td>
        <td class="px-6 py-4 text-center">{{ tarea.fechaInicial }}</td>
        <td class="px-6 py-4 text-center">{{ tarea.fechaEntrega }}</td>
        <td class="px-6 py-4 flex gap-4 justify-center">
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  @click="openUpdateDialog(tarea)">
            <FilePenLine class="icon"/>
          </button>
          <button class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  @click="confirmDelete(tarea.id)">
            <Trash2 class="icon"/>
          </button>
          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  @click="openNotasDialog(tarea.id)">
            <Notebook class="icon"/>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <UpdateTareaDialog ref="updateDialogRef" :curso="props.curso" :grupo="props.grupo"/>
  <NotasTareasDialog ref="notasDialogRef"/>

  <Alert
      v-if="showDeleteAlert"
      Type="alert"
      TitleAlert="Confirmar eliminación"
      InfoAlert="¿Estás seguro de que deseas eliminar esta tarea?"
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
