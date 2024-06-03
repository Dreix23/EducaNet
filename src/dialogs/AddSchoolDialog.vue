<!-- src/dialogs/AddSchoolDialog.vue -->
<script setup>
import { ref } from 'vue';
import { auth, db } from '@/services/firebase';
import { createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { EyeIcon, EyeOffIcon, SchoolIcon, MailIcon, LockIcon, UserIcon } from 'lucide-vue-next';

const schoolCT = ref('');
const schoolName = ref('');
const directorName = ref('');
const directorEmail = ref('');
const directorPassword = ref('');
const message = ref('');
const isDialogOpen = ref(false);
const isLoading = ref(false);
const showPassword = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  schoolCT.value = '';
  schoolName.value = '';
  directorName.value = '';
  directorEmail.value = '';
  directorPassword.value = '';
  message.value = '';
};

const toUpperCase = (value) => {
  return value.toUpperCase();
};

const addSchool = async () => {
  try {
    isLoading.value = true;

    const currentUser = auth.currentUser;

    const userCredential = await createUserWithEmailAndPassword(auth, directorEmail.value, directorPassword.value);
    const newUser = userCredential.user;

    const usersRef = doc(db, "users", newUser.uid);

    await setDoc(usersRef, {
      name: directorName.value,
      email: directorEmail.value,
      role: 'director',
      status: 'active',
      school: schoolCT.value
    });

    message.value = 'Colegio y director creados exitosamente';
    closeDialog();

    await updateCurrentUser(auth, currentUser);
  } catch (error) {
    message.value = `Error: ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

defineExpose({
  openDialog,
  closeDialog
});
</script>

<template>
  <transition name="fade" appear>
    <div v-if="isDialogOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-gray-900 opacity-50" @click="closeDialog"></div>
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md z-10 relative">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-blue-600 text-center flex-grow">Nuevo Colegio</h2>
          <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="addSchool">
          <div class="mb-6 relative">
            <SchoolIcon class="absolute left-4 top-4 text-purple-400" />
            <input id="schoolCT" v-model="schoolCT" @input="schoolCT = toUpperCase($event.target.value)" required
              placeholder="Código CT del Colegio"
              class="w-full pl-12 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none  focus:border-color-gray" />
          </div>
          <div class="mb-6 relative">
            <SchoolIcon class="absolute left-4 top-4 text-purple-400" />
            <input id="schoolName" v-model="schoolName" @input="schoolName = toUpperCase($event.target.value)" required
              placeholder="Nombre del Colegio"
              class="w-full pl-12 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none  focus:border-color-gray" />
          </div>
          <div class="mb-6 relative">
            <UserIcon class="absolute left-4 top-4 text-purple-400" />
            <input id="directorName" v-model="directorName" @input="directorName = toUpperCase($event.target.value)"
              required placeholder="Nombre del Director"
              class="w-full pl-12 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none  focus:border-color-gray" />
          </div>
          <div class="mb-6 relative">
            <MailIcon class="absolute left-4 top-4 text-purple-400" />
            <input id="directorEmail" v-model="directorEmail" type="email" required placeholder="Email del Director"
              class="w-full pl-12 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none  focus:border-color-gray" />
          </div>
          <div class="mb-6 relative">
            <LockIcon class="absolute left-4 top-4 text-blue-400" />
            <input id="directorPassword" v-model="directorPassword" :type="showPassword ? 'text' : 'password'" required
              placeholder="Contraseña"
              class="w-full pl-12 pr-3 py-4 text-gray-700 border border-color-gray-1 rounded-[15px] focus:outline-none  focus:border-color-gray" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <EyeIcon v-if="showPassword" class="h-5 w-5" />
              <EyeOffIcon v-else class="h-5 w-5" />
            </button>
          </div>
          <div class="flex justify-center">
            <button type="submit"
              class="bg-color-primary hover:bg-color-blue transition-colors duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-[9px]"
              :disabled="isLoading">
              {{ isLoading ? 'Agregando...' : 'Agregar' }}
            </button>
          </div>
        </form>
        <p v-if="message" class="mt-4 text-center"
          :class="{ 'text-green-500': !message.startsWith('Error'), 'text-red-500': message.startsWith('Error') }">
          {{ message }}
        </p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
