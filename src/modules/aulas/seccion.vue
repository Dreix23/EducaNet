<script setup>
import DashButton from '@/components/DashButton.vue';
import BaseTable from '@/components/BaseTable.vue';
import AddAlumno from '@/dialogs/AddAlumnoDialog.vue';
import Alerta from '@/components/Alert.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { doc, getDoc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import { CirclePlus, Search } from 'lucide-vue-next';
import { logInfo, logError } from '@/utils/logger.js';

const { userSchool } = useAuth();

const columns = ['#', 'Nombre', 'Código QR', 'Turno', 'Acciones'];
const alumnos = ref([]);
const dialogRef = ref(null);
const searchTerm = ref('');
const showAlertDialog = ref(false);
const alumnoIdToDelete = ref(null);

const selectedGrade = ref(localStorage.getItem('selectedGrade'));
const selectedSection = ref(localStorage.getItem('selectedSection'));

const filteredAlumnos = computed(() => {
  if (!searchTerm.value) return alumnos.value;

  return alumnos.value.filter(alumno =>
      alumno.NOM_ALUMNO.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      alumno.QR.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const updateLocalStorage = (alumnosData) => {
  localStorage.setItem('alumnosData', JSON.stringify(alumnosData));
  alumnos.value = alumnosData.map((alumno, index) => ({
    ...alumno,
    index: index
  }));
};

const fetchAlumnos = async () => {
  const cachedData = localStorage.getItem('alumnosData');

  if (cachedData) {
    const alumnosData = JSON.parse(cachedData);
    updateLocalStorage(alumnosData);
  } else {
    if (selectedGrade.value && selectedSection.value && userSchool.value) {
      try {
        const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade.value}${selectedSection.value}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const alumnosData = Object.entries(docSnap.data()).map(([index, data]) => ({ id: index, ...data }));
          updateLocalStorage(alumnosData);
        } else {
          logError("No se encontró el documento:", `${selectedGrade.value}${selectedSection.value}`);
        }
      } catch (error) {
        logError('Error al obtener datos:', error);
      }
    } else {
      logError('No se ha seleccionado un grado y sección o el nombre de la escuela no está disponible.');
    }
  }
};

const subscribeToChanges = () => {
  if (selectedGrade.value && selectedSection.value && userSchool.value) {
    const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade.value}${selectedSection.value}`);
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const alumnosData = Object.entries(docSnap.data()).map(([index, data]) => ({ id: index, ...data }));
        updateLocalStorage(alumnosData);
      } else {
        logError("No se encontró el documento:", `${selectedGrade.value}${selectedSection.value}`);
      }
    }, (error) => {
      logError('Error en la suscripción a los cambios:', error);
    });
  }
};

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

const requestEliminarAlumno = (alumnoId) => {
  alumnoIdToDelete.value = alumnoId;
  showAlertDialog.value = true;
};

const eliminarAlumno = async () => {
  const alumnoId = alumnoIdToDelete.value;
  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedSection = localStorage.getItem('selectedSection');

  if (selectedGrade && selectedSection && userSchool.value) {
    try {
      const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade}${selectedSection}`);
      await updateDoc(docRef, {
        [alumnoId]: deleteField()
      });
      logInfo(`Alumno con ID ${alumnoId} eliminado`);
      fetchAlumnos();
    } catch (error) {
      logError('Error al eliminar el alumno:', error);
    }
  }
  showAlertDialog.value = false;
};

onMounted(() => {
  if (userSchool.value) {
    fetchAlumnos();
    subscribeToChanges();
  } else {
    watch(userSchool, (newSchool) => {
      if (newSchool) {
        fetchAlumnos();
        subscribeToChanges();
      }
    });
  }
});
</script>

<template>
  <div>
    <div class="container-button-alumnos flex gap-[15px] justify-between items-center">
      <div class="flex gap-[20px]">
        <router-link to="/aulas">
          <DashButton iconType="CircleChevronLeft" buttonText="" class="bg-color-white hover:bg-color-blue"/>
        </router-link>
        <div class="dark:bg-gray-900">
          <label for="table-search" class="sr-only">Buscar</label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search class="w-4 h-4 text-gray-500 dark:text-gray-400"/>
            </div>
            <input
                v-model="searchTerm"
                type="text"
                id="table-search"
                class="block h-[49.97px] pt-2 ps-10 text-size-16 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por nombre o código"
            >
          </div>
        </div>
      </div>
      <span class="text-color-text text-size-32 font-bold title-code">{{ selectedGrade }}{{ selectedSection }}</span>
      <button @click="openDialog"
              class="py-[13px] px-[21px] flex justify-center items-center gap-[5px] text-size-16 font-semibold text-color-text bg-white hover:bg-color-blue hover:text-color-white rounded-[12px] dashbutton">
        <CirclePlus/>
      </button>
    </div>
    <div class="container-table-alumnos">
      <BaseTable :columns="columns" :data="filteredAlumnos" @eliminarAlumno="requestEliminarAlumno" />
    </div>
    <AddAlumno ref="dialogRef"/>
    <Alerta
        v-if="showAlertDialog"
        Type="alert"
        TitleAlert="Eliminar Alumno"
        InfoAlert="¿Estás seguro de que deseas eliminar este alumno?"
        ButonText="Eliminar"
        @confirm="eliminarAlumno"
        @close="showAlertDialog = false"
    />
  </div>
</template>

<style scoped>
.dashbutton {
  transition: .3s all ease-in-out;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.container-table-alumnos {
  margin-top: 18px;
  border-radius: 14px;
  background: #FFF;
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  padding: 25px 24px;
}

.title-code {
  margin-left: -310px;
}

@media screen and (max-width: 1000px) {
  .title-code {
    margin: auto;
  }
}
</style>
