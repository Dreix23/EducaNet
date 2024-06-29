<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { CirclePlus } from 'lucide-vue-next';
import AddAviso from "@/dialogs/AddAvisoDirectorDialog.vue";
import TableAvisos from '@/components/TableGeneralAvisos.vue';
import { collection, query, orderBy, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import { logError, logInfo } from '@/utils/logger.js';

const dialogRef = ref(null);
const avisos = ref([]);
const { userSchool } = useAuth();
let unsubscribe = null;

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
}

const loadAvisosFromLocalStorage = () => {
  const storedAvisos = localStorage.getItem('avisos');
  if (storedAvisos) {
    avisos.value = JSON.parse(storedAvisos);
    logInfo('Avisos cargados desde localStorage');
  }
}

const saveAvisosToLocalStorage = (avisosData) => {
  localStorage.setItem('avisos', JSON.stringify(avisosData));
}

const setupAvisosListener = () => {
  if (!userSchool.value) {
    logError('No se pudo obtener la información de la escuela');
    return;
  }

  try {
    const schoolDocRef = doc(db, 'colegios', userSchool.value);
    const avisosCollectionRef = collection(schoolDocRef, 'avisos');
    const q = query(avisosCollectionRef, orderBy('fechaPublicacion', 'desc'));

    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const avisosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      avisos.value = avisosData;
      saveAvisosToLocalStorage(avisosData);
      logInfo('Avisos actualizados en tiempo real');
    }, (error) => {
      logError('Error al escuchar cambios en los avisos: ' + error.message);
    });
  } catch (error) {
    logError('Error al configurar el listener de avisos: ' + error.message);
  }
}

onMounted(() => {
  loadAvisosFromLocalStorage();
  setupAvisosListener();
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<template>
  <h1 class="title">Avisos Generales</h1>
  <div class="container-avisos mt-[15px]">
    <button class="btn-add flex gap-[10px] items-center text-size-14" @click="openDialog">
      <CirclePlus />
      Agregar aviso
    </button>
    <div class="contianer-table mt-[20px]">
      <TableAvisos :avisos="avisos" />
    </div>
  </div>
  <AddAviso ref="dialogRef" />
</template>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
}

.container-avisos {
  background: #fff;
  padding: 20px;
  border-radius: 20px;
}

.btn-add {
  padding: 12px 32px;
  background: #2D60FF;
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 12px;
  transition: .3s all ease-in-out;
  font-weight: 600;
}

.btn-add:hover {
  background: #1814F3;
  color: #fff;
}
</style>
