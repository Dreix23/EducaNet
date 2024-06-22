<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useAuth } from '@/services/userService.js';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import TareasTable from '@/components/TareasTable.vue';
import AddTareaDialog from '@/dialogs/AddTareaDialog.vue';
import { CirclePlus } from 'lucide-vue-next';

const props = defineProps({
  curso: {
    type: String,
    required: true
  },
  grupo: {
    type: String,
    required: true
  }
});

const { userSchool } = useAuth();
const tareas = ref([]);
const isLoading = ref(false);
const dialogRef = ref(null);

let unsubscribe = null;

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

const fetchTareas = () => {
  if (!userSchool.value) return;
  isLoading.value = true;
  const collectionPath = `colegios/${userSchool.value}/cursos/${props.curso}/tareas`;
  const q = query(collection(db, collectionPath), where("grupo", "==", props.grupo));

  unsubscribe = onSnapshot(q, (querySnapshot) => {
    tareas.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    isLoading.value = false;
  });
};

const deleteTarea = async (tareaId) => {
  const collectionPath = `colegios/${userSchool.value}/cursos/${props.curso}/tareas`;
  await deleteDoc(doc(db, collectionPath, tareaId));
}

onMounted(() => {
  if (userSchool.value) {
    fetchTareas();
  }

  watch(() => userSchool.value, (newValue) => {
    if (newValue) {
      fetchTareas();
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<template>
  <button class="btn-add flex gap-[10px] items-center" @click="openDialog">
    <CirclePlus/>
    Agregar tarea
  </button>
  <AddTareaDialog ref="dialogRef" :curso="props.curso" :grupo="props.grupo"/>
  <TareasTable :tareas="tareas" :isLoading="isLoading" :curso="props.curso" @deleteTarea="deleteTarea"/>
</template>

<style scoped>
.btn-add {
  padding: 12px 32px;
  background: #2D60FF;
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 12px;
  transition: .3s all ease-in-out;
  font-weight: 600;
}

.btn-add:hover {
  background: #1814F3;
  color: #fff;
}
</style>
