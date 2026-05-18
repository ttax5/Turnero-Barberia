/* ================================================================
   misTurnos.js — Lista de turnos reservados y cancelación
   Responsabilidad: renderizarTurnos() con map(), cancelarTurno() con filter(), find()
   ================================================================ */

/* Renderiza la lista de turnos reservados */
function renderizarTurnos() {
  const contenedor = document.getElementById("contenedor-turnos");

  /* Si no hay turnos, mostrar mensaje */
  if (estado.turnos.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-turnos">
        <div class="sin-turnos-icono">📋</div>
        <div class="sin-turnos-texto">No tenés turnos reservados aún.</div>
        <div class="sin-turnos-subtexto">Reservá tu primer turno desde el inicio.</div>
      </div>`;
    return;
  }

  /* map() — cada turno se convierte en una card HTML */
  contenedor.innerHTML = estado.turnos.map(turno => `
    <div class="card-turno" data-id="${turno.id}">
      <div class="card-turno-info">
        <div class="card-turno-detalle">
          <div class="card-turno-detalle-label">Servicio</div>
          <div class="card-turno-detalle-valor">${turno.servicio}</div>
        </div>
        <div class="card-turno-detalle">
          <div class="card-turno-detalle-label">Barbero</div>
          <div class="card-turno-detalle-valor">${turno.barbero}</div>
        </div>
        <div class="card-turno-detalle">
          <div class="card-turno-detalle-label">Horario</div>
          <div class="card-turno-detalle-valor">${turno.horario} hs</div>
        </div>
        <div class="card-turno-detalle">
          <div class="card-turno-detalle-label">Cliente</div>
          <div class="card-turno-detalle-valor">${turno.cliente}</div>
        </div>
        <div class="card-turno-detalle">
          <div class="card-turno-detalle-label">Precio</div>
          <div class="card-turno-detalle-valor">$${turno.precio.toLocaleString("es-AR")}</div>
        </div>
      </div>
      <button class="btn btn-peligro btn-cancelar-turno" data-id="${turno.id}">Cancelar</button>
    </div>`
  ).join("");

  /* Click en cada botón cancelar */
  contenedor.querySelectorAll(".btn-cancelar-turno").forEach(boton => {
    boton.addEventListener("click", () => cancelarTurno(boton.dataset.id));
  });
}

/* Cancela un turno: pide confirmación, libera el horario y actualiza localStorage */
function cancelarTurno(idTurno) {
  const turno = estado.turnos.find(t => t.id === idTurno);
  if (!turno) return;

  Swal.fire({
    icon: "warning",
    title: "¿Cancelar este turno?",
    html: `
      <div style="text-align: left; font-size: 0.95rem; line-height: 1.8;">
        <strong>${turno.servicio}</strong> con ${turno.barbero}<br>
        Horario: ${turno.horario} hs
      </div>`,
    showCancelButton: true,
    confirmButtonText: "Sí, cancelar turno",
    cancelButtonText: "No, mantener",
    confirmButtonColor: "#ef5350"
  }).then(resultado => {
    if (resultado.isConfirmed) {
      /* filter() — eliminar el turno cancelado */
      estado.turnos = estado.turnos.filter(t => t.id !== idTurno);

      /* find() — restaurar disponibilidad del horario */
      const barbero = estado.barberos.find(b => b.id === turno.barberoId);
      if (barbero) {
        const horario = barbero.horarios.find(h => h.hora === turno.horario);
        if (horario) horario.disponible = true;
      }

      guardarEnLocalStorage();

      Swal.fire({
        icon: "success",
        title: "Turno cancelado",
        text: "El horario volvió a estar disponible.",
        confirmButtonText: "Entendido"
      });

      renderizarTurnos();
    }
  });
}
