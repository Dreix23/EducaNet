<script setup>
import { defineProps, computed } from 'vue';
import { Sheet, FileUp, CirclePlus, CircleChevronLeft, Type } from 'lucide-vue-next';

const props = defineProps({
  iconType: {
    type: String,
    default: 'FileUp', // Valor predeterminado para el ícono
    validator: (value) => ['Sheet', 'FileUp', 'CirclePlus', 'CircleChevronLeft'].includes(value)
  },
  buttonText: {
    type: String,
    default: 'Cargar Excel'
  }
});

// Función computada que selecciona el componente ícono correcto
const IconComponent = computed(() => {
  const icons = {
    Sheet: Sheet,
    FileUp: FileUp,
    CirclePlus: CirclePlus,
    CircleChevronLeft: CircleChevronLeft
  };
  return icons[props.iconType] || FileUp; // Retorna FileUp como default si el tipo de ícono no coincide
});
</script>

<template>
  <button 
    class="py-[13px] px-[21px] flex justify-center items-center gap-[5px] text-size-16 font-semibold text-color-text hover:text-color-white rounded-[12px] dashbutton ">
    <component :is="IconComponent" />
    {{ buttonText }}
  </button>
</template>

<style scoped>
.dashbutton {
  transition: .3s all ease-in-out;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
