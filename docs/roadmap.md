# 🗺️ ROADMAP — BarberBook

> Plan de desarrollo día a día para el proyecto final de JavaScript (CoderHouse).
> Plazo: **10 días** | Stack: HTML + CSS + JS vanilla + SweetAlert2

---

## Vista General (Diagrama Gantt)

```
Fundación
  ├── Día 1:  Setup y estructura base         ████
  ├── Día 2:  Fetch e inicialización           ████
  └── Día 3:  Estilos base                     ████

Funcionalidad Core
  ├── Día 4:  Servicios y Barberos (map)       ████████
  ├── Día 5:  Horarios (filter + sort)         ████████
  ├── Día 6:  Formulario y confirmación        ████████
  └── Día 7:  Mis Turnos y cancelación         ████████

Cierre
  ├── Día 8:  Integración y testing            ██████
  ├── Día 9:  Limpieza de código               ██████
  └── Día 10: Revisión final y entrega         ██████ ← DEADLINE
```

---

## Día 1 — Setup y Estructura Base

**Objetivo:** Tener todos los archivos creados y conectados.

| Tarea | Archivo | Estado |
|-------|---------|--------|
| Crear estructura de carpetas (`src/js/`, `src/css/`, `data/`) | — | ⬜ |
| Armar `index.html` con secciones para cada paso del flujo | `src/index.html` | ⬜ |
| Agregar CDN de SweetAlert2 en el HTML | `src/index.html` | ⬜ |
| Crear `servicios.json` con 4-5 servicios | `data/servicios.json` | ⬜ |
| Crear `barberos.json` con 3 barberos (6-8 horarios c/u) | `data/barberos.json` | ⬜ |
| Conectar todos los `.js` al HTML (scripts al final del body) | `src/index.html` | ⬜ |

**Entregable del día:** `index.html` abierto con Live Server sin errores en consola.

**Concepto clave:** Estructura de proyecto modular — cada archivo tiene una responsabilidad única.

---

## Día 2 — Fetch e Inicialización

**Objetivo:** Cargar datos desde JSON y tener el estado global funcionando.

| Tarea | Archivo | Estado |
|-------|---------|--------|
| Definir objeto `estado` global con todos los campos | `src/js/app.js` | ⬜ |
| Implementar `Promise.all()` para fetch doble | `src/js/app.js` | ⬜ |
| Guardar resultados en `estado.servicios` y `estado.barberos` | `src/js/app.js` | ⬜ |
| Cargar turnos desde `localStorage` si existen | `src/js/app.js` | ⬜ |
| Cargar barberos actualizados desde `localStorage` si existen | `src/js/app.js` | ⬜ |
| Verificar carga con `console.log` temporal | `src/js/app.js` | ⬜ |

**Entregable del día:** Datos cargados correctamente visibles en consola.

**Concepto clave:** `Promise.all()` — ejecuta múltiples promesas en paralelo y espera a que todas resuelvan.

---

## Día 3 — Estilos Base

**Objetivo:** Tener la maqueta visual completa con paleta de barbería.

| Tarea | Archivo | Estado |
|-------|---------|--------|
| Definir variables CSS (colores, tipografía, espaciados) | `src/css/styles.css` | ⬜ |
| Maquetar header con navegación | `src/css/styles.css` | ⬜ |
| Estilizar cards de servicios (grid o flexbox) | `src/css/styles.css` | ⬜ |
| Estilizar cards de barberos | `src/css/styles.css` | ⬜ |
| Estilizar botones de horarios | `src/css/styles.css` | ⬜ |
| Lógica CSS para mostrar/ocultar secciones (`.oculto`) | `src/css/styles.css` | ⬜ |
| Responsive básico (mobile-first) | `src/css/styles.css` | ⬜ |

**Entregable del día:** Sitio con aspecto visual profesional, secciones visibles en estructura.

**Paleta sugerida:** Negro `#1a1a1a` · Gris carbón `#2d2d2d` · Dorado `#c8a962` · Blanco humo `#f5f5f5`

