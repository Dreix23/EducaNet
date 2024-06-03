<script setup>
import UpdateSchoolDialog from '@/dialogs/UpdateSchoolDialog.vue';
import AddSchoolDialog from '@/dialogs/AddSchoolDialog.vue';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const isDropdownVisible = ref(false);
const dropdownRef = ref(null);

function toggleDropdown() {
    isDropdownVisible.value = !isDropdownVisible.value;
}

function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isDropdownVisible.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const dialogRef = ref(null);

const openDialog = () => {
    if (dialogRef.value) {
        dialogRef.value.openDialog();
    }
};

</script>

<template>
    <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="relative flex justify-end px-4 pt-4" ref="dropdownRef">
            <button @click="toggleDropdown"
                class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button">
                <span class="sr-only">Open dropdown</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 16 3">
                    <path
                        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
            </button>
            <!-- Dropdown menu -->
            <div class="absolute">
                <div v-if="isDropdownVisible"
                    class="right-0 z-10 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <button
                                class="block px-4 py-2 text-size-16 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
                                @click="openDialog">Editar</button>
                        </li>
                        <li>
                            <button
                                class="block text-size-16 px-4 py-2  text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full">Eliminar</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center pb-10">
            <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32.5" cy="32.5" r="32.5" fill="#D9D9D9" />
            </svg>

            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white uppercase">Los Olivos</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">Nombre del Director</span>
            <div class="flex mt-4 md:mt-6">
                <label class="inline-flex items-center cursor-pointer gap-[5px]">
                    <input type="checkbox" value="" class="sr-only peer" checked>
                    <div
                        class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
           
                </label>
            </div>
        </div>
    </div>

    <UpdateSchoolDialog ref="dialogRef" />
</template>

<style scoped>
.absolute {
    position: absolute;
    top: 50px;
    right: -20%;
}
</style>
