<!-- src/modules/inicio.vue -->
<script setup>
import { ref } from 'vue';
import AddSchoolDialog from '@/dialogs/AddSchoolDialog.vue';
import CardCole from '@/components/CardCole.vue'

const dialogRef = ref(null);

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

const segun = false;
</script>

<template>
  <div v-if="segun === false">
    <div class="flex justify-between items-center">
      <h1 class="title">Colegios</h1>
      <button @click="openDialog" class="bg-blue-500 text-white text-size-16 px-[23px] py-[13px] rounded-[12px]">Agregar
        Colegio</button>
      <AddSchoolDialog ref="dialogRef" />
    </div>
    <div class="container-card">
      <CardCole />
    </div>
  </div>

  <div v-if="segun === true">
    Dede vista profesor
  </div>

</template>

<style scoped>
.title {
  color: #202224;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.container-card {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
