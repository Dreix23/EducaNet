<script setup>
import { defineProps, computed } from 'vue';
import { Sheet, FileUp, CirclePlus, CircleChevronLeft, LogIn, Plus } from 'lucide-vue-next';
const props = defineProps({
    iconType: {
        type: String,
        default: '', // Valor predeterminado para el ícono
        validator: (value) => ['Sheet', 'FileUp', 'CirclePlus', 'CircleChevronLeft', 'LogIn', 'Plus'].includes(value)
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
        CircleChevronLeft: CircleChevronLeft,
        LogIn: LogIn,
        Plus: Plus,
    };
    return icons[props.iconType]; // Retorna FileUp como default si el tipo de ícono no coincide
});
</script>

<template>
    <button
        class="text-white inline-flex items-center bg-color-primary hover:bg-color-educanet transition-colors duration-300 ease-in-out py-[12.8px] px-[45px] rounded-[9px]">
        <component :is="IconComponent" />
        {{ buttonText }}
    </button>
</template>

<style scoped></style>
