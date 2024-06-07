<script setup>
import { ref, onMounted, computed } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter, useRoute } from 'vue-router';
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
const route = useRoute()
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


    //Para que el btn de Inicio se mantenga seleccionado
    if (route.path === '/') {
        selectRoute('/inicio');
    } else {
        selectRoute(route.path);
    }

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
        class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[80px]">
        <div class="px-[32px] py-3 h-full flex nav-container">
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center justify-start rtl:justify-end gap-[20px]">

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
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt="user photo">
                            </button>
                        </div>
                        <!-- Perfil Option -->
                        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y profile-option text-end"
                            id="dropdown-user">
                            <div class="px-5 py-3" role="none">
                                <p class="text-sm text-gray-900 dark:text-white" role="none">
                                    Admin
                                </p>
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none"
                                    v-if="user">
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


    <div class=" pt-[80px] px-10 ">
        <div class="p-5 border-2 mt-[18px] border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-color-bag">
            <router-view> </router-view>
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