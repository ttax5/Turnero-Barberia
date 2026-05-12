---
trigger: always_on
---


> Guía técnica de instrucciones para construir el proyecto final de JavaScript.
> Este documento define las reglas, convenciones y especificaciones técnicas
> que deben cumplirse durante todo el desarrollo.

## 1. Información del Proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | BarberBook — Sistema de Turnos para Barbería |
| **Stack** | HTML5 + CSS3 + JavaScript vanilla |
| **Librería externa** | SweetAlert2 (CDN) |
| **Datos** | Archivos `.json` cargados con `fetch()` |
| **Persistencia** | `localStorage` |
| **Plazo** | 10 días |
| **Plataforma** | CoderHouse — Entrega Final JavaScript |



## 2. Estructura de Archivos


barberbook/
│
├── src/
│   ├── index.html              ← Punto de entrada, secciones del flujo
│   ├── css/
│   │   └── styles.css          ← Estilos, variables CSS, responsive
│   └── js/
│       ├── app.js              ← Estado global, DOMContentLoaded, fetch
│       ├── servicios.js        ← Renderizado y selección de servicios
│       ├── barberos.js         ← Renderizado y selección de barberos
│       ├── horarios.js         ← Horarios, disponibilidad, filtros
│       ├── reserva.js          ← Formulario, confirmación, localStorage
│       └── misTurnos.js        ← Lista de turnos, cancelación
│
├── data/
│   ├── servicios.json          ← Array de servicios (mín. 4)
│   └── barberos.json           ← Array de barberos con horarios (mín. 3)
│
├── img/                        ← Fotos de barberos / assets visuales
└── docs/
    ├── plan.md                 ← Plan de desarrollo completo
    ├── roadmap.md              ← Cronograma día a día
    └── instruction.md          ← Este archivo




## 3. Reglas Técnicas Obligatorias

### 3.1 — JavaScript

| Regla | Detalle |
|-------|---------|
| **Sin arrays hardcodeados** | Los datos de servicios y barberos se cargan desde `.json` con `fetch()`. Nunca declararlos directo en JS. |
| **Estado centralizado** | Todo el estado vive en el objeto `estado` definido en `app.js`. No usar variables globales sueltas. |
| **Sin `console.log()`** | Permitido durante desarrollo. Eliminarlo TODO antes de la entrega final. |
| **Sin diálogos nativos** | Prohibido `alert()`, `confirm()`, `prompt()`. Usar `Swal.fire()` de SweetAlert2. |
| **Sin código muerto** | No dejar bloques comentados, funciones sin usar, ni imports innecesarios. |
| **Comentarios de función** | Cada función debe tener un comentario breve encima que explique su propósito. |

### 3.2 — Métodos de Array Requeridos

Estos métodos son **obligatorios** para la aprobación del proyecto:

| Método | Uso en el proyecto | Archivo |
|--------|-------------------|---------|
| `map()` | Generar HTML de cards de servicios, barberos, horarios y turnos | `servicios.js`, `barberos.js`, `horarios.js`, `misTurnos.js` |
| `filter()` | Mostrar solo horarios disponibles (`disponible === true`). Eliminar turno cancelado del array. | `horarios.js`, `misTurnos.js` |
| `find()` | Obtener objeto de barbero o servicio por ID al confirmar o cancelar turno | `reserva.js`, `misTurnos.js` |
| `sort()` | Ordenar horarios cronológicamente (de menor a mayor hora) | `horarios.js` |
| `reduce()` | Calcular precio total si se seleccionan múltiples servicios | `reserva.js` |

### 3.3 — SweetAlert2

CDN: `https://cdn.jsdelivr.net/npm/sweetalert2@11`

| Uso | Tipo de Swal | Dónde |
|-----|-------------|-------|
| Error: campos vacíos | `Swal.fire({ icon: 'error' })` | `reserva.js` |
| Resumen antes de confirmar | `Swal.fire({ icon: 'question', showCancelButton: true })` | `reserva.js` |
| Éxito al reservar turno | `Swal.fire({ icon: 'success' })` | `reserva.js` |
| Confirmar cancelación | `Swal.fire({ icon: 'warning', showCancelButton: true })` | `misTurnos.js` |
| Sin horarios disponibles | `Swal.fire({ icon: 'info' })` | `horarios.js` |

## 4. Estado Global

Definido en `app.js`:

```javascript
const estado = {
  servicios: [],              // Array cargado desde servicios.json
  barberos: [],               // Array cargado desde barberos.json
  servicioSeleccionado: null,  // Objeto del servicio elegido
  barberoSeleccionado: null,   // Objeto del barbero elegido
  horarioSeleccionado: null,   // String con la hora elegida ("10:00")
  turnos: []                   // Turnos reservados, persistidos en localStorage
};
```

