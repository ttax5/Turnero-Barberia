/* ================================================================
   horarios.js — Renderizado de horarios y lógica de disponibilidad
   Responsabilidad: renderizarHorarios() con filter(), sort(), map()
   ================================================================ */

/* Renderiza los botones de horarios del barbero seleccionado */
function renderizarHorarios() {
  const contenedorHorarios = document.getElementById("contenedor-horarios");
  const contenedorInfo = document.getElementById("info-seleccion");

  /* Mostrar chips con servicio y barbero elegidos */
  contenedorInfo.innerHTML = `
    <span class="info-chip">Servicio: <strong>${estado.servicioSeleccionado.nombre}</strong></span>
    <span class="info-chip">Barbero: <strong>${estado.barberoSeleccionado.nombre}</strong></span>`;

  /* filter() — solo horarios disponibles */
  const disponibles = estado.barberoSeleccionado.horarios.filter(h => h.disponible);

  /* Si no hay disponibles, avisar y volver al paso 2 */
  if (disponibles.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Sin disponibilidad",
      text: `${estado.barberoSeleccionado.nombre} no tiene horarios disponibles. Probá con otro barbero.`,
      confirmButtonText: "Volver"
    }).then(() => {
      estado.barberoSeleccionado = null;
      renderizarBarberos();
      mostrarPaso(2);
    });
    contenedorHorarios.innerHTML = "";
    return;
  }

  /* sort() — orden cronológico, luego map() — botones HTML */
  contenedorHorarios.innerHTML = disponibles
    .sort((a, b) => a.hora.localeCompare(b.hora))
    .map(horario => {
      const activo = estado.horarioSeleccionado === horario.hora ? "activo" : "";
      return `<button class="btn-horario ${activo}" data-hora="${horario.hora}">${horario.hora}</button>`;
    })
    .join("");

  /* Click en cada botón → seleccionar horario */
  contenedorHorarios.querySelectorAll(".btn-horario").forEach(boton => {
    boton.addEventListener("click", () => seleccionarHorario(boton.dataset.hora));
  });
}

/* Guarda el horario elegido y muestra el formulario (paso 4) */
function seleccionarHorario(hora) {
  estado.horarioSeleccionado = hora;
  mostrarResumenTurno();
  mostrarPaso(4);
}
