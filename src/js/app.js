/* ================================================================
   app.js — Punto de entrada de la aplicación
   Responsabilidad: Estado global, fetch inicial, navegación
   ================================================================ */

/* Claves de localStorage como constantes para evitar typos */
const CLAVE_TURNOS = "barberbook-turnos";
const CLAVE_BARBEROS = "barberbook-barberos";

/* Estado centralizado: toda la app lee y modifica este objeto */
const estado = {
  servicios: [],
  barberos: [],
  servicioSeleccionado: null,
  barberoSeleccionado: null,
  horarioSeleccionado: null,
  turnos: []
};

/* Muestra solo la sección del paso indicado y oculta las demás */
function mostrarPaso(numeroPaso) {
  const secciones = document.querySelectorAll(".seccion-paso");
  secciones.forEach(seccion => seccion.classList.add("oculto"));

  const mapaIds = {
    1: "seccion-servicios",
    2: "seccion-barberos",
    3: "seccion-horarios",
    4: "seccion-reserva",
    5: "seccion-turnos"
  };

  const seccionActiva = document.getElementById(mapaIds[numeroPaso]);
  if (seccionActiva) seccionActiva.classList.remove("oculto");

  /* Actualizar indicador visual de pasos */
  const indicador = document.getElementById("indicador-pasos");
  if (numeroPaso >= 1 && numeroPaso <= 4) {
    indicador.classList.remove("oculto");
    actualizarIndicador(numeroPaso);
  } else {
    indicador.classList.add("oculto");
  }

  scrollTo({ top: 0, behavior: "smooth" });
}

/* Marca como completados los pasos anteriores y activo el actual */
function actualizarIndicador(pasoActual) {
  const pasos = document.querySelectorAll(".indicador-pasos .paso");
  const lineas = document.querySelectorAll(".indicador-pasos .paso-linea");

  pasos.forEach(paso => {
    const numero = parseInt(paso.dataset.paso);
    paso.classList.remove("activo", "completado");

    if (numero < pasoActual) paso.classList.add("completado");
    else if (numero === pasoActual) paso.classList.add("activo");
  });

  lineas.forEach((linea, i) => {
    if (i < pasoActual - 1) linea.classList.add("completada");
    else linea.classList.remove("completada");
  });
}

/* Guarda turnos y barberos actualizados en localStorage */
function guardarEnLocalStorage() {
  localStorage.setItem(CLAVE_TURNOS, JSON.stringify(estado.turnos));
  localStorage.setItem(CLAVE_BARBEROS, JSON.stringify(estado.barberos));
}

/* Carga datos persistidos de localStorage, o usa valores por defecto */
function cargarDesdeLocalStorage() {
  estado.turnos = JSON.parse(localStorage.getItem(CLAVE_TURNOS)) || [];
  estado.barberos = JSON.parse(localStorage.getItem(CLAVE_BARBEROS)) || estado.barberos;
}

/* Resetea las selecciones del flujo y vuelve al paso 1 */
function volverAlInicio() {
  estado.servicioSeleccionado = null;
  estado.barberoSeleccionado = null;
  estado.horarioSeleccionado = null;
  renderizarServicios();
  mostrarPaso(1);
}

/* Fetch doble con Promise.all — carga servicios y barberos en paralelo */
Promise.all([
  fetch("data/servicios.json").then(res => res.json()),
  fetch("data/barberos.json").then(res => res.json())
])
  .then(([servicios, barberos]) => {
    estado.servicios = servicios;
    estado.barberos = barberos;

    /* Si hay datos en localStorage, priorizarlos sobre el JSON */
    cargarDesdeLocalStorage();

    renderizarServicios();
    mostrarPaso(1);
  })
  .catch(() => {
    Swal.fire({
      icon: "error",
      title: "Error al cargar datos",
      text: "No se pudieron cargar los servicios y barberos. Asegurate de usar Live Server.",
      confirmButtonText: "Entendido"
    });
  });

/* Navegación: botón "Mis Turnos" */
document.getElementById("btn-mis-turnos").addEventListener("click", () => {
  renderizarTurnos();
  mostrarPaso(5);
});

/* Navegación: logo vuelve al inicio */
document.getElementById("logo-inicio").addEventListener("click", (e) => {
  e.preventDefault();
  volverAlInicio();
});

/* Navegación: botones "Volver" */
document.getElementById("btn-volver-servicios").addEventListener("click", () => {
  estado.barberoSeleccionado = null;
  estado.horarioSeleccionado = null;
  renderizarServicios();
  mostrarPaso(1);
});

document.getElementById("btn-volver-barberos").addEventListener("click", () => {
  estado.horarioSeleccionado = null;
  renderizarBarberos();
  mostrarPaso(2);
});

document.getElementById("btn-volver-horarios").addEventListener("click", () => {
  renderizarHorarios();
  mostrarPaso(3);
});

document.getElementById("btn-volver-inicio").addEventListener("click", volverAlInicio);
