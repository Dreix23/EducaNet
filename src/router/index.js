import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import HomeScreen from '@/views/HomeScreen.vue';
import LoginScreen from '@/views/LoginScreen.vue';
import { logInfo, logError, logDebug, enableLogs } from '@/utils/logger.js';

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: HomeScreen,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: LoginScreen
    }
];

const index = createRouter({
    history: createWebHistory(),
    routes
});

index.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, resolve, reject);
    });

    logInfo(`Navegando de ${from.path} a ${to.path}`);
    logDebug('¿Requiere autenticación?', requiresAuth);
    logDebug('¿Usuario autenticado?', user);

    if (requiresAuth && !user) {
        logInfo('Acceso no autorizado. Redirigiendo al login...');
        next('/login');
    } else {
        logInfo('Acceso autorizado. Continuando navegación...');
        next();
    }
});

export default index;
