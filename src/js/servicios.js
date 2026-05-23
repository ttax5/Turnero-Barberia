function renderizarServicios() {
  const contenedor = document.getElementById("contenedor-servicios");

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

  contenedor.querySelectorAll(".card-servicio").forEach(card => {
    card.addEventListener("click", () => seleccionarServicio(parseInt(card.dataset.id)));
  });
}

function seleccionarServicio(idServicio) {
  estado.servicioSeleccionado = estado.servicios.find(s => s.id === idServicio);
  estado.barberoSeleccionado = null;
  estado.horarioSeleccionado = null;

  renderizarBarberos();
  mostrarPaso(2);
}
