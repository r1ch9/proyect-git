const LINK_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const COUNTRY_LIST = "https://raw.githubusercontent.com/r1ch9/proyect-git/master/countries.json";
dataI = "";
let jsonG, AllCountry;
var times, latitud, longitud, altitud, exactitud;
var x = document.getElementById("demo");
var direcc, country;
let subPremium, subExpress, subStandard;
let total0, total1, codigoArea;
var objectoEnvio = new Object();
let cantidaddeelementos;
let elemento1oculto, elemento2oculto;
let envioVerificado, carritoVerificado, sendMethod;
let anterior;
let pagoYtarjeta = false;
let pago = false;
let tarjetaNumero = false;

//Impresion del carrito.
function impressCarr(json) {
    let object = json.articles;
    let input1, input2;
    let metodoFinal;

    if (sendMethod == 'Envío Standard') {
        metodoFinal = `<p style="text-align: center;">Precio envio<strong> USD ` + subStandard + `</strong></p><p style="text-align: center;">Precio total<strong> USD ` + (subStandard + subTotal) + `</strong></p>`;
    } else {
        if (sendMethod == 'Envío Premium') {
            metodoFinal = `<p style="text-align: center;">Precio envio<strong> USD ` + subPremium + `</strong></p><p style="text-align: center;">Precio total<strong> USD ` + (subPremium + subTotal) + `</strong></p>`;
        } else {
            if (sendMethod == 'Envío Express') {
                metodoFinal = `<p style="text-align: center;">Precio envio<strong> USD ` + subExpress + `</strong></p><p style="text-align: center;">Precio total<strong> USD ` + (subExpress + subTotal) + `</strong></p>`;
            } else {
                metodoFinal = `<p style="text-align: center;"><strong> Especificar metodo de envio</strong></p>`;
            }
        }
    }

    document.getElementById('prodCarr').innerHTML = '';

    if (elemento1oculto) {} else {
        input1 = document.getElementById('0').value;
    }

    if (elemento2oculto) {} else {
        input2 = document.getElementById('1').value;
    }

    let precio1 = object[0].unitCost * input1;
    let precio2 = object[1].unitCost * input2;

    if (elemento1oculto == true) {
        if (elemento2oculto == true) {
            document.getElementById('prodCarr').innerHTML = `<p style="color: red">No hay elementos en el carrito.</p>`;
            carritoVerificado = false;
        } else {
            document.getElementById('prodCarr').innerHTML = `<p>` + object[1].name + `<strong style="text-align: center;"> USD ` + precio2 + `</strong></p>`;
            document.getElementById('prodCarr').innerHTML += `<br><br><br>`;
            document.getElementById('prodCarr').innerHTML += `<p style="text-align: center;">Precio total<strong style="text-align: center;"> USD ` + subTotal + `</strong></p>`;
            document.getElementById('prodCarr').innerHTML += metodoFinal;
            carritoVerificado = true;
        }
    } else {
        if (elemento2oculto == true) {
            document.getElementById('prodCarr').innerHTML = `<p>` + object[0].name + `<strong style="text-align: center;"> UYU ` + precio1 + `</strong></p>`;
            document.getElementById('prodCarr').innerHTML += `<br><br><br>`;
            document.getElementById('prodCarr').innerHTML += `<p style="text-align: center;">Precio total<strong style="text-align: center;"> USD ` + subTotal + `</strong></p>`;
            document.getElementById('prodCarr').innerHTML += metodoFinal;
            carritoVerificado = true;
        } else {
            document.getElementById('prodCarr').innerHTML += `<p>` + object[0].name + `<strong style="text-align: center;"> UYU ` + precio1 + `</strong></p>`;
            document.getElementById('prodCarr').innerHTML += `<p>` + object[1].name + `<strong style="text-align: center;"> USD ` + precio2 + `</strong></p>`;
            document.getElementById('prodCarr').innerHTML += `<br>`;
            document.getElementById('prodCarr').innerHTML += `<p style="text-align: center;">Precio subtotal<strong> USD ` + subTotal + `</strong></p>`;
            document.getElementById('prodCarr').innerHTML += metodoFinal;

            carritoVerificado = true;
        }
    }
    verifyPayment();
}

//Habilitacion del boton "Formas de pago".
function verifyPayment() {
    if (carritoVerificado && envioVerificado) {
        if (sendMethod != false) {
            document.getElementById('formaDePagoBoton').disabled = false;
        }
    } else {
        document.getElementById('formaDePagoBoton').disabled = true;
    }
}

