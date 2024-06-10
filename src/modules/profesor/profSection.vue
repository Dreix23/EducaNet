<script setup>
import { ref } from 'vue';
import DashButton from '@/components/DashButton.vue';
import {CircleChevronLeft} from 'lucide-vue-next';

const props = defineProps({
  grupo: {
    type: String,
    required: true
  }
});

const activeTab = ref();

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="">
    <div class=" border-b border-gray-200 dark:border-gray-700 mt-[20px] flex justify-between items-center">
      <div class="option flex gap-[15px] items-center">
        <router-link to="/ProfeIncio">
          <button class="px-[10px] py-[10px] hover:bg-white rounded-[10px] transition-colors duration-300 ease-in-out"><CircleChevronLeft/></button>
        </router-link>
        <h2 class="text-size-18 font-bold">Sección {{ props.grupo }}</h2>
      </div>
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center justify-end" id="default-tab" role="tablist">
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
          <router-link :to="{ name: 'section.asistencia', params: { grupo: props.grupo } }"
            @click="setActiveTab('asistencias')"
            :class="['inline-block p-4 border-b-2 rounded-t-lg', activeTab === 'asistencias' ? 'border-blue-500 font-bold text-blue-500 text-size-18 bg-white' : 'hover:text-gray-600 hover:border-gray-300 font-bold  text-size-18 hover:bg-white transition-colors duration-300 ease-in-out']"
            id="asistencias-tab" type="button" role="tab" aria-controls="asistencias"
            :aria-selected="activeTab === 'asistencias'">Asistencias</router-link>
        </li>
      </ul>
    </div>
  </div>

  <div class="bg-color-white p-5 container-actiones">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container-actiones{
  border-radius: 0 0 10px 10px;
}
.inline-block {
  transition: color 0.3s, border-color 0.3s;
}
</style>
