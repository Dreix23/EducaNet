<script setup>
import BaseButton from '@/components/BaseButton.vue';
import DashButton from '@/components/DashButton.vue';
import DashInput from '@/components/DashInput.vue';
import BaseTable from '@/components/BaseTable.vue';
import BaseModal from '@/components/BaseModal.vue';
import { ref } from 'vue';
import { FileUp, CircleChevronLeft } from 'lucide-vue-next';

const columns = ['Código', 'DNI', 'Nombre', 'Dirección', 'Tel-Padre', 'Acción'];
const data = [
    ['123456', '12345678', 'José', 'Jr. Las Delicias', '956585478'],
    ['123456', '12345678', 'José', 'Jr. Las Delicias', '956585478'],
    ['123456', '12345678', 'José', 'Jr. Las Delicias', '956585478'],
    ['123456', '12345678', 'José', 'Jr. Las Delicias', '956585478'],
    ['123456', '12345678', 'José', 'Jr. Las Delicias', '956585478'],
];

const pagination = {
    start: 1,
    end: 5,
    total: 1000,
    hasPrevPage: false,
    hasNextPage: true,
    onPrevPage: () => {
        console.log('Previous page');
    },
    onNextPage: () => {
        console.log('Next page');
    }
};

const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};


</script>

<template>
    <div class="container-button-alumnos flex gap-[15px] justify-between items-center">
        <router-link to="/aulas">
            <DashButton iconType="CircleChevronLeft" buttonText="" class="bg-color-white hover:bg-color-green"/>
        </router-link>
        <span class="text-color-text text-size-32 font-bold">5A</span>
        <DashButton icon-type="CirclePlus" button-text="" class="bg-white hover:bg-color-blue" @click="toggleModal" />
    </div>
    <div class="container-table-alumnos">
        <BaseTable :columns="columns" :data="data" :pagination="pagination" />
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal" title-card="Agregar Alumno">
        <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">

                <DashInput type="text" label="Nombre" placeholder="Nombre" />

                <DashInput type="text" label="Código QR" placeholder="QR" class="col-span-2 sm:col-span-1" />

                <DashInput type="text" label="DNI" placeholder="DNI" class="col-span-2 sm:col-span-1" />

                <DashInput type="text" label="Dirección" placeholder="Dirección" class="col-span-2 sm:col-span-1" />

                <DashInput type="tel" label="Teléfono(Padre)" placeholder="900 505 052"
                    class="col-span-2 sm:col-span-1" />
            </div>
            <BaseButton type="submit" icon-type="" button-text="Agregar Alumno" class="text-size-14" />
        </form>
    </BaseModal>
</template>

<style scoped>
.container-table-alumnos {
    margin-top: 18px;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
    padding: 25px 24px;
}

.container-info-modal {
    background: rgba(64, 64, 64, 0.50);
}
</style>