//seleccionar forma de pago
function pagoSeleccionado(id) {
    document.getElementById(id).className += ' border';

    if (anterior != undefined) {
        document.getElementById(anterior).className = 'col-2';
    }

    anterior = id;
    pago = true;

    if (id == 'creditBrou' || id == 'creditVisa' || id == 'creditScotia' || id == 'creditOca' || id == 'creditMaster' || id == 'creditCreditel') {
        creditCardData();
    } else {
        document.getElementById('botonConfirmarCompra').disabled = false;
        document.getElementById('alertCardNumber').hidden = true;
        s
    }

}

//Obtenemos los datos de la tarjeta de credito.
function creditCardData() {
    let largo = document.getElementById('inputCardNumber').value;

    //Si seleccionamos una tarjeta de credito pedimos el input tarjeta para obtener los datos de la tarjeta.
    if (largo.length != 16) {
        document.getElementById('alertCardNumber').hidden = false;
        tarjetaNumero = false;
    } else {
        tarjetaNumero = true;
        document.getElementById('alertCardNumber').hidden = true;
    }
    verifyTarjetaYPago();
}

function verifyTarjetaYPago() {
    if (tarjetaNumero && pago) {
        document.getElementById('botonConfirmarCompra').disabled = false;
    } else {
        document.getElementById('botonConfirmarCompra').disabled = true;
    }
}

//Alerta de compra completada, oculta la alerta despues de 3 segundos y redirecciona a index.html despues de 4 segundos.
function confirmarCompra() {
    getJSONData(CART_BUY_URL).then(function(resultCmp) {
        if (resultCmp.status === "ok") {
            console.log(resultCmp.data);
            document.getElementById('textoCompra').innerHTML = resultCmp.data.msg;
            document.getElementById('alertSuccess').hidden = false;
        }
    });
    setTimeout(function() { document.getElementById('alertSuccess').hidden = true }, 3000);
    setTimeout(function() { window.location.href = "index.html" }, 4000);

}

//Impresion de elementos en pantalla
function impress(json) {
    let object = json.articles;
    let HTMLContentToAppend = ``;

    for (let i = 0; i < object.length; i++) {
        HTMLContentToAppend += `
        <div class="container border" id="element` + i + `Container">
            <div class="container">
                <br>
                <div class="row">
                    <div class="col-3">
                        <img src="` + object[i].src + `" class="img-thumbnail">
                    </div>
                    <div class="col-9">
                        <div class="row my-2">
                            <div class="col-11">
                                <h5 class="">` + object[i].name + ` <small class="text-muted">` + object[i].currency + ` ` + object[i].unitCost + `</small></h5>
                            </div>
                            <div class="col-1">
                                <button type="button" class="badge-secondary" onclick="deleteProduct('element` + i + `Container')">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="container" style="text-align: center">
                                <input type="number" id="` + i + `" onchange="asd(id)" min="0" style="width: 20%;" >
                                <div id="total` + i + `" style="padding-top: 5px">Total = USD 0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
        <br>`;
    }

    document.getElementById('pruebaImpress').innerHTML = HTMLContentToAppend;

    document.getElementById('0').value = object[0].count;
    document.getElementById('1').value = object[1].count;
    let subTotal1 = (json.articles[0].unitCost / 40) * document.getElementById('0').value;
    let subTotal2 = (json.articles[1].unitCost) * document.getElementById('1').value;
    document.getElementById('total0').innerHTML = `subTotal = USD ` + subTotal1;
    document.getElementById('total1').innerHTML = `subTotal = USD ` + subTotal2;

    subTotal = 0;
    totalGral(jsonG);
    impressCarr(jsonG);
}

//Elimina el espacio del producto eliminado.
function deleteProduct(id) {
    if (id == 'element0Container') {
        document.getElementById('0').value = 0;
        elemento1oculto = true;
    } else {
        document.getElementById('1').value = 0;
        elemento2oculto = true;
    }
    document.getElementById(id).hidden = true;
    let HTMLContentToAppend;

    if (elemento1oculto) {
        totalGral(jsonG);
        if (elemento2oculto) {
            let input = document.getElementById('currencyChange').checked;
            totalGral(jsonG);
            HTMLContentToAppend = ` <div class="small alert-danger py-3" style="text-align:center">No hay elementos en el carrito, puedes ver nuestros productos haciendo click <a href="categories.html" class="alert-link">aquí</a></div><br>`;
            document.getElementById('pruebaImpress').innerHTML = HTMLContentToAppend;
            subTotal = 0;
            if (input) {
                document.getElementById('totalGeneral').innerHTML = `subTotal= UYU 0`;
            } else {
                document.getElementById('totalGeneral').innerHTML = `subTotal= USD 0`;
            }
        }
    }
    if (elemento2oculto) {
        totalGral(jsonG);
    }
    impressCarr(jsonG);
    verifyPayment();
}

