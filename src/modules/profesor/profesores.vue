<script setup>
import {ref, onMounted, watch, onUnmounted} from 'vue';
import BtnExcelProf from '@/components/BtnExcelProf.vue';
import {CirclePlus} from 'lucide-vue-next';
import ProfesorDialog from '@/dialogs/ProfesorDialog.vue';
import ProfTable from '@/components/ProfTable.vue';
import {collection, doc, setDoc, onSnapshot} from 'firebase/firestore';
import {db} from '@/services/firebase.js';
import {getAuth, createUserWithEmailAndPassword, updateCurrentUser} from 'firebase/auth';
import {useAuth} from '@/services/userService.js';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';

const {userSchool} = useAuth();

// Estado del modal
const modalActive = ref(false);
const profesorSeleccionado = ref({});
const isEditing = ref(false);
const profesores = ref([]);

// Función para abrir/cerrar el modal y determinar si es para agregar o editar
const toggleModal = (profesor = null) => {
  modalActive.value = !modalActive.value;
  profesorSeleccionado.value = profesor ? {...profesor, password: profesor.password || ''} : {};
  isEditing.value = profesor ? true : false;
  if (profesor && profesor.id) {
    localStorage.setItem('selectedProfessorUID', profesor.id);
    console.log("UID del profesor seleccionado guardado en localStorage:", profesor.id);
  }
};

const storage = getStorage();

const cargarArchivoExcel = async (archivo) => {
  try {
    const fileRef = storageRef(storage, `excel/${archivo.name}`);
    await uploadBytes(fileRef, archivo);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Error al cargar archivo Excel:', error);
    return null;
  }
};

// Función para guardar profesor
const guardarProfesor = async (profesor) => {
  if (!userSchool.value) return;
  const auth = getAuth();
  const currentUser = auth.currentUser;
  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, profesor.correo, profesor.password);
    const newUser = userCredential.user;

    if (profesor.archivoExcel) {
      const downloadURL = await cargarArchivoExcel(profesor.archivoExcel);
      profesor.archivoExcelURL = downloadURL;
    }

    // Guardar datos del profesor en Firestore
    await setDoc(doc(db, `colegios/${userSchool.value}/profesores`, newUser.uid), {
      cod: profesor.cod,
      nombre: profesor.nombre,
      correo: profesor.correo,
      archivoExcelURL: profesor.archivoExcelURL || null,
    });

    // Restaurar el usuario autenticado actual
    await updateCurrentUser(auth, currentUser);
  } catch (error) {
    console.error('Error al crear profesor:', error);
  }
};

let unsubscribe = null;

// Obtener datos de profesores desde Firebase en tiempo real
const fetchProfesores = () => {
  if (!userSchool.value) return;

  unsubscribe = onSnapshot(collection(db, `colegios/${userSchool.value}/profesores`), (querySnapshot) => {
    profesores.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  });
};

// Observa cambios en userSchool y actualiza la lista de profesores
watch(userSchool, async (newSchool) => {
  if (newSchool) {
    await fetchProfesores();
  }
});

onMounted(() => {
  fetchProfesores();
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

// Definición de columnas
const columns = ref([
  {name: '#', align: 'center'},
  {name: 'CÓDIGO', align: 'left'},
  {name: 'NOMBRE', align: 'left'},
  {name: 'CORREO', align: 'left'},
  {name: 'ACCIONES', align: 'center'}
]);

const pagination = ref({
  start: 1,
  end: 10,
  total: profesores.value.length,
  data: [],
  hasPrevPage: false,
  hasNextPage: profesores.value.length > 10,
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

// Función para actualizar los datos de la tabla con la paginación correcta
const updateTableData = () => {
  const startIndex = pagination.value.start - 1;
  const endIndex = pagination.value.end;
  pagination.value.data = profesores.value.slice(startIndex, endIndex);
};

watch(profesores, (newProfesores) => {
  pagination.value.total = newProfesores.length;
  pagination.value.hasNextPage = pagination.value.end < newProfesores.length;
  updateTableData();
});

updateTableData();
</script>
<template>
  <div class="flex gap-4">
    <BtnExcelProf iconType="FileUp" buttonText="Cargar Excel"
                  class="bg-white hover:bg-green-500 text-black hover:text-white rounded-lg shadow-md"/>
    <button @click="toggleModal()"
            class="py-3 px-5 flex justify-center items-center gap-2 text-lg font-semibold bg-white hover:bg-green-500 text-black hover:text-white rounded-lg shadow-md">
      <CirclePlus/>
    </button>
  </div>
  <ProfesorDialog :modalActive="modalActive" :profesorSeleccionado="profesorSeleccionado" :isEditing="isEditing"
                  @closeModal="toggleModal" @guardarProfesor="guardarProfesor"/>
  <div class="mt-6 bg-white rounded-lg shadow-md p-6">
    <ProfTable :columns="columns" :data="pagination.data" :pagination="pagination"/>
  </div>
</template>
<style scoped>
/* Custom styles can be added here if needed */
</style>
