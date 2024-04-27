<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

import logoSrc from '@/assets/login/logo.png';
import backgroundSrc from '@/assets/login/right-bg.png';
import grupoAlu from '@/assets/login/grupoAlu.png';

</script>
<template>
  <div class="container-login">
    <div class="container-presentation">
      <div class="presentation-logo">
        <img :src="logoSrc" alt="Logo de educanet" class="img-logo">
        <p><span>educa</span>net</p>
      </div>
      <div class="presentation-alumnos">
        <img :src="grupoAlu" alt="Foto Alumnos">
      </div>
      <div class="presentation-info">
        <h1>Sistema integral de gestión estudiantil</h1>
        <p>Plataforma integral para el registro de asistencias, evaluación académica y coordinación de reuniones
          estudiantiles.</p>
      </div>
    </div>
    <div class="container-info-login">
      <div class="container-singIng">
        <p>¿No eres miembro todavía?</p><a href="#">únete ahora</a>
      </div>
      <div class="container-form">
        <div class="form-title">
          <h2>Bienvenido a Educanet</h2>
          <p>Inicia sesión para continuar</p>
        </div>
        <form action="" class="form-login">
          <BaseInput type="email" placeholder="Email" name="user" />
          <BaseInput type="password" placeholder="Contraseña" name="password" />
          <BaseButton />
        </form>
        <a href="#">¿Tienes problemas con su contraseña?</a>
      </div>
      <div class="container-derechos">
        <p>Copyright 2024 EducaNet. Todos los derechos reservados</p>
        <div class="ineed">
          <i class="fa-solid fa-info"></i>
          <a href="#">¿Necesitas ayuda?</a>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
.container-login {
  background: #F9F9FA;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: .4fr 1fr;
}


.container-presentation {
  width: 471px;
  background-color: #1544F0;
  background-repeat: no-repeat;
  background-size: contain;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}


/* LOGO */
.presentation-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

.presentation-logo img {
  width: 51.35px;
  height: 53.03px;
}

.presentation-logo p {
  font-weight: 400;
  font-size: 40px;
  line-height: 28.16px;
  align-items: center;
  text-transform: uppercase;
  color: var(--white);
}

.presentation-logo p span {
  font-weight: 700;
}

/* ALUMNOS */
.presentation-alumnos {
  position: relative;
  /* height: 388px; */
  width: 100%;
  margin-bottom: 19px;
}

.presentation-alumnos img {
  width: 100%;
}

.presentation-alumnos .img-alu {
  position: absolute;
  top: -10px;
  right: 10%;
}

.presentation-alumnos .img-hand {
  width: 100%;
  position: absolute;
  bottom: 0;
}

/* INFO */
.presentation-info {
  display: flex;
  flex-direction: column;
  align-items: center
}

.presentation-info h1 {
  font-size: 39px;
  font-weight: 800;
  line-height: 47px;
  text-align: center;
  color: var(--white);
  margin-bottom: 16px;
}

.presentation-info p {
  color: var(--white);
  font-size: 16px;
  font-weight: 400;
  line-height: 28.2px;
  text-align: center;
  width: 388px;
}

/* LOGIN*/

.container-info-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 41px 65px 48px 65px;
}

/* info-login */
.container-singIng {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.container-singIng p {
  font-size: 12.8px;
  color: #424242;
}

.container-singIng a {
  font-size: 12.8px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: underline;
}

.container-derechos {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.container-derechos p {
  color: #9E9E9E;
  font-size: 12.8px;
}

.container-derechos .ineed {
  display: flex;
  align-items: center;
  gap: 10px;
}

.container-derechos .ineed a {
  font-size: 12.8px;
  color: #424242;
}

.container-derechos .ineed i {
  color: #9E9E9E;
}

/* FORM */
.container-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 39px;
  min-width: 420px;
}

.form-title h2 {
  font-size: 25px;
  line-height: 44px;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 12px;
}

.form-title p {
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 28.2px;
  text-align: center;
}

.form-login {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}
</style>