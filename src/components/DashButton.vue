<script setup>
import {defineProps, computed, ref} from 'vue';
import {Sheet, FileUp, CirclePlus, CircleChevronLeft} from 'lucide-vue-next';
import {logDebug} from '@/utils/logger.js';

const props = defineProps({
  iconType: {
    type: String,
    default: 'FileUp',
    validator: (value) => ['Sheet', 'FileUp', 'CirclePlus', 'CircleChevronLeft'].includes(value)
  },
  buttonText: {
    type: String,
    default: 'Cargar Excel'
  },
  isFileInput: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click', 'file-selected']);

const IconComponent = computed(() => {
  const icons = {
    Sheet, FileUp, CirclePlus, CircleChevronLeft
  };
  return icons[props.iconType] || FileUp;
});

const fileInput = ref(null);

const handleClick = () => {
  logDebug('DashButton clicked');
  if (props.isFileInput) {
    fileInput.value.click();
  } else {
    emit('click');
  }
};

const handleFileChange = (event) => {
  logDebug('File selected in DashButton');
  emit('file-selected', event);
};
</script>

<template>
  <button
      class="py-[13px] px-[21px] flex justify-center items-center gap-[5px] text-size-16 font-semibold text-color-text hover:text-color-white rounded-[12px] dashbutton"
      @click="handleClick"
  >
    <component :is="IconComponent"/>
    {{ buttonText }}
    <input
        v-if="isFileInput"
        type="file"
        @change="handleFileChange"
        accept=".xlsx,.xls"
        style="display: none;"
        ref="fileInput"
    />
  </button>
</template>

<style scoped>
.dashbutton {
  transition: .3s all ease-in-out;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
