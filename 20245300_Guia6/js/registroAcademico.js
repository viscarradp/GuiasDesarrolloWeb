document.addEventListener("DOMContentLoaded", function () { 
  const containerEstudiantes = document.querySelector("#idContainerEstudiantes");
  const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante"); 
  const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");

  btnAddEstudiante.addEventListener("click", addEstudiantes); 
  btnViewEstudiantes.addEventListener("click", viewEstudiantes);

  let arrayEstudiantes = [];

  function addEstudiantes() {
    const inputCarnet = document.querySelector("#inputCarnet").value.trim().toUpperCase();
    const inputNombre = document.querySelector("#inputNombre").value.trim().toUpperCase();
    const inputApellidos = document.querySelector("#inputApellidos").value.trim().toUpperCase();

    if (inputCarnet && inputNombre && inputApellidos) { 
      arrayEstudiantes.push([inputCarnet, inputNombre, inputApellidos]);

      alert("Se registró el nuevo estudiante"); 

      // Clear inputs
      document.querySelector("#inputCarnet").value = "";
      document.querySelector("#inputNombre").value = "";
      document.querySelector("#inputApellidos").value = "";
      document.querySelector("#inputCarnet").focus();
    } 
    else {
      alert("Faltan campos que completar");
    }
  }

  function viewEstudiantes() {
    const totalEstudiantes = arrayEstudiantes.length; 
    if (totalEstudiantes > 0) {
      let table = `
        <table class='table table-light table-striped'>
          <thead>
            <tr>
              <th scope='col' style='width: 5%;'>#</th>
              <th scope='col' style='width: 15%;'>Carnet</th>
              <th scope='col'>Nombres</th>
              <th scope='col'>Apellidos</th>
            </tr>
          </thead>
          <tbody>
      `;

      for (let i = 0; i < totalEstudiantes; i++) {
        const [carnet, nombres, apellidos] = arrayEstudiantes[i];
        table += `
          <tr>
            <td scope='row' style='font-weight: bold;'>${i + 1}</td>
            <td>${carnet}</td>
            <td>${nombres}</td>
            <td>${apellidos}</td>
          </tr>
        `;
      }

      table += `
          </tbody>
        </table>
      `;

      containerEstudiantes.innerHTML = table;
    } 
    else {
      alert("No se han registrado estudiantes");
    }
  }
});
