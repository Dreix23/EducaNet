<script setup>
import { ref } from 'vue';
import BtnExcelProf from '@/components/BtnExcelProf.vue';
import { CirclePlus } from 'lucide-vue-next';
import AddProfesorDialog from '@/dialogs/AddProfesorDialog.vue'
import ProfTable from '@/components/ProfTable.vue';
import Alert from '@/components/Alert.vue';


const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};

//Datos ficticios para el ejemplo
const profesores = [
    {
        num: 1,
        año: 2020,
        nombre: 'Alberto Perez',
        materia: 'Matemáticas'
    },
];

const pagination = ref({
    start: 1,
    end: 10,
    total: 0,
    hasPrevPage: false,
    hasNextPage: true,
    onPrevPage: () => {
        if (pagination.value.start > 1) {
            pagination.value.start -= 10;
            pagination.value.end -= 10;
            fetchAlumnos();
        }
    },
    onNextPage: () => {
        if (pagination.value.end < pagination.value.total) {
            pagination.value.start += 10;
            pagination.value.end += 10;
            fetchAlumnos();
        }
    }
});

</script>

<template>
    <!-- <Alert Type="confirm" TitleAlert="Hola" InfoAlert="Mejor que nadie" ButonText="Confirmar" /> -->
    <div class="container-button-alumnos flex gap-[15px]">
        <BtnExcelProf iconType="FileUp" buttonText="Cargar Excel" class="bg-color-white hover:bg-color-green" />
        <button @click="toggleModal"
            class="py-[13px] px-[21px] flex justify-center items-center gap-[5px] text-size-16 font-semibold bg-color-white hover:bg-color-green  text-color-text hover:text-color-white rounded-[12px] dashbutton">
            <CirclePlus />
        </button>
    </div>
    <AddProfesorDialog :modalActive="modalActive" @close-modal="toggleModal" title-card="Agregar Profesor" />
    <div class="container-table-alumnos">
        <ProfTable :columns="colum" :data="profesores" :pagination="pagination" />
    </div>
</template>

<style scoped>
.container-table-alumnos {
    margin-top: 18px;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
    padding: 25px 24px;
}

.dashbutton {
    transition: .3s all ease-in-out;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.container-info-modal {
    background: rgba(64, 64, 64, 0.50);
}
</style>