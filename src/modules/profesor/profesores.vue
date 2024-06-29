<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { CirclePlus } from 'lucide-vue-next';
import ProfTable from '@/components/ProfTable.vue';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import ProfesorDialog from '@/dialogs/ProfesorDialog.vue';
import { logInfo, logError } from '@/utils/logger.js';

const { userSchool } = useAuth();

const modalActive = ref(false);
const profesorSeleccionado = ref({});
const isEditing = ref(false);
const profesores = ref([]);

const toggleModal = (profesor = null) => {
  modalActive.value = !modalActive.value;
  profesorSeleccionado.value = profesor ? { ...profesor, password: profesor.password || '' } : {};
  isEditing.value = !!profesor;
  if (profesor && profesor.id) {
    localStorage.setItem('selectedProfessorUID', profesor.id);
  }
};

let unsubscribe = null;

const loadProfesoresFromLocalStorage = () => {
  const storedProfesores = localStorage.getItem('profesores');
  if (storedProfesores) {
    profesores.value = JSON.parse(storedProfesores);
    logInfo('Profesores cargados desde localStorage');
    updateTableData();
  }
};

const saveProfesoresToLocalStorage = (profesoresData) => {
  localStorage.setItem('profesores', JSON.stringify(profesoresData));
};

const fetchProfesores = () => {
  if (!userSchool.value) return;

  unsubscribe = onSnapshot(
      query(collection(db, 'users'), where('school', '==', userSchool.value), where('role', '==', 'profesor')),
      (querySnapshot) => {
        const profesoresData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        profesores.value = profesoresData;
        saveProfesoresToLocalStorage(profesoresData);
        logInfo('Profesores actualizados en tiempo real');
        updateTableData();
      },
      (error) => {
        logError('Error al escuchar cambios en los profesores:', error);
      }
  );
};

watch(userSchool, (newSchool) => {
  if (newSchool) {
    loadProfesoresFromLocalStorage();
    fetchProfesores();
  }
});

onMounted(() => {
  loadProfesoresFromLocalStorage();
  fetchProfesores();
  // Verificar si se necesita actualizar los datos al regresar de ProfeCode
  if (localStorage.getItem('updateProfesoresOnReturn') === 'true') {
    fetchProfesores();
    localStorage.removeItem('updateProfesoresOnReturn');
  }
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const columns = ref([
  { name: '#', align: 'center' },
  { name: 'CODE', align: 'left' },
  { name: 'NAME', align: 'left' },
  { name: 'EMAIL', align: 'left' },
  { name: 'CONTRASEÑA', align: 'left' },
  { name: 'TURNO', align: 'left' },
  { name: 'ACTIONS', align: 'center' }
]);

const pagination = ref({
  start: 1,
  end: 10,
  total: 0,
  data: [],
  hasPrevPage: false,
  hasNextPage: false,
  onPrevPage: () => {
    if (pagination.value.start > 1) {
      pagination.value.start = Math.max(pagination.value.start - 10, 1);
      pagination.value.end = pagination.value.start + 9;
      updateTableData();
    }
  },
  onNextPage: () => {
    if (pagination.value.end < pagination.value.total) {
      pagination.value.start += 10;
      pagination.value.end = Math.min(pagination.value.start + 9, pagination.value.total);
      updateTableData();
    }
  }
});

const updateTableData = () => {
  const startIndex = pagination.value.start - 1;
  const endIndex = pagination.value.end;
  pagination.value.data = profesores.value.slice(startIndex, endIndex);
  pagination.value.total = profesores.value.length;
  pagination.value.hasNextPage = pagination.value.end < profesores.value.length;
  pagination.value.hasPrevPage = pagination.value.start > 1;
};

watch(profesores, () => {
  updateTableData();
}, { immediate: true });

const handleCloseModal = () => {
  modalActive.value = false;
};

const handleProfesorActualizado = () => {
  fetchProfesores();
  handleCloseModal();
};
</script>

<template>
  <div class="flex gap-4">
    <button @click="toggleModal()"
            class="py-3 px-5 flex justify-center items-center gap-2 text-lg font-semibold bg-white hover:bg-green-500 text-black hover:text-white rounded-lg shadow-md transition-colors duration-300 ease-in-out">
      <CirclePlus/>
    </button>
  </div>
  <ProfesorDialog :modalActive="modalActive" :profesorSeleccionado="profesorSeleccionado" :isEditing="isEditing"
                  @closeModal="handleCloseModal" @profesorActualizado="handleProfesorActualizado"/>
  <div class="mt-6 bg-white rounded-lg shadow-md p-6">
    <ProfTable :columns="columns" :data="pagination.data" :pagination="pagination"/>
  </div>
</template>

<style scoped>
/* Añade tus estilos aquí */
</style>
