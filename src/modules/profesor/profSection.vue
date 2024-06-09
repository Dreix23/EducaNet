<script setup>
import { ref } from 'vue';
import DashButton from '@/components/DashButton.vue';

const props = defineProps({
  grupo: {
    type: String,
    required: true
  }
});

const activeTab = ref('tarea');

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="flex gap-[20px] flex-wrap justify-between">
    <router-link to="/ProfeIncio">
      <DashButton iconType="CircleChevronLeft" buttonText=""
                  class="bg-white hover:bg-color-primary transition duration-300 ease-in-out" />
    </router-link>

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
        <li class="me-2" role="presentation">
          <router-link :to="{ name: 'section.tarea', params: { grupo: props.grupo } }" @click="setActiveTab('tarea')"
                       :class="['inline-block p-4 border-b-2 rounded-t-lg', activeTab === 'tarea' ? 'border-blue-500 font-bold text-blue-500 text-size-18 bg-white' : 'hover:text-gray-600 hover:border-gray-300 font-bold  hover:bg-white text-size-18 transition-colors duration-300 ease-in-out']"
                       id="tarea-tab" type="button" role="tab" aria-controls="tarea"
                       :aria-selected="activeTab === 'tarea'">Tareas</router-link>
        </li>
        <li class="me-2" role="presentation">
          <router-link :to="{ name: 'section.avisos', params: { grupo: props.grupo } }" @click="setActiveTab('avisos')"
                       :class="['inline-block p-4 border-b-2 rounded-t-lg', activeTab === 'avisos' ? 'border-blue-500 font-bold text-blue-500 text-size-18 bg-white' : 'hover:text-gray-600 hover:border-gray-300  font-bold text-size-18 hover:bg-white transition-colors duration-300 ease-in-out']"
                       id="avisos-tab" type="button" role="tab" aria-controls="avisos"
                       :aria-selected="activeTab === 'avisos'">Avisos</router-link>
        </li>
        <li class="me-2" role="presentation">
          <router-link :to="{ name: 'section.asistencia', params: { grupo: props.grupo } }" @click="setActiveTab('asistencias')"
                       :class="['inline-block p-4 border-b-2 rounded-t-lg', activeTab === 'asistencias' ? 'border-blue-500 font-bold text-blue-500 text-size-18 bg-white' : 'hover:text-gray-600 hover:border-gray-300 font-bold  text-size-18 hover:bg-white transition-colors duration-300 ease-in-out']"
                       id="asistencias-tab" type="button" role="tab" aria-controls="asistencias"
                       :aria-selected="activeTab === 'asistencias'">Asistencias</router-link>
        </li>
      </ul>
    </div>
  </div>

  <div class="bg-color-white p-5 rounded-[10px] mt-[10px]">
    <h2>Sección {{ props.grupo }}</h2>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.inline-block {
  transition: color 0.3s, border-color 0.3s;
}
</style>
