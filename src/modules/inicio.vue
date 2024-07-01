<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from '@/services/firebase';
import SchoolDialog from '@/dialogs/SchoolDialog.vue';
import CardCole from '@/components/CardCole.vue';
import { useAuth } from '@/services/userService';
import { logInfo, logError, logDebug } from '@/utils/logger.js';
import { Loader2 } from 'lucide-vue-next';

const { currentUser, userSchoolName, userRole } = useAuth();
const dialogRef = ref(null);
const schools = ref([]);
let unsubscribe = null;
const imageLoading = ref(true);

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

const userHistory = computed(() => currentUser.value?.history || '');
const userProfileImage = computed(() => currentUser.value?.profileImageUrl || '');

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

async function subscribeToUserData() {
  if (currentUser.value?.uid) {
    const userDocRef = doc(db, "users", currentUser.value.uid);

    const localUserData = getFromLocalStorage(`userData_${currentUser.value.uid}`);
    if (localUserData) {
      Object.assign(currentUser.value, localUserData);
      logInfo('Datos de usuario cargados desde almacenamiento local');
    }

    unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        Object.assign(currentUser.value, userData);
        saveToLocalStorage(`userData_${currentUser.value.uid}`, userData);
        logInfo('Datos de usuario actualizados en tiempo real');
      }
    });
  }
}

async function subscribeToSchools() {
  const q = query(collection(db, "users"), where("role", "==", "director"));

  const localSchools = getFromLocalStorage('schools');
  if (localSchools) {
    schools.value = localSchools;
    logInfo('Escuelas cargadas desde almacenamiento local');
  }

  unsubscribe = onSnapshot(q, (snapshot) => {
    const directorSchools = [];
    snapshot.forEach((doc) => {
      directorSchools.push({ ...doc.data(), uid: doc.id });
    });
    schools.value = directorSchools;
    saveToLocalStorage('schools', directorSchools);
    logInfo('Escuelas actualizadas en tiempo real');
  });
}

onMounted(async () => {
  try {
    if (userRole.value === 'director') {
      await subscribeToUserData();
    } else if (userRole.value === 'admin') {
      await subscribeToSchools();
    }
  } catch (error) {
    logError('Error al obtener los datos:', error);
  }
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

watch([currentUser, schools], () => {
  logDebug('Datos actualizados:', {
    user: currentUser.value?.email,
    role: userRole.value,
    schoolsCount: schools.value.length
  });
});

const handleImageLoad = () => {
  imageLoading.value = false;
};
</script>

<template>
  <div v-if="userRole === 'director'" class="flex flex-col gap-[25px] items-center">
    <div class="card-cole">
      <div class="container-img relative">
        <Loader2 v-if="imageLoading" class="animate-spin absolute inset-0 m-auto" size="48" />
        <img
            :src="userProfileImage"
            :alt="'Escudo ' + userSchoolName"
            @load="handleImageLoad"
            :class="{ 'opacity-0': imageLoading, 'opacity-100 transition-opacity duration-300': !imageLoading }"
        >
      </div>
      <div class="container-info">
        <h1 class="text-2xl font-semibold text-gray-800 uppercase text-center">
          Bienvenido al colegio {{ userSchoolName }}
        </h1>
        <div class="parrafos">
          <p>{{ userHistory }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="userRole === 'admin'">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-800">Colegios</h1>
      <button @click="openDialog" class="bg-blue-500 text-white text-base px-6 py-3 rounded-lg">
        Agregar Colegio
      </button>
      <SchoolDialog ref="dialogRef" />
    </div>
    <div class="mt-10 flex justify-center flex-wrap gap-5">
      <CardCole v-for="school in schools" :key="school.uid" :school="school" />
    </div>
  </div>
</template>

<style scoped>
.card-cole {
  background: #FFF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 95px 85px 45px 85px;
  gap: 19px;
  margin-top: 70px;
  border: 5px solid #000;
  position: relative;
}

.container-img {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 5px solid #000;
  mask-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: absolute;
  top: -20%;
}

.container-img img {
  height: 100px;
}

.container-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 680px;
  gap: 22px;
}

@media screen and (max-width: 1000px) {
  .container-info {
    width: auto;
  }
}
</style>
