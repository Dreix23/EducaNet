<script setup>
import { defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { getDocs, collection, doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';

const route = useRoute();
const router = useRouter();
const routeName = ref('');

const updateRouteName = () => {
  routeName.value = route.path.split('/').pop();
};

// Actualizar el nombre de la ruta al montar el componente
updateRouteName();

// Observar cambios en la ruta
watch(route, () => {
  updateRouteName();
});

const { userSchool, userRole } = useAuth();

const props = defineProps({
  curso: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  profesorUID: {
    type: String,
    required: true
  }
});

const gradosSecciones = ref([]);
const selectedGrado = ref(null);
const selectedGrupos = ref({});

const fetchGradosSecciones = async () => {
  if (!userSchool.value) {
    console.log('Esperando a que se cargue el nombre de la escuela');
    return;
  }

  // Verificar si los datos existen en el local storage
  const cachedData = localStorage.getItem(`gradosSecciones_${userSchool.value}`);

  if (cachedData) {
    // Si los datos existen en caché, usarlos
    gradosSecciones.value = JSON.parse(cachedData);
  } else {
    // Si no existen en caché, obtenerlos de Firestore
    try {
      const querySnapshot = await getDocs(collection(db, `colegios/${userSchool.value}/alumnos`));
      const grupos = querySnapshot.docs.map(doc => doc.id);
      const grados = {};

      grupos.forEach(grupo => {
        const [grado, seccion] = grupo.split(/(?=[A-Za-z])/);
        if (!grados[grado]) {
          grados[grado] = new Set();
        }
        grados[grado].add(seccion);
      });

      gradosSecciones.value = Object.keys(grados)
          .map(grado => parseInt(grado))
          .sort((a, b) => a - b)
          .map(grado => ({
            grado,
            secciones: Array.from(grados[grado.toString()])
          }));

      console.log("Grados y secciones:", gradosSecciones.value);

      // Guardar los datos en el local storage
      localStorage.setItem(`gradosSecciones_${userSchool.value}`, JSON.stringify(gradosSecciones.value));
    } catch (error) {
      console.error('Error fetching grades and sections:', error);
    }
  }

  if (gradosSecciones.value.length > 0 && !selectedGrado.value) {
    selectedGrado.value = gradosSecciones.value[0].grado;
  }
};

const fetchSelectedData = async () => {
  try {
    const profesorDocRef = doc(db, 'users', props.profesorUID);
    const profesorDocSnap = await getDoc(profesorDocRef);
    if (profesorDocSnap.exists()) {
      const profesorData = profesorDocSnap.data();
      const curso = profesorData.cursos.find(curso => curso.curso === props.curso.curso);
      if (curso && curso.grupos && curso.grupos.length > 0) {
        const [grado] = curso.grupos[0].split(/(?=[A-Za-z])/);
        selectedGrado.value = parseInt(grado);
        selectedGrupos.value = curso.grupos.reduce((acc, grupo) => {
          acc[grupo] = true;
          return acc;
        }, {});
      }
    }
  } catch (error) {
    console.error('Error fetching selected data:', error);
  }
};

const saveDataToFirebase = async () => {
  if (props.isActive) {
    try {
      const profesorDocRef = doc(db, 'users', props.profesorUID);
      const profesorDocSnap = await getDoc(profesorDocRef);
      if (profesorDocSnap.exists()) {
        const profesorData = profesorDocSnap.data();
        const cursoIndex = profesorData.cursos.findIndex(curso => curso.curso === props.curso.curso);
        const cursoData = {
          curso: props.curso.curso,
          grupos: Object.keys(selectedGrupos.value).filter(grupo => selectedGrupos.value[grupo])
        };

        if (cursoIndex !== -1) {
          const updatedCursos = [...profesorData.cursos];
          updatedCursos[cursoIndex] = cursoData;
          await updateDoc(profesorDocRef, {
            cursos: updatedCursos
          });
          console.log('Datos actualizados en Firebase');
        } else {
          await updateDoc(profesorDocRef, {
            cursos: arrayUnion(cursoData)
          });
          console.log('Datos guardados en Firebase');
        }
      }
    } catch (error) {
      console.error('Error al guardar/actualizar los datos en Firebase:', error);
    }
  }
};

const subscribeToGradosSecciones = () => {
  if (!userSchool.value) {
    console.log('Esperando a que se cargue el nombre de la escuela');
    return;
  }

  const unsubscribe = onSnapshot(collection(db, `colegios/${userSchool.value}/alumnos`), async () => {
    await fetchGradosSecciones();
  }, (error) => {
    console.error('Error en la suscripción a los cambios:', error);
  });

  return unsubscribe;
};

onMounted(() => {
  fetchGradosSecciones();
  fetchSelectedData();
  subscribeToGradosSecciones();
});

watch(selectedGrupos, saveDataToFirebase, { deep: true });
</script>

<template>
  <transition name="fade" appear>
    <div class="card-curso">
      <div class="card-cabe">
        <h3 class="text-size-18 font-medium">{{ curso.curso }}</h3>
      </div>
      <div class="card-body mt-[15px]">
        <div class="add-control px-[10px] flex flex-col gap-[6px] items-center" v-if="routeName !== 'ProfeIncio'">
          <div class="radio-group flex gap-4">
            <label v-for="grado in gradosSecciones" :key="grado.grado" class="radio-option flex items-center">
              <input type="radio" :name="`grado-${curso.curso}`" :value="grado.grado" class="radio-input"
                     v-model="selectedGrado" :disabled="!isActive">
              <span class="ms-2">{{ grado.grado }}</span>
            </label>
          </div>

          <div v-if="selectedGrado !== null"
               class="container-checks items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
            <div class="flex flex-wrap">
              <template
                  v-for="(seccion, idx) in (gradosSecciones.find(grado => grado.grado === selectedGrado)?.secciones || [])"
                  :key="seccion">
                <div v-if="idx % 5 === 0" class="w-full"></div>
                <div class="flex items-center ps-3 w-1/5">
                  <input :id="`checkbox-${curso.curso}-${seccion}`" type="checkbox"
                         :value="`${selectedGrado}${seccion}`"
                         class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                         v-model="selectedGrupos[`${selectedGrado}${seccion}`]" :disabled="!isActive">
                  <label :for="`checkbox-${curso.curso}-${seccion}`"
                         class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ seccion }}</label>
                </div>
              </template>
            </div>
          </div>

        </div>
        <div v-if="Object.keys(selectedGrupos).length > 0"
             class="seccion flex flex-col gap-[15px] mt-[15px] items-center px-[10px] md:px-[48px]">
          <h3 class="text-size-18 font-medium" v-if="routeName !== 'ProfeIncio'">Grupos Seleccionados</h3>
          <h3 class="text-size-18 font-medium" v-if="routeName === 'ProfeIncio'">Secciones Asignadas</h3>
          <div class="container-secciones w-full flex gap-[9px] flex-wrap">

            <template v-for="grupo in Object.keys(selectedGrupos)" :key="grupo">
              <router-link v-if="userRole === 'profesor' && selectedGrupos[grupo]" :to="{ name: 'section', params: { grupo: grupo, curso: curso.curso } }"
                           class="section-circle py-[8px] px-[18px] w-[40px] h-[40px] bg-purple-500 flex justify-center items-center">
                <span class="text-white text-size-20 font-bold">{{ grupo }}</span>
              </router-link>
              <div v-else-if="selectedGrupos[grupo]"
                   class="section-circle py-[8px] px-[18px] w-[40px] h-[40px] bg-gray-400 flex justify-center items-center cursor-not-allowed">
                <span class="text-white text-size-20 font-bold">{{ grupo }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.card-curso {
  border-radius: 14px;
  background: #FFF;
  box-shadow: 0px 0px 8.8px 0px rgba(0, 0, 0, 0.53);
  width: 300px;
  max-width: 300px;
  padding-bottom: 15px;
}

.card-cabe {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 10px 0 10px;
  position: relative;
}

.radio-group {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.radio-option {
  display: flex;
  align-items: center;
}

.radio-input {
  margin-right: 5px;
}

.container-checks {
  display: flex;
  flex-wrap: wrap;
  border-collapse: collapse;
  padding: 5px;
  max-width: 250px;
}

@media screen and (max-width: 750px) {

  .card-curso {
    width: auto;
    max-width: none;
  }

  .container-checks {
    width: auto;
    max-width: none;
  }
}

.section-circle {
  border-radius: 100%;
  transition: .3s box-shadow ease-in-out;
  background-color: #7e3ff2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-weight: bold;
}
</style>