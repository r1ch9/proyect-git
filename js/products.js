const ORDER_ASC_BY_NAME = "min. - máx.";
const ORDER_DESC_BY_NAME = "máx. - min.";
const ORDER_BY_PROD_SOLD = "Vendidos:";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minPrice, maxPrice;
var key;
var keyCode;
var numbersArray = [];

function imprimirListado(array) {
    let HTMLContentToAppend = '';

    if ((minPrice > 15200) || (maxPrice < 12500)) {
        HTMLContentToAppend = `<div class="list-group-item alert-danger mw-100" id="alertNotFound" role="alert">¡No hay elementos que coincidan con la busqueda!</div>`;
    } else {
        for (let i = 0; i < array.length; i++) {
            let category = array[i];
            if (((minPrice == undefined) || (minPrice != undefined && parseInt(category.cost) >= minPrice)) &&
                ((maxPrice == undefined) || (maxPrice != undefined && parseInt(category.cost) <= maxPrice))) {

                HTMLContentToAppend += `
                <div class="col-lg-4">  
                    <div class="container border" style="cursor: pointer; margin: 2px" onclick="redirect()">                   
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                        <br>
                            <h4 class="mb-1" style="text-align: center">` + category.name + `</h4><hr>
                            <small class="text-muted" style="text-align:left">Costo: ` + category.currency + ` ` + category.cost + `<br> Vendidos: ` + category.soldCount + `</small>
                        
                        <br>
                        <div> ` + category.description + `</div>
                        <br>    
                    </div>
                    <br>
                </div>
            `
            }
        }
    }
    document.getElementById("impresion").innerHTML = HTMLContentToAppend;
}

function redirect() {
    window.location.href = "product-info.html"
}

function sortAndShowCategories(sortCriteria, array) {
    currentSortCriteria = sortCriteria;

    if (array != undefined) {
        currentCategoriesArray = array;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    imprimirListado(currentCategoriesArray);
}

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function(a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

//Función de filtro de busqueda.
function search() {
    const busquedaProducts = document.querySelector('#busquedaProducts');
    let texto = busquedaProducts.value.toLowerCase();
    document.getElementById('impresion').innerHTML = ``;

    for (let producto of productsArray) {
        let name = producto.name.toLowerCase();
        let descripcion = producto.description.toLowerCase();

        if (name.indexOf(texto) !== -1) {
            document.getElementById('impresion').innerHTML += `
            <div class="col-lg-4">  
                <div class="container border" style="cursor: pointer; margin: 2px" onclick="redirect()">                   
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    <br>
                        <h4 class="mb-1" style="text-align: center">` + producto.name + `</h4><hr>
                        <small class="text-muted" style="text-align:left">Costo: ` + producto.currency + ` ` + producto.cost + `<br> Vendidos: ` + producto.soldCount + `</small>
                    
                    <br>
                    <div> ` + producto.description + `</div>
                    <br>    
                </div>
                <br>
            </div>
        `
        } else {
            if (descripcion.indexOf(texto) !== -1) {
                document.getElementById('impresion').innerHTML += `
                <div class="col-lg-4">  
                    <div class="container border" style="cursor: pointer; margin: 2px" onclick="redirect()">                   
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                        <br>
                            <h4 class="mb-1" style="text-align: center">` + producto.name + `</h4><hr>
                            <small class="text-muted" style="text-align:left">Costo: ` + producto.currency + ` ` + producto.cost + `<br> Vendidos: ` + producto.soldCount + `</small>
                        
                        <br>
                        <div> ` + producto.description + `</div>
                        <br>    
                    </div>
                    <br>
                </div>
            `
            }
        }
    }
    if (document.getElementById('impresion').innerHTML === '') {
        document.getElementById('impresion').innerHTML += `<div class="list-group-item alert-danger mw-100" id="alertNotFound" role="alert">¡No hay elementos que coincidan con la busqueda!</div>`;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            imprimirListado(productsArray);
            sortAndShowCategories(ORDER_ASC_BY_NAME, productsArray);
        }
    });

    //Limpia el rango de filtros.
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        imprimirListado(productsArray);
    });

    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    document.getElementById("rangeFilterCount").addEventListener("click", function() {

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

    //Ordena ascendentemente por costo.
    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    //Ordena descencientemente por costo.
    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    //Ordena los elementos por relevancia.
    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_SOLD);
    });

    //Escucha cuando se presionan las teclas en el buscador y ejecuta la función.
    document.getElementById("busquedaProducts").addEventListener("keyup", function() {
        search();
    });
});