var objectUsuario = { "name": "", "age": null, "eMail": "", "phone": "" };

//Animacion para mostrar campo editar usuario.
function editObjUser() {
    $('#editUserData').toggle(500);
}

//Sobreescribimos la data del JSON
function changeData() {
    var nameInput, ageInput, emailInput, phoneInput;
    nameInput = $('#newName').val();
    ageInput = $('#newAge').val();
    emailInput = $('#newEmail').val();
    phoneInput = $('#newPhone').val();

    //Primero tenemos que verificar que la los input esten vacio.
    if (nameInput != '' && ageInput != '' && emailInput != '' && phoneInput != '') {
        //Nos aseguramos de que nigun input tenga el borde rojo de error.
        $('#newName').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
        $('#newAge').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
        $('#newEmail').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
        $('#newPhone').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });

        //asignamos estos valores al objeto que define nuestro usuario.
        objectUsuario.name = nameInput;
        objectUsuario.age = ageInput;
        objectUsuario.eMail = emailInput;
        objectUsuario.phone = phoneInput;

        //Muestra los datos cambiados en el inicio de sesion.
        $('#userName').text("Nombre: " + objectUsuario.name);
        $('#userAge').text("Edad: " + objectUsuario.age);
        $('#userEmail').text("Correo: " + objectUsuario.eMail);
        $('#userPhone').text("Telefono: " + objectUsuario.phone);

        //Almacenamiento del objeto en localStorage.
        objetoPerfil = JSON.stringify(objectUsuario);
        localStorage.setItem('objeto', objetoPerfil);

    } else {
        if (nameInput == '') {
            //En caso de que alguno de los input sea incorrecto le damos el borde rojo.
            $('#newName').css("border-color", "red");
        } else {
            $('#newName').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
        }

        if (ageInput == '') {
            $('#newAge').css("border-color", "red");
        } else {
            $('#newAge').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
        }

        if (emailInput == '') {
            $('#newEmail').css("border-color", "red");
        } else {
            $('#newEmail').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
        }

        if (phoneInput == '') {
            $('#newPhone').css("border-color", "red");
        } else {
            $('#newPhone').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
        }
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    $('#editUserData').hide();
    $('#newName').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newAge').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newEmail').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newPhone').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });

    //Cargar objecto en caso de que exista y imprimirlo en los campos de usuario.
    if (JSON.parse(localStorage.getItem('objeto')) != null) {
        objectUsuario = JSON.parse(localStorage.getItem('objeto'));
        $('#userName').text("Nombre: " + objectUsuario.name);
        $('#userAge').text("Edad: " + objectUsuario.age);
        $('#userEmail').text("Correo: " + objectUsuario.eMail);
        $('#userPhone').text("Telefono: " + objectUsuario.phone);
    }
});