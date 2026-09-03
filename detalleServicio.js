let servicio = JSON.parse(localStorage.getItem("servicioSeleccionado"));

document.getElementById("icono").textContent = servicio.icono;
document.getElementById("nombre").textContent = servicio.nombre;
document.getElementById("descripcion").textContent = servicio.descripcionLarga;