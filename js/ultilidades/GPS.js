// UTILIZAR EN HTML
/**
<button id="btnUbicacion">Capturar Ubicación</button>

<script type="module">
import { capturarUbicacion } from './js/utilidades/GPS.js';

document.getElementById('btnUbicacion').addEventListener('click', () => {
    capturarUbicacion((registro) => {
        console.log("Registro GPS:", registro);
        // Aquí podrías enviarlo a jornadasGPS.js para guardar
    });
});
</script>
*/

// GPS.js

// Función para capturar ubicación actual
export function capturarUbicacion(callback) {
    if (!navigator.geolocation) {
        alert("Geolocalización no soportada en este navegador.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude, altitude } = position.coords;
            const hora = new Date().toISOString(); // Formato ISO: YYYY-MM-DDTHH:MM:SS

            const registro = {
                latitud: latitude,
                longitud: longitude,
                altura: altitude || null, // Si no hay, null
                hora: hora
            };

            // Devuelve el registro al callback
            callback(registro);
        },
        (error) => {
            console.error("Error al capturar la ubicación:", error.message);
        },
        { enableHighAccuracy: true }
    );
}