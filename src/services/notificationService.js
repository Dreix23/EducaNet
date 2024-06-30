import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { logInfo, logError, logDebug } from '@/utils/logger.js';
import { db } from '@/services/firebase';

const serverKey = 'AAAAviCy8tc:APA91bEzBlpicFdg2R-WycoLHEdcazJyeHfpRTyFc6U_kLvWplhb24ESUX95wj-YF24CWHvAXGF7X75C-k275g9qwvtCm_JNx7QP1l6xljYuP79KmLaeqpJRwznzMG7wpxTxMuSev7ij';

export const enviarNotificacionATodosLosPadres = async (grupo, mensaje, colegio) => {
    try {
        logDebug(`Iniciando envío de notificaciones para grupo ${grupo} en colegio ${colegio}`);

        const grupoDocRef = doc(db, `colegios/${colegio}/alumnos/${grupo}`);
        const grupoDocSnapshot = await getDoc(grupoDocRef);

        if (!grupoDocSnapshot.exists()) {
            logError(`No se encontraron alumnos para el grupo ${grupo} en el colegio ${colegio}`);
            return;
        }

        const alumnosData = grupoDocSnapshot.data();
        const qrAlumnos = Object.values(alumnosData).map(alumno => alumno.QR);
        logDebug(`QR de alumnos encontrados: ${qrAlumnos.join(', ')}`);

        const qrAlumnosChunks = chunkArray(qrAlumnos, 30);
        const promesasNotificaciones = [];

        for (const chunk of qrAlumnosChunks) {
            const padresQuery = query(
                collection(db, 'users'),
                where("role", "==", "padre"),
                where("school", "==", colegio),
                where("codigoQR", "array-contains-any", chunk)
            );
            const padresSnapshot = await getDocs(padresQuery);

            padresSnapshot.forEach((doc) => {
                const padre = doc.data();
                if (padre.fcmToken) {
                    logDebug(`Enviando notificación al token FCM: ${padre.fcmToken} asociado a QR: ${padre.codigoQR.join(', ')}`);
                    promesasNotificaciones.push(enviarNotificacionPorFCM(padre.fcmToken, 'Nueva tarea asignada', mensaje, padre.codigoQR));
                } else {
                    logError(`Padre ${doc.id} no tiene token FCM`);
                }
            });
        }

        const resultados = await Promise.all(promesasNotificaciones);
        const notificacionesEnviadas = resultados.filter(r => r).length;
        logInfo(`Notificaciones enviadas: ${notificacionesEnviadas} de ${promesasNotificaciones.length} para el grupo ${grupo} en el colegio ${colegio}`);
    } catch (error) {
        logError(`Error al enviar notificaciones a los padres: ${error.message}`);
    }
};

export const enviarNotificacionATodosLosPadresDelColegio = async (mensaje, colegio) => {
    try {
        logDebug(`Iniciando envío de notificaciones para todos los padres del colegio ${colegio}`);

        const padresQuery = query(
            collection(db, 'users'),
            where("role", "==", "padre"),
            where("school", "==", colegio)
        );
        const padresSnapshot = await getDocs(padresQuery);

        const promesasNotificaciones = [];

        padresSnapshot.forEach((doc) => {
            const padre = doc.data();
            if (padre.fcmToken) {
                logDebug(`Enviando notificación al token FCM: ${padre.fcmToken}`);
                promesasNotificaciones.push(enviarNotificacionPorFCM(padre.fcmToken, 'Nuevo aviso del colegio', mensaje));
            } else {
                logError(`Padre ${doc.id} no tiene token FCM`);
            }
        });

        const resultados = await Promise.all(promesasNotificaciones);
        const notificacionesEnviadas = resultados.filter(r => r).length;
        logInfo(`Notificaciones enviadas: ${notificacionesEnviadas} de ${promesasNotificaciones.length} para el colegio ${colegio}`);
    } catch (error) {
        logError(`Error al enviar notificaciones a los padres: ${error.message}`);
    }
};

const enviarNotificacionPorFCM = async (token, titulo, mensaje, qr = null) => {
    if (!token) {
        logError('No se encontró el token FCM del destinatario');
        return false;
    }

    const url = 'https://fcm.googleapis.com/fcm/send';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `key=${serverKey}`,
    };

    const body = {
        notification: {
            title: titulo,
            body: mensaje,
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
            logInfo(`Notificación enviada correctamente al token: ${token.substring(0, 10)}...${qr ? ` asociado a QR: ${qr.join(', ')}` : ''}`);
            return true;
        } else {
            logError(`Error al enviar la notificación. Código de estado: ${response.status}`);
            return false;
        }
    } catch (error) {
        logError(`Error al enviar la notificación: ${error.message}`);
        return false;
    }
};

const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};
