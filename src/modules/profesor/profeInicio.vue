<script setup>
import { ref, onMounted, watch } from 'vue';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import CardCurso from '@/components/CardCurso.vue';
import { CirclePlus, Loader } from 'lucide-vue-next';
import Alert from '@/components/Alert.vue';
import { logInfo, logError } from '@/utils/logger.js';

const { currentUser } = useAuth();
const profesorData = ref({});
const isActive = ref(true);

const fetchProfesorData = async (uid) => {
  logInfo("Fetching data for UID:", uid);
  try {
    const cachedData = localStorage.getItem(`profesorData_${uid}`);
    if (cachedData) {
      profesorData.value = JSON.parse(cachedData);
      logInfo("Datos del profesor cargados desde localStorage");
    } else {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        profesorData.value = docSnap.data();
        localStorage.setItem(`profesorData_${uid}`, JSON.stringify(profesorData.value));
        logInfo("Datos del profesor obtenidos de Firestore y guardados en localStorage");
      } else {
        logError("No se encontró el documento del profesor");
      }
    }
  } catch (error) {
    logError("Error fetching professor data:", error);
  }
};

const subscribeToProfesorData = () => {
  if (!currentUser.value) {
    logInfo('Esperando a que se cargue el UID del usuario actual');
    return;
  }

  return onSnapshot(doc(db, 'users', currentUser.value.uid), (doc) => {
    if (doc.exists()) {
      profesorData.value = doc.data();
      localStorage.setItem(`profesorData_${currentUser.value.uid}`, JSON.stringify(profesorData.value));
      logInfo('Datos del profesor actualizados en tiempo real');
    }
  }, (error) => {
    logError('Error en la suscripción a los cambios:', error);
  });
};

onMounted(() => {
  if (currentUser.value) {
    logInfo("UID del usuario actual:", currentUser.value.uid);
    fetchProfesorData(currentUser.value.uid);
    const unsubscribe = subscribeToProfesorData();
    return () => unsubscribe();
  }
});

watch(currentUser, (newValue) => {
  if (newValue) {
    fetchProfesorData(newValue.uid);
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
