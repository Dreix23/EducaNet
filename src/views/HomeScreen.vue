<script setup>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'vue-router';
import { logInfo, logError, logDebug, enableLogs } from '@/utils/logger.js';
import logoSrc from '@/assets/Logo-blue.png';
import profileSrc from '@/assets/profile.png';
import { Home, LayoutGrid, UsersRound, LogOut, Menu, CircleChevronDown } from 'lucide-vue-next';
import Alert from '@/components/Alert.vue';
import {
  initFlowbite, initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips
} from 'flowbite'
import Inicio from '@/modules/inicio.vue';


const user = ref(null);
const router = useRouter();
const isLoading = ref(true);

// Estado para la ruta seleccionada
const selectedRoute = ref('');

// Función para seleccionar una ruta
const selectRoute = (route) => {
  selectedRoute.value = route;
};

onMounted(() => {
  initFlowbite();
  initAccordions();
  initCarousels();
  initCollapses();
  initDials();
  initDismisses();
  initDrawers();
  initDropdowns();
  initModals();
  initPopovers();
  initTabs();
  initTooltips();

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



  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[101px]">
    <div class="px-[32px] py-3 h-full flex nav-container">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-start rtl:justify-end">

          <!--Btn-Toggle -->
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>

          <!-- Logo -->
          <div class="flex justify-center items-center gap-[8px]">
            <img :src="logoSrc" alt="Logo Educanet">
            <p class="text-size-25 uppercase font-normal"><span class=" font-bold">Educa</span>net</p>
          </div>
        </div>
        <!-- Profile -->
        <div class="flex items-center">
          <div class="flex items-center ms-3">
            <!-- Perfil -->
            <div class="flex items-center gap-[20px]">
              <div class="info-profile flex flex-col justify-end text-end text-color-text">
                <span v-if="user" class="text-size-18 font-bold ">{{ user.email }}</span>
                <span class="text-size-14">Admin</span>
              </div>
              <button type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <img class="w-[44px] h-[44px] rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
            </div>
            <!-- Perfil Option -->
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y profile-option text-end"
              id="dropdown-user">
              <div class="px-5 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  Admin
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none" v-if="user">
                  {{ user.email }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <RouterLink to="/perfil"
                    class="block px-4 py-2  text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem">Perfil</RouterLink>
                </li>
                <li>
                  <a @click="logout"
                    class="cursor-pointer block px-4 py-2  text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem">Cerrar Sesión</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-[110px] transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <RouterLink to="/inicio"
            :class="['flex items-center gap-[16px] px-[15px] py-[12px] text-color-text rounded-lg dark:text-white group h-[50px] transition-colors duration-500 ease-in-out', { 'bg-color-primary text-color-white': selectedRoute === '/inicio', 'hover:text-color-white hover:bg-color-primary': selectedRoute !== '/inicio' }]"
            @click="selectRoute('/inicio')">
            <Home />
            <span class="font-semibold text-size-18">Inicio</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/aulas"
            :class="['flex items-center gap-[16px] px-[15px] py-[12px] text-color-text rounded-lg dark:text-white group h-[50px] transition-colors duration-500 ease-in-out', { 'bg-color-primary text-color-white': selectedRoute === '/aulas', 'hover:text-color-white hover:bg-color-primary': selectedRoute !== '/aulas' }]"
            @click="selectRoute('/aulas')">
            <LayoutGrid />
            <span class="font-semibold text-size-18">Aulas</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/profesores"
            :class="['flex items-center gap-[16px] px-[15px] py-[12px] text-color-text rounded-lg dark:text-white group h-[50px] transition-colors duration-500 ease-in-out', { 'bg-color-primary text-color-white': selectedRoute === '/profesores', 'hover:text-color-white hover:bg-color-primary': selectedRoute !== '/profesores' }]"
            @click="selectRoute('/profesores')">
            <UsersRound />
            <span class="font-semibold text-size-18">Profesores</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>

  <div class="sm:ml-64 pt-[101px] px-10 ">
    <div class="p-5 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-[18px] bg-color-bag">
      <router-view></router-view>
    </div>
  </div>



  <!-- <div class="home-screen" v-if="!isLoading">
    <h2>Home Screen</h2>
    <p v-if="user">Hello, {{ user.email }}!</p>
    <p v-else>Loading user data...</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div> -->
</template>

<style scoped>
.profile-option {
  box-shadow: 0px 0px 10px #00000079;
  border-radius: 10px;
  border: none;
}

@media screen and (max-width: 750px) {
  .info-profile {
    display: none
  }
}
</style>