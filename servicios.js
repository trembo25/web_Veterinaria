let Servicios = [
    {
        id: 1,
        nombre: "Consulta General",
        descripcion: "Esquemas de vacunación completos para cachorros y mascotas adultas.",
        icono: "💉"
    },
    {
        id: 2,
        nombre: "Vacunación",
        descripcion: "Procedimientos quirúrgicos ambulatorios realizados por nuestro equipo veterinario certificado.",
        icono: "🔪"
    },
    {
        id: 3,
        nombre: "Cirugía menor",
        descripcion: "Control interno y externo de parásitos, adaptado a la edad y especie de tu mascota.",
        icono: "🐛"
    },
    {
        id: 4,
        nombre: "Desparasitación",
        descripcion: "Seguimiento nutricional para mantener a tu mascota en su peso ideal y prevenir enfermedades.",
        icono: "⚖️"

    },
    {
        id: 5,
        nombre: "Control de Peso",
        descripcion: "Atención médica de emergencia equipada para cualquier imprevisto.",
        icono: "🚑"
    }
];

let lista = document.getElementById("listaServicios");

    for (let i = 0; i < Servicios.length; i++){
        lista.innerHTML += `

            <div>

                <img src="${Servicios[i].imagen}" width="200">
                
                <h2>${Servicios[i].nombre}</h2>

                <p>Precio : $${Servicios[i].precio}</p>

                <button onclick= "verDetalle(${Servicios[i].id})">Ver Detalle
                </button>


            </div>

            <br>
        `;
        
}

function verDetalle(id){

    let productoSeleccionado;

    for (let i = 0; i < Servicios.length; i++){
        if(Servicios[i].id === id){
            productoSeleccionado = Servicios[i];
        }
    }

    localStorage.setItem(
        "producto",
        JSON.stringify(productoSeleccionado)
    );

    window.location.href = "detalleServicio.html";


}