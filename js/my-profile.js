var objectUsuario = { "name": "", "age": null, "eMail": "", "phone": "", "img": "img/withoutImage.png" };
let link;

//Animacion para mostrar campo editar usuario.
function editObjUser() {
    $('#editUserData').toggle(500);
    $('#impresionP').toggle(500);
}

function redirectCart() {
    window.location.href = "cart.html";
}

function redirectSell() {
    window.location.href = "sell.html";
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

        //Mostramos el objeto en consola.
        console.log(objectUsuario);

        //Muestra los datos cambiados en el inicio de sesion.
        $('#userName').text("Nombre: " + objectUsuario.name);
        $('#userAge').text("Edad: " + objectUsuario.age);
        $('#userEmail').text("Correo: " + objectUsuario.eMail);
        $('#userPhone').text("Telefono: " + objectUsuario.phone);
        $('#imgProfile').attr({ "src": objectUsuario.img });

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

//Redireccion a product-info.html al clickear en el producto
function redirect() {
    window.open('product-info.html');
}

//Subimos y guardamos el link de la nueva imagen de perfil.
function actualizarImagen() {
    link = $('#inputImgSrc').val()
    objectUsuario.img = link;

    //Ejecutamos la funcion para cambiar los datos.
    changeData();
}

//Redireccion en nueva ventana para agregar imagen y abrimos el modal para ingresar el neuvo link
function agregarImagen(url) {
    window.open(url, "Diseño Web", "width=600, height=600");
    $('#exampleModalCenter').modal('toggle');
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    //Establecemos el estilo inicial de los input.
    $('#editUserData').hide();
    $('#newName').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newAge').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newEmail').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newPhone').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });

    //Cargar objecto en caso de que exista y imprimirlo en los campos de usuario.
    if (JSON.parse(localStorage.getItem('objeto')) != null) {
        objectUsuario = JSON.parse(localStorage.getItem('objeto'));
        console.log(objectUsuario);
        $('#userName').text("Nombre: " + objectUsuario.name);
        $('#userAge').text("Edad: " + objectUsuario.age);
        $('#userEmail').text("Correo: " + objectUsuario.eMail);
        $('#userPhone').text("Telefono: " + objectUsuario.phone);
        $('#imgProfile').attr({ "src": objectUsuario.img });
    }
});