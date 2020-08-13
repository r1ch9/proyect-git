//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function imprimirListado(array) {
    let HTMLContentToAppend = '';
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        HTMLContentToAppend += `
        <div class="list-group-item list-group-item-action" >
            <div class="row " id="` + category.name + `">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + category.name + `</h4>
                        <small class="text-muted">Costo: ` + category.currency + ` ` + category.cost + `<br/>Vendidos: ` + category.soldCount + `</small>
                    </div>
                    <div> ` + category.description + `</div>
                </div>
            </div>
        </div>
        `

        document.getElementById("impresion").innerHTML = HTMLContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            imprimirListado(productsArray);
        }
    });
});