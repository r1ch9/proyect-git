//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
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

function checkInput() {
    rememberCheck = document.getElementById("checkRemember").checked;
    checkUser();
    checkPassword();
    sessionStorage.removeItem(elusuarioinvitado);
    if (rememberCheck) {
        localStorage.setItem(elusuariolocal, document.getElementById("userName").value);
        sessionStorage.removeItem(elusuariosession);
    } else {
        sessionStorage.setItem(elusuariosession, document.getElementById("userName").value);
        localStorage.removeItem(elusuariolocal);
    }
    if (corrPass && corrUser) {
        window.location.href = "https://r1ch9.github.io/proyect-git/";
    }
}

function checkPassword() {
    password = document.getElementById("inputpwd").value;

    if (password == '') {
        imprPass = ' <p id = "mensajeUserP" > La contraseña no puede estar vacía.</p>'
        document.getElementById('imprimiraca').innerHTML = imprPass;
        document.getElementById('imprimiraca').style.visibility = 'visible';
        corrPass = false;
    } else {
        if (password.length < 5) {
            imprPass = ' <p id = "mensajeUserP" > La contraseña debe tener mas de 4 digitos.</p>'
            document.getElementById('imprimiraca').innerHTML = imprPass;
            document.getElementById('imprimiraca').style.visibility = 'visible';
            corrPass = false;
        } else {
            if (password.length > 12) {
                imprPass = ' <p id = "mensajeUserP" > La contraseña no puede tener mas de 12 digitos.</p>'
                document.getElementById('imprimiraca').innerHTML = imprPass;
                document.getElementById('imprimiraca').style.visibility = 'visible';
                corrPass = false;
            } else {
                document.getElementById('imprimiraca').style.visibility = 'hidden';
                corrPass = true;
            }
        }
    }

}

function CapsLock() {
    password_input = document.getElementById("inputpwd");

    password_input.addEventListener("keyup", function(event) {
        imprPass = '<p id="mensajeUserP" >¡Cuidado, Bloq. Mayus está activado!</p>';
        if (event.getModifierState("CapsLock")) {
            document.getElementById('imprimiraca').innerHTML = imprPass;
            document.getElementById('imprimiraca').style.visibility = 'visible';
        } else {
            document.getElementById('imprimiraca').style.visibility = 'hidden';
        }
    });
}

function checkUser() {
    var user = document.getElementById("userName").value;

    if (user == '') {
        imprPass = '<p id="mensajeUser">El campo "Usuario" no puede estar vacío.</p>'
        document.getElementById('mensajeUser').innerHTML = imprPass;
        document.getElementById('mensajeUser').style.visibility = 'visible';
        corrUser = false;
    } else {
        document.getElementById('mensajeUser').style.visibility = 'hidden';
        corrUser = true;
    }
}

function ingresoComoInvitado() {
    user = "invitado";
    sessionStorage.setItem(elusuarioinvitado, user);
    window.location.href = "https://r1ch9.github.io/proyect-git/";
}



document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById('mensajeUser').style.visibility = 'hidden';
    document.getElementById('imprimiraca').style.visibility = 'hidden';
    imprPass = '<p id="mensajeUserP" >"creamos es espacio del parrafo"</p>';
    document.getElementById('mensajeUser').innerHTML = imprPass;
    document.getElementById('imprimiraca').innerHTML = imprPass;
});