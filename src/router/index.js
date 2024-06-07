import { createRouter, createWebHistory } from "vue-router";
import { auth, db } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import HomeScreen from "@/views/HomeScreen.vue";
import LoginScreen from "@/views/LoginScreen.vue";
import inicioModul from "@/modules/inicio.vue";
import aulasModul from "@/modules/aulas/aulas.vue";
import secaulasModul from "@/modules/aulas/seccion.vue";
import profesoresModul from "@/modules/profesor/profesores.vue";
import profeCode from "@/modules/profesor/profeCode.vue";
import perfilModul from "@/modules/perfil.vue";
import ProfeScreen from "@/views/ProfeScreen.vue";
import ProfeIncio from "@/modules/profesor/profeInicio.vue";
import ProfeSection from "@/modules/profesor/profSection.vue";
import Tarea from "@/modules/profesor/tarea.vue";
import Asistencia from "@/modules/profesor/asistencias.vue";
import Avisos from "@/modules/profesor/avisos.vue";

import { logInfo, logError, logDebug, enableLogs } from "@/utils/logger.js";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: HomeScreen,
    meta: { requiresAuth: true, allowedRoles: ["admin", "director"] },
    children: [
      {
        path: "",
        redirect: "/inicio",
      },
      {
        name: "inicio",
        path: "/inicio",
        component: inicioModul,
      },
      {
        name: "aulas",
        path: "/aulas",
        component: aulasModul,
        meta: { allowedRoles: ["director"] },
      },
      {
        name: "profesores",
        path: "/profesores",
        component: profesoresModul,
        meta: { allowedRoles: ["director"] },
      },
      {
        name: "seccion",
        path: "/seccion",
        component: secaulasModul,
        meta: { allowedRoles: ["director"] },
      },
      {
        name: "profeCode",
        path: "/profeCode",
        component: profeCode,
        meta: { allowedRoles: ["director"] },
      },
      {
        name: "perfil",
        path: "/perfil",
        component: perfilModul,
      },
    ],
  },
  {
    path: "/profescreen",
    component: ProfeScreen,
    meta: { requiresAuth: true, allowedRoles: ["profesor"] },
    children: [
      {
        path: "",
        redirect: "/ProfeIncio",
      },
      {
        name: "ProfeIncio",
        path: "/ProfeIncio",
        component: ProfeIncio,
      },
      {
        path: "/section",
        component: ProfeSection,
        children: [
          {
            name: "section",
            path: "",
            redirect: "/tarea",
          },
          {
            name: "tarea",
            path: "/tarea",
            component: Tarea,
          },
          {
            name: "avisos",
            path: "/avisos",
            component: Avisos,
          },
          {
            name: "asistencia",
            path: "/asistencia",
            component: Asistencia,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: LoginScreen,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "inicio" },
  },
];

const index = createRouter({
  history: createWebHistory(),
  routes,
});

index.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const allowedRoles = to.matched.some((record) => record.meta.allowedRoles);
  const user = await new Promise((resolve, reject) => {
    onAuthStateChanged(auth, resolve, reject);
  });

  logInfo(`Navegando de ${from.path} a ${to.path}`);
  logDebug("¿Requiere autenticacin?", requiresAuth);
  logDebug("¿Usuario autenticado?", user);

  if (requiresAuth && !user) {
    logInfo("Acceso no autorizado. Redirigiendo al login...");
    next("/login");
  } else if (requiresAuth && user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    const userRole = userData.role;

    if (to.matched.length === 0) {
      // Ruta no encontrada, redirigir segn el rol
      if (userRole === "profesor") {
        next({ name: "ProfeIncio" });
      } else {
        next({ name: "inicio" });
      }
    } else if (userRole === "profesor" && to.path !== "/ProfeIncio") {
      logInfo("Redirigiendo al profesor a ProfeIncio...");
      next("/ProfeIncio");
    } else if (userRole === "admin" && to.path !== "/inicio") {
      logInfo("Acceso denegado. Ruta no autorizada para el rol de administrador.");
      next("/inicio");
    } else if (Array.isArray(allowedRoles) && !allowedRoles.includes(userRole)) {
      logInfo("Acceso denegado. Rol no autorizado.");
      next("/login");
    } else {
      logInfo("Acceso autorizado. Continuando navegacin...");
      next();
    }
  } else {
    next();
  }
});

export default index;
