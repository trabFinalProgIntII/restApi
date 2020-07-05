class ProdutoService{
    constructor(){
        this.uri = "http://localhost:8000/api/produtos";
    }
    
    buscarProdutos(response,error){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                response(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uri, true);
        xhttp.send();
    }

    buscarProdutoPorId(id,response,error){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                response(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uri+'/'+id, true);
        xhttp.send();
    }

    atualizarProduto(id,produto,response,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                response(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("PUT", this.uri+'/'+id, true);
        xhttp.setRequestHeader("Content-Type","application/json")
        xhttp.send(JSON.stringify(produto));
    }

    deletarProduto(id,response,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                response(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("DELETE", this.uri+'/'+id, true);
        xhttp.send();
    }
}