// const batman = {
//     nombre: "batman",
//     tipo: "superheroe",
//     poderes: ["inteligencia", "tecnologia", "dinero"],
//     ciudad: "Gotham",
//     edad: 35,
//     esSuperheroe: true,
// }

// // delete batman.nombre;

// console.log(batman);

// ----------------------------------------------------

// // TODO: Crear objeto usuario con las propiedades y valores recibidos
// const usuario = {
//     nombre: "Ana",
//     edad: 30,
//     mail: "ana@example.com"
// }
// // TODO: Modificar la propiedad edad sumando 1
// usuario.edad = 31
// // TODO: Añadir propiedad activo con valor true
// const activo = true
// usuario.situacion = activo
// // TODO: Imprimir las propiedades actualizadas en el formato solicitado
// console.log(usuario)

// ----------------------------------------------------

const estudiantes = [
    {nombre: "santiago", edad: 20},
    {nombre: "mia", edad: 30},
    {nombre: "fabian", edad: 50},
];

estudiantes.push({nombre: "lucas", edad: 40})
delete estudiantes[0].edad;
console.log(estudiantes)