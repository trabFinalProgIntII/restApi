class FormProdutos {

    constructor(controller, seletor){
        this.produtoController = controller;
        this.seletor = seletor;
    }

    montarForm(lojas,produto){
        if(!produto){
            produto = new Produto();
        }
        var str = `
        <h2>Formulario de Produtos</h2>
        <form id="formulario">
            <input type="hidden" id="idProduto" value="${produto.id}" />
            <label for="txtnome">Nome:</label>
            <input type="text" id="txtnome" value="${produto.nome ?produto.nome :''}">
            <br />
            <label for="txtpreco">Preço:</label>
            <input type="text" id="txtpreco" value="${produto.preco ?produto.preco :''}">
            <br />
            <label for="valLoja">Marca:</label>
            <select id="valLoja">
        `;

        for(const loja of lojas){
            str+=`<option id="${loja.id}">${loja.nome}</option>`;
        }

        str+= `
            </select>
            <br />
            <br />
            <input type="submit" id="btnsalvar" value="Salvar">
            <input type="reset" value="Cancelar">
            <br />
        </form>
        `;

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        if(produto.loja && produto.loja.id){
            document.getElementById(produto.loja.id.toString()).selected = true;    
        }

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){
            if(!produto.id){
                self.produtoController.salvar(event);
            }
            else{
                self.produtoController.editar(produto.id,event);
            }
        }

        form.onreset = function(event){
            self.produtoController.limpar(event);
        }
    }

    limparFormulario(){
        document.querySelector("#txtnome").value="";
        document.querySelector("#txtpreco").value="";
    }

    getDataProduto(){
        let produto = new Produto();
        if(!document.querySelector("#idProduto").value)
            produto.id = document.querySelector("#idProduto").value;
        produto.nome = document.querySelector("#txtnome").value;
        produto.preco = document.querySelector("#txtpreco").value;
        
        const sel = document.querySelector("#valLoja");
        const opt = sel.options[sel.selectedIndex];
        produto.loja = new Loja(opt.value);
        produto.loja.id = opt.id;
        return produto;        
    }

}