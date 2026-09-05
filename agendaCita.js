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

    let duenio = document.getElementById("duenio").value.trim();
    let mascota = document.getElementById("mascota").value.trim();
    let servicioId = document.getElementById("servicio").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let notas = document.getElementById("notas").value.trim();

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
            break;
        }
    }

    // Guardamos con la misma estructura que usa admin.js
    let nuevaCita = {
        id: Date.now(),
        dueno: duenio,          // mismo nombre que en admin.js
        mascota: mascota,
        servicio: servicioNombre, // mismo nombre que en admin.js
        fecha: fecha + 'T' + hora, // formato ISO como en admin.js
        estado: "Pendiente"
    };

    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    citas.push(nuevaCita);

    localStorage.setItem("citas", JSON.stringify(citas));

    document.getElementById("cita-message").textContent = "¡Tu solicitud fue registrada!";

    // Limpiamos el formulario
    document.getElementById("duenio").value = "";
    document.getElementById("mascota").value = "";
    document.getElementById("servicio").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("notas").value = "";

    renderizarCitas();
}

function renderizarCitas() {

    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    listaCitas.innerHTML = "";

    for (let i = 0; i < citas.length; i++) {
        let cita = citas[i];

        // Soporte para estructura nueva (admin) y posible estructura vieja
        let duenioMostrar = cita.dueno || cita.duenio || "Sin dueño";
        let mascotaMostrar = cita.mascota || "Sin mascota";
        let servicioMostrar = cita.servicio || cita.servicioNombre || "Sin servicio";

        let fechaMostrar = cita.fecha || "";
        let horaMostrar = "";

        // Si la fecha viene con hora incluida (ISO)
        if (fechaMostrar.includes("T")) {
            let partes = fechaMostrar.split("T");
            fechaMostrar = partes[0];
            horaMostrar = partes[1] ? partes[1].substring(0, 5) : "";
        } else {
            // Si viene hora separada (estructura antigua)
            horaMostrar = cita.hora || "";
        }

        let estadoMostrar = cita.estado || "Pendiente";

        listaCitas.innerHTML += `
            <div class="cita-item">
                <strong>${mascotaMostrar}</strong> (${duenioMostrar}) - ${servicioMostrar}<br>
                Fecha: ${fechaMostrar}${horaMostrar ? " a las " + horaMostrar : ""}
                <br><span class="estado">${estadoMostrar}</span>
            </div>
        `;
    }
}

renderizarCitas();