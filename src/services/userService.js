// services/userService.js
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { logInfo, logError } from '@/utils/logger.js';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

const currentUser = ref(null);
const userSchool = ref(null);
const userSchoolName = ref(null);
const userRole = ref(null);

function saveUserDataSecurely(userData) {
    ls.set('userData', userData);
    logInfo('Datos de usuario guardados de forma segura');
}

function getUserDataSecurely() {
    try {
        return ls.get('userData');
    } catch (error) {
        logError('Error al obtener datos de usuario:', error);
        return null;
    }
}

function clearUserDataSecurely() {
    ls.remove('userData');
    logInfo('Datos de usuario eliminados de forma segura');
}

export function useAuth() {
    const auth = getAuth();

    async function fetchAndSetUserData(user) {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                currentUser.value = user;
                userSchool.value = userData.school;
                userSchoolName.value = userData.schoolName;
                userRole.value = userData.role;
                currentUser.value.displayName = userData.name;

                saveUserDataSecurely({
                    uid: user.uid,
                    email: user.email,
                    school: userData.school,
                    schoolName: userData.schoolName,
                    role: userData.role,
                    name: userData.name
                });

                logInfo('Datos de usuario obtenidos y guardados de forma segura');
            } else {
                logError('No se encontró el documento del usuario');
            }
        } catch (error) {
            logError('Error al obtener datos del usuario:', error);
        }
    }

    onMounted(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                logInfo('Usuario autenticado:', user.email);
                const localUserData = getUserDataSecurely();

                if (localUserData && localUserData.uid === user.uid) {
                    currentUser.value = user;
                    userSchool.value = localUserData.school;
                    userSchoolName.value = localUserData.schoolName;
                    userRole.value = localUserData.role;
                    currentUser.value.displayName = localUserData.name;
                    logInfo('Datos de usuario cargados de forma segura desde almacenamiento local');
                } else {
                    await fetchAndSetUserData(user);
                }
            } else {
                logInfo('No hay usuario autenticado');
                clearUserDataSecurely();
                currentUser.value = null;
                userSchool.value = null;
                userSchoolName.value = null;
                userRole.value = null;
            }
        });
    });

    return { currentUser, userSchool, userSchoolName, userRole, clearUserDataSecurely };
}
