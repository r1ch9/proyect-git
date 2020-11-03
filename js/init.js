const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var googleUser;
var corrPass = false;
var corrUser = false;
var imprPass = '';
var password, user, rememberCheck, elusuariolocal, elusuariosession, password_input, elusuarioinvitado, usuarioIniciado, isUserInvitado, objetoPerfil;

function cambiarFondo(ids) {
    document.getElementById(ids).style.color = 'grey';
    document.getElementById(ids).style.backgroundColor = '#343a40';
}

function volverFondo(ids) {
    document.getElementById(ids).style.backgroundColor = '#343a40';
    document.getElementById(ids).style.color = 'white';
}

function setearInvitado() {
    sessionStorage.setItem(elusuarioinvitado, user);
}

//Mostrar spinner.
var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

//Ocultar spinner.
var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

//Obtener objeto de JSON.
var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

//Cerrar sesion por botón de google.
function signOut(googleUser) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
    sessionStorage.removeItem(elusuarioinvitado);
    sessionStorage.removeItem(elusuariosession);
    localStorage.removeItem(elusuariolocal);
}

//Elimina los datos de sesión iniciado y redirecciona a login.html
function cerrarSesion() {
    sessionStorage.removeItem(elusuarioinvitado);
    sessionStorage.removeItem(elusuariosession);
    localStorage.removeItem(elusuariolocal);
    localStorage.removeItem(objeto);
    window.location.href = "https://r1ch9.github.io/proyect-git/login.html";
}

//Cambiar tema de la pagina web.
function cambiarTema() {
    alert("En desarrollo...");
}

function mouseArriba() {
    if (isUserInvitado == true) {
        document.getElementById('UsrLogged').innerText = "Iniciar Sesión";
    } else {
        document.getElementById('UsrLogged').innerText = "Cerrar Sesión";
    }
}

function notMouseArriba() {
    document.getElementById('UsrLogged').textContent = usuarioIniciado;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    //Secuencia de redireccionamiento en caso de que no haya un usuario logeado.
    /*if (window.location == "https://r1ch9.github.io/proyect-git/login.html") {} else {
        if (sessionStorage.getItem(elusuarioinvitado) == null) {
            if (sessionStorage.getItem(elusuariosession) == null) {
                if (localStorage.getItem(elusuariolocal) == null) {
                    window.location.href = "https://r1ch9.github.io/proyect-git/login.html";
                }
            }
        }
    }*/

    //Impresion de nombre de usuario en la navbar en el dropbox usuario.
    if (localStorage.getItem(elusuariolocal) != null) {
        usuarioIniciado = localStorage.getItem(elusuariolocal);
        document.getElementById('UsrLogged').textContent = usuarioIniciado;
    } else {
        if (sessionStorage.getItem(elusuariosession) != null) {
            usuarioIniciado = sessionStorage.getItem(elusuariosession);
            document.getElementById('UsrLogged').textContent = usuarioIniciado;
        }
    }

    //Boton que deshabilita el acceso al carrito en caso de que el usuario no haya iniciado sesion.
    if (sessionStorage.getItem(elusuarioinvitado) == undefined) {
        document.getElementById('carritoBoton').disabled = true;
    } else {
        if (sessionStorage.getItem(elusuarioinvitado) != undefined) {
            document.getElementById('carritoBoton').disabled = false;
        }
    }

});