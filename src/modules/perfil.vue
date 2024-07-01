<script setup>
import { ref, onMounted, watch } from 'vue';
import { UserCircle, Mail, Building2, Loader } from 'lucide-vue-next';
import { useAuth } from '@/services/userService';
import { logInfo, logError } from '@/utils/logger.js';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { getAuth, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const isToggled = ref(false);
const isLoading = ref(false);
const { currentUser } = useAuth();
const auth = getAuth();
const storage = getStorage();

const formData = ref({
  codigoCT: '',
  nombre: '',
  director: '',
  email: '',
  historia: ''
});

const profileImageUrl = ref(null);

onMounted(() => {
  if (currentUser.value) {
    const userDocRef = doc(db, 'users', currentUser.value.uid);
    onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        formData.value = {
          codigoCT: userData.school || '',
          nombre: userData.schoolName || '',
          director: userData.name || '',
          email: userData.email || '',
          historia: userData.history || ''
        };
        profileImageUrl.value = userData.profileImageUrl || null;
        logInfo('Datos del usuario cargados en tiempo real');
      } else {
        logError('No se encontró el documento del usuario');
      }
    });
  } else {
    logError('No se encontraron datos del usuario');
  }
});

const updateFirestore = async (field, value) => {
  if (!currentUser.value) return;

  const userDocRef = doc(db, 'users', currentUser.value.uid);
  try {
    await updateDoc(userDocRef, { [field]: value });
    logInfo(`Campo ${field} actualizado en Firestore`);
  } catch (error) {
    logError(`Error al actualizar ${field} en Firestore:`, error);
  }
};

watch(() => formData.value.nombre, (newValue) => {
  if (isToggled.value) updateFirestore('schoolName', newValue);
});

watch(() => formData.value.director, (newValue) => {
  if (isToggled.value) updateFirestore('name', newValue);
});

watch(() => formData.value.historia, (newValue) => {
  if (isToggled.value) updateFirestore('history', newValue);
});

const handlePasswordReset = async () => {
  if (!currentUser.value) {
    logError('No hay usuario autenticado');
    return;
  }

  isLoading.value = true;
  try {
    await sendPasswordResetEmail(auth, currentUser.value.email);
    logInfo(`Correo de restablecimiento de contraseña enviado a: ${currentUser.value.email}`);
  } catch (error) {
    logError('Error al enviar el correo de restablecimiento de contraseña:', error);
  } finally {
    isLoading.value = false;
  }
};

const uploadProfileImage = async (event) => {
  if (!currentUser.value) return;

  const file = event.target.files[0];
  if (!file) return;

  const imageRef = storageRef(storage, `profileImages/${currentUser.value.uid}`);

  try {
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await updateDoc(doc(db, 'users', currentUser.value.uid), {
      profileImageUrl: downloadURL
    });

    await updateProfile(currentUser.value, { photoURL: downloadURL });

    profileImageUrl.value = downloadURL;
    logInfo('Imagen de perfil actualizada con éxito');
  } catch (error) {
    logError('Error al subir la imagen de perfil:', error);
  }
};
</script>

