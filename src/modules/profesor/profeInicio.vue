<script setup>
import { ref, onMounted, watch } from 'vue';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import CardCurso from '@/components/CardCurso.vue';
import { CirclePlus, Loader } from 'lucide-vue-next';
import Alert from '@/components/Alert.vue';
import { getAuth } from 'firebase/auth';

const { userSchool, currentUser } = useAuth();
const profesorData = ref({});
const selectedCurso = ref('');

const isActive = ref(true);
const isLoading = ref(false);

const fetchProfesorData = async (uid) => {
  console.log("Fetching data for UID:", uid);
  try {
    const docRef = doc(db, 'users', uid);
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
        if (currentUser.value) {
          // Verificar si los datos existen en el local storage
          const cachedData = localStorage.getItem(`profesorData_${currentUser.value.uid}`);
          if (cachedData) {
            // Si los datos existen en caché, usarlos
            profesorData.value = JSON.parse(cachedData);
          } else {
            // Si no existen en caché, obtenerlos de Firestore
            fetchProfesorData(currentUser.value.uid);
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

const subscribeToProfesorData = () => {
  if (!currentUser.value) {
    console.log('Esperando a que se cargue el UID del usuario actual');
    return;
  }

  const unsubscribe = onSnapshot(doc(db, 'users', currentUser.value.uid), (doc) => {
    if (doc.exists()) {
      profesorData.value = doc.data();
      // Actualizar el almacenamiento local cuando los datos cambian
      localStorage.setItem(`profesorData_${currentUser.value.uid}`, JSON.stringify(profesorData.value));
    }
  }, (error) => {
    console.error('Error en la suscripción a los cambios:', error);
  });

  return unsubscribe;
};

onMounted(() => {
  if (currentUser.value) {
    console.log("UID del usuario actual:", currentUser.value.uid);
    fetchUserSchool();
    subscribeToProfesorData();
  }
});

watch(currentUser, (newValue) => {
  if (newValue) {
    // Verificar si los datos existen en el local storage
    const cachedData = localStorage.getItem(`profesorData_${newValue.uid}`);
    if (cachedData) {
      // Si los datos existen en caché, usarlos
      profesorData.value = JSON.parse(cachedData);
    } else {
      // Si no existen en caché, obtenerlos de Firestore
      fetchProfesorData(newValue.uid);
    }
  }
});
</script>

<template>
  <div class="container-info-prof flex flex-col justify-center items-center">
    <div class="prof-cabe flex justify-center items-center w-full px-4">
      <div class="flex flex-col items-center">
        <img class="w-[60px] h-[60px] rounded-full img-prof"
             src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
        <h1 class="title-nom">{{ currentUser ? currentUser.displayName : '' }}</h1>
        <p class="text-color-text">{{ profesorData.materia }}</p>
      </div>
    </div>
    <div class="prof-body">
      <div class="flex flex-col justify-end items-center gap-[17px] mt-[29px]">
        <h2 class="text-size-20 font-bold">Cursos</h2>
        <div class="container-cards-cursos flex flex-wrap gap-[26px] justify-center items-center">
          <CardCurso v-for="curso in profesorData.cursos" :key="curso.curso || curso" :curso="curso"
                     :isActive="isActive" :profesorUID="currentUser ? currentUser.uid : ''" />
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

.switch input {
    opacity: 0;
    width: 0;
    height: 0;

}

</style>
