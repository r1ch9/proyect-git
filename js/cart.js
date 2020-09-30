const LINK_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

//Funcion que imprime todos los datos en pantalla
function imprimirDatos() {
    alert('se llama a la funcion.');
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(LINK_CARRITO).then(function(resultObj) {
        if (resultObj.status === "ok") {
            alert('TOdo bien');
        }
    });
});