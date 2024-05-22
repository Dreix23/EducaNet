<script setup>
import DashButton from '@/components/DashButton.vue';
import GradoItem from '@/components/GradoItem.vue';
import { ref, computed, onMounted } from 'vue';
import * as XLSX from 'xlsx';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';

const grupos = ref([]);

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const gruposData = {};

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      const grupo = worksheet[XLSX.utils.encode_cell({ c: 2, r: R })]?.v || 'Grupo desconocido';
      if (!gruposData[grupo]) {
        gruposData[grupo] = [];
      }

      const alumno = {
        NOM_ALUMNO: worksheet[XLSX.utils.encode_cell({ c: 1, r: R })]?.v || 'Nombre desconocido',
        TURNO: worksheet[XLSX.utils.encode_cell({ c: 3, r: R })]?.v || 'Turno desconocido',
        QR: worksheet[XLSX.utils.encode_cell({ c: 4, r: R })]?.v || 'QR desconocido'
      };

      gruposData[grupo].push(alumno);
    }

    try {
      for (const grupo in gruposData) {
        const alumnos = gruposData[grupo];
        const docData = {};
        alumnos.forEach((alumno, index) => {
          docData[index] = alumno;
        });
        await setDoc(doc(db, 'alumnos', grupo), docData);
      }
      alert('Datos cargados exitosamente');

      // Actualizar los datos en el local storage después de cargarlos en Firestore
      localStorage.setItem('gruposData', JSON.stringify(Object.keys(gruposData)));

      fetchGrupos();
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Ocurrió un error al cargar los datos. Por favor, intenta de nuevo.');
    }
  };

  reader.readAsArrayBuffer(file);
};

const fetchGrupos = async () => {
  // Verificar si los datos existen en el local storage
  const cachedData = localStorage.getItem('gruposData');

  if (cachedData) {
    // Si los datos existen en caché, usarlos
    grupos.value = JSON.parse(cachedData);
  } else {
    // Si no existen en caché, obtenerlos de Firestore
    try {
      const querySnapshot = await getDocs(collection(db, 'alumnos'));
      grupos.value = querySnapshot.docs.map(doc => doc.id);

      // Guardar los datos en el local storage
      localStorage.setItem('gruposData', JSON.stringify(grupos.value));
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      alert('Ocurrió un error al obtener los datos de grupos. Por favor, recarga la página.');
    }
  }
};

// Nueva función para suscribirse a los cambios en Firestore
const subscribeToGrupos = () => {
  const unsubscribe = onSnapshot(collection(db, 'alumnos'), (snapshot) => {
    grupos.value = snapshot.docs.map(doc => doc.id);

    // Actualizar el almacenamiento local cuando los datos cambian
    localStorage.setItem('gruposData', JSON.stringify(grupos.value));
  }, (error) => {
    console.error('Error en la suscripción a los cambios:', error);
  });

  // Retornar la función de desuscripción para usarla si es necesario
  return unsubscribe;
};

const getGradosAndSecciones = computed(() => {
  const grados = {};

  grupos.value.forEach(grupo => {
    const [grade, section] = grupo.split(/(?=[A-Za-z])/);
    if (!grados[grade]) {
      grados[grade] = new Set();
    }
    grados[grade].add(section);
  });

  return Object.keys(grados).map(grade => ({
    grade: parseInt(grade),
    sections: Array.from(grados[grade])
  }));
});

onMounted(() => {
  fetchGrupos();
  subscribeToGrupos(); // Suscribirse a los cambios en tiempo real
});
</script>

<template>
  <div class="container-button-alumnos flex gap-[15px]">
    <DashButton
        iconType="FileUp"
        buttonText="Cargar Excel"
        class="bg-color-white hover:bg-color-green"
        @file-selected="handleFileUpload"
    >
    </DashButton>
  </div>
  <div class="bg-color-white container-items-grado flex flex-col justify-center items-center gap-[10px]">
    <GradoItem
        v-for="grado in getGradosAndSecciones"
        :key="grado.grade"
        :grade="grado.grade"
        :sections="grado.sections"
    />
  </div>
</template>

<style scoped>
.container-items-grado {
  margin-top: 18px;
  border-radius: 14px;
  background: #FFF;
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  padding: 25px 24px;
}

@media screen and (max-width: 750px) {
  .container-button-alumnos {
    justify-content: center;
  }
}
</style>
