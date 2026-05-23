function renderizarHorarios() {
  const contenedorHorarios = document.getElementById("contenedor-horarios");
  const contenedorInfo = document.getElementById("info-seleccion");

  contenedorInfo.innerHTML = `
    <span class="info-chip">Servicio: <strong>${estado.servicioSeleccionado.nombre}</strong></span>
    <span class="info-chip">Barbero: <strong>${estado.barberoSeleccionado.nombre}</strong></span>`;

  const disponibles = estado.barberoSeleccionado.horarios.filter(h => h.disponible);

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

  contenedorHorarios.innerHTML = disponibles
    .sort((a, b) => a.hora.localeCompare(b.hora))
    .map(horario => {
      const activo = estado.horarioSeleccionado === horario.hora ? "activo" : "";
      return `<button class="btn-horario ${activo}" data-hora="${horario.hora}">${horario.hora}</button>`;
    })
    .join("");

  contenedorHorarios.querySelectorAll(".btn-horario").forEach(boton => {
    boton.addEventListener("click", () => seleccionarHorario(boton.dataset.hora));
  });
}

function seleccionarHorario(hora) {
  estado.horarioSeleccionado = hora;
  mostrarResumenTurno();
  mostrarPaso(4);
}