**Regla:** Todas las funciones de otros módulos reciben o modifican este objeto.


## 5. Flujo de la Aplicación

┌─────────────────────────────────────────────────────────────────┐
│                        FLUJO PRINCIPAL                          │
│                                                                 │
│  [1. Servicios] → [2. Barberos] → [3. Horarios] → [4. Confirmar] │
│       map()          map()        filter()+sort()     find()     │
│                                     +map()           +Swal      │
│                                                                 │
│                      ┌──────────────┐                           │
│                      │ 5. Mis Turnos │ ← Accesible desde header │
│                      │   map()       │                          │
│                      │   cancelar:   │                          │
│                      │   find()+Swal │                          │
│                      └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
### Paso 1 — Inicialización (`app.js`)
1. `DOMContentLoaded` dispara `Promise.all([fetch servicios, fetch barberos])`
2. Guardar en `estado.servicios` y `estado.barberos`
3. Cargar turnos desde `localStorage` en `estado.turnos`
4. Si hay barberos en `localStorage` (con horarios modificados), usar esos
5. Llamar a `renderizarServicios()`
6. Mostrar solo la sección del paso 1

### Paso 2 — Selección de servicio (`servicios.js`)
1. `renderizarServicios()` usa `map()` para generar cards
2. Cada card muestra: nombre, descripción, duración, precio
3. Click → guardar en `estado.servicioSeleccionado`
4. Marcar card como activa (clase CSS)
5. Llamar a `renderizarBarberos()`

### Paso 3 — Selección de barbero (`barberos.js`)
1. `renderizarBarberos()` usa `map()` para generar cards
2. Cada card muestra: foto/avatar, nombre, especialidad
3. Click → guardar en `estado.barberoSeleccionado`
4. Llamar a `renderizarHorarios()`

### Paso 4 — Selección de horario (`horarios.js`)
1. `renderizarHorarios()` toma horarios del barbero seleccionado
2. `filter()` → solo `disponible === true`
3. `sort()` → orden cronológico
4. `map()` → renderizar botones
5. Si no hay disponibles → `Swal.fire()` y volver al paso 3
6. Click → guardar en `estado.horarioSeleccionado`

### Paso 5 — Confirmación (`reserva.js`)
1. Formulario: nombre + teléfono
2. Validar campos vacíos → `Swal.fire({ icon: 'error' })`
3. Mostrar resumen → `Swal.fire({ icon: 'question' })`
4. Si confirma:
   - Crear objeto turno `{ id, servicio, barbero, horario, cliente, telefono, precio }`
   - Agregar a `estado.turnos`
   - `find()` el barbero → marcar horario como `disponible: false`
   - Guardar `estado.turnos` y `estado.barberos` en `localStorage`
   - `Swal.fire({ icon: 'success' })`
   - Resetear selecciones a `null`
   - Volver al paso 1

### Paso 6 — Mis Turnos (`misTurnos.js`)
1. `renderizarTurnos()` usa `map()` para listar turnos
2. Si no hay turnos → "No tenés turnos reservados aún."
3. Botón "Cancelar" en cada turno
4. Click cancelar:
   - `Swal.fire({ icon: 'warning' })` para confirmar
   - Eliminar turno con `filter()`
   - `find()` el barbero → marcar horario como `disponible: true`
   - Guardar en `localStorage`
   - Re-renderizar lista


## 6. Estructura de los JSON

### `servicios.json`

```json
[
  {
    "id": 1,
    "nombre": "Corte de cabello",
    "descripcion": "Corte clásico o moderno a elección.",
    "duracion": 30,
    "precio": 3500
  }
]
```

Mínimo: **4 servicios**

### `barberos.json`

```json
[
  {
    "id": 1,
    "nombre": "Rodrigo Méndez",
    "especialidad": "Cortes modernos",
    "foto": "img/barbero1.jpg",
    "horarios": [
      { "hora": "09:00", "disponible": true },
      { "hora": "10:00", "disponible": true },
      { "hora": "11:00", "disponible": false }
    ]
  }
]
```

Mínimo: **3 barberos** con **6-8 horarios** cada uno.

**Importante:** La disponibilidad del JSON es el estado inicial. Las modificaciones
se guardan en memoria y se persisten en `localStorage` (no hay backend).

---

## 7. Persistencia con localStorage

