const inputNombre = document.getElementById("idTxtNombre");
const inputCarnet = document.getElementById("idTxtCarnet");
const inputDUI = document.getElementById("idTxtDUI");
const inputNIT = document.getElementById("idTxtNIT");
const inputEdad = document.getElementById("idTxtEdad");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const btnValidar = document.getElementById("idBtnValidar");
campos = [inputNombre, inputCarnet, inputDUI, inputNIT, inputEdad, inputCorreo, inputFechaNacimiento]

btnValidar.addEventListener("click", () => validarDatos(campos))

function validarDatos(campos) {
    let camposInvalidos = []

    for (let i = 0; i < campos.length; i++){
        camposInvalidos = verificarDato(campos[i], camposInvalidos);
    }


    if (camposInvalidos.length == 0){
        alert("Los datos ingresados son validos")
    }

    else{

        alert("Se han detectado valores invalidos, estos son: \n" + camposInvalidos.join("\n"))
    }

}

function verificarDato(campo, camposInvalidos) {

    let regEx = null


    /* Dado a que todos los ids de los campos tienen el formato "idTxt*", se puede extraer el nombre del campo con
    el segundo valor de campo.id.split("idTxt")
    */
    const nombreCampo = campo.id.split("idTxt")[1]

    switch(nombreCampo){

        case "Nombre":
            regEx =/^[a-z A-Z]+$/
            break

        case "Carnet":
            regEx = /^[A-Za-z]{2}[0-9]{3}$/
            break

        case "DUI":
            regEx = /^[0-9]{8}-[0-9]$/
            break
        case "NIT":
            regEx = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/
            break

        case "Edad":
            regEx = /^[0-9]+$/
            break

        case "FechaNacimiento":
            regEx = /[0-9]{4}-[0-9]{2}-[0-9]{2}/
            break

        case "Correo":
            regEx =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            break
    }

    const contenidoCampo = campo.value

    if(!regEx.test(contenidoCampo)){
        camposInvalidos = [...camposInvalidos, contenidoCampo]
    }

    return camposInvalidos
}