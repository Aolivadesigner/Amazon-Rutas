let timer, segundos = 0;
let jornada = { inicio: null, fin: null, paquetes: [] };

// =========================
// Cronómetro
// =========================
function iniciarJornada() {
  jornada.inicio = new Date();
  segundos = 0;
  timer = setInterval(() => {
    segundos++;
    document.getElementById("cronometro").textContent = formatoTiempo(segundos);
  }, 1000);
  localStorage.setItem("jornadaActual", JSON.stringify(jornada));
}

function finalizarJornada() {
  clearInterval(timer);
  jornada.fin = new Date();
  guardarHistorico();
  localStorage.removeItem("jornadaActual");
  jornada = { inicio: null, fin: null, paquetes: [] };
  document.getElementById("cronometro").textContent = "00:00:00";
  document.getElementById("contadorPaquetes").textContent = "0";
}

function formatoTiempo(seg) {
  let h = String(Math.floor(seg / 3600)).padStart(2, "0");
  let m = String(Math.floor((seg % 3600) / 60)).padStart(2, "0");
  let s = String(seg % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// =========================
// Paquetes
// =========================
function abrirModal() {
  document.getElementById("modalPaquete").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modalPaquete").style.display = "none";
}

function guardarPaquete() {
  let ruta = document.getElementById("ruta").value.trim();
  let vin = document.getElementById("vin").value.trim();
  if (!ruta || !vin) {
    alert("Faltan datos");
    return;
  }
  jornada.paquetes.push({ ruta, vin, hora: new Date() });
  document.getElementById("contadorPaquetes").textContent = jornada.paquetes.length;
  localStorage.setItem("jornadaActual", JSON.stringify(jornada));
  cerrarModal();
  document.getElementById("ruta").value = "";
  document.getElementById("vin").value = "";
}

// =========================
// Histórico
// =========================
function guardarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push(jornada);
  localStorage.setItem("historico", JSON.stringify(historico));
  actualizarHistorico();
}

function actualizarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  let lista = document.getElementById("listaHistorico");
  lista.innerHTML = "";
  historico.forEach((j, i) => {
    let li = document.createElement("li");
    li.textContent = `Jornada ${i+1}: ${j.paquetes.length} paquetes (${j.inicio})`;
    lista.appendChild(li);
  });
}

// =========================
// OCR / QR simulación
// =========================
function subirOCR() {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = e => {
    let file = e.target.files[0];
    Tesseract.recognize(file, 'spa').then(res => {
      document.getElementById('ruta').value = res.data.text.trim();
    });
  };
  input.click();
}

function escanearQR() {
  let vin = prompt("Introduce VIN manual (QR pendiente)");
  if (vin) document.getElementById("vin").value = vin;
}

// =========================
// Navegación
// =========================
function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}

document.getElementById("openSidebar").onclick = () => {
  document.getElementById("sidebar").classList.add("activo");
};
document.getElementById("closeSidebar").onclick = () => {
  document.getElementById("sidebar").classList.remove("activo");
};

document.getElementById("btnIniciar").onclick = iniciarJornada;
document.getElementById("btnFinalizar").onclick = finalizarJornada;
document.getElementById("btnNuevoPaquete").onclick = abrirModal;
document.getElementById("cerrarModal").onclick = cerrarModal;
document.getElementById("guardarPaquete").onclick = guardarPaquete;

window.onload = actualizarHistorico;