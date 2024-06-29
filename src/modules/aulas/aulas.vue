<script setup>
import DashButton from '@/components/DashButton.vue';
import GradoItem from '@/components/GradoItem.vue';
import Alert from '@/components/Alert.vue';
import { ref, computed, onMounted, watch } from 'vue';
import * as XLSX from 'xlsx';
import { doc, setDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { useAuth } from '@/services/userService.js';
import { logInfo, logError, logDebug } from '@/utils/logger.js';

const { userSchool } = useAuth();

const grupos = ref([]);
const showAlert = ref(false);
const alertType = ref('');
const alertTitle = ref('');
const alertInfo = ref('');
const alertButtonText = ref('');

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  logDebug("Archivo seleccionado:", file);

  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      logDebug("Datos del archivo leídos");
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      logDebug("Nombre de la primera hoja:", firstSheetName);

      const gruposData = {};

      const range = XLSX.utils.decode_range(worksheet['!ref']);
      logDebug("Rango de la hoja de cálculo:", range);
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

      logDebug("Datos de los grupos:", gruposData);

      try {
        for (const grupo in gruposData) {
          const alumnos = gruposData[grupo];
          const docData = {};
          alumnos.forEach((alumno, index) => {
            docData[index] = alumno;
          });
          await setDoc(doc(db, `colegios/${userSchool.value}/alumnos/${grupo}`), docData);
        }
        logInfo('Datos cargados exitosamente');

        // Mostrar alerta de éxito
        showAlert.value = true;
        alertType.value = 'confirm';
        alertTitle.value = 'Éxito';
        alertInfo.value = 'Datos cargados exitosamente';
        alertButtonText.value = 'Aceptar';

        localStorage.setItem('gruposData', JSON.stringify(Object.keys(gruposData)));

        fetchGrupos();
      } catch (error) {
        logError('Error al cargar datos:', error);

        // Mostrar alerta de error
        showAlert.value = true;
        alertType.value = 'alert';
        alertTitle.value = 'Error';
        alertInfo.value = 'Ocurrió un error al cargar los datos. Por favor, intenta de nuevo.';
        alertButtonText.value = 'Cerrar';
      }
    } catch (error) {
      logError('Error en el procesamiento del archivo:', error);

      // Mostrar alerta de error
      showAlert.value = true;
      alertType.value = 'alert';
      alertTitle.value = 'Error';
      alertInfo.value = 'Error en el procesamiento del archivo. Por favor, verifica el formato e intenta de nuevo.';
      alertButtonText.value = 'Cerrar';
    }
  };

  reader.readAsArrayBuffer(file);
};

const fetchGrupos = async () => {
  if (!userSchool.value) {
    logDebug('Esperando a que se cargue el nombre de la escuela');
    return;
  }

  const cachedData = localStorage.getItem('gruposData');

  if (cachedData) {
    grupos.value = JSON.parse(cachedData);
  } else {
    try {
      const querySnapshot = await getDocs(collection(db, `colegios/${userSchool.value}/alumnos`));
      grupos.value = querySnapshot.docs.map(doc => doc.id);

      localStorage.setItem('gruposData', JSON.stringify(grupos.value));
    } catch (error) {
      logError('Error al obtener grupos:', error);

      // Mostrar alerta de error
      showAlert.value = true;
      alertType.value = 'alert';
      alertTitle.value = 'Error';
      alertInfo.value = 'Ocurrió un error al obtener los datos de grupos. Por favor, recarga la página.';
      alertButtonText.value = 'Cerrar';
    }
  }
};

const subscribeToGrupos = () => {
  if (!userSchool.value) {
    logDebug('Esperando a que se cargue el nombre de la escuela');
    return;
  }

  const unsubscribe = onSnapshot(collection(db, `colegios/${userSchool.value}/alumnos`), (snapshot) => {
    grupos.value = snapshot.docs.map(doc => doc.id);
    localStorage.setItem('gruposData', JSON.stringify(grupos.value));
  }, (error) => {
    logError('Error en la suscripción a los cambios:', error);
  });

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

const closeAlert = () => {
  showAlert.value = false;
};

watch(userSchool, (newSchool) => {
  if (newSchool) {
    fetchGrupos();
    subscribeToGrupos();
  }
});

onMounted(() => {
  if (userSchool.value) {
    fetchGrupos();
    subscribeToGrupos();
  }
});
</script>

<template>
  <div class="container-button-alumnos flex gap-[15px]">
    <DashButton
        iconType="FileUp"
        buttonText="Cargar Excel"
        class="bg-color-white hover:bg-color-green"
        :isFileInput="true"
        @file-selected="handleFileUpload"
    />
  </div>
  <div class="bg-color-white container-items-grado flex flex-col justify-center items-center gap-[10px]">
    <GradoItem
        v-for="grado in getGradosAndSecciones"
        :key="grado.grade"
        :grade="grado.grade"
        :sections="grado.sections"
    />
  </div>

  <!-- Componente Alert -->
  <Alert
      v-if="showAlert"
      :Type="alertType"
      :TitleAlert="alertTitle"
      :InfoAlert="alertInfo"
      :ButonText="alertButtonText"
      @confirm="closeAlert"
      @cancel="closeAlert"
      @close="closeAlert"
  />
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
