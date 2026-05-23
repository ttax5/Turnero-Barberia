const CLAVE_TURNOS = "barberbook-turnos";
const CLAVE_BARBEROS = "barberbook-barberos";

const estado = {
  servicios: [],
  barberos: [],
  servicioSeleccionado: null,
  barberoSeleccionado: null,
  horarioSeleccionado: null,
  turnos: []
};

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

  const indicador = document.getElementById("indicador-pasos");
  if (numeroPaso >= 1 && numeroPaso <= 4) {
    indicador.classList.remove("oculto");
    actualizarIndicador(numeroPaso);
  } else {
    indicador.classList.add("oculto");
  }

  scrollTo({ top: 0, behavior: "smooth" });
}

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

function guardarEnLocalStorage() {
  localStorage.setItem(CLAVE_TURNOS, JSON.stringify(estado.turnos));
  localStorage.setItem(CLAVE_BARBEROS, JSON.stringify(estado.barberos));
}

function cargarDesdeLocalStorage() {
  estado.turnos = JSON.parse(localStorage.getItem(CLAVE_TURNOS)) || [];
  estado.barberos = JSON.parse(localStorage.getItem(CLAVE_BARBEROS)) || estado.barberos;
}

function volverAlInicio() {
  estado.servicioSeleccionado = null;
  estado.barberoSeleccionado = null;
  estado.horarioSeleccionado = null;
  renderizarServicios();
  mostrarPaso(1);
}

Promise.all([
  fetch("data/servicios.json").then(res => res.json()),
  fetch("data/barberos.json").then(res => res.json())
])
  .then(([servicios, barberos]) => {
    estado.servicios = servicios;
    estado.barberos = barberos;

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

document.getElementById("btn-mis-turnos").addEventListener("click", () => {
  renderizarTurnos();
  mostrarPaso(5);
});

document.getElementById("logo-inicio").addEventListener("click", (e) => {
  e.preventDefault();
  volverAlInicio();
});

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
