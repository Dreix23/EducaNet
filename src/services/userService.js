// services/userService.js
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.js';

const currentUser = ref(null);
const userSchool = ref(null);

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
                        // Obtener el campo "school" del documento
                        const userData = userDocSnap.data();
                        userSchool.value = userData.school;
                        console.log('School:', userSchool.value);
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching user school:', error);
                }
            } else {
                console.log('No authenticated user');
                currentUser.value = null;
                userSchool.value = null;
            }
        });
    });

    return { currentUser, userSchool };
}
