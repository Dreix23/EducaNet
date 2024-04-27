<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { Mail, Lock, Eye, EyeOff } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'vue-router';
import { logInfo, logError, logDebug, enableLogs } from '@/utils/logger.js';
import logoSrc from '@/assets/login/logo.png';
import grupoAlu from '@/assets/login/grupoAlu.png';

const showPassword = ref(false);
const isMobile = ref(false);
const email = ref('');
const password = ref('');
const router = useRouter();

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

function checkScreenWidth() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

function onEmailInput(event) {
  email.value = event.target.value;
  logDebug(`Correo electrónico ingresado: ${email.value}`);
}

function onPasswordInput(event) {
  password.value = event.target.value;
  logDebug(`Contraseña ingresada: ${password.value}`);
}

const login = async () => {
  logInfo('Iniciando proceso de login...');
  logDebug(`Correo electrónico ingresado: ${email.value}`);
  logDebug(`Contraseña ingresada: ${password.value}`);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    logError('El formato del correo electrónico no es válido.');
    return;
  }

  try {
    logInfo('Conectando con Firebase...');
    await signInWithEmailAndPassword(auth, email.value, password.value);
    logInfo('Conexión exitosa con Firebase.');
    logInfo('Login exitoso. Redirigiendo a la página de inicio...');
    router.push('/home');
  } catch (error) {
    console.error('Error de login:', error);
    logError(`Error de login: ${error.message}`);
    logDebug(`Código de error: ${error.code}`);
  }
};
</script>

<template>
  <div class="container-login">
    <div class="container-presentation" v-if="!isMobile">
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
      <div class="container-singIng" v-if="!isMobile">
        <p>No eres miembro todava?</p><a href="#">nete ahora</a>
      </div>
      <div class="container-form">
        <div class="form-title">
          <h2>Bienvenido a Educanet</h2>
          <p>Inicia sesin para continuar</p>
        </div>
        <form @submit.prevent="login" class="form-login">
          <div class="input-group">
            <Mail class="input-icon" />
            <BaseInput type="email" placeholder="Email" v-model="email" @input="onEmailInput" />
          </div>
          <div class="input-group">
            <Lock class="input-icon" />
            <BaseInput :type="showPassword ? 'text' : 'password'" placeholder="Contrasea" v-model="password" @input="onPasswordInput" />
            <button type="button" class="password-toggle" @click="toggleShowPassword">
              <Eye v-if="!showPassword" />
              <EyeOff v-else />
            </button>
          </div>
          <BaseButton type="submit">Login</BaseButton>
        </form>
        <a href="#">Tienes problemas con su contrasea?</a>
      </div>
      <div class="container-derechos" v-if="!isMobile">
        <p>Copyright 2024 EducaNet. Todos los derechos reservados</p>
        <div class="ineed">
          <i class="fa-solid fa-info"></i>
          <a href="#">Necesitas ayuda?</a>
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
  grid-template-columns: 1fr;
}

@media (min-width: 769px) {
  .container-login {
    grid-template-columns: .4fr 1fr;
  }
}

.container-presentation {
  width: 100%;
  background-color: #1544F0;
  background-repeat: no-repeat;
  background-size: contain;
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
  width: 100%;
  margin-bottom: 19px;
}

.presentation-alumnos img {
  width: 100%;
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
  justify-content: center;
  padding: 41px 65px 48px 65px;
}

@media (min-width: 769px) {
  .container-info-login {
    justify-content: space-between;
  }
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

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9E9E9E;
  z-index: 1;
  width: 20px;
  height: 20px;
}

.input-group input {
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
  z-index: 2;
  background: transparent;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9E9E9E;
  z-index: 3;
}

.password-toggle:focus {
  outline: none;
}
</style>