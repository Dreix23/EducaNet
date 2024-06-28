<script setup>
import { defineExpose, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot, collection, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { Loader } from 'lucide-vue-next';

const route = useRoute();
const isDialogOpen = ref(false);
const students = ref([]);
const message = ref('');
const currentUser = ref(null);
const userSchool = ref(null);
const userTurno = ref(null);
const tareaId = ref(null);
const isLoading = ref(false);

const openDialog = (id) => {
  tareaId.value = id;
  isDialogOpen.value = true;
  fetchStudents();
};

const closeDialog = () => {
  isDialogOpen.value = false;
  message.value = '';
};

const fetchStudents = async () => {
  const group = route.params.grupo;
  const curso = route.params.curso;

  if (group && curso && userSchool.value && userTurno.value) {
    const studentsDocRef = doc(db, `colegios/${userSchool.value}/alumnos`, group);

    onSnapshot(studentsDocRef, async (snapshot) => {
      if (snapshot.exists()) {
        const studentsData = snapshot.data();
        if (typeof studentsData === 'object' && !Array.isArray(studentsData)) {
          students.value = await Promise.all(
              Object.entries(studentsData)
                  .filter(([, student]) => student.TURNO === userTurno.value)
                  .map(async ([id, student]) => {
                    const calificacionDocRef = doc(db, `colegios/${userSchool.value}/cursos/${curso}/tareas/${tareaId.value}/calificaciones`, student.QR);
                    const calificacionDoc = await getDoc(calificacionDocRef);
                    const grade = calificacionDoc.exists() ? calificacionDoc.data().nota : 0;
                    return {
                      id: student.QR,
                      name: student.NOM_ALUMNO,
                      grade: grade
                    };
                  })
          );
          console.log('Datos de estudiantes cargados:', students.value);
        }
      }
    });
  }
};

const saveGrades = async () => {
  const curso = route.params.curso;
  isLoading.value = true;

  console.log('Curso:', curso);
  console.log('Tarea ID:', tareaId.value);

  const collectionPath = `colegios/${userSchool.value}/cursos/${curso}/tareas/${tareaId.value}/calificaciones`;

  try {
    for (const student of students.value) {
      const grade = Math.min(Math.max(student.grade || 0, 0), 20);
      const calificacionData = {
        nota: grade
      };

      const calificacionDocRef = doc(collection(db, collectionPath), student.id);
      await setDoc(calificacionDocRef, calificacionData);
    }

    console.log('Calificaciones guardadas exitosamente');
    message.value = 'Calificaciones guardadas exitosamente.';
  } catch (error) {
    console.error('Error al guardar las calificaciones:', error);
    message.value = 'Error al guardar las calificaciones. Por favor, intenta nuevamente.';
  } finally {
    isLoading.value = false;
    fetchStudents(); // Refrescar los datos después de guardar
  }
};

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user;
      const uid = user.uid;

      try {
        const userDocRef = doc(db, 'users', uid);
        onSnapshot(userDocRef, (userDocSnap) => {
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            userSchool.value = userData.school;
            userTurno.value = userData.turno;
          }
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    } else {
      currentUser.value = null;
      userSchool.value = null;
      userTurno.value = null;
    }
  });
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

      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl h-full max-h-[90vh] z-10 relative flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-blue-600 text-center flex-grow">Notas</h2>
          <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="container-notas flex-grow overflow-y-auto">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-max">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-2">
                  Nombre
                </th>
                <th scope="col" class="px-4 py-2 text-center">
                  Nota
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(student, index) in students" :key="index"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ student.name }}
                </th>
                <td class="px-4 py-2 flex justify-center">
                  <input v-model.number="student.grade" type="number" min="0" max="20"
                         class="w-full min-w-[60px] max-w-[100px] border border-gray-300 rounded-[5px] py-1 px-2">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p v-if="message" class="mt-4 text-center"
           :class="{ 'text-green-500': !message.startsWith('Error'), 'text-red-500': message.startsWith('Error') }">
          {{ message }}
        </p>

        <div class="flex justify-center mt-5">
          <button @click="saveGrades"
                  class="bg-[#2D60FF] text-white text-sm font-semibold px-8 py-3 rounded-lg transition duration-300 ease-in-out flex items-center justify-center">
            <Loader v-if="isLoading" class="animate-spin mr-2" />
            <span v-if="!isLoading">Guardar</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
