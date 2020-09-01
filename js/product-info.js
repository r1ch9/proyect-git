//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function imprimirInformacion(array) {
    let HTMLContentToAppend = '';
    HTMLContentToAppend = `
    <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row" id="` + array.name + `">
            <div class="col-3">
                <img src="` + array.images.prod1 + `" alt="` + array.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + array.name + `</h4>
                    <small class="text-muted">Costo: ` + array.currency + ` ` + array.cost + `<br/>Vendidos: ` + array.soldCount + `</small>
                </div>
            <div> ` + array.description + `</div>
        </div>
    </a>
    `
    document.getElementById('imprimirAca').innerHTML = HTMLContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            imprimirInformacion(resultObj.data);
        }
    });


});