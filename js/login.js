//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function checkInput() {
    let campoUsuario = document.getElementById("inputUsr").value;
    if (campoUsuario == '') {
        alertUser;
    } else {

    }
    checkPassword();
}
document.addEventListener("DOMContentLoaded", function(e) {
    /*document.getElementById('mensajeUser').style.visibility = 'hidden';*/
});


function checkPassword() {
    alert("password")
}

function alertUser() {
    document.getElementById('mensajeUser').style.visibility = 'visible';
}