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
    <div class="card-cole">
      <div class="container-img">
        <img
          src="https://4.bp.blogspot.com/-oyzJQ9glbYI/V0Y4f08QC5I/AAAAAAAAxdc/4ILEsz1KLo8LVLKLvCd9yVJMepuGfSTPQCLcB/s640/ie-00884-los-olivos-insignia.jpg"
          alt="Escudo los olivos">
      </div>
      <div class="container-info">
        <h1 class="text-2xl font-semibold text-gray-800 uppercase text-center">Bienvenido al colegio {{ userSchoolName
          }}</h1>
        <div class="parrafos">
          <p>La Institución educativa Colegio Los Olivos se halla en el lugar de Los Olivos, provincia de Nueva
            Cajamarca,
            tal I.E. compete a la UGEL RIOJA que controla el servicio educativo, y esta última corresponde a la
            Dirección
            regional de educación DRE SAN MARTIN.</p>
          <p>La institución Colegio Los Olivos quiere hallar y amplificar personas capaces con una alta autoestima,
            conciencia, destrezas sociales y una sólida formación académica, moral y emocional para que puedan obtener
            el
            éxito personal y profesional dentro de una sociedad coetáneo y cambiante.</p>
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
  mask-image: url(https://4.bp.blogspot.com/-oyzJQ9glbYI/V0Y4f08QC5I/AAAAAAAAxdc/4ILEsz1KLo8LVLKLvCd9yVJMepuGfSTPQCLcB/s640/ie-00884-los-olivos-insignia.jpg);
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
