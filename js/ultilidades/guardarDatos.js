/**COMO USARLO EN HTML
<script type="module">
  import { guardarJornadaReal, obtenerJornadas } from './js/utilidades/jornadas.js';

  // Guardar la jornada del día
  guardarJornadaReal({
    ruta: 55,
    llave: 9,
    sacas: 5,
    overs: 7,
    paquetes: 103
  });

  // Leer todas las jornadas
  console.log(obtenerJornadas());
</script>
*/
//AQUI COMIENZA EL JS PARA ABAJO

// Guardar jornada en orden cronológico según fecha real
export function guardarJornadaReal(datosJornada) {
  const datosExistentes = JSON.parse(localStorage.getItem('jornadas')) || [];

  // Agregar la nueva jornada
  datosExistentes.push({
    fecha: new Date(), // fecha y hora real del registro
    datos: datosJornada
  });

  // Ordenar por fecha ascendente
  datosExistentes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  // Guardar de nuevo
  localStorage.setItem('jornadas', JSON.stringify(datosExistentes));

  console.log('Jornada registrada correctamente:', datosJornada);
}

// Función para obtener todas las jornadas
export function obtenerJornadas() {
  return JSON.parse(localStorage.getItem('jornadas')) || [];
}