//Funcion que cuenta el total de precio de los productos por la cantidad.
function totalGral(json) {
    let subTotal1, subTotal2;
    let p1, p2;

    if (elemento1oculto) {
        p1 = 0;
    } else {
        p1 = document.getElementById('0').value;
    }

    if (elemento2oculto) {
        p2 = 0;
    } else {
        p2 = document.getElementById('1').value;
    }

    subTotal1 = p1 * (json.articles[0].unitCost / 40);
    subTotal2 = p2 * (json.articles[1].unitCost);
    subTotal = subTotal1 + subTotal2;

    document.getElementById('totalGeneral').innerHTML = `subTotal: USD ` + subTotal;

    subPremium = (subTotal * 15) / 100;
    subExpress = (subTotal * 7) / 100;
    subStandard = (subTotal * 5) / 100;
    impressCarr(jsonG);
}

//Colapse que se ejecuta al seleccionar un metodo de pago. 
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

//Funcion para imprimir el total de el precio por producto dependiendo de la cantidad.
function result(json, id) {
    let valor = document.getElementById(id).value;
    let object = json.articles;
    let cTotal1, cTotal2;

    if (id == '0') {
        cTotal1 = valor * object[0].unitCost / 40;
        document.getElementById('total0').innerHTML = `subTotal = USD ` + cTotal1;
        changeMoney(jsonG);
    }

    if (id == '1') {
        cTotal2 = valor * object[1].unitCost;
        document.getElementById('total1').innerHTML = `subTotal = USD ` + cTotal2;
        changeMoney(jsonG);
    }
    impressCarr(jsonG);
    totalGral(jsonG);
}

//Funcion para redireccionar.
function asd(id) {
    result(jsonG, id);
}

//Verificar e ingresar datos en el objeto de envío.
function verifydatos(id) {
    let elementChanged = document.getElementById(id).value;
    let idt = id + 'T';

    if (elementChanged == "") {
        document.getElementById(idt).hidden = false;
    } else {
        document.getElementById(idt).hidden = true;
    }

    if (id == 'street-address') {
        objectoEnvio.street = elementChanged;
    } else {
        if (id == 'door-Number') {
            objectoEnvio.doorNumber = elementChanged;
        } else {
            if (id == 'cruce') {
                objectoEnvio.cruce = elementChanged;
            } else {
                if (id == 'postal-code') {
                    objectoEnvio.postal_code = elementChanged;
                } else {
                    if (id == 'phone-number') {
                        objectoEnvio.phone = elementChanged;
                    }
                }
            }
        }
    }
    writeSend();
    impressCarr(jsonG);
    totalGral(jsonG);
}

//Impresion del objeto envio en el bloque verificación.
function writeSend() {
    envioVerificado = false;
    document.getElementById('impresionDireccion').innerHTML = `<p>Direccion:<strong> ` + objectoEnvio.street + ` ` + objectoEnvio.doorNumber + `</strong></p>`;
    document.getElementById('impresionEsquina').innerHTML = `<p>Esquina:<strong> ` + objectoEnvio.cruce + `</strong></p>`;
    document.getElementById('impresionCodigo').innerHTML = `<p>Codigo postal:<strong> ` + objectoEnvio.postal_code + `</strong></p>`;
    document.getElementById('impresionPais').innerHTML = `<p>Pais:<strong> ` + objectoEnvio.country + `</strong></p>`;
    document.getElementById('impresionTelefono').innerHTML = `<p>Telefono:<strong> ` + codigoArea + ` ` + objectoEnvio.phone + `</strong></p>`;

    if (objectoEnvio.street != null && objectoEnvio.cruce != null && objectoEnvio.doorNumber != null && objectoEnvio.country != null && objectoEnvio.phone != null) {
        if (objectoEnvio.country != 'Seleccionar Pais') {
            if (objectoEnvio.street != '' && objectoEnvio.cruce != '' && objectoEnvio.doorNumber != '' && objectoEnvio.country != '' && objectoEnvio.phone != '') {
                document.getElementById('verifDEnvio').hidden = true;
                envioVerificado = true;
            } else {
                document.getElementById('verifDEnvio').hidden = false;
            }
        } else {
            document.getElementById('verifDEnvio').hidden = false;
        }
    } else {
        document.getElementById('verifDEnvio').hidden = false;
    }
    verifyPayment();
    impressCarr(jsonG);
    totalGral(jsonG);
}

