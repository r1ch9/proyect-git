//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


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
        document.getElementById('inputpwd').style.borderColor = "red";
        document.getElementById("inputpwd").style.background = "#DC2E2E40";
        corrPass = false;
    } else {
        if (password.length < 5) {
            imprPass = ' <p id = "mensajeUserP" > La contraseña debe tener mas de 4 digitos.</p>'
            document.getElementById('imprimiraca').innerHTML = imprPass;
            document.getElementById('imprimiraca').style.visibility = 'visible';
            document.getElementById('inputpwd').style.borderColor = "red";
            document.getElementById("inputpwd").style.background = "#DC2E2E40";
            corrPass = false;
        } else {
            if (password.length > 12) {
                imprPass = ' <p id = "mensajeUserP" > La contraseña no puede tener mas de 12 digitos.</p>'
                document.getElementById('imprimiraca').innerHTML = imprPass;
                document.getElementById('imprimiraca').style.visibility = 'visible';
                document.getElementById('inputpwd').style.borderColor = "red";
                document.getElementById("inputpwd").style.background = "#DC2E2E40";
                corrPass = false;
            } else {
                document.getElementById('imprimiraca').style.visibility = 'hidden';
                document.getElementById('inputpwd').style.borderColor = "green";
                document.getElementById('inputpwd').style.background = "#52DC2E40";
                document.getElementById('inputpwd').style.text = "green";
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

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    document.getElementById("userName").value = (profile.getName());
    document.getElementById("inputpwd").value = "aaaaaa";
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    document.getElementById("ingresarButton").addEventListener("click", function() {
        checkInput();
    });
}

function checkUser() {
    var user = document.getElementById("userName").value;

    if (user == '') {
        imprPass = '<p id="mensajeUser">El campo "Usuario" no puede estar vacío.</p>'
        document.getElementById('mensajeUser').innerHTML = imprPass;
        document.getElementById('mensajeUser').style.visibility = 'visible';
        document.getElementById('userName').style.borderColor = "red";
        document.getElementById('userName').style.background = "#DC2E2E40";
        document.getElementById('userName').style.text = "red";
        corrUser = false;
    } else {
        document.getElementById('mensajeUser').style.visibility = 'hidden';
        document.getElementById('userName').style.borderColor = "green";
        document.getElementById('userName').style.background = "#52DC2E40";
        document.getElementById('userName').style.text = "green";
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