<template>
  <div class="container-perfil relative">
    <div class="perfil flex flex-col gap-[17px] items-center">
      <div class="relative flex justify-center items-center oval w-[70px] h-[70px] border border-color-primary rounded-full overflow-hidden">
        <img v-if="profileImageUrl" :src="profileImageUrl" alt="Foto de perfil" class="w-full h-full object-cover">
        <UserCircle v-else class="w-full h-full text-gray-400" />
        <input
            type="file"
            @change="uploadProfileImage"
            accept="image/*"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Cambiar foto de perfil"
        >
      </div>
      <h1 class="uppercase title">{{ formData.nombre }}</h1>
    </div>
    <div class="absolute top-0 right-0 mt-5 mr-5">
      <label for="toggle-switch" class="flex items-center cursor-pointer">
        <div class="relative">
          <input id="toggle-switch" type="checkbox" class="sr-only" v-model="isToggled">
          <div class="block bg-gray-600 w-14 h-8 rounded-full" :class="{'bg-green-500': isToggled}"></div>
          <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" :class="{'transform translate-x-full': isToggled}"></div>
        </div>
      </label>
    </div>
    <div class="container-form mt-5">
      <form class="form">
        <div class="section-1">
          <div class="container-input">
            <label for="codigoCT">código CT</label>
            <div class="relative">
              <Building2 class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
              <input type="text" id="codigoCT" v-model="formData.codigoCT" placeholder="Código del centro" class="pl-10" :disabled="true" :class="{'bg-gray-100': !isToggled}">
            </div>
          </div>
          <div class="container-input">
            <label for="nombre">nombre del colegio</label>
            <div class="relative">
              <UserCircle class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
              <input type="text" id="nombre" v-model="formData.nombre" placeholder="Nombre completo" class="pl-10" :disabled="!isToggled" :class="{'bg-green-300': isToggled, 'bg-gray-100': !isToggled}">
            </div>
          </div>
        </div>
        <div class="section-2">
          <div class="inputs">
            <div class="container-input">
              <label for="director">director</label>
              <div class="relative">
                <UserCircle class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
                <input type="text" id="director" v-model="formData.director" placeholder="Nombre del director" class="pl-10" :disabled="!isToggled" :class="{'bg-green-300': isToggled, 'bg-gray-100': !isToggled}">
              </div>
            </div>
            <div class="container-input">
              <label for="email">email</label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
                <input type="text" id="email" v-model="formData.email" placeholder="Correo electrónico" class="pl-10" :disabled="true" :class="{'bg-gray-100': !isToggled}">
              </div>
            </div>
            <button
                type="button"
                class="btn-change-password flex items-center justify-center"
                @click="handlePasswordReset"
                :disabled="isLoading"
            >
              <span v-if="!isLoading">Cambiar Contraseña</span>
              <template v-else>
                <Loader class="animate-spin mr-2" size="20" />
                <span>Enviando correo</span>
              </template>
            </button>
          </div>
          <div class="container-input">
            <label for="historia">historia</label>
            <textarea id="historia" v-model="formData.historia" class="textarea" :disabled="!isToggled" :class="{'bg-green-300': isToggled, 'bg-gray-100': !isToggled}"></textarea>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container-perfil {
  background: #fff;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  position: relative;
}

.title {
  color: #4379EE;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.538px;
}

.section-1 {
  display: flex;
  gap: 60px;
}

.section-2 {
  display: flex;
  gap: 60px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.container-input {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.container-input label {
  text-transform: uppercase;
  color: #606060;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.container-input input {
  background: #F5F6FA;
  border: 1px #D5D5D5 solid;
  border-radius: 8px;
  width: 360px;
  height: 52px;
  padding-left: 40px;
}

.container-input input.bg-gray-100 {
  background: #F5F6FA;
}

.container-input input.bg-green-300 {
  background: #6efbe2;
}

.container-input textarea {
  background: #F5F6FA;
  border: 1px #D5D5D5 solid;
  border-radius: 8px;
  width: 360px;
  height: 100%;
  resize: none;
}

.container-input textarea.bg-gray-100 {
  background: #F5F6FA;
}

.container-input textarea.bg-green-300 {
  background: #6efbe2;
}

.btn-change-password {
  background-color: #2a55e2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 360px;
  height: 52px;
  text-align: center;
}

#toggle-switch:checked + .block {
  background-color: #2a55e2;
}

#toggle-switch:checked + .block .dot {
  transform: translateX(100%);
}

@media screen and (max-width: 700px) {
  .inputs {
    gap: 30px;
  }
  .form {
    gap: 30px;
  }
  .section-1 {
    flex-direction: column;
    gap: 30px;
  }

  .section-2 {
    flex-direction: column;
    gap: 30px;
  }
}

@media screen and (max-width: 1000px) {
  .container-input input {
    width: auto;
  }

  .container-input textarea {
    width: auto;
  }
}
</style>
