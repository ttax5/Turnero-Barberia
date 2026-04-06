// // ejercicio 1

// // let numero = parseInt(prompt("ingresa un numero"))

// // if (numero > 0) {
// // console.log ("el numero es positivo")
// // } else if (numero < 0) {
// //     console.log ("el numero es negativo")
// // }
// // else {
// //     console.log ("el numero es cero")
// // }

// // ejercicio 2

// // let numero = parseInt(prompt("ingresa un numero"))
// // console.log ("tabla de multiplicar de " + numero)
// // for (let i=1; i<=10; i++){
// //     let resultado = i*numero
// //     console.log("el "+numero, "por "+i, "= "+resultado)
// // }

// // ejercicio 3

// // let numero = parseInt(prompt("ingrese un numero: "))
// // let contador = 0

// // while (numero > 0){
// //     numero = Math.floor(numero / 10 )
// //     contador++
// // }
// // console.log("el numero tiene " + contador + " digitos")

// //ejercicio 4

// // let contraseña = null

// // for (i=1; i<=5; i++){
// //    contraseña = prompt("ingrese su contraseña: ")
// //     if (contraseña === "ladron") {
// //         console.log ("alarma activada")
// //         break;
// //     }
// // console.log("intento numero "+i," fallido")
// // }

// // ejercicio 7

// for (let i = 1; i <= 10; i++){
//     if(i===4 || i===7){
//         console.log("no me gustan estos numeros")
//         continue;
//     }

//     console.log("numero "+i)
// }

// ejercicio 8

// function sumar(){
//     let x = parseInt(prompt("ingresa un numero: "))
//     let y = parseInt(prompt("ingresa otro numero: "))

//     let resultado = x + y
//     return resultado
// }

// console.log(sumar())

//ejercio 9

// let nombreUsuario = prompt("A continuacion ingrese su nombre: ")
// let edadUsuario = parseInt(prompt ("A continuacion ingrese su edad: "))

// function ArmadoSaludos(nombreUsuario, edadUsuario) {
//     if (!nombreUsuario){
//         return "error, ingrese un nombre"
//     }
//      if (!edadUsuario){
//         return "error, ingrese una edad"
//     }

//     let mensajeArmado = "hola " + nombreUsuario + " tenes " + edadUsuario + "años, pete"

//     return mensajeArmado;
// }

// console.log (ArmadoSaludos())

// ejercicio calculdora

//   function calcular(numeroA, numeroB, tipoOperacion) {
//     switch (tipoOperacion) {
//       case 1:
//         return numeroA + numeroB;
//       case 2:
//         return numeroA - numeroB;
//       case 3:
//         return numeroA * numeroB;
//       case 4:
//         return numeroA / numeroB;
//       case 5:
//         break;
//       default:
//         return "error: opcion no valida";
//     }
//   }

// let seguirjugando = true;
// while (seguirjugando) {
//   let tipoOperacion = parseInt(
//     prompt("1: suma 2: resta 3: multiplicacion 4: division"),
//   );

//   let numeroA = parseInt(prompt("ingrese primer numero: "));
//   let numeroB = parseInt(prompt("ingrese segundo numero: "));
//   let salir =  parseInt(prompt("quieres salir? escriba si o 5"))

//   if(salir === "si" || 5 ){
//     seguirjugando = false
//   }

//   console.log(calcular(numeroA, numeroB, tipoOperacion));
// }

// ejercicio sumar array

// let base = 0;
// const Numeros = [1, 2, 3, 4, 5];

// for (const numero of Numeros) {
  
//   base = base + numero;
// }

// console.log(base);


