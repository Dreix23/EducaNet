<script setup>
import BaseButton from '@/components/BaseButton.vue';
import DashButton from '@/components/DashButton.vue';
import BaseTable from '@/components/BaseTable.vue';
import BaseModal from '@/components/BaseModal.vue';
import DashInput from '@/components/DashInput.vue';
import { ref, onMounted, watch } from 'vue';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';

const { userSchool } = useAuth(); // Obtener currentUser y userSchool desde useAuth

// Definir las columnas de la tabla
const columns = ['#', 'Nombre', 'Código QR', 'Turno', 'Acciones'];

// Datos de los alumnos
const alumnos = ref([]);

// Configuración inicial de paginación
const pagination = ref({
  start: 1,
  end: 10,
  total: 0,
  hasPrevPage: false,
  hasNextPage: true,
  perPage: 10,
  onPrevPage: () => {
    if (pagination.value.start > 1) {
      pagination.value.start -= pagination.value.perPage;
      pagination.value.end = Math.min(pagination.value.start + pagination.value.perPage - 1, pagination.value.total);
      fetchAlumnos();
    }
  },
  onNextPage: () => {
    if (pagination.value.end < pagination.value.total) {
      pagination.value.start += pagination.value.perPage;
      pagination.value.end = Math.min(pagination.value.start + pagination.value.perPage - 1, pagination.value.total);
      fetchAlumnos();
    }
  }
});

// Obtener la selección guardada
const selectedGrade = ref(localStorage.getItem('selectedGrade'));
const selectedSection = ref(localStorage.getItem('selectedSection'));

// Función para guardar y actualizar datos en el almacenamiento local
const updateLocalStorage = (alumnosData) => {
  localStorage.setItem('alumnosData', JSON.stringify(alumnosData));
  alumnos.value = alumnosData.slice(pagination.value.start - 1, pagination.value.end).map((alumno, index) => ({
    ...alumno,
    index: pagination.value.start + index
  }));
  pagination.value.total = alumnosData.length;
  pagination.value.hasPrevPage = pagination.value.start > 1;
  pagination.value.hasNextPage = pagination.value.end < pagination.value.total;
};

// Cargar datos de Firebase
const fetchAlumnos = async () => {
  const cachedData = localStorage.getItem('alumnosData');

  if (cachedData) {
    // Si hay datos en el almacenamiento local, usarlos
    const alumnosData = JSON.parse(cachedData);
    updateLocalStorage(alumnosData);
  } else {
    // Si no hay datos en el almacenamiento local, obtenerlos de Firestore
    if (selectedGrade.value && selectedSection.value && userSchool.value) {
      try {
        const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade.value}${selectedSection.value}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const alumnosData = Object.values(docSnap.data());
          updateLocalStorage(alumnosData);
        } else {
          console.log("No se encontró el documento:", `${selectedGrade.value}${selectedSection.value}`);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    } else {
      console.error('No se ha seleccionado un grado y sección o el nombre de la escuela no está disponible.');
    }
  }
};

// Suscribirse a los cambios en tiempo real en Firebase
const subscribeToChanges = () => {
  if (selectedGrade.value && selectedSection.value && userSchool.value) {
    const docRef = doc(db, `colegios/${userSchool.value}/alumnos/${selectedGrade.value}${selectedSection.value}`);
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const alumnosData = Object.values(docSnap.data());
        updateLocalStorage(alumnosData);
      } else {
        console.log("No se encontró el documento:", `${selectedGrade.value}${selectedSection.value}`);
      }
    }, (error) => {
      console.error('Error en la suscripción a los cambios:', error);
    });
  }
};

onMounted(() => {
  if (userSchool.value) {
    fetchAlumnos();
    subscribeToChanges(); // Suscribirse a los cambios en tiempo real
  } else {
    watch(userSchool, (newSchool) => {
      if (newSchool) {
        fetchAlumnos();
        subscribeToChanges(); // Suscribirse a los cambios en tiempo real
      }
    });
  }
});

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <div>
    <div class="container-button-alumnos flex gap-[15px] justify-between items-center">
      <router-link to="/aulas">
        <DashButton iconType="CircleChevronLeft" buttonText="" class="bg-color-white hover:bg-color-green"/>
      </router-link>
      <span class="text-color-text text-size-32 font-bold">{{ selectedGrade }}{{ selectedSection }}</span>
      <DashButton icon-type="CirclePlus" button-text="" class="bg-white hover:bg-color-blue" @click="toggleModal" />
    </div>
    <div class="container-table-alumnos">
      <BaseTable :columns="columns" :data="alumnos" :pagination="pagination" />
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal" title-card="Agregar Alumno">
      <form class="p-4 md:p-5">
        <div class="grid gap-4 mb-4 grid-cols-1">
          <DashInput type="text" label="Nombre" placeholder="Nombre" />
          <DashInput type="text" label="Código QR" placeholder="Código QR" />
          <DashInput type="text" label="Turno" placeholder="Turno" />
        </div>
        <BaseButton type="submit" icon-type="" button-text="Agregar Alumno" class="text-size-14" />
      </form>
    </BaseModal>
  </div>
</template>

<style scoped>
.container-table-alumnos {
  margin-top: 18px;
  border-radius: 14px;
  background: #FFF;
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  padding: 25px 24px;
}
</style>