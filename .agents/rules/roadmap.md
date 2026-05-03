# ROADMAP — Proyecto Final JavaScript CoderHouse

> **Plazo total:** 10 días | **Inicio estimado:** 3 de mayo 2026
> **Entrega:** 13 de mayo 2026

---

## VISIÓN GENERAL

```
DÍA 1 ──── Setup y estructura base
DÍA 2 ──── Fetch + renderizado de productos
DÍA 3 ──── Estilos CSS
DÍA 4 ──── Sistema de filtros
DÍA 5 ──── Carrito (agregar y eliminar)
DÍA 6 ──── Carrito (cálculos y persistencia)
DÍA 7 ──── Checkout
DÍA 8 ──── Integración y pruebas
DÍA 9 ──── Limpieza de código
DÍA 10 ─── Revisión final y entrega
```

---

## DÍA 1 — Setup y estructura base

### Objetivo
Tener el esqueleto completo del proyecto con todos los archivos creados y conectados.

### Tareas

- [ ] **1.1** Limpiar el repositorio actual
  - Eliminar `js/main.js` (ejercicios viejos)
  - Eliminar `js/modulo-5.js` (ejercicios viejos)
  - Decidir si mantener o reemplazar `Efectivo.png`

- [ ] **1.2** Crear la estructura de carpetas
  ```
  css/styles.css
  js/app.js
  js/productos.js
  js/carrito.js
  js/filtros.js
  js/checkout.js
  data/productos.json
  img/
  ```

- [ ] **1.3** Armar el `index.html` base
  - Estructura semántica: `header`, `main`, `section`, `footer`
  - Contenedores vacíos con IDs para que JS los llene:
    - `#catalogo` → donde se renderizan los productos
    - `#filtros` → controles de filtro
    - `#carrito` → sidebar o sección del carrito
    - `#checkout` → formulario de compra
  - Incluir CDN de SweetAlert2
  - Conectar todos los archivos `.js` con `defer`
  - Conectar `css/styles.css`

- [ ] **1.4** Crear `data/productos.json` con 10-15 productos
  - Mínimo 3 categorías: `ropa`, `electronica`, `accesorios`
  - Cada producto con: `id`, `nombre`, `categoria`, `precio`, `imagen`, `descripcion`, `stock`
  - Usar imágenes placeholder por ahora (después se reemplazan)

- [ ] **1.5** Verificar que todo carga sin errores en el navegador

### Conceptos clave del día
- Estructura de proyecto
- HTML semántico
- Cómo conectar múltiples archivos JS

---

## DÍA 2 — Fetch + renderizado de productos

### Objetivo
Que los productos del JSON aparezcan en pantalla como tarjetas.

### Tareas

- [ ] **2.1** En `app.js`: escuchar `DOMContentLoaded`
  - Hacer `fetch("data/productos.json")`
  - Guardar el resultado en una variable
  - Llamar a `renderizarProductos()`

- [ ] **2.2** En `productos.js`: crear función `renderizarProductos(lista)`
  - Recibe un array de productos
  - Usa `map()` para generar el HTML de cada card
  - Cada card muestra: imagen, nombre, precio, categoría, botón "Agregar"
  - Inserta el HTML en `#catalogo`

- [ ] **2.3** Verificar que las cards se muestran correctamente

### Conceptos clave del día
- `fetch()` y promesas (`.then()`)
- `map()` para transformar datos en HTML
- `innerHTML` para inyectar contenido

### Método de array usado: `map()`

---

## DÍA 3 — Estilos CSS

### Objetivo
Que la app se vea limpia, ordenada y presentable.

### Tareas

- [ ] **3.1** Definir estilos base en `css/styles.css`
  - Reset básico (`* { margin: 0; padding: 0; box-sizing: border-box }`)
  - Variables CSS para colores, fuentes y espaciados
  - Fuente de Google Fonts (ej: Inter, Roboto)

- [ ] **3.2** Estilar el header
  - Logo/nombre de la tienda
  - Ícono de carrito con contador

- [ ] **3.3** Estilar las cards de productos
  - Grid o Flexbox para el layout del catálogo
  - Imagen, nombre, precio, botón de agregar
  - Hover effects en las cards

- [ ] **3.4** Estilar la zona de filtros
  - Botones de categoría o select
  - Selector de ordenamiento

- [ ] **3.5** Estilar el carrito (sidebar o sección)
  - Lista de items
  - Botones de eliminar
  - Total y botón de comprar

- [ ] **3.6** Responsive básico
  - Que se vea bien en desktop y mobile

### Conceptos clave del día
- CSS Grid / Flexbox
- Variables CSS
- Diseño responsive

---

## DÍA 4 — Sistema de filtros

### Objetivo
Que el usuario pueda filtrar por categoría y ordenar por precio.

### Tareas

