<script setup>
defineProps({
    type: {
        type: String,
        default: 'text', //Por defecto el input será de tipo texto
        validator: value => ['email', 'text', 'password', 'tel'].includes(value) //Validación: solo  input tipo email, text y pass
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: ''
    }
});
</script>
<template>
    <div class="col-span-2">
        <label for="name" class="block mb-2 text-sm text-size-14 text-gray-900 dark:text-white">{{ label }}</label>
        <input :type="type" name="name" id="name"
            class="input text-color-text bg-color-white focus:bg-gray-50 transition-colors duration-300 ease-in-out"
            :placeholder="placeholder" required="">
    </div>
</template>
<style>
.input {
    border-radius: 10px;
    border: 1px solid #DFEAF2;
    height: 46.551px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>