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
    height: 72px;
    width: 100%;
    border-radius: 20px;
    border: .5px solid #757575;
    padding: 24px 20px;
    font-size: 16px;
    font-weight: 400;
}
</style>