- [ ] **4.1** En `filtros.js`: crear filtro por categoría
  - Botones o `select` con las categorías del JSON
  - Opción "Todos" para mostrar todo
  - Usar `filter()` sobre el array de productos
  - Llamar a `renderizarProductos()` con el resultado filtrado

- [ ] **4.2** En `filtros.js`: crear ordenamiento por precio
  - `select` con opciones: "Menor a Mayor", "Mayor a Menor"
  - Usar `sort()` sobre el array
  - Re-renderizar después de ordenar

- [ ] **4.3** Que filtro + orden funcionen combinados
  - Primero filtrar, después ordenar, después renderizar

- [ ] **4.4** Probar con distintas combinaciones

### Conceptos clave del día
- `filter()` — devuelve un array nuevo con los elementos que cumplen la condición
- `sort()` — ordena el array (modifica el original, cuidado)
- Composición de operaciones sobre arrays

### Métodos de array usados: `filter()`, `sort()`

---

## DÍA 5 — Carrito (agregar y eliminar)

### Objetivo
Que el usuario pueda agregar productos al carrito y verlos reflejados en pantalla.

### Tareas

- [ ] **5.1** En `carrito.js`: definir array `carrito = []`
  - Cada item: `{ id, nombre, precio, cantidad }`

- [ ] **5.2** Crear función `agregarAlCarrito(id)`
  - Usar `find()` para verificar si el producto ya está en el carrito
  - Si existe: sumar 1 a la cantidad
  - Si no existe: agregarlo con cantidad 1
  - Llamar a `renderizarCarrito()` después

- [ ] **5.3** Crear función `renderizarCarrito()`
  - Mostrar lista de items del carrito en el DOM
  - Cada item muestra: nombre, precio unitario, cantidad, botón eliminar
  - Mostrar el total

- [ ] **5.4** Crear función `eliminarDelCarrito(id)`
  - Remover el item del array
  - Re-renderizar

- [ ] **5.5** Mostrar contador de items en el ícono del carrito (header)

- [ ] **5.6** Conectar el botón "Agregar" de cada card con `agregarAlCarrito()`

### Conceptos clave del día
- `find()` — busca un elemento en un array por condición
- Event delegation (si los botones se generan dinámicamente)
- Actualizar el DOM en respuesta a cambios de datos

### Método de array usado: `find()`

---

## DÍA 6 — Carrito (cálculos y persistencia)

### Objetivo
Que el total se calcule automáticamente y el carrito sobreviva al recargar la página.

### Tareas

- [ ] **6.1** Crear función `calcularTotal()`
  - Usar `reduce()` para sumar `precio * cantidad` de cada item
  - Devolver el total
  - Mostrar el total formateado en el DOM

- [ ] **6.2** Persistir carrito en `localStorage`
  - En cada modificación del carrito: `localStorage.setItem("carrito", JSON.stringify(carrito))`
  - Al cargar la app: verificar si hay carrito guardado con `localStorage.getItem("carrito")`
  - Si hay datos: parsear con `JSON.parse()` y cargar en la variable

- [ ] **6.3** Botón "Vaciar carrito"
  - Al clickear: mostrar confirmación con **SweetAlert2** (no `confirm()`)
  - Si el usuario confirma: vaciar el array y limpiar `localStorage`
  - Re-renderizar

- [ ] **6.4** Probar: agregar items → recargar página → verificar que persisten

### Conceptos clave del día
- `reduce()` — acumula un valor recorriendo el array
- `localStorage` — almacenamiento persistente en el navegador
- `JSON.stringify()` / `JSON.parse()` — serialización de datos
- Primera integración con SweetAlert2

### Método de array usado: `reduce()`

---

## DÍA 7 — Checkout

### Objetivo
Simular el proceso de compra completo con formulario y confirmación.

### Tareas

- [ ] **7.1** En `checkout.js`: crear formulario de checkout
  - Campos: nombre, email, dirección
  - Solo frontend, sin backend
  - Puede ser una sección oculta que se muestra al clickear "Comprar"

- [ ] **7.2** Validar que los campos no estén vacíos
  - Si hay campos vacíos: mostrar error con SweetAlert2
  - No usar `alert()` nativo

- [ ] **7.3** Mostrar resumen de compra con SweetAlert2
  - Lista de items + cantidades + total
  - Botones "Confirmar" y "Cancelar"

- [ ] **7.4** Al confirmar la compra:
  - Vaciar el carrito (variable + localStorage)
  - Mostrar mensaje de éxito con SweetAlert2
  - Resetear la vista (ocultar checkout, volver al catálogo)

- [ ] **7.5** Probar el flujo completo

### Conceptos clave del día
- Validación de formularios desde JS
- SweetAlert2: `Swal.fire()` con opciones avanzadas
- Flujo completo de una transacción simulada

---

## DÍA 8 — Integración y pruebas

