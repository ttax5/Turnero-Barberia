================================================================================
PLAN DE DESARROLLO — PROYECTO FINAL JAVASCRIPT CODERHOUSE
Modalidad: Entregable final | Plazo: 10 días | Nivel: Principiante
================================================================================

--------------------------------------------------------------------------------
SECCIÓN 1 — DESCRIPCIÓN DEL PROYECTO
--------------------------------------------------------------------------------

NOMBRE SUGERIDO: BarberBook — Sistema de Turnos para Barbería

CONCEPTO:
Aplicación web interactiva construida 100% con HTML, CSS y JavaScript vanilla que
simula el sistema de reserva de turnos de una barbería. El usuario puede ver los
servicios disponibles, elegir un barbero, seleccionar un horario libre, completar
sus datos y confirmar su turno. El circuito termina con una confirmación visual
del turno reservado y la posibilidad de cancelarlo.

POR QUÉ ESTE PROYECTO ES IDEAL PARA PORTFOLIO:
- Es un proceso de negocio real y completo (ver servicios → elegir barbero →
  seleccionar horario → confirmar → cancelar).
- Menos frecuente que el e-commerce en portfolios de CoderHouse: se destaca.
- Demuestra manejo de estados, filtros y lógica condicional más allá de un carrito.
- Tiene potencial de expansión: agregar autenticación con Firebase, panel de admin, etc.
- Es un proyecto que cualquier reclutador entiende de un vistazo.

--------------------------------------------------------------------------------
SECCIÓN 2 — REQUISITOS DEL CURSO (mapeados al proyecto)
--------------------------------------------------------------------------------

REQUISITO 1 — Manipulación del DOM y eventos
→ Implementación: Toda la interfaz se genera y actualiza desde JS puro.
   Se usan innerHTML y createElement para renderizar servicios, barberos,
   horarios y el resumen del turno.
   Eventos clave: click en servicio, click en barbero, click en horario disponible,
   submit del formulario de confirmación, click en cancelar turno.

REQUISITO 2 — Arrays de objetos como archivos JSON + Fetch
→ Implementación: Dos archivos JSON separados:
   - "servicios.json": lista de servicios con nombre, duración y precio.
   - "barberos.json": lista de barberos con nombre, foto, especialidad y
     sus horarios disponibles como array interno.
   Al iniciar la app se hacen los fetch() correspondientes y se guardan
   los datos en variables. Nunca declarar estos arrays directamente en el JS.

REQUISITO 3 — Lógica que complete el circuito de negocio
→ Flujo completo:
   a) Cargar servicios y barberos desde JSON con fetch()
   b) El usuario elige un servicio (corte, barba, combo, etc.)
   c) El usuario elige un barbero, viendo solo los disponibles para ese servicio
   d) El usuario elige un horario libre del barbero seleccionado
   e) El usuario completa nombre y teléfono y confirma el turno
   f) El turno queda registrado y el horario se marca como ocupado
   g) El usuario puede ver sus turnos y cancelar uno si lo desea

REQUISITO 4 — Librería JS externa (reemplaza alert/confirm/prompt)
→ Librería recomendada: SweetAlert2
   Razón: Es la más usada en proyectos CoderHouse, se integra por CDN sin
   instalación, y reemplaza completamente los diálogos nativos del navegador.
   CDN: https://cdn.jsdelivr.net/npm/sweetalert2@11
→ Usos en el proyecto:
   - Confirmar antes de cancelar un turno reservado
   - Mostrar el resumen del turno antes de confirmar
   - Mensaje de éxito al reservar el turno
   - Mensaje de error si el usuario intenta avanzar sin completar todos los pasos
   - Mensaje de advertencia si no hay horarios disponibles

REQUISITO 5 — Sin console.log, sin prompt/alert/confirm, sin código comentado
→ Eliminar todos los console.log antes de la entrega final.
→ Reemplazar cualquier alert() o confirm() nativo por Swal.fire().
→ El código entregado debe estar limpio: sin bloques comentados ni código muerto.

REQUISITO 6 — Métodos funcionales de arrays
→ map(): Para renderizar la lista de servicios, barberos y horarios en el DOM.
→ filter(): Para mostrar solo los horarios disponibles (no ocupados) de un barbero.
            También para filtrar barberos por especialidad si se implementa.
