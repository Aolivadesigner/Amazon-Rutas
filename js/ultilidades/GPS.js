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
</script>*/

// GPS.js
import { guardarRegistro } from './guardarJornadasGPS.js';

export async function capturarUbicacion() {
    if (!navigator.geolocation) return alert("GPS no disponible");

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const altura = pos.coords.altitude || 0;
        const hora = new Date().toISOString();

        // Geocoding inverso
        let direccion = "";
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const data = await res.json();
            direccion = data.display_name || "";
        } catch (e) {
            console.error("Error obteniendo dirección:", e);
        }

        const registro = { lat, lon, altura, hora, direccion };
        guardarRegistro(registro);
        console.log("Registro guardado:", registro);
    }, (err) => console.error("Error GPS:", err), { enableHighAccuracy: true });
}