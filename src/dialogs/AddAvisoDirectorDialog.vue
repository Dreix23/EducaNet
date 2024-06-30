<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '@/services/userService.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { enviarNotificacionATodosLosPadresDelColegio } from '@/services/notificationService.js';
import { logInfo, logError, logDebug } from '@/utils/logger.js';
import { Loader2, X } from 'lucide-vue-next';

const { currentUser, userSchool, userSchoolName } = useAuth();

const titulo = ref('');
const descripcion = ref('');
const fechaPublicacion = ref('');
const isDialogOpen = ref(false);
const isLoading = ref(false);

onMounted(() => {
  logDebug(`Componente de avisos generales montado. Escuela: ${userSchool.value}`);
});

const openDialog = () => {
  isDialogOpen.value = true;
  logDebug('Diálogo de avisos generales abierto');
};

const closeDialog = () => {
  isDialogOpen.value = false;
  resetForm();
};

const resetForm = () => {
  titulo.value = '';
  descripcion.value = '';
  fechaPublicacion.value = '';
};

const addAviso = async () => {
  if (!titulo.value || !fechaPublicacion.value) {
    logError('Título y fecha de publicación son obligatorios');
    return;
  }

  isLoading.value = true;

  const currentDate = new Date().toLocaleString('es-ES', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });

  const avisoData = {
    titulo: titulo.value,
    descripcion: descripcion.value,
    fechaPublicacion: fechaPublicacion.value,
    fechaCreacion: currentDate,
    autorId: currentUser.value.uid
  };

  logDebug('Datos del aviso general:', avisoData);

  const collectionPath = `colegios/${userSchool.value}/avisos`;
  const avisoCollectionRef = collection(db, collectionPath);

  try {
    const avisoDocRef = doc(avisoCollectionRef);
    await setDoc(avisoDocRef, avisoData);
    logInfo('Aviso general agregado en Firebase:', avisoData);

    const tituloNotificacion = 'Nuevo aviso general';
    const mensaje = `${avisoData.titulo}. Publicado el ${avisoData.fechaPublicacion}.`;
    logDebug(`Enviando notificación a todos los padres del colegio: ${userSchool.value}`);
    await enviarNotificacionATodosLosPadresDelColegio(mensaje, userSchool.value);

    closeDialog();
  } catch (error) {
    logError('Error al agregar el aviso general en Firebase:', error);
  } finally {
    isLoading.value = false;
  }
};

const minDate = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split('T')[0];
});

defineExpose({
  openDialog,
  closeDialog
});
</script>

<template>
  <transition name="fade" appear>
    <div v-if="isDialogOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-gray-900 opacity-50" @click="closeDialog"></div>
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md z-10 relative">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-blue-600">Nuevo Aviso General</h2>
          <button @click="closeDialog" class="text-gray-500 hover:text-gray-700">
            <X class="h-6 w-6" />
          </button>
        </div>
        <form @submit.prevent="addAviso">
          <div class="mb-6">
            <label for="titulo" class="block mb-2 text-sm font-medium text-gray-900">Título</label>
            <input id="titulo" v-model="titulo" required placeholder="Título"
                   class="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="mb-6">
            <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
            <textarea id="descripcion" v-model="descripcion" rows="4"
                      class="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descripción del Aviso"></textarea>
          </div>
          <div class="mb-6">
            <label for="fechaPublicacion" class="block mb-2 text-sm font-medium text-gray-900">Fecha de Publicación</label>
            <input type="date" id="fechaPublicacion" v-model="fechaPublicacion" required
                   :min="minDate"
                   class="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="flex justify-center">
            <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transition-colors duration-300"
                    :disabled="isLoading">
              <Loader2 v-if="isLoading" class="animate-spin mr-2" />
              {{ isLoading ? 'Agregando...' : 'Agregar Aviso General' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Estilos existentes */
</style>
