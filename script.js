let jornada = { paquetes: [] };
let timer = null;
let tiempoInicio = null;

// Menú lateral
function toggleMenu(){
  const m = document.getElementById('menu');
  m.classList.toggle('open');
}

function showSection(sec){
  ['info','paquetes','estadisticas','historico'].forEach(s=>document.getElementById(s).style.display='none');
  document.getElementById(sec).style.display='block';
}

// Contador
function actualizarContador(){
  if(!tiempoInicio) return;
  const diff=new Date()-tiempoInicio;
  const hrs=String(Math.floor(diff/3600000)).padStart(2,'0');
  const min=String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
  const sec=String(Math.floor((diff%60000)/1000)).padStart(2,'0');
  document.getElementById('contador').textContent=`${hrs}:${min}:${sec}`;
  document.getElementById('tiempoJornada').textContent=`${hrs}:${min}:${sec}`;
  calcularMedia();
}

// Iniciar / finalizar jornada
function iniciarJornada(){ tiempoInicio=new Date(); if(timer) clearInterval(timer); timer=setInterval(actualizarContador,1000);}
function finalizarJornada(){ clearInterval(timer); actualizarContador();}

// Guardado local
function guardarJornada(){ 
  jornada.fecha=document.getElementById('fecha').value;
  jornada.ruta=document.getElementById('ruta').value;
  jornada.bolsas=document.getElementById('bolsas').value;
  jornada.desbordamiento=document.getElementById('desbordamiento').value;
  jornada.vin=document.getElementById('vin').value;
  jornada.tiempo=document.getElementById('contador').textContent;
  localStorage.setItem('jornadaActual', JSON.stringify(jornada));
  alert('Jornada guardada');
}

// QR y OCR simulados
function scanQR(){ let qr=prompt("Simula lectura QR VIN:"); if(qr) document.getElementById('vin').value=qr; }
function subirOCR(){ alert('Simula OCR de Flex aquí'); }

// Modal paquete
function openModal(){ document.getElementById('modalPaquete').style.display='flex'; }
function closeModal(){ document.getElementById('modalPaquete').style.display='none'; }

// Agregar paquete
function agregarPaquete(){
  const p = {
    seguimiento: document.getElementById('pkgSeguimiento').value,
    direccion: document.getElementById('pkgDireccion').value,
    tipo: document.getElementById('pkgTipo').value,
    mala: document.getElementById('pkgMala').checked,
    entregado: document.getElementById('pkgEntregado').checked,
    notas: document.getElementById('pkgNotas