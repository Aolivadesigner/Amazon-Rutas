//PARA USAR EN LA APP
/**
import { capturarUbicacion } from './GPS.js';
import { obtenerJornadas } from './guardarJornadasGPS.js';

// Captura al pulsar un botón
document.getElementById("botonCaptura").addEventListener("click", () => {
    capturarUbicacion();
});

// Para ver todos los registros guardados
console.log(obtenerJornadas());
*/

// guardarJornadasGPS.js

// Array para almacenar los registros temporalmente
let jornadasGPS = [];

// Función para agregar un registro en orden cronológico
export function guardarRegistro(registro) {
    if (!registro || !registro.hora) return;

    // Convertimos hora a timestamp para ordenar
    const timestamp = new Date(registro.hora).getTime();

    // Insertar en orden
    let index = jornadasGPS.findIndex(r => new Date(r.hora).getTime() > timestamp);
    if (index === -1) {
        jornadasGPS.push(registro);
    } else {
        jornadasGPS.splice(index, 0, registro);
    }
}

// Función para obtener todos los registros
export function obtenerJornadas() {
    return jornadasGPS;
}

// Función para vaciar registros (por ejemplo, al guardar en servidor)
export function limpiarJornadas() {
    jornadasGPS = [];
}