const LINK_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const COUNTRY_LIST = "https://raw.githubusercontent.com/r1ch9/proyect-git/master/countries.json";
dataI = "";
let jsonG, AllCountry;
var times, latitud, longitud, altitud, exactitud;
var x = document.getElementById("demo");
var direcc, country;
let subPremium, subExpress, subStandard;
let sendMethod;

//Impresion de elementos en pantalla
function impress(json) {
    let object = json.articles;
    document.getElementById('imagen1').innerHTML = `<img src="` + object[0].src + `" class="img-thumbnail">`;
    document.getElementById('tittle1').innerHTML = `<h5 style="text-align: center;">` + object[0].name + `</h5>`;
    document.getElementById('parra1').innerHTML = `<p style="text-align: center">` + object[0].currency + ` ` + object[0].unitCost + `</p>`;
    document.getElementById('0').value = object[0].count;
    result(json, 0);

    document.getElementById('imagen2').innerHTML = `<img src="` + object[1].src + `" class="img-thumbnail">`;
    document.getElementById('tittle2').innerHTML = `<h5 style="text-align: center;">` + object[1].name + `</h5>`;
    document.getElementById('parra2').innerHTML = `<p style="text-align: center">` + object[1].currency + ` ` + object[1].unitCost + `</p>`;
    document.getElementById('1').value = object[1].count;
    result(json, 1);

    totalGral(jsonG);
    changeMoney(jsonG);
}

//Funcion que cuenta el total de precio de los productos por la cantidad.
function totalGral(json) {
    let total0 = (document.getElementById('0').value * json.articles[0].unitCost) / 40;
    let total1 = document.getElementById('1').value * json.articles[1].unitCost;
    let resultado = total0 + total1;
    document.getElementById('totalGeneral').innerHTML = `subTotal: USD ` + resultado;
    changeMoney(jsonG);

    subPremium = (resultado * 15) / 100;
    subExpress = (resultado * 7) / 100;
    subStandard = (resultado * 5) / 100;

}

function paymentMethod(id) {
    console.log(id);
}

function accColapse(id) {
    if (id == "collapseEfectivo") {
        $('#collapseEfectivo').click(function() {
            $('#collapseBankTransferD').collapse('hide');
            $('#collapseCreditCardD').collapse('hide');
            $('#collapseEfectivoD').collapse('show');
        });
    } else {
        if (id == "collapseBankTransfer") {
            $('#collapseBankTransfer').click(function() {
                $('#collapseEfectivoD').collapse('hide');
                $('#collapseBankTransferD').collapse('show');
                $('#collapseCreditCardD').collapse('hide');
            });
        } else {
            if (id == 'collapseCreditCard') {
                $('#collapseCreditCard').click(function() {
                    $('#collapseEfectivoD').collapse('hide');
                    $('#collapseBankTransferD').collapse('hide');
                    $('#collapseCreditCardD').collapse('show');
                });
            }
        }
    }
}

//Cambio de pestañas
function windowchange(id) {
    if (id == 'carrito') {
        document.getElementById('carrito').className = document.getElementById('carrito').className.replace(" a", " active");
        document.getElementById('bloqueCarrito').hidden = false;
        document.getElementById('envio').className = document.getElementById('envio').className.replace(" active", " a");
        document.getElementById('bloqueEnvio').hidden = true;
        document.getElementById('verificacion').className = document.getElementById('verificacion').className.replace(" active", " a");
        document.getElementById('bloqueVerificacion').hidden = true;
    } else {
        if (id == 'envio') {
            document.getElementById('carrito').className = document.getElementById('carrito').className.replace(" active", " a");
            document.getElementById('bloqueCarrito').hidden = true;
            document.getElementById('envio').className = document.getElementById('envio').className.replace(" a", " active");
            document.getElementById('bloqueEnvio').hidden = false;
            document.getElementById('verificacion').className = document.getElementById('verificacion').className.replace(" active", " a");
            document.getElementById('bloqueVerificacion').hidden = true;
        }
        if (id == 'verificacion') {
            document.getElementById('carrito').className = document.getElementById('carrito').className.replace(" active", " a");
            document.getElementById('bloqueCarrito').hidden = true;
            document.getElementById('envio').className = document.getElementById('envio').className.replace(" active", " a");
            document.getElementById('bloqueEnvio').hidden = true;
            document.getElementById('verificacion').className = document.getElementById('verificacion').className.replace(" a", " active");
            document.getElementById('bloqueVerificacion').hidden = false;
        }
    }
}

function ingresarDatos() {
    alert('datosIngresados');
}

function veri() {
    document.getElementById('prodCarr').innerHTML = "POR AHORA LO DEJAMOS EN PAUSA.";
}

//Funcion para redireccionar.
function ads() {
    changeMoney(jsonG);
}

//Funcion para imprimir el total de el precio por producto dependiendo de la cantidad.
function result(json, id) {
    let costo;
    let resultado;
    let object = json.articles;
    let valor1 = document.getElementById(id).value;

    if (object[id].currency == 'UYU') {
        costo = object[id].unitCost / 40;
    } else {
        costo = object[id].unitCost;
    }

    resultado = valor1 * costo;

    if (id == 0) {
        document.getElementById('total0').innerHTML = `Total = USD ` + resultado;
    } else {
        document.getElementById('total1').innerHTML = `Total = USD ` + resultado;
    }
    totalGral(jsonG);
}