| Clave | Contenido | Cuándo se guarda |
|-------|-----------|-----------------|
| `"barberbook-turnos"` | `JSON.stringify(estado.turnos)` | Al confirmar o cancelar turno |
| `"barberbook-barberos"` | `JSON.stringify(estado.barberos)` | Al confirmar o cancelar turno (horarios actualizados) |

Al iniciar la app:
```javascript
// Pseudocódigo
const turnosGuardados = localStorage.getItem("barberbook-turnos");
if (turnosGuardados) {
  estado.turnos = JSON.parse(turnosGuardados);
}

const barberosGuardados = localStorage.getItem("barberbook-barberos");
if (barberosGuardados) {
  estado.barberos = JSON.parse(barberosGuardados);
}
```

---

## 8. Convenciones de Código

| Convención | Ejemplo |
|-----------|---------|
| Variables y funciones: **camelCase** | `renderizarServicios`, `estado.barberoSeleccionado` |
| Constantes: **UPPER_SNAKE_CASE** | `CLAVE_TURNOS = "barberbook-turnos"` |
| Clases CSS: **kebab-case** | `.card-servicio`, `.btn-horario` |
| IDs HTML: **kebab-case** | `#seccion-servicios`, `#contenedor-barberos` |
| Un archivo = una responsabilidad | `servicios.js` solo maneja servicios |

---

## 9. Checklist de Entrega

### Funcionalidad

- [ ] Los servicios y barberos se cargan desde archivos `.json` con `fetch()`
- [ ] No hay ningún array de objetos declarado directamente en el código JS
- [ ] El flujo completo funciona: servicio → barbero → horario → confirmación
- [ ] Los turnos se guardan en localStorage y persisten al recargar
- [ ] Al cancelar un turno, el horario vuelve a estar disponible
- [ ] El formulario valida que los campos no estén vacíos

### Métodos de Array

- [ ] `map()` para renderizar servicios, barberos, horarios y turnos
- [ ] `filter()` para mostrar solo horarios disponibles
- [ ] `find()` para obtener barbero/servicio por ID
- [ ] `sort()` para ordenar horarios cronológicamente
- [ ] `reduce()` para calcular precio total

### Librería Externa

- [ ] SweetAlert2 incluida via CDN
- [ ] No hay `alert()`, `confirm()`, `prompt()` nativos en ningún archivo

### Código Limpio

- [ ] No hay `console.log()` en el código final
- [ ] No hay código comentado ni en desuso
- [ ] Cada función tiene un comentario breve
- [ ] El código está separado en múltiples archivos con nombres descriptivos

### Entrega

- [ ] Probado en navegador limpio (incógnito, sin caché)
- [ ] Probado con **Live Server** (fetch no funciona con `file://`)
- [ ] Subido a GitHub con README.md descriptivo
- [ ] Link del repositorio entregado en CoderHouse

---

## 10. Advertencias Críticas

> **⚠️ FETCH Y FILE://**
> `fetch()` no funciona si se abre `index.html` directamente como archivo.
> Usar siempre **Live Server** de VS Code para servir el proyecto.

> **⚠️ LOCALSTORAGE NO ES EL JSON**
> Nunca se modifica el archivo `.json`. Los cambios se guardan en memoria
> y se persisten en `localStorage`. Al recargar, se prioriza `localStorage`
> sobre el JSON original.

> **⚠️ MÓDULOS JS**
> Los archivos JS se cargan con `<script src="...">` al final del `<body>`,
> NO como ES modules (`type="module"`). Esto significa que el orden de los
> scripts importa: `app.js` debe ir primero porque define el `estado`.

---

## 11. Prompts de Desarrollo Sugeridos

Para avanzar con la IA como asistente, usar estos prompts en orden:

| # | Tema | Qué pedir |
|---|------|-----------|
| 1 | HTML base | Estructura `index.html` con secciones del flujo |
| 2 | JSON de datos | `servicios.json` (5 items) + `barberos.json` (3 barberos, 6-8 horarios) |
| 3 | Estado global + fetch | `app.js` con `estado` y `Promise.all()` |
| 4 | Servicios + barberos | `renderizarServicios()` y `renderizarBarberos()` con `map()` |
| 5 | Horarios | `renderizarHorarios()` con `filter()`, `sort()`, `map()` |
| 6 | Confirmación | `confirmarTurno()` con validación, `find()`, localStorage |
| 7 | Cancelación | `cancelarTurno()` con SweetAlert2, `find()`, localStorage |
| 8 | Revisión final | Verificar cumplimiento de consignas |

**Regla de oro:** Siempre pedir que la IA explique la lógica ANTES de generar código.
Así podés entenderlo y defenderlo ante el corrector.