→ find(): Para obtener el objeto completo de un barbero o servicio por su ID
          al momento de confirmar el turno.
→ reduce(): Para calcular el precio total si el usuario selecciona más de un
            servicio (ej: corte + barba = combo).
→ sort(): Para ordenar los horarios disponibles de menor a mayor (cronológicamente)
          o para ordenar servicios por precio.

--------------------------------------------------------------------------------
SECCIÓN 3 — ESTRUCTURA DE ARCHIVOS
--------------------------------------------------------------------------------

barberbook/
│
├── index.html                ← Estructura base: secciones para cada paso del flujo
├── css/
│   └── styles.css            ← Estilos generales, variables de color, responsive básico
├── js/
│   ├── app.js                ← Punto de entrada: DOMContentLoaded, fetch inicial, estado global
│   ├── servicios.js          ← Renderizado y selección de servicios
│   ├── barberos.js           ← Renderizado y selección de barberos
│   ├── horarios.js           ← Renderizado de horarios, lógica de disponibilidad
│   ├── reserva.js            ← Formulario de confirmación, guardar turno, localStorage
│   └── misTurnos.js          ← Renderizado de turnos reservados, cancelación
└── data/
    ├── servicios.json        ← Array de servicios disponibles
    └── barberos.json         ← Array de barberos con sus horarios

NOTA: Separar la lógica en módulos por responsabilidad es una buena práctica
valorada en la corrección de CoderHouse. Cada archivo tiene una única función clara.

--------------------------------------------------------------------------------
SECCIÓN 4 — ESTRUCTURA DE LOS JSON
--------------------------------------------------------------------------------

--- servicios.json ---

[
  {
    "id": 1,
    "nombre": "Corte de cabello",
    "descripcion": "Corte clásico o moderno a elección.",
    "duracion": 30,
    "precio": 3500
  },
  {
    "id": 2,
    "nombre": "Arreglo de barba",
    "descripcion": "Perfilado y definición de barba.",
    "duracion": 20,
    "precio": 2000
  },
  {
    "id": 3,
    "nombre": "Combo corte + barba",
    "descripcion": "Corte completo más arreglo de barba.",
    "duracion": 50,
    "precio": 5000
  },
  {
    "id": 4,
    "nombre": "Coloración",
    "descripcion": "Coloración completa o mechas.",
    "duracion": 60,
    "precio": 8000
  }
]

--- barberos.json ---

[
  {
    "id": 1,
    "nombre": "Rodrigo Méndez",
    "especialidad": "Cortes modernos",
    "foto": "img/barbero1.jpg",
    "horarios": [
      { "hora": "09:00", "disponible": true },
      { "hora": "10:00", "disponible": true },
      { "hora": "11:00", "disponible": false },
      { "hora": "14:00", "disponible": true },
      { "hora": "15:00", "disponible": true },
      { "hora": "16:00", "disponible": false }
    ]
  },
  {
    "id": 2,
    "nombre": "Lucas Ferreyra",
    "especialidad": "Barba y perfilado",
    "foto": "img/barbero2.jpg",
    "horarios": [
      { "hora": "09:00", "disponible": false },
      { "hora": "10:30", "disponible": true },
      { "hora": "12:00", "disponible": true },
      { "hora": "15:00", "disponible": true },
      { "hora": "17:00", "disponible": false }
    ]
  }
]

MÍNIMO RECOMENDADO: 4 servicios, 3 barberos, al menos 5 horarios por barbero.

IMPORTANTE: La disponibilidad inicial en el JSON es el punto de partida.
Cuando el usuario reserva un turno, el estado "disponible: false" se actualiza
en el array en memoria (no en el archivo JSON, ya que no hay backend).
Esa actualización se persiste en localStorage para simular el comportamiento real.

--------------------------------------------------------------------------------
SECCIÓN 5 — ESTADO GLOBAL DE LA APLICACIÓN
--------------------------------------------------------------------------------

En app.js se define el objeto de estado que comparte toda la app:

