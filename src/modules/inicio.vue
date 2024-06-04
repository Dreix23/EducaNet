<!-- src/modules/inicio.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/services/firebase';
import SchoolDialog from '@/dialogs/SchoolDialog.vue';
import CardCole from '@/components/CardCole.vue';

const dialogRef = ref(null);
const schools = ref([]);

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

async function getDirectorSchools() {
  const q = query(collection(db, "users"), where("role", "==", "director"));
  const querySnapshot = await getDocs(q);
  const directorSchools = [];
  querySnapshot.forEach((doc) => {
    directorSchools.push(doc.data());
  });
  return directorSchools;
}

onMounted(async () => {
  try {
    schools.value = await getDirectorSchools();
  } catch (error) {
    console.error('Error al obtener los colegios:', error);
  }
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-800">Colegios</h1>
      <button @click="openDialog" class="bg-blue-500 text-white text-base px-6 py-3 rounded-lg">
        Agregar Colegio
      </button>
      <SchoolDialog ref="dialogRef" />
    </div>
    <div class="mt-10 flex justify-center flex-wrap gap-5">
      <CardCole v-for="school in schools" :key="school.id" :school="school" />
    </div>
  </div>
</template>

<style scoped>
</style>
