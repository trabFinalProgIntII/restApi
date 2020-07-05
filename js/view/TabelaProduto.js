class TabelaProdutos {
    constructor(controller, seletor){
        this.produtoController = controller;
        this.seletor = seletor;
    }


    montarTabela(produtos){
        var str=`
        <h2>Tabela de Produtos</h2>
        <a id="novo" href="#" class="button">Novo</a>
        <br/>
        <br/>
        <div id="tabela">
        <table class='table'>
            <tbody class="table-hover">
                <tr>
                    <th class="text-left" style='text-align: left;'>Id</th>
                    <th class="text-left" style='text-align: left;'>Nome</th>
                    <th class="text-left" style='text-align: left;'>Preço</th>
                    <th class="text-left" style='text-align: left;'>Loja</th>
                    <th class="text-center" colspan="2">Ação</th>
                </tr>
            </tbody>`;
    
        for(var i in produtos){
            str+=`<tr id=${produtos[i].id}>
                    <td>${produtos[i].id}</td>
                    <td>${produtos[i].nome}</td>
                    <td>${produtos[i].preco}</td>
                    <td>${produtos[i].loja.nome}</td>
                    <td><a class="edit" href="#">Editar</a></td>
                    <td><a class="delete" href="#">Deletar</a></td>    
                </tr>`;
                
        } 
        str+= `
        </table>
        </div>`;
    
        var tabela = document.querySelector(this.seletor);
        tabela.innerHTML = str;

        const self = this;
        const linkNovo = document.querySelector("#novo");
        linkNovo.onclick = function(event) {
            self.produtoController.carregarFormulario(event);
        }

        const linksDelete = document.querySelectorAll(".delete");
        for(let linkDelete of linksDelete)
        {
            const id = linkDelete.parentNode.parentNode.id;
            linkDelete.onclick = function(event){
                self.produtoController.deletarProduto(id);
            }
        }

        const linksEdit = document.querySelectorAll(".edit");
        for(let linkEdit of linksEdit)
        {
            const id = linkEdit.parentNode.parentNode.id;
            //Outra forma de tratar o evento (click) - nesse caso deve ter bind
            linkEdit.addEventListener("click",this.produtoController.carregaFormularioProduto.bind(this.produtoController,id));
        }

    }

}