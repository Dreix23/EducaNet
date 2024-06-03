<script setup>
defineProps({
    type: {
        type: String,
        default: 'text', //Por defecto el input será de tipo texto
        validator: value => ['email', 'text', 'password'].includes(value) //Validación: solo  input tipo email, text y pass
    }
});
</script>
<template>
    <input class="input" :type="type">
</template>
<style>
.input {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #DFEAF2;
    height: 46.551px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>