---

## Día 4 — Paso 1 y 2: Servicios y Barberos

**Objetivo:** El usuario puede elegir un servicio y un barbero.

| Tarea | Archivo | Método JS | Estado |
|-------|---------|-----------|--------|
| Implementar `renderizarServicios()` | `src/js/servicios.js` | `map()` | ⬜ |
| Evento click → guardar en `estado.servicioSeleccionado` | `src/js/servicios.js` | — | ⬜ |
| Marcar card activa visualmente | `src/js/servicios.js` | — | ⬜ |
| Implementar `renderizarBarberos()` | `src/js/barberos.js` | `map()` | ⬜ |
| Evento click → guardar en `estado.barberoSeleccionado` | `src/js/barberos.js` | — | ⬜ |
| Transición visual del paso 1 al paso 2 | `src/js/barberos.js` | — | ⬜ |

**Entregable del día:** Click en servicio → aparecen barberos → click en barbero → transición al paso 3.

**Concepto clave:** `map()` — transforma cada elemento de un array en un nuevo valor (en este caso, HTML).

---

## Día 5 — Paso 3: Horarios

**Objetivo:** Mostrar horarios disponibles del barbero seleccionado.

| Tarea | Archivo | Método JS | Estado |
|-------|---------|-----------|--------|
| Implementar `renderizarHorarios()` | `src/js/horarios.js` | `filter()` + `sort()` + `map()` | ⬜ |
| Filtrar solo horarios con `disponible === true` | `src/js/horarios.js` | `filter()` | ⬜ |
| Ordenar horarios cronológicamente | `src/js/horarios.js` | `sort()` | ⬜ |
| Renderizar botones (activos vs deshabilitados) | `src/js/horarios.js` | `map()` | ⬜ |
| Manejar caso sin horarios disponibles | `src/js/horarios.js` | SweetAlert2 | ⬜ |
| Click → guardar en `estado.horarioSeleccionado` | `src/js/horarios.js` | — | ⬜ |

**Entregable del día:** Lista de horarios filtrada y ordenada, con selección funcional.

**Concepto clave:** `filter()` devuelve un array nuevo con los elementos que cumplen la condición. `sort()` ordena el array in-place.

---

## Día 6 — Paso 4: Formulario y Confirmación

**Objetivo:** El usuario puede confirmar su turno con todos los datos.

| Tarea | Archivo | Método JS | Estado |
|-------|---------|-----------|--------|
| Armar formulario (nombre + teléfono) en HTML | `src/index.html` | — | ⬜ |
| Validar campos vacíos | `src/js/reserva.js` | — | ⬜ |
| Mostrar resumen con SweetAlert2 antes de confirmar | `src/js/reserva.js` | SweetAlert2 | ⬜ |
| Crear objeto turno completo | `src/js/reserva.js` | — | ⬜ |
| Buscar barbero y marcar horario como `false` | `src/js/reserva.js` | `find()` | ⬜ |
| Guardar `estado.turnos` y `estado.barberos` en localStorage | `src/js/reserva.js` | — | ⬜ |
| Resetear selecciones y volver al paso 1 | `src/js/reserva.js` | — | ⬜ |

**Entregable del día:** Flujo completo funcional: servicio → barbero → horario → confirmar turno.

**Concepto clave:** `find()` busca y devuelve el **primer** elemento que cumple la condición (a diferencia de `filter()` que devuelve todos).

---

## Día 7 — Sección "Mis Turnos"

**Objetivo:** El usuario puede ver y cancelar sus turnos reservados.

