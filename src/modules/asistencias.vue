<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Search } from 'lucide-vue-next';
import TableAsistencias from '@/components/TableAsistenciasDirector.vue';
import { collection, query, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import { logError, logInfo, logDebug } from '@/utils/logger.js';

const asistencias = ref([]);
const selectedDate = ref(new Date().toLocaleDateString('en-CA'));
const searchQuery = ref('');
const { userSchool } = useAuth();
let unsubscribe = null;

const loadAsistenciasFromLocalStorage = () => {
  const storedAsistencias = localStorage.getItem('asistencias');
  if (storedAsistencias) {
    asistencias.value = JSON.parse(storedAsistencias);
    logInfo('Asistencias cargadas desde localStorage');
    logDebug(`Número de asistencias cargadas: ${asistencias.value.length}`);
  } else {
    logInfo('No se encontraron asistencias en localStorage');
  }
}

const saveAsistenciasToLocalStorage = (asistenciasData) => {
  localStorage.setItem('asistencias', JSON.stringify(asistenciasData));
  logInfo('Asistencias guardadas en localStorage');
  logDebug(`Número de asistencias guardadas: ${asistenciasData.length}`);
}

const setupAsistenciasListener = () => {
  if (!userSchool.value) {
    logError('No se pudo obtener la información de la escuela');
    return;
  }

  logInfo(`Configurando listener para la escuela: ${userSchool.value}`);
  logInfo(`Fecha seleccionada: ${selectedDate.value}`);

  try {
    const schoolDocRef = doc(db, 'colegios', userSchool.value);
    const asistenciasDocRef = doc(schoolDocRef, 'asistencias', selectedDate.value);

    unsubscribe = onSnapshot(asistenciasDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const asistenciasData = docSnapshot.data();
        const asistenciasList = [];

        Object.entries(asistenciasData).forEach(([grupoId, grupoData]) => {
          Object.entries(grupoData).forEach(([codigoEstudiante, infoAsistencia]) => {
            asistenciasList.push({
              codigo: codigoEstudiante,
              info: infoAsistencia,
              grupo: grupoId
            });
          });
        });

        asistencias.value = asistenciasList;
        saveAsistenciasToLocalStorage(asistenciasList);
        logInfo('Asistencias actualizadas en tiempo real');
        logDebug(`Número de asistencias recibidas: ${asistenciasList.length}`);
      } else {
        asistencias.value = [];
        saveAsistenciasToLocalStorage([]);
        logInfo('No hay asistencias para la fecha seleccionada');
      }
    }, (error) => {
      logError('Error al escuchar cambios en las asistencias: ' + error.message);
    });
  } catch (error) {
    logError('Error al configurar el listener de asistencias: ' + error.message);
  }
}

const updateAsistencias = () => {
  logInfo('Actualizando asistencias');
  if (unsubscribe) {
    unsubscribe();
    logInfo('Listener anterior desuscrito');
  }
  setupAsistenciasListener();
}

onMounted(() => {
  logInfo('Componente montado');
  loadAsistenciasFromLocalStorage();
  setupAsistenciasListener();
});

onUnmounted(() => {
  logInfo('Componente desmontado');
  if (unsubscribe) {
    unsubscribe();
    logInfo('Listener desuscrito');
  }
});

watch(selectedDate, (newDate, oldDate) => {
  logInfo(`Fecha cambiada de ${oldDate} a ${newDate}`);
  updateAsistencias();
});
</script>

<template>
  <h1 class="title">Asistencias Generales</h1>
  <div class="container-asistencias mt-[15px]">
    <div class="flex items-center gap-[20px]">
      <div>
        <input type="date" v-model="selectedDate" @change="updateAsistencias"
               class="bg-gray-50 border border-gray-300 h-[54.2px] text-gray-900 text-size-18 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Seleccionar fecha">
      </div>
      <div class="relative">
        <input type="text" v-model="searchQuery"
               class="block pt-2 ps-10 h-[54.2px] text-size-16 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Buscar por Código o nombre">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search class="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>

    <div class="mt-[20px]">
      <TableAsistencias :asistencias="asistencias" :searchQuery="searchQuery" />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
}

.container-asistencias {
  background: #fff;
  padding: 20px;
  border-radius: 20px;
}
</style>
