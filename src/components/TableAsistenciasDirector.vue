<script setup>
import { ChevronRight, ChevronLeft, ChevronLeftCircle } from 'lucide-vue-next';
</script>
<template>
    <div class="relative overflow-x-auto  sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        #
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Código QR
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Entrada
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Salida
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1
                    </th>
                    <td class="px-6 py-4">
                        Joana San Miguel
                    </td>
                    <td class="px-6 py-4">
                        20201548
                    </td>
                    <td class="px-6 py-4">
                        19-08-2024 08:05am
                    </td>
                    <td class="px-6 py-4">
                        19-08-2024 12:00pm
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation">
            <span
                class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrando
                <span class="font-semibold text-gray-900 dark:text-white"> 1-10</span> de <span
                    class="font-semibold text-gray-900 dark:text-white">37</span></span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="#"
                        class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg'>
                        <ChevronLeft />
                    </a>
                </li>
                <li>
                    <a href="#"
                        class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg'>
                        <ChevronRight />
                    </a>
                </li>
            </ul>
        </nav>
    </div>


</template>
<style scoped></style>