const estado = {
  servicios: [],              // Array cargado desde servicios.json
  barberos: [],               // Array cargado desde barberos.json
  servicioSeleccionado: null, // Objeto del servicio elegido
  barberoSeleccionado: null,  // Objeto del barbero elegido
  horarioSeleccionado: null,  // String con la hora elegida ("10:00")
  turnos: []                  // Turnos reservados, persistidos en localStorage
};

REGLA: Todas las funciones de los otros módulos reciben o modifican este estado.
Nunca usar variables globales sueltas; todo vive dentro del objeto "estado".

--------------------------------------------------------------------------------
SECCIÓN 6 — FLUJO DE LA APLICACIÓN (paso a paso)
--------------------------------------------------------------------------------

PASO 1 — Inicialización (app.js)
- Al dispararse DOMContentLoaded, hacer Promise.all([fetch servicios, fetch barberos]).
- Guardar los resultados en estado.servicios y estado.barberos.
- Cargar los turnos guardados desde localStorage en estado.turnos.
- Si en localStorage hay barberos guardados (con horarios modificados), usar esos
  en lugar de los del JSON original, para mantener la disponibilidad actualizada.
- Llamar a renderizarServicios() para mostrar el primer paso al usuario.
- Mostrar solo la sección del paso 1 (ocultar pasos 2, 3 y 4 con CSS/JS).

PASO 2 — Selección de servicio (servicios.js)
- Función renderizarServicios(): usa map() para generar una card por servicio.
- Cada card muestra nombre, descripción, duración y precio.
- Al hacer click en una card: guardar en estado.servicioSeleccionado, marcar
  visualmente la card como activa, y llamar a renderizarBarberos().
- Mostrar la sección del paso 2.

PASO 3 — Selección de barbero (barberos.js)
- Función renderizarBarberos(): usa map() para generar una card por barbero.
- Cada card muestra foto (o avatar placeholder), nombre y especialidad.
- Al hacer click: guardar en estado.barberoSeleccionado y llamar a renderizarHorarios().

PASO 4 — Selección de horario (horarios.js)
- Función renderizarHorarios(): toma los horarios del barbero seleccionado.
- Usar filter() para obtener solo los horarios con disponible === true.
- Usar sort() para ordenarlos cronológicamente.
- Usar map() para renderizar cada horario como un botón clickeable.
- Los horarios ocupados se muestran deshabilitados (visualmente en gris) para
  que el usuario entienda por qué no puede elegirlos.
- Si no hay horarios disponibles: mostrar mensaje con SweetAlert2 y volver al paso 3.
- Al hacer click en un horario disponible: guardar en estado.horarioSeleccionado
  y mostrar el formulario del paso 4.

PASO 5 — Confirmación del turno (reserva.js)
- Formulario con campos: nombre del cliente y teléfono.
- Al hacer submit:
  a) Validar que los campos no estén vacíos (mostrar error con SweetAlert2 si faltan).
  b) Mostrar resumen con SweetAlert2: servicio elegido, barbero, horario, precio
     y nombre del cliente. Pedir confirmación.
  c) Si el usuario confirma:
     - Crear objeto turno: { id, servicio, barbero, horario, cliente, telefono, precio }
     - Agregar el turno a estado.turnos.
     - Buscar el barbero en estado.barberos con find() y marcar ese horario
       como disponible: false.
     - Guardar estado.turnos en localStorage.
     - Guardar estado.barberos actualizado en localStorage.
     - Mostrar mensaje de éxito con SweetAlert2.
     - Resetear estado.servicioSeleccionado, barberoSeleccionado y horarioSeleccionado a null.
     - Volver al paso 1 y re-renderizar servicios.

PASO 6 — Mis Turnos (misTurnos.js)
- Sección accesible desde el header (botón "Mis turnos").
- Función renderizarTurnos(): usa map() para listar todos los turnos en estado.turnos.
- Cada turno muestra: servicio, barbero, horario, nombre y precio.
- Si no hay turnos: mostrar mensaje "No tenés turnos reservados aún."
- Botón "Cancelar turno" en cada item.
- Al cancelar:
  a) Confirmar con SweetAlert2.
  b) Eliminar el turno del array estado.turnos.
  c) Buscar el barbero con find() y volver a marcar ese horario como disponible: true.
  d) Guardar ambos cambios en localStorage.
  e) Re-renderizar la lista de turnos.

