<script setup>
import { ref } from 'vue';
import { CircleCheckBig, OctagonX, CircleAlert, X } from 'lucide-vue-next';

const props = defineProps({
  Type: {
    type: String,
    default: '',
    validator: (value) => ['alert', 'confirm', 'dialog'].includes(value)
  },
  TitleAlert: {
    type: String,
    default: ''
  },
  InfoAlert: {
    type: String,
    default: ''
  },
  ButonText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['confirm', 'cancel', 'close']);

const loading = ref(false);

const handleConfirm = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  emit('confirm');
  loading.value = false;
};

const handleCancel = () => {
  emit('cancel');
};

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative bg-white rounded-3xl shadow-lg w-full max-w-md mx-4">
      <button @click="handleClose"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300">
        <X class="w-6 h-6"/>
      </button>
      <div class="flex flex-col items-center p-8">
        <div class="w-20 h-20 mb-6">
          <CircleCheckBig v-if="Type === 'confirm'" class="w-full h-full text-green-500"/>
          <CircleAlert v-if="Type === 'dialog'" class="w-full h-full text-yellow-500"/>
          <OctagonX v-if="Type === 'alert'" class="w-full h-full text-red-500"/>
        </div>
        <h2 class="text-3xl font-bold mb-2" :class="{
          'text-green-500': Type === 'confirm',
          'text-yellow-500': Type === 'dialog',
          'text-red-500': Type === 'alert'
        }">¡{{ TitleAlert }}!</h2>
        <p class="text-gray-600 text-center mb-8">{{ InfoAlert }}</p>
        <div class="flex justify-center">
          <button v-if="Type === 'confirm'"
                  @click="handleConfirm"
                  :disabled="loading"
                  class="relative inline-flex items-center justify-center py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300">
            <span v-if="!loading">{{ ButonText }}</span>
            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
          <button v-if="Type === 'alert'"
                  @click="handleConfirm"
                  :disabled="loading"
                  class="relative inline-flex items-center justify-center py-3 px-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-300">
            <span v-if="!loading">{{ ButonText }}</span>
            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
          <div v-if="Type === 'dialog'" class="flex gap-4">
            <button
                @click="handleConfirm"
                :disabled="loading"
                class="relative inline-flex items-center justify-center py-3 px-6 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors duration-300">
              <span v-if="!loading">{{ ButonText }}</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
            <button
                @click="handleCancel"
                :disabled="loading"
                class="py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-300">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
