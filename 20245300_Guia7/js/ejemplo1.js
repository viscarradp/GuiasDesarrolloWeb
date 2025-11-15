const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");


const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");


const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const btnVerificarDatos = document.getElementById("idBtnVerificar")

const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();

    } 
    
    else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function () {

    if(verificarId()){
        return
    }
    let addElemento = document.createElement("select");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");
    
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;
    
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-floating");
    
    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);
    

    newForm.appendChild(labelId);
    

    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {

    if(verificarId()){
        return
    }

    let addElemento = document.createElement("input");



    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;
    

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-check");
    

    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);
    

    newForm.appendChild(labelId);
    

    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {

    if(verificarId()){
        return
    }

    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");
    

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);
    

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");
    

    labelElemento.textContent = tituloElemento.value;
    

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);
    

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-floating mb-3");
    

    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);
    

    newForm.appendChild(labelId);
    

    newForm.appendChild(divElemento);
};

const verificarId = function (){
        if(document.getElementById(`id${nombreElemento.value}`)){
        alert("Ya existe un elemento con ese ID")
        return true
    }
}

const validarDatos = function(){    
    let datosIngresados = []
    const campos = newForm.children
    for(let i = 1; i < campos.length; i+=2){
        const campo = campos[i].children;

        const label = campo[1];
        
        const valor = campo[0];

        let dato = ""
        
        if (valor.type == "checkbox" || valor.type == "radio"){
            dato = "Si"
        }

        else{
            dato = valor.value
        }



        if(valor.value){
            datosIngresados = [...datosIngresados, `${label.textContent}: ${dato}`];
        };
    }

    alert(`Datos ingresados: \n ${datosIngresados.join("\n")}`);
}

buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;
        
        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

btnVerificarDatos.onclick = () => validarDatos()


document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});

