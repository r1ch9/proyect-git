const LINK_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
dataI = "";
let jsonG;

//Impresion de elementos en pantalla
function impress(json) {

    let object = json.articles;
    dataI += `
            <h2>` + object[0].name + `</h2>
        `
    document.getElementById('impresion').innerHTML = dataI;

}

function result(json) {
    let costo;
    let object = json.articles;
    let valor = document.getElementById('selector').value;
    if (object[0].currency == 'UYU') {
        costo = object[0].unitCost / 40;
    }
    let resultado = valor * costo;
    document.getElementById('ea').innerHTML = `Resultado = ` + object[1].currency + ` ` + resultado + ``;
}

function asd() {
    result(jsonG);
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