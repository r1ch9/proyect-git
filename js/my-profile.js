var objectUsuario = { "name": "", "age": null, "eMail": "", "phone": "", "img": "" };
let link;

//Animacion para mostrar campo editar usuario.
function editObjUser() {
    $('#editUserData').toggle(500);
    $('#impresionP').toggle(500);
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

        //Hacemos lo mismo con la imagen de usuario.
        link = $('#inputImgSrc').val()
        objectUsuario.img = link;

        //Mostramos el objeto en consola.
        console.log(objectUsuario);

        //Muestra los datos cambiados en el inicio de sesion.
        $('#userName').text("Nombre: " + objectUsuario.name);
        $('#userAge').text("Edad: " + objectUsuario.age);
        $('#userEmail').text("Correo: " + objectUsuario.eMail);
        $('#userPhone').text("Telefono: " + objectUsuario.phone);

        //Almacenamiento del objeto en localStorage.
        objetoPerfil = JSON.stringify(objectUsuario);
        sessionStorage.setItem('objeto', objetoPerfil);

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

//Ponemos unos productos para mostrar en el perfil, incomoda que quede tan vacio
function showP(jsonP) {
    let ContentToAppend = ``;

    for (let i = 0; i < jsonP.length - 1; i++) {
        producto = jsonP[i];
        ContentToAppend += `
        <div class="col-lg-4" style="width: 100%">  
            <div class="container border" style="cursor: pointer; margin: 2px;" onclick="redirect()">                   
                <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                <br>
                <h4 class="mb-1" style="text-align: center">` + producto.name + `</h4><hr>
                <small class="text-muted" style="text-align:left">Costo: ` + producto.currency + ` ` + producto.cost + `<br> Vendidos: ` + producto.soldCount + `</small>        
                <br>
                <div> ` + producto.description + `</div>
                <br>    
            </div>
           
        </div>`
    }
    $('#impresionP').html(ContentToAppend);
}

//Redireccion a product-info.html al clickear en el producto
function redirect() {
    window.open('product-info.html');
}

//Subimos y guardamos el link de la nueva imagen de perfil.
function actualizarImagen() {
    link = $('#inputImgSrc').val()
    objectUsuario.img = link;

    $('#imgProfile').attr({ "src": link });
    console.log(objectUsuario);

    objetoPerfil = JSON.stringify(objectUsuario);
    sessionStorage.setItem('objeto', objetoPerfil);
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
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showP(resultObj.data);
        }
    });

    //Establecemos el estilo inicial de los input.
    $('#editUserData').hide();
    $('#newName').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newAge').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newEmail').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });
    $('#newPhone').css({ "border-color": "grey", "border-width": "1px", "border-style": "solid", "border-radius": "5px" });

    //Cargar objecto en caso de que exista y imprimirlo en los campos de usuario.
    if (JSON.parse(sessionStorage.getItem('objeto')) != null) {
        objectUsuario = JSON.parse(localStorage.getItem('objeto'));
        console.log(objectUsuario);
        $('#userName').text("Nombre: " + objectUsuario.name);
        $('#userAge').text("Edad: " + objectUsuario.age);
        $('#userEmail').text("Correo: " + objectUsuario.eMail);
        $('#userPhone').text("Telefono: " + objectUsuario.phone);
        $('#imgProfile').attr({ "src": objectUsuario.img });
    }
});