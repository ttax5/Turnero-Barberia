function obtenerIniciales(nombre) {
  return nombre.split(" ").map(p => p.charAt(0)).join("").toUpperCase();
}

function renderizarBarberos() {
  const contenedor = document.getElementById("contenedor-barberos");

  contenedor.innerHTML = estado.barberos.map(barbero => {
    const activa = estado.barberoSeleccionado?.id === barbero.id ? "activa" : "";
    const iniciales = obtenerIniciales(barbero.nombre);
    const disponibles = barbero.horarios.filter(h => h.disponible).length;

    return `
      <div class="card-barbero ${activa}" data-id="${barbero.id}">
        <div class="card-barbero-avatar">
          <span class="card-barbero-iniciales">${iniciales}</span>
        </div>
        <div class="card-barbero-nombre">${barbero.nombre}</div>
        <div class="card-barbero-especialidad">${barbero.especialidad}</div>
        <div class="card-barbero-especialidad" style="margin-top: 8px; color: var(--color-gold);">
          ${disponibles} horarios disponibles
        </div>
      </div>`;
  }).join("");

  contenedor.querySelectorAll(".card-barbero").forEach(card => {
    card.addEventListener("click", () => seleccionarBarbero(parseInt(card.dataset.id)));
  });
}

function seleccionarBarbero(idBarbero) {
  estado.barberoSeleccionado = estado.barberos.find(b => b.id === idBarbero);
  estado.horarioSeleccionado = null;

  renderizarHorarios();
  mostrarPaso(3);
}