//Funcion para redireccionar.
function asd(number) {
    result(jsonG, number);
}

//Funciom para cargar mapa.
function cargarmap() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
    x.innerHTML = "";

    function showPosition(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        var times = position.timestamp;
        var altitud = position.coords.altitude;
        var exactitud = position.coords.accuracy;
        document.getElementById('mapO').innerHTML = `<iframe class="iframe centrado" src="https://maps.google.com/?ll=` + lat + `,` + lng + `&z=14&t=m&output=embed" width="600px" height="300px" frameborder="0" style="border:0" allowfullscreen></iframe><i id="marker" class="fas fa-map-pin centrados"></i>`;

    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "Denegada la peticion de Geolocalización en el navegador."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "La información de la localización no esta disponible."
                break;
            case error.TIMEOUT:
                x.innerHTML = "El tiempo de petición ha expirado."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "Ha ocurrido un error desconocido."
                break;
        }
    }
}

//Funcion para guardar la direccion.
function saveAddress() {
    direcc = document.getElementById('street-address').value;
    country = document.getElementById('country').value;
}

function verifydatos(id) {
    let elementChanged = document.getElementById(id).value;
    let idt = id + 'T';

    if (elementChanged == "") {
        document.getElementById(idt).hidden = false;

    } else {
        document.getElementById(idt).hidden = true;
    }
}

//Funcion para cambiar la moneda.
function changeMoney(jsonG) {
    let input = document.getElementById('currencyChange').checked;
    let total0 = (document.getElementById('0').value * jsonG.articles[0].unitCost);
    let total1 = (document.getElementById('1').value * jsonG.articles[1].unitCost * 40);
    let resultado = total0 + total1;

    if (input) {
        document.getElementById('totalGeneral').innerHTML = `subTotal: UYU ` + resultado;
        document.getElementById('total0').innerHTML = `Total = UYU ` + jsonG.articles[0].unitCost * document.getElementById('0').value;
        document.getElementById('total1').innerHTML = `Total = UYU ` + (jsonG.articles[1].unitCost * 40) * document.getElementById('1').value;
    } else {
        document.getElementById('totalGeneral').innerHTML = `subTotal: USD ` + resultado / 40;
        document.getElementById('total0').innerHTML = `Total = USD ` + (jsonG.articles[0].unitCost / 40) * document.getElementById('0').value;
        document.getElementById('total1').innerHTML = `Total = USD ` + jsonG.articles[1].unitCost * document.getElementById('1').value;
    }
}

//Obtener lista con muchos paises y sus codigos de telefono.
function impressCountry(AllCountry) {
    let CountryList;
    CountryList = `<option>Seleccionar Pais</option>`;

    for (i = 0; i < AllCountry.countries.length; i++) {
        CountryList += `<option value="` + AllCountry.countries[i].name_es + `">` + AllCountry.countries[i].name_es + `</option>`;
    }

    document.getElementById('pais').innerHTML = `<select name="countries" id="selectCountries" onchange="cambioPais(id)">` + CountryList + `</select>
    <svg style="padding-left: 5px; color: red" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-asterisk" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
    </svg>

    <div id="selectCountriesT" hidden>
        <svg style="color: red; padding-left: 5px;" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg> Este elemento es obligatorio.
    </div>`;
}

//Asignar codigo de area automaticamente al seleccionar tu pais
function cambioPais(id) {
    let select = document.getElementById(id);
    let option = select.options[select.selectedIndex].value;

    if (option == "Seleccionar Pais") {
        document.getElementById('selectCountriesT').hidden = false;
    } else {
        document.getElementById('selectCountriesT').hidden = true;
    }

    document.getElementById('area-code').value = AllCountry.countries[select.selectedIndex - 1].dial_code;
}

function sendType(id) {
    if (id == 'envioPremium') {
        document.getElementById('envioPremium').className += ' active';
        document.getElementById('envioExpress').className = document.getElementById('envioExpress').className.replace(' active', '');
        document.getElementById('envioStandard').className = document.getElementById('envioStandard').className.replace(' active', '');
        sendMethod = id;

    } else {
        if (id == 'envioExpress') {
            document.getElementById('envioPremium').className = document.getElementById('envioPremium').className.replace(' active', '');
            document.getElementById('envioExpress').className += ' active';
            document.getElementById('envioStandard').className = document.getElementById('envioStandard').className.replace(' active', '');
            sendMethod = id;

        } else {
            if (id == 'envioStandard') {
                document.getElementById('envioPremium').className = document.getElementById('envioPremium').className.replace(' active', '');
                document.getElementById('envioExpress').className = document.getElementById('envioExpress').className.replace(' active', '');
                document.getElementById('envioStandard').className += ' active';
                sendMethod = id;

            }
        }
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(LINK_CARRITO).then(function(resultObj) {
        if (resultObj.status === "ok") {
            jsonG = resultObj.data;
            impress(resultObj.data);
            getJSONData(COUNTRY_LIST).then(function(resultCty) {
                if (resultCty.status === "ok") {
                    AllCountry = resultCty.data;
                    impressCountry(AllCountry);
                    veri();
                }
            });
        }
    });
});