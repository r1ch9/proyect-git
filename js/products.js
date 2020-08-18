//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var minPrice, maxPrice;

function imprimirListado(array) {
    let HTMLContentToAppend = '';
    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(category.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(category.cost) <= maxPrice))) {

            HTMLContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row" id="` + category.name + `">
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
        </a>
        `
        }


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


    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        imprimirListado(productsArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }

        imprimirListado(productsArray);
    });
});