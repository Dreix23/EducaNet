<script setup>
import { defineProps, computed } from 'vue';
import { CircleCheckBig, OctagonX, CircleAlert } from 'lucide-vue-next';

const props = defineProps({
    Type: {
        type: String,
        default: '', // Valor predeterminado para el ícono
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
</script>

<template>
    <div class="container-target">
        <div class="target-alert flex flex-col items-center justify-center gap-[10px]">
            <div class="icon-alert w-[60px] h-[60px]">
                <CircleCheckBig v-if="Type === 'confirm'" class="w-full h-full text-color-green" />
                <OctagonX v-if="Type === 'alert'" class="w-full h-full text-color-alert" />
                <CircleAlert v-if="Type === 'dialog'" class="w-full h-full text-color-text" />
            </div>
            <div class="info-alert text-center">
                <span v-if="Type === 'confirm'" class="text-color-green font-bold text-size-32">¡{{ TitleAlert
                    }}!.</span>
                <span v-if="Type === 'alert'" class="text-color-alert font-bold text-size-32">¡{{ TitleAlert }}!.</span>
                <span v-if="Type === 'dialog'" class="text-color-text font-bold text-size-32">¡{{ TitleAlert }}!.</span>
                <p class="text-color-text font-bold text-size-18">{{ InfoAlert }}</p>
            </div>
            <div class="action-alert">
                <button v-if="Type === 'confirm'"
                    class="btn-alert bg-color-green hover:bg-green-600 text-color-white transition-colors duration-300 ease-in-out">{{
                        ButonText }}</button>
                <button v-if="Type === 'alert'"
                    class="btn-alert bg-red-600 hover:bg-red-500 text-color-white transition-colors duration-300 ease-in-out">{{
                        ButonText }}</button>
                <div v-if="Type === 'dialog'" class="flex gap-[15px]">
                    <button
                        class="btn-alert bg-color-green hover:bg-green-600 text-color-white transition-colors duration-300 ease-in-out">{{
                            ButonText }}</button>
                    <button
                        class="btn-alert bg-transparent border-[2px] border-color-green hover:bg-color-green text-color-text transition-colors duration-300 ease-in-out">Cancelar</button>
                </div>

            </div>
        </div>
    </div>

</template>

<style scoped>
.btn-alert {
    border-radius: 9px;
    padding: 12px 38px;
}

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
    width: 400px;
}

@media screen and (max-width: 750px) {
    .target-alert {
        width: 300px;
    }
}
</style>