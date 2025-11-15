const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnIngresar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");


const idModal = document.getElementById("idModal");


let arrayPaciente = [];



const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    
    inputNombre.focus();
};


const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;
    
    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {

        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );
        

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";

        toast.show();
        

        limpiarForm();
    } else {

        mensaje.innerHTML = "Faltan campos por completar";

        toast.show();
    }
};



function imprimirFilas() {
    let $fila = "";
    let contador = 1;
    
    arrayPaciente.forEach((element) => {
        $fila += `<tr>
                    <td scope="row" class="text-center fa-bold">${contador}</td>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                    <td>
                        <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Eliminar">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                    <td>
                        <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Editar">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </td>
                </tr>`;
        
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <tr>
                            <th scope="col" class="text-center" style="width:5%">#</th>
                            <th scope="col" class="text-center" style="width:15%">Nombre</th>
                            <th scope="col" class="text-center" style="width:15%">Apellido</th>
                            <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                            <th scope="col" class="text-center" style="width:10%">Sexo</th>
                            <th scope="col" class="text-center" style="width:10%">País</th>
                            <th scope="col" class="text-center" style="width:25%">Dirección</th>
                            <th scope="col" class="text-center" style="width:10%">Opciones</th>
                        </tr>
                        ${imprimirFilas()}
                    </table>
                </div>
                `;
    
    document.getElementById("idTablaPacientes").innerHTML = $table;
    asignarEventosBotones();
};


let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;
    
    if (paisNew != "") {

        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;
        

        cmbPais.appendChild(option);
        

        mensaje.innerHTML = "País agregado correctamente";

        toast.show();
    } else {

        mensaje.innerHTML = "Faltan campos por completar";

        toast.show();
    }
};

function eliminarPaciente(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
        arrayPaciente.splice(index, 1); 
        imprimirPacientes(); 
        mensaje.innerHTML = "Paciente eliminado correctamente";
        toast.show();
    }
}


function editarPaciente(index) {
    const paciente = arrayPaciente[index];

    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
        inputRdFemenino.checked = false;
    } else {
        inputRdMasculino.checked = false;
        inputRdFemenino.checked = true;
    }
    cmbPais.value = Array.from(cmbPais.options)
        .find(opt => opt.text === paciente[4])?.value || 0;
    inputDireccion.value = paciente[5];


    arrayPaciente.splice(index, 1);
    imprimirPacientes();

    mensaje.innerHTML = "Edita la información y haz clic en 'Ingresar' para guardar los cambios";
    toast.show();
}

function asignarEventosBotones() {
    arrayPaciente.forEach((_, index) => {
        const btnEliminar = document.getElementById(`idBtnEliminar${index + 1}`);
        const btnEditar = document.getElementById(`idBtnEditar${index + 1}`);

        if (btnEliminar) {
            btnEliminar.onclick = () => eliminarPaciente(index);
        }
        if (btnEditar) {
            btnEditar.onclick = () => editarPaciente(index);
        }
    });
}




buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};


idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});


limpiarForm();
