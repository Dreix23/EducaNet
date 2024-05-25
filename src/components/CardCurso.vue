<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    TitleCurso: {
        type: String,
        default: 'Curso'
    }
})
</script>

<template>
    <div class="card-curso">
        <div class="card-cabe">
            <h3 class="text-size-18 font-medium">{{ TitleCurso }}</h3>
            <CircleX class="text-color-alert btn-x" />
        </div>
        <div class="card-body mt-[15px]">
            <div class="add-control px-[10px] flex flex-col gap-[6px] items-center">
                <select id="cursos"
                    class="select-grados bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
                    <option>Grado</option>
                    <option>Primero</option>
                    <option>Segundo</option>
                    <option>Tercero</option>
                </select>
                <div
                    class="container-checks items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                    <div class="option-check flex items-center ps-3">
                        <input id="vue-checkbox-list" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="vue-checkbox-list"
                            class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A</label>
                    </div>
                    <div class="option-check flex items-center ps-3">
                        <input id="vue-checkbox-list" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="vue-checkbox-list"
                            class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A</label>
                    </div>
                    <div class="option-check flex items-center ps-3">
                        <input id="vue-checkbox-list" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="vue-checkbox-list"
                            class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A</label>
                    </div>
                    <div class="option-check flex items-center ps-3">
                        <input id="vue-checkbox-list" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="vue-checkbox-list"
                            class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A</label>
                    </div>
                    <div class="option-check flex items-center ps-3">
                        <input id="vue-checkbox-list" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="vue-checkbox-list"
                            class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A</label>
                    </div>
                </div>
            </div>
            <div class="seccion flex flex-col gap-[15px] mt-[15px] items-center px-[10px] md:px-[48px]">
                <h3 class="text-size-18 font-medium">Secciones</h3>
                <div class="container-secciones w-full flex gap-[9px] flex-wrap">
                    <router-link
                        class="section-circle py-[8px] px-[18px] w-[40px] h-[40px] bg-color-gray flex justify-center items-center">
                        <span class="text-color-white text-size-20 font-bold">1A</span>
                    </router-link>
                    <router-link
                        class="section-circle py-[8px] px-[18px] w-[40px] h-[40px] bg-color-gray flex justify-center items-center">
                        <span class="text-color-white text-size-20 font-bold">1A</span>
                    </router-link>
                    <router-link
                        class="section-circle py-[8px] px-[18px] w-[40px] h-[40px] bg-color-gray flex justify-center items-center">
                        <span class="text-color-white text-size-20 font-bold">1A</span>
                    </router-link>
                    <router-link
                        class="section-circle py-[8px] px-[18px] w-[40px] h-[40px] bg-color-gray flex justify-center items-center">
                        <span class="text-color-white text-size-20 font-bold">1A</span>
                    </router-link>
                    <router-link
                        class="section-circle py-[8px] px-[18px] w-[40px] h-[40px] bg-color-gray flex justify-center items-center">
                        <span class="text-color-white text-size-20 font-bold">1A</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>


/* Card */

.card-curso {
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0px 0px 8.8px 0px rgba(0, 0, 0, 0.53);
    width: 300px;
    max-width: 300px;
    padding-bottom: 15px;
}

.card-cabe {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 10px 0 10px;
    position: relative;
}

.btn-x {
    position: absolute;
    right: 10px;
    cursor: pointer;
    transition: .3s transform ease-in-out;
}

.btn-x:hover {
    transform: scale(1.2);
}

.select-grados {
    border-radius: 15px;
    cursor: pointer;
    font-size: 14px;
    width: 132px;
}

.container-checks {
    display: flex;
    flex-wrap: wrap;
    border-collapse: collapse;
    padding: 5px;
    max-width: 250px;
}

@media screen and (max-width: 750px) {
    .select-cursos {
        width: auto;
    }

    .card-curso {
        width: auto;
        max-width: none;
    }

    .container-checks {
        width: auto;
        max-width: none;
    }
}

.option-check {
    flex: 1;
    max-width: 69.5px;
}

.section-circle {
    border-radius: 100%;
    transition: .3s box-shadow ease-in-out;
}
</style>