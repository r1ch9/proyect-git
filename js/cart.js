const LINK_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let deleted = [];
let j = 0;
let dataI;
let elementos = 0;

//Funcion que imprime todos los datos en pantalla
function imprimirDatos(array) {
    dataI = '';
    object = array.articles;

    for (let i = 0; i < object.length; i++) {
        dataI += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-2">
                    <img src="` + object[i].src + `" class="img-thumbnail">
                </div>
                <div class="col-5">
                    <h6 class="text-muted">` + object[i].name + `</h6>
                </div>
                <div class="col-3">
                    <h6 class="text-muted" style="text-align: right">` + object[i].currency + ` ` + object[i].unitCost + `</h6>
                </div>
                <div class="col-2">
                    <input type="number" style="width: 70%" placeholder="` + object[i].count + `">
                    <span class="close" onclick="deleteElement(` + i + `)">&times;</span>
                </div>
            </div>
        </div>
        <br/>
        `;
    }

    document.getElementById('impresion').innerHTML = dataI;
}

function deleteElement(element) {
    deleted[j] = element;
    dataI = ``;

    if (elementos != 1) {
        for (let i = 0; i < object.length; i++) {
            if (i == deleted[j]) {} else {
                dataI += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-2">
                        <img src="` + object[i].src + `" class="img-thumbnail">
                    </div>
                    <div class="col-5">
                        <h6 class="text-muted">` + object[i].name + `</h6>
                    </div>
                    <div class="col-3">
                        <h6 class="text-muted" style="text-align: right">` + object[i].currency + ` ` + object[i].unitCost + `</h6>
                    </div>
                    <div class="col-2">
                        <input type="number" style="width: 70%" placeholder="` + object[i].count + `">
                        <span class="close" onclick="deleteElement(` + i + `)">&times;</span>
                    </div>
                </div>
            </div>
            <br/>
            `;
                elementos += 1;
            }
        }
    }
    j += 1;
    document.getElementById('impresion').innerHTML = dataI;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(LINK_CARRITO).then(function(resultObj) {
        if (resultObj.status === "ok") {
            imprimirDatos(resultObj.data);
        }
    });
});