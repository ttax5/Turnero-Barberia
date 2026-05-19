/* ================================================================
   reserva.js — Formulario de confirmación y persistencia
   Responsabilidad: confirmarTurno() con find(), reduce(), localStorage
   ================================================================ */

/* Muestra el resumen del turno en la sección de confirmación */
function mostrarResumenTurno() {
  const contenedor = document.getElementById("resumen-turno");

  /* reduce() — calcula precio total (permite sumar múltiples servicios a futuro) */
  const precioTotal = [estado.servicioSeleccionado].reduce((acc, s) => acc + s.precio, 0);

  contenedor.innerHTML = `
    <div class="resumen-titulo">Resumen de tu turno</div>
    <div class="resumen-item">
      <span class="resumen-item-label">Servicio</span>
      <span class="resumen-item-valor">${estado.servicioSeleccionado.nombre}</span>
    </div>
    <div class="resumen-item">
      <span class="resumen-item-label">Barbero</span>
      <span class="resumen-item-valor">${estado.barberoSeleccionado.nombre}</span>
    </div>
    <div class="resumen-item">
      <span class="resumen-item-label">Horario</span>
      <span class="resumen-item-valor">${estado.horarioSeleccionado} hs</span>
    </div>
    <div class="resumen-item">
      <span class="resumen-item-label">Duración</span>
      <span class="resumen-item-valor">${estado.servicioSeleccionado.duracion} min</span>
    </div>
    <div class="resumen-total">
      <span>Total</span>
      <span class="resumen-total-precio">$${precioTotal.toLocaleString("es-AR")}</span>
    </div>`;
}

/* Genera un ID único para cada turno */
function generarIdTurno() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

/* Configura el evento submit del formulario */
const formulario = document.getElementById("formulario-reserva");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputNombre = document.getElementById("input-nombre");
  const inputTelefono = document.getElementById("input-telefono");
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  /* Validar campos vacíos */
  if (!nombre || !telefono) {
    Swal.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor completá tu nombre y teléfono para confirmar el turno.",
      confirmButtonText: "Entendido"
    });
    return;
  }

  const precioTotal = [estado.servicioSeleccionado].reduce((acc, s) => acc + s.precio, 0);

  /* Resumen de confirmación con SweetAlert2 */
  Swal.fire({
    icon: "question",
    title: "¿Confirmás tu turno?",
    html: `
      <div style="text-align: left; font-size: 0.95rem; line-height: 1.8;">
        <strong>Servicio:</strong> ${estado.servicioSeleccionado.nombre}<br>
        <strong>Barbero:</strong> ${estado.barberoSeleccionado.nombre}<br>
        <strong>Horario:</strong> ${estado.horarioSeleccionado} hs<br>
        <strong>Cliente:</strong> ${nombre}<br>
        <strong>Teléfono:</strong> ${telefono}<br>
        <strong>Total:</strong> $${precioTotal.toLocaleString("es-AR")}
      </div>`,
    showCancelButton: true,
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar"
  }).then(resultado => {
    if (resultado.isConfirmed) {
      confirmarTurno(nombre, telefono, precioTotal);
      formulario.reset();
    }
  });
});

/* Crea el turno, marca horario como ocupado y persiste en localStorage */
function confirmarTurno(nombre, telefono, precioTotal) {
  /* Crear objeto turno */
  const nuevoTurno = {
    id: generarIdTurno(),
    servicio: estado.servicioSeleccionado.nombre,
    servicioId: estado.servicioSeleccionado.id,
    barbero: estado.barberoSeleccionado.nombre,
    barberoId: estado.barberoSeleccionado.id,
    horario: estado.horarioSeleccionado,
    cliente: nombre,
    telefono: telefono,
    precio: precioTotal
  };

  estado.turnos.push(nuevoTurno);

  /* find() — buscar barbero y marcar horario como no disponible */
  const barbero = estado.barberos.find(b => b.id === estado.barberoSeleccionado.id);
  const horario = barbero.horarios.find(h => h.hora === estado.horarioSeleccionado);
  horario.disponible = false;

  guardarEnLocalStorage();

  Swal.fire({
    icon: "success",
    title: "¡Turno confirmado!",
    text: "Tu turno fue reservado con éxito. Podés verlo en 'Mis Turnos'.",
    confirmButtonText: "Genial"
  });

  /* Resetear y volver al inicio */
  estado.servicioSeleccionado = null;
  estado.barberoSeleccionado = null;
  estado.horarioSeleccionado = null;
  renderizarServicios();
  mostrarPaso(1);
}
