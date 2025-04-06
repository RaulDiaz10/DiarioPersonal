// Index.html

// Obtener elementos del DOM
const loginPopup = document.getElementById("login-popup");
const iniciarSesionBtn = document.querySelector(".iniciar-sesion-btn");
const closeBtn = document.querySelector(".close-btn");
const body = document.body;

// Mostrar el formulario emergente
iniciarSesionBtn.addEventListener("click", () => {
    loginPopup.classList.add("active");
    body.classList.add("popup-active"); 
});

// Ocultar el formulario emergente
closeBtn.addEventListener("click", () => {
    loginPopup.classList.remove("active");
    body.classList.remove("popup-active");
});


// Index inicio

// Index Entradas 

// Index EstadoAnimo

// Index Metas

// Index Configuración 
