//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_NAME = "";
const ORDER_DESC_BY_NAME = "";
const ORDER_BY_PROD_SOLD = "";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var comArray;

function imprimirInformacion(array) {
    document.getElementById('categoryName').innerHTML = array.name;
    document.getElementById('soldCount').innerHTML = array.currency + ` ` + array.cost;
    document.getElementById('categoryDescription').innerHTML = array.description;
    document.getElementById('productCount').innerHTML = array.soldCount;
    document.getElementById('productCriteria').innerHTML = "El producto pertenece a la categoría " + array.category;
    showImages(array.images);
}

function showImages(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < (array.length - 1); i++) {
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
            <div class="container">
                <h6> <strong> ` + com.user + `</strong> ` + com.dateTime + ` ` + com.score + `</h1>
                <p class="small">` + com.description + `</p>
                <hr class="my-2">
            </div>              
        </div>
        `
    }
    document.getElementById('Comments').innerHTML = htmlContentToAppend;
}

function dateSubstract(array, separador) {
    let arrayDeFechas = [];
    var arrayDeCadenas = [];
    var arrayFinal = [];
    let espacio = " ";
    for (let i = 0; i < array.length; i++) {
        arrayDeFechas[i] = array[i].dateTime;
        arrayDeCadenas[i] = arrayDeFechas[i].split("-");
        arrayFinal[i] = arrayDeCadenas[i].split(espacio);
    }

    for (let j = 0; j < arrayDeFechas.length; j++) {
        console.log('La cadena original es: "' + arrayDeFechas[j] + '"');
        console.log('La cadena sin guines es: "' + arrayDeCadenas[j] + '"');
        console.log('La cadena definitiva es: "' + arrayFinal[k] + '"');
    }


}

function sortAndShowCategories(sortCriteria) {
    currentSortCriteria = sortCriteria;

    if (comArray != undefined) {
        currentCategoriesArray = comArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showComments(currentCategoriesArray);
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
    }
    return result;
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            imprimirInformacion(resultObj.data);
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultComments) {
                if (resultComments.status === "ok") {
                    comArray = resultComments.data;
                    showComments(resultComments.data);
                }
            });
        }
    });

    //Ordena comentarios, mas recientes primero.
    document.getElementById("sortAsc").addEventListener("click", function() {
        dateSubstract(comArray, "-");
    });

    //Ordena comentarios, mas antiguos primero.
    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    //Ordena los elementos por calificacion.
    document.getElementById("sortByCount").addEventListener("click", function() {
        ordenarPorCalificacion(comArray);
    });

});