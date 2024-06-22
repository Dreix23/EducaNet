<!-- src/components/CardCole.vue -->
<script setup>
import { defineProps } from 'vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { MoreVertical, School, Edit, Trash2 } from 'lucide-vue-next';
import SchoolDialog from '@/dialogs/SchoolDialog.vue';

const props = defineProps({
  school: {
    type: Object,
    required: true,
  },
});

const isDropdownVisible = ref(false);
const dropdownRef = ref(null);
const dialogRef = ref(null);

function toggleDropdown() {
  isDropdownVisible.value = !isDropdownVisible.value;
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownVisible.value = false;
  }
}

function openDialog() {
  if (dialogRef.value) {
    dialogRef.value.openDialog(props.school);
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="w-80 bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="relative flex justify-end px-4 pt-4" ref="dropdownRef">
      <button @click="toggleDropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
        <span class="sr-only">Abrir menú</span>
        <MoreVertical class="w-5 h-5" />
      </button>
      <div v-if="isDropdownVisible" class="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-0" @click="openDialog">
          <Edit class="w-4 h-4 mr-2" /> Editar
        </a>
        <a href="#" class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-1">
          <Trash2 class="w-4 h-4 mr-2" /> Eliminar
        </a>
      </div>
    </div>
    <div class="flex flex-col items-center pb-8">
      <div class="w-20 h-20 mb-3 rounded-full shadow-lg bg-gray-300 flex items-center justify-center text-white">
        <School class="w-10 h-10" />
      </div>
      <h5 class="mb-1 text-lg font-medium text-gray-900 dark:text-white">{{ school.schoolName }}</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ school.name }}</span>
      <div class="flex mt-4 space-x-3 md:mt-6">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" checked>
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  </div>
  <SchoolDialog ref="dialogRef" />
</template>

<style scoped>
</style>
