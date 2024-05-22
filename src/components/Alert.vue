<script setup>
import { defineProps, computed } from 'vue';
import { CircleCheckBig, OctagonX, CircleAlert } from 'lucide-vue-next';
import BaseButton from './BaseButton.vue';

const props = defineProps({
    iconType: {
        type: String,
        default: '', // Valor predeterminado para el ícono
        validator: (value) => ['CircleCheckBig', 'OctagonX', 'CircleAlert'].includes(value)
    },
    TitleText: {
        type: String,
        default: ''
    },
    InfoText: {
        type: String,
        default: ''
    },
    ButonText: {
        type: String,
        default: ''
    }
});
// Función computada que selecciona el componente ícono correcto
const IconComponent = computed(() => {
    const icons = {
        CircleCheckBig: CircleCheckBig,
        OctagonX: OctagonX,
        CircleAlert: CircleAlert
    };
    return icons[props.iconType]; // Retorna FileUp como default si el tipo de ícono no coincide
});
</script>

<template>
    <div class="container-target">
        <div class="target-alert flex flex-col items-center justify-center gap-[10px]">
            <div class="icon-alert w-[60px] h-[60px]">
                <component :is="IconComponent" class="w-full h-full text-color-green" />
            </div>
            <div class="info-alert text-center">
                <span class="text-color-green font-bold text-size-32">¡{{ TitleText }}!.</span>
                <p class="text-color-text font-bold text-size-18">{{ InfoText }}</p>
            </div>
            <div class="action-alert">
                <BaseButton buttonText="{{ ButonText }}" class="bg-color-green hover:bg-green-600" />
            </div>
        </div>
    </div>

</template>

<style scoped>
.container-target {
    position: fixed;
    z-index: 60;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000083;
    top: 0;
    right: 0;

    transition: .3s all ease-in-out;
}

.target-alert {
    background: white;
    padding: 20px 10px;
    width: fit-content;
    border-radius: 20px;
}
</style>