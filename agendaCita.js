// Recorremos el array de Servicios y creamos las opciones del select
let selectServicio = document.getElementById("servicio");

for (let i = 0; i < Servicios.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = Servicios[i].id;
    opcion.textContent = Servicios[i].nombre;
    selectServicio.appendChild(opcion);
}

// No se pueden agendar citas en fechas pasadas
let hoy = new Date();
let anio = hoy.getFullYear();
let mes = hoy.getMonth() + 1;
let dia = hoy.getDate();

if (mes < 10) {
    mes = "0" + mes;
}
if (dia < 10) {
    dia = "0" + dia;
}

document.getElementById("fecha").min = anio + "-" + mes + "-" + dia;

let listaCitas = document.getElementById("listaCitas");

function guardarCita() {

    // Validamos si el usuario ha iniciado sesión
    let usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para agendar una cita.");
        window.location.href = "login.html";
        return;
    }

    let duenio = document.getElementById("duenio").value;
    let mascota = document.getElementById("mascota").value;
    let servicioId = document.getElementById("servicio").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let notas = document.getElementById("notas").value;

    document.getElementById("cita-message").textContent = "";

    if (duenio === "" || mascota === "" || servicioId === "" || fecha === "" || hora === "") {
        alert("Por favor completa todos los campos obligatorios");
        return;
    }   

    // Buscamos el nombre del servicio seleccionado
    let servicioNombre = "No especificado";

    for (let i = 0; i < Servicios.length; i++) {
        if (Servicios[i].id == servicioId) {
            servicioNombre = Servicios[i].nombre;
        }
    }

    let nuevaCita = {
        duenio: duenio,
        mascota: mascota,
        servicioNombre: servicioNombre,
        fecha: fecha,
        hora: hora,
        notas: notas,
        estado: "Pendiente"
    };

    let citas = JSON.parse(localStorage.getItem("citas"));

    if (citas === null) {
        citas = [];
    }

    citas.push(nuevaCita);

    localStorage.setItem("citas", JSON.stringify(citas));

    document.getElementById("cita-message").textContent = "¡Tu solicitud fue registrada!";

    renderizarCitas();
}

function renderizarCitas() {

    let citas = JSON.parse(localStorage.getItem("citas"));

    if (citas === null) {
        citas = [];
    }

    listaCitas.innerHTML = "";

    for (let i = 0; i < citas.length; i++) {

        listaCitas.innerHTML += `
            <div class="cita-item">
                <strong>${citas[i].mascota}</strong> (${citas[i].duenio}) - ${citas[i].servicioNombre}<br>
                Fecha: ${citas[i].fecha} a las ${citas[i].hora}
                <br><span class="estado">${citas[i].estado}</span>
            </div>
        `;
    }
}

renderizarCitas();