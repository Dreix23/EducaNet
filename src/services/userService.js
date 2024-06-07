// services/userService.js
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';

const currentUser = ref(null);
const userSchool = ref(null);
const userSchoolName = ref(null);
const userRole = ref(null);

export function useAuth() {
    const auth = getAuth();

    onMounted(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('Authenticated user:', user);
                currentUser.value = user;

                // Obtener el UID del usuario autenticado
                const uid = user.uid;

                try {
                    // Buscar el documento del usuario en la colección "users"
                    const userDocRef = doc(db, 'users', uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        // Obtener los campos "school", "schoolName", "role" y "name" del documento
                        const userData = userDocSnap.data();
                        userSchool.value = userData.school;
                        userSchoolName.value = userData.schoolName;
                        userRole.value = userData.role;
                        currentUser.value.displayName = userData.name; // Asignar el nombre del usuario
                        console.log('School:', userSchool.value);
                        console.log('School Name:', userSchoolName.value);
                        console.log('Role:', userRole.value);
                        console.log('User Name:', currentUser.value.displayName);
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.log('No authenticated user');
                currentUser.value = null;
                userSchool.value = null;
                userSchoolName.value = null;
                userRole.value = null;
            }
        });
    });

    return { currentUser, userSchool, userSchoolName, userRole };
}
