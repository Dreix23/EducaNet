<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useAuth } from '@/services/userService.js';
import { collection, query, where, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import AvisosTable from '@/components/AvisosTable.vue';
import AddAvisoDialog from '@/dialogs/AddAvisoDialog.vue';
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
const avisos = ref([]);
const isLoading = ref(false);
const dialogRef = ref(null);

let unsubscribe = null;

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

const fetchAvisos = () => {
  if (!userSchool.value) return;
  isLoading.value = true;
  const collectionPath = `colegios/${userSchool.value}/cursos/${props.curso}/avisos`;
  const q = query(collection(db, collectionPath), where("grupo", "==", props.grupo));

  unsubscribe = onSnapshot(q, (querySnapshot) => {
    avisos.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    isLoading.value = false;
  });
};

const deleteAviso = async (avisoId) => {
  const collectionPath = `colegios/${userSchool.value}/cursos/${props.curso}/avisos`;
  await deleteDoc(doc(db, collectionPath, avisoId));
}

const addAviso = async (avisoData) => {
  const collectionPath = `colegios/${userSchool.value}/cursos/${props.curso}/avisos`;
  const avisoCollectionRef = collection(db, collectionPath);
  const avisoDocRef = doc(avisoCollectionRef);
  await setDoc(avisoDocRef, avisoData);
};

onMounted(() => {
  if (userSchool.value) {
    fetchAvisos();
  }

  watch(() => userSchool.value, (newValue) => {
    if (newValue) {
      fetchAvisos();
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
    Agregar aviso
  </button>
  <AddAvisoDialog ref="dialogRef" :curso="props.curso" :grupo="props.grupo" @addAviso="addAviso"/>
  <AvisosTable :avisos="avisos" :isLoading="isLoading" :curso="props.curso" @deleteAviso="deleteAviso"/>
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
