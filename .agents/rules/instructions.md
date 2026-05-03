# INSTRUCTIONS — Proyecto Final JavaScript CoderHouse

> **Proyecto:** ShopJS — Tienda de Indumentaria / Electrónica Interactiva
> **Modalidad:** Entregable final | **Plazo:** 10 días | **Nivel:** Principiante
> **Stack:** HTML + CSS + JavaScript vanilla (sin frameworks)

---

## 1. OBJETIVO DEL PROYECTO

Construir una aplicación web de e-commerce interactiva donde el usuario pueda:

1. Explorar un catálogo de productos cargado desde un archivo `.json`.
2. Filtrar productos por categoría y ordenarlos por precio.
3. Agregar/quitar productos de un carrito de compras.
4. Aplicar cálculos de subtotal, descuento y total.
5. Simular un proceso de checkout completo con confirmación visual.

**No hay backend.** Todo ocurre en el navegador. La persistencia se logra con `localStorage`.

---

## 2. NIVEL TÉCNICO ESPERADO

| Concepto | Nivel requerido |
|---|---|
| HTML semántico | Básico — saber armar estructura con `div`, `section`, `header`, `main` |
| CSS | Básico — layout limpio y ordenado, no se exige diseño elaborado |
| JavaScript DOM | Intermedio — `createElement`, `innerHTML`, event listeners |
| Fetch API | Básico — un solo `fetch()` al archivo JSON local |
| Métodos de arrays | Intermedio — `map`, `filter`, `find`, `reduce`, `sort` |
| localStorage | Básico — `setItem`, `getItem`, `JSON.parse`, `JSON.stringify` |
| Librerías externas | Básico — integrar SweetAlert2 vía CDN |

### Lo que NO se necesita saber:
- Frameworks (React, Vue, Angular)
- Node.js ni npm
- Backend ni bases de datos
- TypeScript
- Git avanzado (solo push al repositorio)

---

## 3. REQUISITOS OBLIGATORIOS DEL CURSO

Cada requisito del entregable está mapeado a una funcionalidad concreta:

### REQ-1: Manipulación del DOM y eventos
- Todos los elementos HTML se generan o modifican desde JS (`innerHTML`, `createElement`).
- Eventos: `click` en botones de agregar, filtros, cantidad, vaciar carrito, comprar.

### REQ-2: Array de objetos como JSON + Fetch
- El catálogo vive en `data/productos.json`.
- Al cargar la app se hace `fetch()` al JSON.
- **Prohibido** declarar el array de productos directamente en el JS.

### REQ-3: Lógica que complete el circuito de negocio
- Flujo completo: cargar → mostrar → filtrar → agregar al carrito → calcular → checkout → confirmación.

### REQ-4: Librería JS externa
- **SweetAlert2** (CDN: `https://cdn.jsdelivr.net/npm/sweetalert2@11`)
- Reemplaza todo `alert()`, `confirm()` y `prompt()` nativo.
- Usos: confirmar vaciar carrito, resumen de compra, mensaje de éxito, validaciones.

### REQ-5: Código limpio
- Sin `console.log()` en la entrega final.
- Sin `alert()`, `confirm()`, `prompt()` nativos.
- Sin código comentado ni código muerto.
- Comentarios breves y descriptivos en funciones clave.

### REQ-6: Métodos funcionales de arrays

| Método | Uso en el proyecto |
|---|---|
| `map()` | Renderizar la lista de productos en pantalla |
| `filter()` | Filtrar por categoría y rango de precio |
| `find()` | Buscar un producto por ID al agregar al carrito |
| `reduce()` | Calcular el total del carrito |
| `sort()` | Ordenar productos por precio asc/desc |

---

## 4. ESTRUCTURA DE ARCHIVOS

