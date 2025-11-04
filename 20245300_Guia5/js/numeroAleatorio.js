const numeroAleatorio = Math.floor(Math.random() * 25) + 1
const numeroIntentos = 3
let intentos = 1

function generarNumeroAleatorio(){
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos){
        let numero = prompt(
            "¿Que numero se ha generado (intento " + intentos +  ")?"
        );
            if (numero== numeroAleatorio) {
                mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
            } 
            else if (intentos == numeroIntentos) {
                mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`; } 
                
            else if (numero < numeroAleatorio){
                mensaje = `El numero aleatorio es mayor que el numero ingresado. Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos`;
                }

            else if (numero > numeroAleatorio){
                mensaje = `El numero aleatorio es menor que el numero ingresado. Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos`; 
            }

            intentos++;
            } 
            
            else {
                mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
            }

parrafo.innerHTML = mensaje;
}


