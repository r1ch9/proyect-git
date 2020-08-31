//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function imprimirInformacion(array) {
    let HTMLContentToAppend = '';
    HTMLContentToAppend = `
    <p>HOLA!</p>
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