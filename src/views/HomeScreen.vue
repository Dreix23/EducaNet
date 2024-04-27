<script setup>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'vue-router';
import { logInfo, logError, logDebug, enableLogs } from '@/utils/logger.js';

const user = ref(null);
const router = useRouter();
const isLoading = ref(true);

onMounted(() => {
  logInfo('Verificando estado de autenticación...');
  onAuthStateChanged(auth, (currentUser) => {
    logDebug('Resultado de onAuthStateChanged:', currentUser);
    if (currentUser) {
      logInfo('Usuario autenticado:', currentUser.email);
      user.value = currentUser;
    } else {
      logInfo('Usuario no autenticado. Redirigiendo al login...');
      router.push('/login');
    }
    isLoading.value = false;
  });
});

const logout = async () => {
  try {
    logInfo('Cerrando sesión...');
    await signOut(auth);
    logInfo('Sesión cerrada. Redirigiendo al login...');
    router.push('/login');
  } catch (error) {
    logError('Error al cerrar sesión:', error.message);
  }
};
</script>

<template>
  <div class="home-screen" v-if="!isLoading">
    <h2>Welcome to the Home Screen</h2>
    <p v-if="user">Hello, {{ user.email }}!</p>
    <p v-else>Loading user data...</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>


<style scoped>
.home-screen {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>