<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '@/services/firebase';
import SchoolDialog from '@/dialogs/SchoolDialog.vue';
import CardCole from '@/components/CardCole.vue';
import { useAuth } from '@/services/userService';

const { currentUser, userSchool, userSchoolName, userRole } = useAuth();
const dialogRef = ref(null);
const schools = ref([]);
let unsubscribe = null;

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

async function subscribeToSchools() {
  const q = query(collection(db, "users"), where("role", "==", "director"));
  unsubscribe = onSnapshot(q, (snapshot) => {
    const directorSchools = [];
    snapshot.forEach((doc) => {
      directorSchools.push({ ...doc.data(), uid: doc.id });
    });
    schools.value = directorSchools;
  });
}

onMounted(async () => {
  try {
    await subscribeToSchools();
  } catch (error) {
    console.error('Error al obtener los colegios:', error);
  }
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<template>
  <div v-if="userRole === 'director'" class="flex flex-col gap-[25px] items-center">
    <h1 class="text-2xl font-semibold text-gray-800 uppercase text-center">Bienvenido al colegio {{ userSchoolName }}
    </h1>
    <div class="flex flex-col items-center text-size-16 w-auto text-justify gap-[25px] justify-center sm:flex-row-reverse xl:w-[800px]">
      <img class="w-[200px]"
        src="https://4.bp.blogspot.com/-oyzJQ9glbYI/V0Y4f08QC5I/AAAAAAAAxdc/4ILEsz1KLo8LVLKLvCd9yVJMepuGfSTPQCLcB/s640/ie-00884-los-olivos-insignia.jpg"
        alt="">
      <div class="parrafos">
        <p>La Institución educativa Colegio Los Olivos se halla en el lugar de Los Olivos, provincia de Nueva Cajamarca,
          tal I.E. compete a la UGEL RIOJA que controla el servicio educativo, y esta última corresponde a la Dirección
          regional de educación DRE SAN MARTIN.</p>
        <p>La institución Colegio Los Olivos quiere hallar y amplificar personas capaces con una alta autoestima,
          conciencia, destrezas sociales y una sólida formación académica, moral y emocional para que puedan obtener el
          éxito personal y profesional dentro de una sociedad coetáneo y cambiante.</p>
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

<style scoped></style>
