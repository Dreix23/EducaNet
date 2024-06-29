<script setup>
import { ref } from 'vue'
import { FilePenLine, Trash2 } from 'lucide-vue-next';
import UpdateAviso from '@/dialogs/UpdateAvisoDirectorDialog.vue';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import { logError, logInfo } from '@/utils/logger.js';

const props = defineProps({
  avisos: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['refresh']);

const dialogRef = ref(null);
const { userSchool } = useAuth();

const openDialog = (aviso) => {
  if (dialogRef.value) {
    dialogRef.value.openDialog(aviso);
  }
}

const deleteAviso = async (avisoId) => {
  try {
    const schoolDocRef = doc(db, 'colegios', userSchool.value);
    const avisoDocRef = doc(schoolDocRef, 'avisos', avisoId);
    await deleteDoc(avisoDocRef);
    logInfo('Aviso eliminado con éxito');
    emit('refresh');
  } catch (error) {
    logError('Error al eliminar el aviso: ' + error.message);
  }
}
</script>

<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-size-14 text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-size-14 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Titulo
          </th>
          <th scope="col" class="px-6 py-3">
            Descripción
          </th>
          <th scope="col" class="px-6 py-3">
            Fecha Publicación
          </th>
          <th scope="col" class="px-6 py-3 text-center">
            Acciones
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="aviso in avisos" :key="aviso.id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ aviso.titulo }}
          </th>
          <td class="px-6 py-4">
            {{ aviso.descripcion }}
          </td>
          <td class="px-6 py-4">
            {{ aviso.fechaPublicacion }}
          </td>
          <td class="px-6 py-4 flex gap-4 justify-center">
            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    @click="openDialog(aviso)">
              <FilePenLine class="icon" />
            </button>
            <button class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    @click="deleteAviso(aviso.id)">
              <Trash2 class="icon" />
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UpdateAviso ref="dialogRef" @aviso-updated="$emit('refresh')" />
</template>

<style scoped></style>
