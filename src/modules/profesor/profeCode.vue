<script setup>
import DashButton from '@/components/DashButton.vue';
import CardCurso from '@/components/CardCurso.vue';
import { CirclePlus, CircleX } from 'lucide-vue-next';


import Alert from '@/components/Alert.vue';
</script>

<template>

    <!-- <Alert  Type="alert" TitleText="Hola" InfoText="Como" ButonText="Ok" /> -->

    <div class="container-button-alumnos flex gap-[15px] justify-between items-center">
        <router-link to="/profesores">
            <DashButton iconType="CircleChevronLeft" buttonText="" class="bg-color-white hover:bg-color-primary" />
        </router-link>

        <button
            class="py-[13px] px-[21px] rounded-[9px] bg-color-primary hover:bg-color-blue transition-colors duration-300 ease-in-out text-color-white">
            <span>Guardar</span>
        </button>
    </div>

    <div class="container-info-prof flex flex-col justify-center items-center">
        <div class="prof-cabe flex flex-col items-center w-full">
            <img class="w-[60px] h-[60px] rounded-full img-prof"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
            <h1 class="title-nom">Roberto Fernando Villafuerte Solis</h1>
            <p class="text-color-text">Matemática</p>
        </div>

        <div class="prof-body">

            <div class="flex flex-col justify-end items-center gap-[17px]">
                <h2 class="text-size-20 font-bold">Agregar Curso</h2>
                <form class="max-w-sm mx-auto flex gap-[20px]">
                    <select id="cursos"
                        class="select-cursos bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
                        <option>Matemática</option>
                        <option>Historia</option>
                        <option>Ciencia</option>
                        <option>Comunicación</option>
                    </select>
                    <button type="submit">
                        <CirclePlus
                            class="w-[30px] h-[30px] hover:scale-125 transition-transform duration-300 ease-in-out" />
                    </button>
                </form>
            </div>

            <div class="flex flex-col justify-end items-center gap-[17px] mt-[29px]">
                <h2 class="text-size-20 font-bold">Cursos</h2>
                <div class="container-cards-cursos flex flex-wrap gap-[26px] justify-center items-center">
                    <CardCurso TitleCurso="Comunicación" />
                    <CardCurso TitleCurso="Matemática" />
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped>
.prof-body {
    padding: 25px 24px;
    width: 100%;
}

.container-info-prof {
    margin-top: 18px;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
    /* padding: 25px 24px; */
    padding: 0 0 25px 0;
}

.select-cursos {
    width: 306.136px;
    height: 40px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;
}


.prof-cabe {
    border-radius: 14px 14px 0px 0px;
    padding: 34px 10px 8px 10px;
    background: #D9D9D9;
    position: relative;
}

.img-prof {
    position: absolute;
    top: -30px;
}

.title-nom {
    text-wrap: wrap;
    text-align: center;
    color: #202224;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
}

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