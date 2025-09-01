/** PARA HTML

import { capturarUbicacion } from './js/utilidades/GPS.js';
import { agregarRegistro, obtenerRegistros } from './js/utilidades/jornadasGPS.js';

document.getElementById('btnUbicacion').addEventListener('click', () => {
    capturarUbicacion((registro) => {
        agregarRegistro(registro);
        console.log("Todos los registros:", obtenerRegistros());
    });
});


// jornadasGPS.js

// Array que guarda todas las jornadas
let jornadasGPS = [];

/**
 * Añade un registro GPS en orden cronológico
 * @param {Object} registro - { latitud, longitud, altura, hora }
 */
export function agregarRegistro(registro) {
    if (!registro.hora) {
        console.error("Registro sin hora");
        return;
    }

    // Convertimos la hora a Date para comparar
    const fechaRegistro = new Date(registro.hora);

    // Encontrar índice donde insertar
    let index = jornadasGPS.findIndex(r => new Date(r.hora) > fechaRegistro);

    if (index === -1) {
        // Si no hay uno mayor, se añade al final
        jornadasGPS.push(registro);
    } else {
        jornadasGPS.splice(index, 0, registro);
    }
}

/**
 * Devuelve todos los registros guardados
 * @returns {Array}
 */
export function obtenerRegistros() {
    return [...jornadasGPS]; // Devolvemos copia para no modificar original
}

/**
 * Borra todos los registros
 */
export function limpiarRegistros() {
    jornadasGPS = [];
}