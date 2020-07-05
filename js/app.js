const produtoController =  new ProdutoController();
const lojaController =  new LojaController();

var body = document.querySelector("body");
body.onload = function () {
    document.querySelector("main").innerHTML = "<h2>HOME</h2>";
}

document.querySelector("#home").onclick = function() {
    document.querySelector("main").innerHTML = "<h2>HOME</h2>";
}


document.querySelector("#lojas").onclick = function() {
    lojaController.inicializa();
}


document.querySelector("#produtos").onclick = function() {
    produtoController.inicializa();
}



