<script setup>
import { ref } from 'vue';

const selectedDate = ref('');
const today = new Date().toISOString().split('T')[0];

const handleSave = () => {
    // Lógica para guardar la fecha seleccionada
};
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="" style="height: 700px;">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="p-4">
                            Presente
                        </th>
                        <th scope="col" class="p-4">
                            Justificado
                        </th>
                        <th scope="col" class="p-4">
                            Falta
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ALCANTARA MARTIN ALEXA MAYRANY
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-1" type="radio" name="attendance-1"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-1" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-1" type="radio" name="attendance-1"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-1" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-1" type="radio" name="attendance-1"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-1" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <!-- Repite las filas según sea necesario -->
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ALCANTARA MARTIN ALEXA MAYRANY
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ALCANTARA MARTIN ALEXA MAYRANY
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ALCANTARA MARTIN ALEXA MAYRANY
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Mario de las casas
                        </th>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-presente-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-presente-2" class="sr-only">Presente</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-justificado-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-justificado-2" class="sr-only">Justificado</label>
                            </div>
                        </td>
                        <td class="w-4 p-2">
                            <div class="flex items-center">
                                <input id="radio-falta-2" type="radio" name="attendance-2"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="radio-falta-2" class="sr-only">Falta</label>
                            </div>
                        </td>
                    </tr>
                    <!-- Agrega más filas aquí si es necesario -->
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.max-h-screen {
    height: 700px;
    overflow-y: auto;
}
</style>