```
proyecto-final/
│
├── index.html              ← Estructura base de la app
├── css/
│   └── styles.css          ← Estilos generales
├── js/
│   ├── app.js              ← Punto de entrada, inicialización
│   ├── productos.js        ← Lógica de carga y renderizado de productos
│   ├── carrito.js          ← Lógica del carrito (agregar, quitar, calcular)
│   ├── filtros.js          ← Lógica de filtros y ordenamiento
│   └── checkout.js         ← Lógica del checkout y confirmación
├── data/
│   └── productos.json      ← Catálogo de productos (10-15 items, 3+ categorías)
└── img/
    └── (imágenes de productos)
```

Separar el código en múltiples archivos es **valorado positivamente** en la corrección de CoderHouse. No meter todo en un solo JS.

---

## 5. ESTRUCTURA DEL JSON

Cada producto en `data/productos.json` debe tener esta forma:

```json
{
  "id": 1,
  "nombre": "Remera Oversize",
  "categoria": "ropa",
  "precio": 12000,
  "imagen": "img/remera-oversize.jpg",
  "descripcion": "Remera de algodón 100%, corte oversize.",
  "stock": 10
}
```

**Mínimo:** 10-15 productos con al menos 3 categorías distintas (ej: `ropa`, `electronica`, `accesorios`).

---

## 6. TECNOLOGÍAS Y HERRAMIENTAS

| Herramienta | Propósito |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Estilos y layout |
| JavaScript ES6+ | Lógica de la aplicación |
| Fetch API | Carga del JSON de productos |
| localStorage | Persistencia del carrito |
| SweetAlert2 (CDN) | Diálogos y confirmaciones |
| Git + GitHub | Control de versiones y entrega |

---

## 7. FLUJO DE LA APLICACIÓN

```
[Carga de página]
       ↓
[fetch() a productos.json]
       ↓
[Guardar datos en variable]
       ↓
  ┌────┴────┐
  ↓         ↓
[Renderizar catálogo]   [Cargar carrito desde localStorage]
  ↓
[Usuario aplica filtros] → [filter() + sort() → re-renderizar]
  ↓
[Usuario clickea "Agregar"]
  ↓
[find() producto por ID]
  ↓
[Agregar al array carrito]
  ↓
[reduce() para calcular total]
  ↓
[Guardar en localStorage]
  ↓
[Renderizar carrito actualizado]
  ↓
[Usuario clickea "Comprar"]
  ↓
[Validar formulario checkout]
  ↓
[SweetAlert2: resumen de compra]
  ↓
[Confirmar → vaciar carrito → éxito]
```

---

## 8. CHECKLIST DE ENTREGA

- [ ] El catálogo se carga desde `.json` con `fetch()`
- [ ] No hay arrays de objetos declarados directamente en el JS
- [ ] Se usa `map()` para renderizar, `filter()` para filtros, `reduce()` para total
- [ ] Se usa `find()` para buscar productos en el carrito
- [ ] Se usa `sort()` para ordenar por precio
- [ ] El carrito funciona: agregar, quitar, vaciar, calcular total
- [ ] El carrito persiste al recargar (`localStorage`)
- [ ] Se incluye SweetAlert2 como librería externa
- [ ] No hay `alert()`, `confirm()` ni `prompt()` nativos
- [ ] No hay `console.log()` en el código final
- [ ] No hay código comentado ni en desuso
- [ ] El checkout valida campos y muestra confirmación
- [ ] El código está en múltiples archivos con nombres descriptivos
- [ ] Hay comentarios breves que explican la lógica de cada función

---

## 9. ESTADO ACTUAL DEL REPOSITORIO

**ADVERTENCIA:** El repositorio actual contiene archivos de ejercicios anteriores del curso (`main.js`, `modulo-5.js`) con código 100% comentado y `console.log` por todos lados. **Estos archivos deben eliminarse o reemplazarse** al iniciar el proyecto final. No forman parte de la entrega.

**Archivos existentes a limpiar:**
- `js/main.js` → Ejercicios sueltos comentados (no sirve para el final)
- `js/modulo-5.js` → Ejercicios de objetos (no sirve para el final)
- `index.html` → Estructura mínima sin contenido (hay que rehacer)
- `Efectivo.png` → Favicon provisional (reemplazar o mantener)
