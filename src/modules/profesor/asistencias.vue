<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import AsistenciaTable from '@/components/AsistenciaTable.vue';
import moment from 'moment';
import { Loader2 } from 'lucide-vue-next';
import { logInfo, logError } from '@/utils/logger.js';

const props = defineProps({
  grupo: String,
  curso: String
});

const route = useRoute();
const selectedDate = ref(moment().format('YYYY-MM-DD'));
const currentUser = ref(null);
const userSchool = ref(null);
const userTurno = ref(null);
const students = ref([]);
const isSaving = ref(false);

const loadAttendanceData = () => {
  const group = props.grupo;
  const curso = props.curso;

  if (group && curso && userSchool.value && userTurno.value) {
    const studentsDocRef = doc(db, `colegios/${userSchool.value}/alumnos`, group);

    onSnapshot(studentsDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const studentsData = snapshot.data();
        if (typeof studentsData === 'object' && !Array.isArray(studentsData)) {
          students.value = Object.entries(studentsData)
              .filter(([, student]) => student.TURNO === userTurno.value)
              .map(([id, student]) => ({
                id: student.QR,
                name: student.NOM_ALUMNO,
                presente: false,
                retardo: false,
                falta: false,
                justificado: false,
              }));
          logInfo('Datos de estudiantes cargados:', students.value);

          // Guardar en localStorage
          localStorage.setItem(`students_${group}_${curso}`, JSON.stringify(students.value));
        }
      }
    });

    const attendanceDocRef = doc(db, `colegios/${userSchool.value}/cursos/${curso}/asistencias`, selectedDate.value);
    onSnapshot(attendanceDocRef, (attendanceDocSnap) => {
      if (attendanceDocSnap.exists()) {
        const attendanceData = attendanceDocSnap.data();
        logInfo('Datos de asistencia cargados desde Firebase:', attendanceData);
        students.value.forEach((student) => {
          if (attendanceData[student.id]) {
            student.presente = attendanceData[student.id].presente;
            student.retardo = attendanceData[student.id].retardo;
            student.falta = attendanceData[student.id].falta;
            student.justificado = attendanceData[student.id].justificado;
          }
        });
        // Guardar en localStorage
        localStorage.setItem(`attendance_${group}_${curso}_${selectedDate.value}`, JSON.stringify(attendanceData));
      } else {
        logInfo('No se encontraron datos de asistencia para la fecha seleccionada');
      }
    });
  }
};

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user;
      const uid = user.uid;

      try {
        const userDocRef = doc(db, 'users', uid);
        onSnapshot(userDocRef, (userDocSnap) => {
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            userSchool.value = userData.school;
            userTurno.value = userData.turno;

            // Intentar cargar datos desde localStorage
            const cachedStudents = localStorage.getItem(`students_${props.grupo}_${props.curso}`);
            if (cachedStudents) {
              students.value = JSON.parse(cachedStudents);
              logInfo('Datos de estudiantes cargados desde localStorage');
            }

            const cachedAttendance = localStorage.getItem(`attendance_${props.grupo}_${props.curso}_${selectedDate.value}`);
            if (cachedAttendance) {
              const attendanceData = JSON.parse(cachedAttendance);
              students.value.forEach((student) => {
                if (attendanceData[student.id]) {
                  student.presente = attendanceData[student.id].presente;
                  student.retardo = attendanceData[student.id].retardo;
                  student.falta = attendanceData[student.id].falta;
                  student.justificado = attendanceData[student.id].justificado;
                }
              });
              logInfo('Datos de asistencia cargados desde localStorage');
            }

            loadAttendanceData();
          }
        });
      } catch (error) {
        logError('Error al obtener los datos del usuario:', error);
      }
    } else {
      currentUser.value = null;
      userSchool.value = null;
      userTurno.value = null;
    }
  });
});

watch(selectedDate, () => {
  loadAttendanceData();
});

const handleSave = async () => {
  const group = props.grupo;
  const curso = props.curso;

  if (group && curso) {
    isSaving.value = true;
    const attendanceData = students.value.reduce((acc, student) => {
      acc[student.id] = {
        presente: student.presente,
        retardo: student.retardo,
        falta: !student.presente && !student.retardo && !student.justificado,
        justificado: student.justificado,
      };
      return acc;
    }, {});

    try {
      const attendanceDocRef = doc(db, `colegios/${userSchool.value}/cursos/${curso}/asistencias`, selectedDate.value);
      const attendanceDocSnap = await getDoc(attendanceDocRef);

      if (attendanceDocSnap.exists()) {
        await updateDoc(attendanceDocRef, attendanceData);
        logInfo('Asistencias actualizadas en Firebase:', attendanceData);
      } else {
        await setDoc(attendanceDocRef, attendanceData);
        logInfo('Documento de asistencia creado y datos guardados en Firebase:', attendanceData);
      }

      // Actualizar localStorage
      localStorage.setItem(`attendance_${group}_${curso}_${selectedDate.value}`, JSON.stringify(attendanceData));
    } catch (error) {
      logError('Error al actualizar las asistencias en Firebase:', error);
    } finally {
      isSaving.value = false;
    }
  }
};
</script>

<template>
  <div>
    <div class="container-btn flex items-center space-x-4">
      <div class="relative max-w-sm">
        <input type="date" v-model="selectedDate"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-size-18 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Seleccionar fecha">
      </div>
      <button @click="handleSave"
              class="btn-add flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              :disabled="isSaving">
        <span v-if="!isSaving">Guardar</span>
        <span v-else class="flex items-center">
          <Loader2 class="animate-spin -ml-1 mr-3 h-5 w-5" />
          Guardando...
        </span>
      </button>
    </div>
    <div class="flex justify-center mt-[15px]">
      <AsistenciaTable :students="students"/>
    </div>
  </div>
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

.container-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

@media screen and (max-width: 750px) {
  .container-btn {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
