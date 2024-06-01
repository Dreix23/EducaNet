<script setup>
import { ref, watch, computed } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

const emit = defineEmits(['closeModal', 'guardarProfesor']);

const props = defineProps({
  modalActive: {
    type: Boolean,
    required: true
  },
  profesorSeleccionado: {
    type: Object,
    required: false,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const showPassword = ref(false);
const tempCod = ref('');
const tempNombre = ref('');
const tempCorreo = ref('');
const password = ref('');
const loading = ref(false);

watch(() => props.profesorSeleccionado, (newProfesor) => {
  tempCod.value = newProfesor.cod || '';
  tempNombre.value = newProfesor.nombre || '';
  tempCorreo.value = newProfesor.correo || '';
  password.value = '';  // Siempre vacío para ocultar
});

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const closeModal = () => {
  emit('closeModal');
};

const guardarProfesor = () => {
  loading.value = true;

  setTimeout(() => {
    const profesorGuardado = {
      cod: tempCod.value,
      nombre: tempNombre.value,
      correo: tempCorreo.value,
      password: password.value
    };
    emit('guardarProfesor', profesorGuardado);
    loading.value = false;
    closeModal();
  }, 1000);
};

// Propiedades computadas para el título del diálogo y el estilo del botón
const dialogTitle = computed(() => props.isEditing ? 'Editar Profesor' : 'Agregar Profesor');
const buttonStyle = computed(() => props.isEditing ? 'bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out' : 'bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out');
const buttonText = computed(() => props.isEditing ? 'Guardar Cambios' : 'Agregar Profesor');
</script>

<template>
  <transition name="fade" appear>
    <div v-if="modalActive" class="fixed inset-0 flex items-center justify-center z-50 ">
      <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="bg-white rounded-[20px] shadow-lg w-11/12 md:w-1/2 lg:w-1/3 z-10 p-[16px]">
        <div class="flex justify-between items-center p-[8px] border-b">
          <h2 class="text-lg font-semibold text-gray-900">{{ dialogTitle }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="guardarProfesor">
            <div class="grid gap-6 mb-6">
              <div class="grid grid-cols-3 gap-4 items-center">
                <label for="cod" class="text-sm text-gray-900">Código</label>
                <input v-model="tempCod" type="text" id="cod" placeholder="Código"
                  class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              </div>
              <div class="grid grid-cols-3 gap-4 items-center">
                <label for="nombre" class="text-sm text-gray-900">Nombre</label>
                <input v-model="tempNombre" type="text" id="nombre" placeholder="Nombre"
                  class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              </div>
              <div class="grid grid-cols-3 gap-4 items-center">
                <label for="correo" class="text-sm text-gray-900">Correo</label>
                <input v-model="tempCorreo" type="email" id="correo" placeholder="Correo"
                  class="col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  :readonly="props.isEditing">
              </div>
              <div class="grid grid-cols-3 gap-4 items-center" v-if="!props.isEditing">
                <label for="password" class="text-sm text-gray-900">Contraseña</label>
                <div class="col-span-2 relative">
                  <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Contraseña"
                    class="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <button type="button" @click="toggleShowPassword"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Eye v-if="!showPassword" />
                    <EyeOff v-else />
                  </button>
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-6">
              <button type="submit" :class="[buttonStyle, 'text-white px-6 py-2 rounded-lg transition duration-200']"
                :disabled="loading">
                <span v-if="!loading">{{ buttonText }}</span>
                <span v-else>
                  <svg class="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Guardando...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
