// services/userService.js
import { ref, onMounted, watch } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase.js';
import { logInfo, logError, logDebug } from '@/utils/logger.js';
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
    let unsubscribe = null;

    function setUserData(user, userData) {
        currentUser.value = user;
        userSchool.value = userData.school;
        userSchoolName.value = userData.schoolName;
        userRole.value = userData.role;
        currentUser.value.displayName = userData.name;
    }

    async function setupRealtimeListener(user) {
        const userDocRef = doc(db, 'users', user.uid);
        unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                setUserData(user, userData);
                saveUserDataSecurely({
                    uid: user.uid,
                    email: user.email,
                    school: userData.school,
                    schoolName: userData.schoolName,
                    role: userData.role,
                    name: userData.name
                });
                logInfo('Datos de usuario actualizados en tiempo real');
                logDebug('Datos de usuario actualizados:', { userRole: userRole.value, userSchool: userSchool.value });
            } else {
                logError('No se encontró el documento del usuario en tiempo real');
            }
        }, (error) => {
            logError('Error en la escucha en tiempo real:', error);
        });
    }

    onMounted(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                logInfo('Usuario autenticado:', user.email);
                const localUserData = getUserDataSecurely();

                if (localUserData && localUserData.uid === user.uid) {
                    setUserData(user, localUserData);
                    logInfo('Datos de usuario cargados de forma segura desde almacenamiento local');
                }

                await setupRealtimeListener(user);
            } else {
                logInfo('No hay usuario autenticado');
                clearUserDataSecurely();
                currentUser.value = null;
                userSchool.value = null;
                userSchoolName.value = null;
                userRole.value = null;
                if (unsubscribe) {
                    unsubscribe();
                    unsubscribe = null;
                }
            }
        });
    });

    watch([currentUser, userRole, userSchool, userSchoolName], () => {
        logDebug('Datos de usuario actualizados:', {
            user: currentUser.value?.email,
            role: userRole.value,
            school: userSchool.value,
            schoolName: userSchoolName.value
        });
    });

    return { currentUser, userSchool, userSchoolName, userRole, clearUserDataSecurely };
}