--------------------------------------------------------------------------------
SECCIÓN 7 — PLAN DE 10 DÍAS
--------------------------------------------------------------------------------

DÍA 1 — Setup y estructura base
  - Crear la estructura de carpetas y todos los archivos vacíos.
  - Armar index.html con las secciones del flujo (pasos 1 al 4 + mis turnos).
  - Agregar CDN de SweetAlert2 en el HTML.
  - Crear servicios.json con 4 servicios y barberos.json con 3 barberos.
  - Conectar todos los archivos JS al HTML (scripts al final del body).

DÍA 2 — Fetch e inicialización
  - Implementar el fetch doble en app.js con Promise.all().
  - Definir el objeto estado global con todos sus campos.
  - Verificar que los datos se cargan (usar console.log temporal, eliminar luego).
  - Cargar turnos y barberos actualizados desde localStorage si existen.

DÍA 3 — Estilos base
  - Maquetar header, secciones de pasos y footer.
  - Estilizar las cards de servicios y barberos (grid o flexbox).
  - Definir la lógica de mostrar/ocultar secciones con clases CSS.
  - Paleta de colores sugerida: tonos oscuros (negro, gris carbón, dorado),
    que refuerzan la identidad visual de una barbería.

DÍA 4 — Paso 1 y 2: Servicios y barberos
  - Implementar renderizarServicios() con map().
  - Implementar la selección de servicio y el cambio visual de card activa.
  - Implementar renderizarBarberos() con map().
  - Implementar la selección de barbero y la transición al paso 3.

DÍA 5 — Paso 3: Horarios
  - Implementar renderizarHorarios() con filter() y sort().
  - Mostrar horarios disponibles como botones activos y ocupados como deshabilitados.
  - Manejar el caso de cero horarios disponibles con SweetAlert2.
  - Implementar la selección de horario y la transición al paso 4.

DÍA 6 — Paso 4: Formulario y confirmación
  - Armar el formulario de nombre y teléfono en el HTML.
  - Implementar validación de campos vacíos.
  - Integrar SweetAlert2 para el resumen previo a confirmar.
  - Implementar confirmarTurno(): crear el objeto, actualizar estado y localStorage.
  - Implementar el reset del flujo al volver al paso 1.

DÍA 7 — Sección "Mis Turnos"
  - Implementar renderizarTurnos() con map().
  - Mostrar mensaje si no hay turnos.
  - Implementar cancelarTurno() con confirmación SweetAlert2.
  - Verificar que al cancelar, el horario vuelve a estar disponible.
  - Persistir todos los cambios en localStorage.

DÍA 8 — Integración y pruebas del flujo completo
  - Probar el flujo completo de principio a fin varias veces.
  - Verificar persistencia de turnos al recargar la página.
  - Verificar que los horarios ocupados no se pueden seleccionar.
  - Verificar que cancelar un turno libera correctamente el horario.
  - Corregir bugs de integración entre módulos.

DÍA 9 — Limpieza de código
  - Eliminar todos los console.log de todos los archivos JS.
  - Eliminar todo código comentado y en desuso.
  - Agregar comentarios breves encima de cada función explicando su propósito.
  - Verificar que no quede ningún alert(), prompt() o confirm() nativo.
  - Revisar consistencia de nombres: variables y funciones deben ser descriptivos.

DÍA 10 — Revisión final y entrega
  - Leer las consignas del entregable ítem por ítem y marcar el checklist.
  - Probar en un navegador limpio (modo incógnito, sin caché).
  - IMPORTANTE: El fetch() no funciona si se abre index.html directamente como archivo.
    Siempre usar Live Server de VS Code para servir el proyecto localmente.
  - Subir el proyecto a GitHub con un README básico que describa el proyecto.
  - Entregar el link del repositorio en la plataforma de CoderHouse.

--------------------------------------------------------------------------------
SECCIÓN 8 — CHECKLIST DE ENTREGA
--------------------------------------------------------------------------------

