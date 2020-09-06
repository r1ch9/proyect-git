//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_NAME = "";
const ORDER_DESC_BY_NAME = "";
const ORDER_BY_PROD_SOLD = "";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var comArray;
let arrayDeFechas = [];
var arrayDeCadenas = [];
let horaFecha = [];
let dia = [];
let meses = [];
let anio = [];

function imprimirInformacion(array) {
    document.getElementById('categoryName').innerHTML = array.name;
    document.getElementById('soldCount').innerHTML = array.currency + ` ` + array.cost;
    document.getElementById('categoryDescription').innerHTML = array.description;
    document.getElementById('productCount').innerHTML = array.soldCount;
    document.getElementById('productCriteria').innerHTML = "El producto pertenece a la categoría " + array.category;
    showImages(array.images);
    document.getElementById('imgPrincipal').innerHTML = `<img class="img-fluid img-thumbnail" src="` + array.images[0] + `" alt="">`
}

function showImages(array) {
    let htmlContentToAppend = "";

    for (let i = 1; i < (array.length); i++) {
        imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        com = array[i];
        htmlContentToAppend += `
        <div class="container-fluid">
            <div class="container border border-secondary">
                <div class="row" style="background-color:black">
                    <h6 class="col text-left" style="color: white"> <strong> ` + com.user + `</strong> ` + com.dateTime + `</h6>
                    <h6 class="col text-right" style="color:white"> <span class="fa fa-star checked"></span>` + com.score + `/5</h6>
                </div>
                <hr class="my-2">
                <p class="small">` + com.description + `</p>
                <hr class="my-2">
            </div>              
        </div>
        `
    }
    document.getElementById('Comments').innerHTML = htmlContentToAppend;
}

function ordenarPorCalificacion(array) {
    let result = [];
    result = array.sort(function(a, b) {
        if (a.score > b.score) { return -1; }
        if (a.score < b.score) { return 1; }
        return 0;
    });

    showComments(result);
}

function sortCategoriesDEC(array) {
    let result = [];

    result = array.sort(function(a, b) {
        if (a.dateTime < b.dateTime) { return -1; }
        if (a.dateTime > b.dateTime) { return 1; }
        return 0;
    });

    showComments(result);
}

function sortCategoriesASC(array) {
    let result = [];

    result = array.sort(function(a, b) {
        if (a.dateTime > b.dateTime) { return -1; }
        if (a.dateTime < b.dateTime) { return 1; }
        return 0;
    });

    showComments(result);
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            imprimirInformacion(resultObj.data);
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultComments) {
                if (resultComments.status === "ok") {
                    comArray = resultComments.data;
                    showComments(resultComments.data);
                    dateSubstract(comArray, "-");
                }
            });
        }

    });

    //Ordena comentarios, mas recientes primero.
    document.getElementById("sortAsc").addEventListener("click", function() {
        sortCategoriesASC(comArray);
    });

    //Ordena comentarios, mas antiguos primero.
    document.getElementById("sortDesc").addEventListener("click", function() {
        sortCategoriesDEC(comArray);
    });

    //Ordena los elementos por calificacion.
    document.getElementById("sortByCount").addEventListener("click", function() {
        ordenarPorCalificacion(comArray);
    });

});