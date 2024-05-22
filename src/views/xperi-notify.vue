<script setup>
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();
const serverKey = 'AAAAviCy8tc:APA91bEzBlpicFdg2R-WycoLHEdcazJyeHfpRTyFc6U_kLvWplhb24ESUX95wj-YF24CWHvAXGF7X75C-k275g9qwvtCm_JNx7QP1l6xljYuP79KmLaeqpJRwznzMG7wpxTxMuSev7ij';

const enviarNotificacion = async () => {
  try {
    const snapshot = await getDoc(doc(db, "padres", "padre@gmail.com"));
    const tokenDestinatario = snapshot.data().tokenFCM;

    await enviarNotificacionPorFCM(tokenDestinatario);
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
  }
};

const enviarNotificacionPorFCM = async (token) => {
  if (!token) {
    console.log('No se encontró el token FCM del destinatario');
    return;
  }

  const url = 'https://fcm.googleapis.com/fcm/send';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `key=${serverKey}`,
  };

  const body = {
    notification: {
      title: 'Hola Mundo!',
      body: 'Contenido de la Notificación',
    },
    to: token,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log('Notificación enviada correctamente');
    } else {
      console.error('Error al enviar la notificación. Código de estado:', response.status);
    }
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
  }
};
</script>

<template>
  <div class="container mx-auto mt-8">
    <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="enviarNotificacion"
    >
      Enviar Notificación
    </button>
  </div>
</template>


<style scoped>
/* Estilos adicionales si es necesario */
</style>