[ ] Los servicios y barberos se cargan desde archivos .json con fetch()
[ ] No hay ningún array de objetos declarado directamente en el código JS
[ ] Se usa map() para renderizar servicios, barberos y horarios en el DOM
[ ] Se usa filter() para mostrar solo los horarios disponibles
[ ] Se usa find() para obtener el objeto de barbero por ID al confirmar o cancelar
[ ] Se usa reduce() para calcular el precio total del turno (si hay múltiples servicios)
[ ] Se usa sort() para ordenar los horarios cronológicamente
[ ] El flujo completo funciona: servicio → barbero → horario → confirmación
[ ] Los turnos se guardan en localStorage y persisten al recargar la página
[ ] Al cancelar un turno, el horario vuelve a estar disponible correctamente
[ ] Se incluye SweetAlert2 como librería JS externa
[ ] No hay alert(), confirm() ni prompt() nativos en ningún archivo
[ ] No hay console.log() en el código final entregado
[ ] No hay código comentado ni en desuso en ningún archivo
[ ] El formulario de confirmación valida que los campos no estén vacíos
[ ] El código está separado en múltiples archivos con nombres descriptivos
[ ] Cada función tiene un comentario breve que explica su propósito

--------------------------------------------------------------------------------
SECCIÓN 9 — CÓMO USAR ESTE DOCUMENTO CON IA
--------------------------------------------------------------------------------

Para avanzar con el desarrollo usando este plan como contexto, pedile a la IA
lo siguiente en este orden. Siempre pegá este documento (o la sección relevante)
antes de cada pregunta para que la IA tenga contexto completo.

PROMPT 1 — Estructura HTML:
"Tengo este plan de desarrollo [pegar este txt]. Armame el index.html base con
las secciones para cada paso del flujo (selección de servicio, barbero, horario,
confirmación y mis turnos). Solo el HTML estructural, sin CSS ni JS todavía."

PROMPT 2 — JSON de datos:
"Según este plan, ayudame a crear servicios.json con 5 servicios y barberos.json
con 3 barberos que tengan entre 6 y 8 horarios cada uno, algunos disponibles y
algunos ocupados. Explicame la estructura antes de generarlo."

PROMPT 3 — Estado global y fetch:
"Implementá app.js con el objeto estado global y el fetch doble usando Promise.all()
para cargar servicios.json y barberos.json. Explicame qué hace Promise.all y por
qué es mejor que dos fetch separados antes de escribir el código."

PROMPT 4 — Servicios y barberos con map():
"Implementá renderizarServicios() en servicios.js y renderizarBarberos() en barberos.js
usando map() para generar las cards. Explicame qué hace map() en este contexto
y cómo se conecta con el estado global antes de escribir el código."

PROMPT 5 — Horarios con filter() y sort():
"Implementá renderizarHorarios() en horarios.js. Usá filter() para mostrar solo
los disponibles y sort() para ordenarlos cronológicamente. Explicame la diferencia
entre filter() y find() antes de escribir el código."

PROMPT 6 — Confirmación de turno y localStorage:
"Implementá confirmarTurno() en reserva.js. Debe validar el formulario, crear el
objeto turno, actualizar el horario a disponible false usando find(), y persistir
todo en localStorage. Explicame cómo funciona localStorage antes de escribir el código."

PROMPT 7 — Cancelación con SweetAlert2:
"Implementá cancelarTurno() en misTurnos.js con confirmación de SweetAlert2.
Al cancelar, el horario debe volver a disponible true y actualizar localStorage.
Mostrá también cómo integrar SweetAlert2 para el resumen previo a confirmar un turno."

PROMPT 8 — Revisión final:
"Revisá este código [pegar fragmento] y decime si cumple con las consignas de
CoderHouse: sin console.log, sin alert nativo, sin código muerto, con los métodos
funcionales de arrays usados correctamente según el plan del proyecto."

CONSEJO IMPORTANTE:
Antes de pedirle a la IA que genere código, pedile siempre que te EXPLIQUE
la lógica primero. Así podés entender qué está haciendo y defenderlo si el
corrector te hace preguntas durante la evaluación del curso.

================================================================================
FIN DEL DOCUMENTO
================================================================================