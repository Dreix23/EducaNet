<script setup>
import { ref, onMounted, computed } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/services/firebase';
import { useRouter, useRoute } from 'vue-router';
import { logInfo, logError, logDebug, enableLogs } from '@/utils/logger.js';
import { doc, getDoc } from 'firebase/firestore';
import logoSrc from '@/assets/Logo-blue.png';
import { Home, LayoutGrid, UsersRound, ListChecks, Megaphone, User } from 'lucide-vue-next';
import Alert from '@/components/Alert.vue';
import { useAuth } from '@/services/userService';
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

const { currentUser, userRole, clearUserDataSecurely } = useAuth();
const router = useRouter();
const route = useRoute()
const isLoading = ref(true);

const isAdmin = computed(() => userRole.value === 'admin');
const isDirector = computed(() => userRole.value === 'director');

const selectedRoute = ref('');

const selectRoute = (route) => {
  selectedRoute.value = route;
};

onMounted(async () => {
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
  onAuthStateChanged(auth, async (user) => {
    logDebug('Resultado de onAuthStateChanged:', user);
    if (user) {
      logInfo('Usuario autenticado:', user.email);
      selectRoute(route.path === '/' ? '/inicio' : route.path);
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
    clearUserDataSecurely();
    logInfo('Sesión cerrada. Redirigiendo al login...');
    router.push('/login');
  } catch (error) {
    logError('Error al cerrar sesión:', error.message);
  }
};

</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[80px]">
    <div class="px-[32px] py-3 h-full flex nav-container">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-start rtl:justify-end gap-[20px]">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                  type="button"
                  class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>

          <div class="flex justify-center items-center gap-[8px]">
            <img :src="logoSrc" alt="Logo Educanet">
            <p class="text-size-25 uppercase font-normal"><span class="font-bold">Educa</span>net</p>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ms-3">
            <div class="flex items-center gap-[20px]">
              <div class="info-profile flex flex-col justify-end text-end text-color-text">
                <span v-if="currentUser" class="text-size-18 font-bold">{{ currentUser.email }}</span>
                <span class="text-size-14">{{ userRole }}</span>
              </div>
              <button type="button"
                      class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <div class="w-[44px] h-[44px] rounded-full border border-color-text flex justify-center items-center bg-color-white overflow-hidden">
                  <img v-if="currentUser && currentUser.profileImageUrl"
                       :src="currentUser.profileImageUrl"
                       :alt="currentUser.displayName || 'user photo'"
                       class="w-full h-full object-cover">
                  <User v-else class="w-6 h-6 text-gray-500" />
                </div>
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y profile-option text-end"
                 id="dropdown-user">
              <div class="px-5 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ userRole }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none" v-if="currentUser">
                  {{ currentUser.email }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <RouterLink to="/perfil"
                              :class="['block px-4 py-2  text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white']"
                              @click="selectRoute('/perfil')">
                    <span class="font-semibold text-size-16">Perfil</span>
                  </RouterLink>
                </li>
                <li>
                  <a @click="logout"
                     class="cursor-pointer block px-4 py-2 text-size-16  text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
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
         class="fixed top-0 left-0 z-40 w-64 h-screen pt-[110px] transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
         aria-label="Sidebar">
    <div v-if="!isLoading" class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <RouterLink to="/"
                      :class="['flex items-center gap-[16px] px-[15px] py-[12px] text-color-text rounded-lg dark:text-white group h-[50px] transition-colors duration-500 ease-in-out', { 'bg-color-primary text-color-white': selectedRoute === '/inicio', 'hover:text-color-white hover:bg-color-primary': selectedRoute !== '/inicio' }]"
                      @click="selectRoute('/inicio')">
            <Home />
            <span class="font-semibold text-size-18">Inicio</span>
          </RouterLink>
        </li>
        <template v-if="isDirector">
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
          <li>
            <RouterLink to="/avisos"
                        :class="['flex items-center gap-[16px] px-[15px] py-[12px] text-color-text rounded-lg dark:text-white group h-[50px] transition-colors duration-500 ease-in-out', { 'bg-color-primary text-color-white': selectedRoute === '/avisos', 'hover:text-color-white hover:bg-color-primary': selectedRoute !== '/avisos' }]"
                        @click="selectRoute('/avisos')">
              <Megaphone />
              <span class="font-semibold text-size-18">Avisos</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/asistencias"
                        :class="['flex items-center gap-[16px] px-[15px] py-[12px] text-color-text rounded-lg dark:text-white group h-[50px] transition-colors duration-500 ease-in-out', { 'bg-color-primary text-color-white': selectedRoute === '/asistencias', 'hover:text-color-white hover:bg-color-primary': selectedRoute !== '/asistencias' }]"
                        @click="selectRoute('/asistencias')">
              <ListChecks />
              <span class="font-semibold text-size-18">Asistencias</span>
            </RouterLink>
          </li>
        </template>
      </ul>
    </div>
  </aside>

  <div class="lg:ml-64 pt-[80px] px-10 ">
    <div v-if="!isLoading"
         class="p-5   mt-[18px] border-gray-200 border-dashed  border-2 rounded-lg dark:border-gray-700 bg-color-bag">
      <router-view> </router-view>
    </div>
  </div>
</template>


<style scoped>
.img-perfil {
  width: 25px;
}

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