### Objetivo
Verificar que todo funciona correctamente de principio a fin.

### Tareas

- [ ] **8.1** Probar el flujo completo:
  1. Abrir la app → ¿se cargan los productos?
  2. Filtrar por categoría → ¿se muestran los correctos?
  3. Ordenar por precio → ¿funciona asc y desc?
  4. Agregar al carrito → ¿aparece el item?
  5. Agregar el mismo item de nuevo → ¿suma cantidad?
  6. Eliminar un item → ¿desaparece?
  7. Recargar la página → ¿persiste el carrito?
  8. Vaciar carrito → ¿muestra confirmación?
  9. Comprar → ¿muestra resumen y mensaje de éxito?
  10. Después de comprar → ¿carrito vacío?

- [ ] **8.2** Probar edge cases:
  - ¿Qué pasa si el carrito está vacío y se hace click en "Comprar"?
  - ¿Qué pasa si el JSON no se puede cargar? (error en fetch)
  - ¿Se ve bien en distintos tamaños de pantalla?

- [ ] **8.3** Corregir los bugs encontrados

- [ ] **8.4** Ajustes de CSS si algo se ve mal

### Conceptos clave del día
- Testing manual
- Manejo de errores
- Edge cases

---

## DÍA 9 — Limpieza de código

### Objetivo
Dejar el código listo para corrección: limpio, sin residuos, con comentarios.

### Tareas

- [ ] **9.1** Eliminar TODOS los `console.log()`
  - Buscar en todos los archivos JS
  - No debe quedar ninguno

- [ ] **9.2** Eliminar código comentado
  - No deben quedar bloques de código comentado
  - Solo dejar comentarios descriptivos de funciones

- [ ] **9.3** Verificar que NO haya `alert()`, `prompt()` ni `confirm()` nativos
  - Todos deben estar reemplazados por SweetAlert2

- [ ] **9.4** Agregar comentarios descriptivos
  - Cada función debe tener un comentario breve explicando qué hace
  - Formato: `// Renderiza las cards de productos en el catálogo`

- [ ] **9.5** Revisar nombres de variables y funciones
  - Que sean descriptivos y en español (coherente con el proyecto)
  - Que sigan una convención consistente (camelCase)

- [ ] **9.6** Verificar indentación y formato consistente

### Conceptos clave del día
- Código limpio y mantenible
- Buenas prácticas de nombrado
- Preparación para code review

---

## DÍA 10 — Revisión final y entrega

### Objetivo
Verificar cada punto del checklist, probar en limpio y entregar.

### Tareas

- [ ] **10.1** Repasar el checklist del `instructions.md` ítem por ítem

- [ ] **10.2** Probar en navegador limpio
  - Abrir en ventana de incógnito (sin caché ni localStorage previo)
  - Verificar que el fetch carga correctamente
  - Probar flujo completo una vez más

- [ ] **10.3** Revisar la consola del navegador
  - No deben aparecer errores
  - No deben aparecer warnings relevantes

- [ ] **10.4** Commit final y push a GitHub
  ```bash
  git add .
  git commit -m "Entrega final - Proyecto JavaScript CoderHouse"
  git push origin main
  ```

- [ ] **10.5** Verificar que el repositorio en GitHub tiene todos los archivos

- [ ] **10.6** Entregar el link del repositorio en CoderHouse

---

## RESUMEN DE MÉTODOS DE ARRAY POR DÍA

| Día | Método | Archivo | Función |
|-----|--------|---------|---------|
| 2 | `map()` | `productos.js` | `renderizarProductos()` |
| 4 | `filter()` | `filtros.js` | Filtrado por categoría |
| 4 | `sort()` | `filtros.js` | Ordenamiento por precio |
| 5 | `find()` | `carrito.js` | `agregarAlCarrito()` |
| 6 | `reduce()` | `carrito.js` | `calcularTotal()` |

---

## RESUMEN DE SWEETALERT2 POR DÍA

| Día | Uso | Función |
|-----|-----|---------|
| 6 | Confirmar "Vaciar carrito" | `Swal.fire()` con `showCancelButton: true` |
| 7 | Error de validación | `Swal.fire()` con `icon: "error"` |
| 7 | Resumen de compra | `Swal.fire()` con HTML personalizado |
| 7 | Éxito de compra | `Swal.fire()` con `icon: "success"` |

---

## NOTAS FINALES

1. **No apurarse.** Cada día tiene un objetivo claro. Si un día lleva más tiempo, está bien ajustar.
2. **Probar después de cada cambio.** No acumular código sin verificar que funciona.
3. **Commitear seguido.** Al menos un commit por día con un mensaje descriptivo.
4. **Entender antes de avanzar.** Si un concepto no queda claro, detenerse y preguntar.
5. **El CSS no es lo principal.** Que se vea limpio alcanza. El foco está en el JavaScript.
