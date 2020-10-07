const LINK_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
dataI = "";
let jsonG;
var times, latitud, longitud, altitud, exactitud;
var x = document.getElementById("demo");
var direcc, country;

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
}

function totalGral(json) {
    let total0 = (document.getElementById('0').value * json.articles[0].unitCost) / 40;
    let total1 = document.getElementById('1').value * json.articles[1].unitCost;
    let resultado = total0 + total1;
    document.getElementById('totalGeneral').innerHTML = `Total: USD ` + resultado;
}

function windowchange(id) {
    if (id == 'carrito') {
        document.getElementById(id).className += " active";
        document.getElementById('bloqueCarrito').hidden = false;
        document.getElementById('envio').className = document.getElementById('envio').className.replace(" active", "");
        document.getElementById('bloqueEnvio').hidden = true;
        document.getElementById('verificacion').className = document.getElementById('verificacion').className.replace(" active", "");
        document.getElementById('bloqueVerificacion').hidden = true;
    } else {
        if (id == 'envio') {
            document.getElementById('carrito').className = document.getElementById('carrito').className.replace(" active", "");
            document.getElementById('bloqueCarrito').hidden = true;
            document.getElementById(id).className += " active";
            document.getElementById('bloqueEnvio').hidden = false;
            document.getElementById('verificacion').className = document.getElementById('verificacion').className.replace(" active", "");
            document.getElementById('bloqueVerificacion').hidden = true;
        }
        if (id == 'verificacion') {
            document.getElementById('carrito').className = document.getElementById('carrito').className.replace(" active", "");
            document.getElementById('bloqueCarrito').hidden = true;
            document.getElementById('envio').className = document.getElementById('envio').className.replace(" active", "");
            document.getElementById('bloqueEnvio').hidden = true;
            document.getElementById(id).className += " active";
            document.getElementById('bloqueVerificacion').hidden = false;
        }
    }
}

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

function asd(number) {
    result(jsonG, number);
}

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

function saveAddress() {
    direcc = document.getElementById('street-address').value;
    country = document.getElementById('country').value;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(LINK_CARRITO).then(function(resultObj) {
        if (resultObj.status === "ok") {
            jsonG = resultObj.data;
            impress(resultObj.data);
        }
    });
});