//REDIRECCION
function ads() {
    changeMoney(jsonG);
}

//Funcion para cambiar la moneda.
function changeMoney(json) {
    let input = document.getElementById('currencyChange').checked;
    if (input) {
        document.getElementById('totalGeneral').innerHTML = `subTotal = UYU 0`;
    } else {
        document.getElementById('totalGeneral').innerHTML = `subTotal = USD 0`;
    }
    let article1 = document.getElementById('element0Container');
    let article2 = document.getElementById('element1Container');
    let subTotal1, subTotal2, subTotal;

    if (article1.hidden == true) {
        subTotal1 = 0;
    } else {
        let input1 = document.getElementById('0').value;
        subTotal1 = (json.articles[0].unitCost * input1) / 40;
    }

    if (article2.hidden == true) {
        subTotal2 = 0;
    } else {
        let input2 = document.getElementById('1').value;
        subTotal2 = (json.articles[1].unitCost * input2);
    }

    subTotal = (subTotal1 + subTotal2);

    if (input == true) {
        document.getElementById('totalGeneral').innerHTML = `subTotal = UYU ` + subTotal * 40;
        document.getElementById('total0').innerHTML = `subTotal = UYU ` + subTotal1 * 40;
        document.getElementById('total1').innerHTML = `subTotal = UYU ` + subTotal2 * 40;
    } else {
        document.getElementById('totalGeneral').innerHTML = `subTotal = USD ` + subTotal;
        document.getElementById('total0').innerHTML = `subTotal = USD ` + subTotal1;
        document.getElementById('total1').innerHTML = `subTotal = USD ` + subTotal2;
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
    objectoEnvio.country = option;
    writeSend();

    if (option == "Seleccionar Pais") {
        document.getElementById('selectCountriesT').hidden = false;
    } else {
        document.getElementById('selectCountriesT').hidden = true;
    }

    codigoArea = AllCountry.countries[select.selectedIndex - 1].dial_code;
    document.getElementById('area-code').value = AllCountry.countries[select.selectedIndex - 1].dial_code;
}

//Cambia el color de la caja de seleccion de metodo de envio si se elije y ademas guarda el envio seleccionado.
function sendType(id) {
    if (id == 'envioPremium') {
        objectoEnvio.sendTyoe = 'Envío Premium';
        document.getElementById('envioPremium').className += ' active';
        document.getElementById('envioExpress').className = document.getElementById('envioExpress').className.replace(' active', '');
        document.getElementById('envioStandard').className = document.getElementById('envioStandard').className.replace(' active', '');
        objectoEnvio.sendTyoe = 'Envío Premium';
        sendMethod = 'Envío Premium';
        document.getElementById('impresionSendType').innerHTML = `<p>Tipo de envío:<strong> ` + objectoEnvio.sendTyoe + `</strong></p>`;
        writeSend();
    } else {
        if (id == 'envioExpress') {
            objectoEnvio.sendTyoe = 'Envío Express';
            document.getElementById('envioPremium').className = document.getElementById('envioPremium').className.replace(' active', '');
            document.getElementById('envioExpress').className += ' active';
            document.getElementById('envioStandard').className = document.getElementById('envioStandard').className.replace(' active', '');
            objectoEnvio.sendTyoe = 'Envío Express';
            sendMethod = 'Envío Express';
            document.getElementById('impresionSendType').innerHTML = `<p>Tipo de envío:<strong> ` + objectoEnvio.sendTyoe + `</strong></p>`;
            writeSend();
        } else {
            if (id == 'envioStandard') {
                objectoEnvio.sendTyoe = 'Envío Standard';
                document.getElementById('envioPremium').className = document.getElementById('envioPremium').className.replace(' active', '');
                document.getElementById('envioExpress').className = document.getElementById('envioExpress').className.replace(' active', '');
                document.getElementById('envioStandard').className += ' active';
                objectoEnvio.sendTyoe = 'Envío Standard';
                sendMethod = 'Envío Standard';
                document.getElementById('impresionSendType').innerHTML = `<p>Tipo de envío:<strong> ` + objectoEnvio.sendTyoe + `</strong></p>`;
                writeSend();
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
                    envioVerificado = false;
                    carritoVerificado = true;
                    elemento1oculto = false;
                    elemento2oculto = false;
                    sendMethod = false;
                }
            });
        }
    });

    document.getElementById('inputCardNumber').addEventListener("keydown", function() {
        creditCardData();
    });
});