<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  grade: {
    type: Number,
    required: true
  },
  sections: {
    type: Array,
    required: true
  }
});

const formattedGrade = computed(() => `${props.grade}°`);

const handleSectionClick = (grade, section) => {
  localStorage.setItem('selectedGrade', grade);
  localStorage.setItem('selectedSection', section);
};
</script>

<template>
  <div class="card-section flex h-auto w-[100%] py-[16px] px-[24px] border border-gray-200">
    <div
        class="grade flex-[0.6] flex items-center border-r-[2px] max-[750px]:border-r-0 max-[750px]:border-b-[2px] max-[750px]:w-full max-[750px]:justify-center">
      <h1 class="text-color-educanet text-size-64 font-bold mr-2">{{ formattedGrade }}</h1>
    </div>
    <div class="line"></div>
    <div class="sections flex-[7] pl-[27px] flex items-center gap-[15px] flex-wrap">
      <RouterLink
          v-for="(section, index) in sections"
          :key="index"
          :to="`/seccion`"
          class="section-circle py-[8px] px-[18px] w-[60px] h-[60px] bg-color-gray flex justify-center items-center"
          @click="handleSectionClick(props.grade, section)">
        <span class="text-color-white text-size-32 font-bold">{{ section }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.card-section {
  border-radius: 14px;
  background: #FFF;
  transition: .3s box-shadow ease-in-out, .3s border ease-in-out;
  position: relative;
}

.card-section:hover {
  box-shadow: 6px 6px 35px 0px rgba(0, 0, 0, 0.20);
}

.section-circle {
  border-radius: 100%;
  transition: .3s box-shadow ease-in-out;
}

.section-circle:hover {
  box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 750px) {
  .card-section {
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .grade h1 {
    font-size: 50px;
    margin: 0;
  }

  .sections {
    flex-wrap: wrap;
    padding: 0;
    justify-content: center;
    gap: 10px;
  }

  .section-circle {
    width: 45px;
    height: 45px;

    span {
      font-size: 28px;
    }
  }
}
</style>
