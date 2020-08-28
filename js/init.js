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
var password;
var user;
var rememberCheck;
var elusuariolocal;
var elusuariosession;
var password_input;
var elusuarioinvitado;

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function signOut(googleUser) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
    sessionStorage.removeItem(elusuarioinvitado);
    sessionStorage.removeItem(elusuariosession);
    localStorage.removeItem(elusuariolocal);
}

document.addEventListener("DOMContentLoaded", function(e) {
    let usuario = null;
    if (window.location == "https://r1ch9.github.io/proyect-git/login.html") {} else {
        if (sessionStorage.getItem(elusuarioinvitado) == null) {
            if (sessionStorage.getItem(elusuariosession) == null) {
                if (localStorage.getItem(elusuariolocal) == null) {
                    window.location.href = "https://r1ch9.github.io/proyect-git/login.html";
                }
            }
        }
    }

    if (user == "invitado") {
        alert("invitado");
    } else {
        if (localStorage.getItem(elusuariolocal) != null) {
            alert("local");
        } else {
            if (sessionStorage.getItem(elusuariosession) != null) {
                alert("session");
            }
        }
    }
});