/* ================================================================
   servicios.js — Renderizado y selección de servicios
   Responsabilidad: renderizarServicios() con map()
   ================================================================ */

/* Genera las cards de servicios usando map() y las inyecta en el DOM */
function renderizarServicios() {
  const contenedor = document.getElementById("contenedor-servicios");

  /* map() transforma cada servicio en HTML */
  contenedor.innerHTML = estado.servicios.map(servicio => {
    const activa = estado.servicioSeleccionado?.id === servicio.id ? "activa" : "";

    return `
      <div class="card-servicio ${activa}" data-id="${servicio.id}">
        <div class="card-servicio-nombre">${servicio.nombre}</div>
        <div class="card-servicio-descripcion">${servicio.descripcion}</div>
        <div class="card-servicio-footer">
          <span class="card-servicio-duracion">⏱ ${servicio.duracion} min</span>
          <span class="card-servicio-precio">$${servicio.precio.toLocaleString("es-AR")}</span>
        </div>
      </div>`;
  }).join("");

  /* Click en cada card → seleccionar servicio */
  contenedor.querySelectorAll(".card-servicio").forEach(card => {
    card.addEventListener("click", () => seleccionarServicio(parseInt(card.dataset.id)));
  });
}

/* Guarda el servicio elegido y avanza al paso 2 */
function seleccionarServicio(idServicio) {
  estado.servicioSeleccionado = estado.servicios.find(s => s.id === idServicio);
  estado.barberoSeleccionado = null;
  estado.horarioSeleccionado = null;

  renderizarBarberos();
  mostrarPaso(2);
}
