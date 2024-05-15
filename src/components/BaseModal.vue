<script setup>

defineEmits(["close-modal"]);
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    },
    titleCard: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive"
                class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-50" >
                <Transition name="modal-inner">
                    <div v-if="modalActive"
                        class="p-4 self-start mt-32 max-w-screen-md relative bg-white rounded-[20px] shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div
                            class="flex items-center justify-between p-3 md:p-2 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                {{ titleCard }}
                            </h3>
                            <button type="button" @click="$emit('close-modal')"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Form -->
                        <slot />
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>



<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>