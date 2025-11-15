const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");
const nombre = document.getElementById("idNombre")
const apellidos = document.getElementById("idApellidos")
const fecha = document.getElementById("idFechaNac")
const correo = document.getElementById("idCorreo")
const pass = document.getElementById("idPassword")
const passRep = document.getElementById("idPasswordRepetir")
const pais = document.getElementById("idCmPais");
const carreras = document.querySelectorAll('input[type="radio"');
const archivo = document.getElementById("idArchivo");
const regExCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
fechaActual = new Date()

function validarFormulario() {
    const compFecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
    if (!nombre.value || !apellidos.value || !fecha.value || !correo.value || !pass.value || !passRep.value) {
        alert("Todos los campos de texto deben estar completos.");
        return false;
    }
    if(Date.parse(fecha.value) > compFecha.getTime()){
        alert("La fecha de nacimiento no puede ser despues del día actual")
        return false
    }

    if(!regExCorreo.test(correo.value)){
        alert("Ingrese un correo valido")
        return false
    }

    if(pass.value != passRep.value){
        alert("Las contraseñas son diferentes")
        return false
    }


    if (pais.value === "Seleccione una opcion") {
        alert("Debe seleccionar un país.");
        return false;
    }


    const intereses = [
        "idCkProgramacion", "idCkBD", "idCkRedes", "idCkSeguridad"
    ];

    const algunInteres = intereses.some(id => document.getElementById(id).checked);

    if (!algunInteres) {
        alert("Debe seleccionar al menos un interés.");
        return false;
    }


    let isChecked = false;

    carreras.forEach(carrera => {
        if (carrera.checked) {
            isChecked = true;
        }
    });
    if(!isChecked){
        alert("Debe elegir una carrera")
        return false
    }


    if (!archivo.value) {
        alert("Debe seleccionar una imagen.");
        return false;
    }

    return true; 
}

function crearTabla() {

    if (!validarFormulario()) return; 

    const contenedor = document.getElementById("idContenedorTabla");
    contenedor.innerHTML = "";


    const tabla = document.createElement("table");
    tabla.className = "table table-striped table-bordered";

    const tbody = document.createElement("tbody");


    function agregarFila(titulo, valor) {
        const tr = document.createElement("tr");

        const th = document.createElement("th");
        th.textContent = titulo;

        const td = document.createElement("td");
        td.textContent = valor;

        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    let intereses = []
    if (document.getElementById("idCkProgramacion").checked) intereses = [...intereses, "Programación"]
    if (document.getElementById("idCkBD").checked) intereses = [...intereses, "Bases de datos"]
    if (document.getElementById("idCkRedes").checked) intereses = [...intereses, "IA"];
    if (document.getElementById("idCkSeguridad").checked) intereses = [...intereses, "CyberSeguridad"];


    const carrera = document.querySelector("input[name='idRdCarrera']:checked").nextElementSibling.textContent;


    const pais = document.getElementById("idCmPais").selectedOptions[0].text;


    agregarFila("Nombres", nombre.value);
    agregarFila("Apellidos", apellidos.value);
    agregarFila("Fecha de nacimiento", fecha.value);
    agregarFila("Correo", correo.value);
    agregarFila("Intereses", intereses.join(", "));
    agregarFila("Carrera", carrera);
    agregarFila("País de origen", pais);

    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
}

const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;
    

    let elementos = formulario.elements;
    let totalElementos = elementos.length;
    
    for (let index = 0; index < totalElementos; index++) {

        let elemento = elementos[index];
        

        let tipoElemento = elemento.type;

        let tipoNode = elemento.nodeName;

        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }

        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }

        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }

        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }

        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }

        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }

        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }

        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }
    
    let resultado = `
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>
    `;
    
    bodyModal.innerHTML = resultado;

    modal.show();
};



button.onclick = () => {
    crearTabla();
};