| Tarea | Archivo | Método JS | Estado |
|-------|---------|-----------|--------|
| Implementar `renderizarTurnos()` | `src/js/misTurnos.js` | `map()` | ⬜ |
| Mostrar mensaje si no hay turnos | `src/js/misTurnos.js` | — | ⬜ |
| Botón "Cancelar" en cada turno | `src/js/misTurnos.js` | — | ⬜ |
| Confirmar cancelación con SweetAlert2 | `src/js/misTurnos.js` | SweetAlert2 | ⬜ |
| Eliminar turno de `estado.turnos` | `src/js/misTurnos.js` | `filter()` | ⬜ |
| Volver a marcar horario como `disponible: true` | `src/js/misTurnos.js` | `find()` | ⬜ |
| Persistir cambios en localStorage | `src/js/misTurnos.js` | — | ⬜ |

**Entregable del día:** Sección "Mis Turnos" completa con cancelación funcional.

**Concepto clave:** Al cancelar, el ciclo se cierra: el horario vuelve a estar disponible para futuras reservas.

---

## Día 8 — Integración y Testing

**Objetivo:** Todo el flujo funciona de punta a punta sin bugs.

| Verificación | Resultado | Estado |
|-------------|-----------|--------|
| Flujo completo: servicio → barbero → horario → confirmar | — | ⬜ |
| Persistencia: recargar página y verificar turnos | — | ⬜ |
| Horarios ocupados no se pueden seleccionar | — | ⬜ |
| Cancelar turno libera el horario correctamente | — | ⬜ |
| Reservar mismo horario 2 veces es imposible | — | ⬜ |
| SweetAlert2 aparece en todos los diálogos | — | ⬜ |
| Responsive: probar en móvil y desktop | — | ⬜ |
| Corregir bugs de integración entre módulos | — | ⬜ |

**Entregable del día:** App funcional sin bugs conocidos.

---

## Día 9 — Limpieza de Código

**Objetivo:** Código listo para corrección académica.

| Tarea | Verificación | Estado |
|-------|-------------|--------|
| Eliminar **todos** los `console.log()` | `grep -r "console.log" src/js/` → 0 | ⬜ |
| Eliminar código comentado y en desuso | Revisión manual | ⬜ |
| Sin `alert()`, `confirm()`, `prompt()` nativos | `grep -r "alert\|confirm\|prompt" src/js/` → 0 | ⬜ |
| Comentario breve encima de cada función | Todas documentadas | ⬜ |
| Nombres descriptivos en variables y funciones | Revisión manual | ⬜ |
| Consistencia de estilo (indentación, comillas) | Revisión manual | ⬜ |

**Entregable del día:** Código limpio, documentado y sin deuda técnica.

---

## Día 10 — Revisión Final y Entrega

**Objetivo:** Entrega exitosa en la plataforma de CoderHouse.

| Tarea | Estado |
|-------|--------|
| Leer consignas del entregable ítem por ítem | ⬜ |
| Verificar checklist completo (ver `instruction.md`) | ⬜ |
| Probar en navegador limpio (incógnito, sin caché) | ⬜ |
| ⚠️ Usar **Live Server** (fetch no funciona con `file://`) | ⬜ |
| Crear README.md con descripción del proyecto | ⬜ |
| Subir a GitHub | ⬜ |
| Entregar link del repositorio en CoderHouse | ⬜ |

**Entregable del día:** Link del repositorio entregado en la plataforma.

---

## Resumen de Métodos por Día

| Método | Dónde se usa | Día |
|--------|-------------|-----|
| `map()` | Renderizar servicios, barberos, horarios, turnos | 4, 5, 7 |
| `filter()` | Horarios disponibles, eliminar turno cancelado | 5, 7 |
| `find()` | Obtener barbero/servicio por ID | 6, 7 |
| `sort()` | Ordenar horarios cronológicamente | 5 |
| `reduce()` | Calcular precio total (si múltiples servicios) | 6 |
| `Promise.all()` | Fetch doble de JSON | 2 |
| `localStorage` | Persistir turnos y estado de barberos | 2, 6, 7 |
| `SweetAlert2` | Todos los diálogos de la app | 5, 6, 7 |

---

> **NOTA:** Este roadmap asume dedicación de 2-3 horas por día. Si un día se
> complica, el Día 8 (testing) absorbe el atraso. El Día 9 y 10 son innegociables.
