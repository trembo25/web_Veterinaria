let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

let linkLogin = document.getElementById("login-nav");
let menuDesplegable = document.getElementById("menu-desplegable");
let botonLogout = document.getElementById("logout-nav");

if (usuarioLogueado && linkLogin) {

    linkLogin.textContent = usuarioLogueado.username;
    linkLogin.href = "#";

    linkLogin.onclick = function (event) {
        event.preventDefault();
        menuDesplegable.classList.toggle("oculto");
    };

    botonLogout.onclick = function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "index.html";
    };
}