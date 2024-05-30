<!-- src/modules/inicio.vue -->
<script setup>
import { ref } from 'vue';
import AddSchoolDialog from '@/dialogs/AddSchoolDialog.vue';

const dialogRef = ref(null);

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};
</script>

<template>
  <div>
    <h1>Desde inicio</h1>
    <button @click="openDialog" class="bg-blue-500 text-white px-4 py-2 rounded">Agregar Colegio</button>
    <AddSchoolDialog ref="dialogRef" />
  </div>
</template>

<style scoped>
/* Estilos aquí */
</style>
