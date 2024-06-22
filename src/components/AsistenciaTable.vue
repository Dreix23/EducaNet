<script setup>
const props = defineProps({
  students: {
    type: Array,
    required: true,
  },
});

const selectAttendance = (student, type) => {
  student.presente = type === 'presente';
  student.retardo = type === 'retardo';
  student.falta = type === 'falta';
  student.justificado = type === 'justificado';
};

const getCheckboxColor = (student, type) => {
  if (student[type]) {
    if (type === 'presente') return 'text-green-600';
    if (type === 'retardo') return 'text-yellow-400';
    if (type === 'falta') return 'text-red-600';
    if (type === 'justificado') return 'text-blue-600';
  }
  return 'text-gray-600';
};
</script>

<template>
  <div class="relative overflow-auto shadow-md sm:rounded-lg">
    <table class="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3 whitespace-nowrap">QR</th>
        <th scope="col" class="px-6 py-3 whitespace-nowrap">Nombre</th>
        <th scope="col" class="p-4 text-center whitespace-nowrap">Presente</th>
        <th scope="col" class="p-4 text-center whitespace-nowrap">Retardo</th>
        <th scope="col" class="p-4 text-center whitespace-nowrap">Falta</th>
        <th scope="col" class="p-4 text-center whitespace-nowrap">Justificado</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in props.students" :key="student.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-6 py-2 whitespace-nowrap">{{ student.id }}</td>
        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ student.name }}
        </th>
        <td class="w-4 p-2 text-center whitespace-nowrap">
          <div class="flex items-center justify-center">
            <input type="checkbox" :checked="student.presente" @change="selectAttendance(student, 'presente')"
                   :class="['w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-700 dark:border-gray-600', getCheckboxColor(student, 'presente')]">
          </div>
        </td>
        <td class="w-4 p-2 text-center whitespace-nowrap">
          <div class="flex items-center justify-center">
            <input type="checkbox" :checked="student.retardo" @change="selectAttendance(student, 'retardo')"
                   :class="['w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-700 dark:border-gray-600', getCheckboxColor(student, 'retardo')]">
          </div>
        </td>
        <td class="w-4 p-2 text-center whitespace-nowrap">
          <div class="flex items-center justify-center">
            <input type="checkbox" :checked="student.falta" @change="selectAttendance(student, 'falta')"
                   :class="['w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-700 dark:border-gray-600', getCheckboxColor(student, 'falta')]">
          </div>
        </td>
        <td class="w-4 p-2 text-center whitespace-nowrap">
          <div class="flex items-center justify-center">
            <input type="checkbox" :checked="student.justificado" @change="selectAttendance(student, 'justificado')"
                   :class="['w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-700 dark:border-gray-600', getCheckboxColor(student, 'justificado')]">
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>
