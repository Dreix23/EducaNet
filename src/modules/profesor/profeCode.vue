<script setup>
import { ref, onMounted, watch } from 'vue';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import DashButton from '@/components/DashButton.vue';
import CardCurso from '@/components/CardCurso.vue';
import { CirclePlus, Loader } from 'lucide-vue-next';
import Alert from '@/components/Alert.vue';
import { getAuth } from 'firebase/auth';

const { userSchool } = useAuth();
const profesorUID = ref(null);
const profesorData = ref({});
const selectedCurso = ref('');
const cursos = [
  'LENGUA MATERNA (ESPAÑOL)', 'MATEMATICAS', 'LENGUA EXTRANJERA (INGLES)', 'CIENCIAS (BIOLOGIA)', 'HISTORIA', 'GEOGRAFIA',
  'FORMACION CIVICA Y ETICA', 'TECNOLOGIA', 'EDUCACION FISICA', 'ARTES', 'CIENCIAS (FISICA)', 'ESPAÑOL III',
  'MATEMATICAS III', 'SEGUNDA LENGUA (INGLES III)', 'CIENCIAS III (ENFASIS QUIMICA)', 'HISTORIA II',
  'FORMACION CIVICA Y ETICA II'
];
const isActive = ref(false);
const isLoading = ref(false);

const fetchProfesorData = async (uid) => {
  console.log("Fetching data for UID:", uid);
  try {
    const docRef = doc(db, `colegios/${userSchool.value}/profesores`, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      profesorData.value = docSnap.data();
      console.log("Datos del profesor:", profesorData.value);
      // Guardar los datos en el local storage
      localStorage.setItem(`profesorData_${uid}`, JSON.stringify(profesorData.value));
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching professor data:", error);
  }
};

const fetchUserSchool = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        userSchool.value = userData.school;
        console.log('School:', userSchool.value);
        if (profesorUID.value) {
          // Verificar si los datos existen en el local storage
          const cachedData = localStorage.getItem(`profesorData_${profesorUID.value}`);
          if (cachedData) {
            // Si los datos existen en caché, usarlos
            profesorData.value = JSON.parse(cachedData);
          } else {
            // Si no existen en caché, obtenerlos de Firestore
            fetchProfesorData(profesorUID.value);
          }
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user school:', error);
    }
  }
};

const addCursoToProfesor = async (event) => {
  event.preventDefault();
  if (selectedCurso.value && profesorUID.value) {
    isLoading.value = true;
    try {
      const profesorDocRef = doc(db, `colegios/${userSchool.value}/profesores`, profesorUID.value);
      await updateDoc(profesorDocRef, {
        cursos: arrayUnion({ curso: selectedCurso.value })
      });
      fetchProfesorData(profesorUID.value);
      console.log('Curso agregado:', selectedCurso.value);
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      isLoading.value = false;
    }
  }
};

const subscribeToProfesorData = () => {
  if (!userSchool.value || !profesorUID.value) {
    console.log('Esperando a que se cargue el nombre de la escuela y el UID del profesor');
    return;
  }

  const unsubscribe = onSnapshot(doc(db, `colegios/${userSchool.value}/profesores`, profesorUID.value), (doc) => {
    if (doc.exists()) {
      profesorData.value = doc.data();
      // Actualizar el almacenamiento local cuando los datos cambian
      localStorage.setItem(`profesorData_${profesorUID.value}`, JSON.stringify(profesorData.value));
    }
  }, (error) => {
    console.error('Error en la suscripción a los cambios:', error);
  });

  return unsubscribe;
};

onMounted(() => {
  profesorUID.value = localStorage.getItem('selectedProfessorUID');
  console.log("UID del profesor recuperado de localStorage:", profesorUID.value);
  fetchUserSchool();
  subscribeToProfesorData();
});

watch(userSchool, (newValue) => {
  if (newValue && profesorUID.value) {
    // Verificar si los datos existen en el local storage
    const cachedData = localStorage.getItem(`profesorData_${profesorUID.value}`);
    if (cachedData) {
      // Si los datos existen en caché, usarlos
      profesorData.value = JSON.parse(cachedData);
    } else {
      // Si no existen en caché, obtenerlos de Firestore
      fetchProfesorData(profesorUID.value);
    }
  }
});
</script>

<template>
  <div class="container-info-prof flex flex-col justify-center items-center">
    <div class="prof-cabe flex justify-between items-center w-full px-4">
      <router-link to="/profesores">
        <DashButton iconType="CircleChevronLeft" buttonText=""
          class="bg-white hover:bg-primary transition duration-300 ease-in-out" />
      </router-link>
      <div class="flex flex-col items-center">
        <img class="w-[60px] h-[60px] rounded-full img-prof"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
        <h1 class="title-nom">{{ profesorData.nombre }}</h1>
        <p class="text-color-text">{{ profesorData.materia }}</p>
      </div>
      <label class="switch ">
        <input type="checkbox" v-model="isActive">
        <span class="slider round"></span>
      </label>
    </div>
    <div class="prof-body">
      <div class="flex flex-col justify-end items-center gap-[17px]">
        <h2 class="text-size-20 font-bold">Agregar Curso</h2>
        <form @submit.prevent="addCursoToProfesor" class="max-w-sm mx-auto flex gap-[20px]">
          <select v-model="selectedCurso" id="cursos"
            class="select-cursos bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option value="" disabled>Seleccionar curso</option>
            <option v-for="curso in cursos" :key="curso" :value="curso">{{ curso }}</option>
          </select>
          <button type="submit" :disabled="isLoading">
            <template v-if="isLoading">
              <Loader class="w-[30px] h-[30px] animate-spin" />
            </template>
            <template v-else>
              <CirclePlus class="w-[30px] h-[30px] hover:scale-125 transition-transform duration-300 ease-in-out" />
            </template>
          </button>
        </form>
      </div>

      <div class="flex flex-col justify-end items-center gap-[17px] mt-[29px]">
        <h2 class="text-size-20 font-bold">Cursos</h2>
        <div class="container-cards-cursos flex flex-wrap gap-[26px] justify-center items-center">
          <CardCurso v-for="curso in profesorData.cursos" :key="curso.curso || curso" :curso="curso"
            :isActive="isActive" :profesorUID="profesorUID" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prof-body {
  padding: 25px 24px;
  width: 100%;
}

.container-info-prof {
  margin-top: 18px;
  border-radius: 14px;
  background: #F5F5F5;
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  padding: 0 0 25px 0;
}

.select-cursos {
  width: 306.136px;
  height: 40px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
}

.prof-cabe {
  border-radius: 14px 14px 0px 0px;
  padding: 10px;
  background: #E0E0E0;
}

.img-prof {
  margin-top: -30px;
  margin-bottom: 10px;
}

.title-nom {
  text-wrap: wrap;
  text-align: center;
  color: #202224;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;

}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

@media screen and (max-width: 750px) {
  .select-cursos {
    width: auto;
  }
}
</style>
