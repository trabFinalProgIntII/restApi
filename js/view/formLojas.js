class FormLojas {

    constructor(controller, seletor){
        this.lojaController = controller;
        this.seletor = seletor;
    }

    montarForm(loja){
        if(!loja){
            loja = new Loja();
        }
        var str = `
        <h2>Formulário de Lojas</h2>
        <form id="formulario" class="form_contact">
            <div class="user_info">
                <input type="hidden" id="idLoja" value="${loja.id}" />
                <label for="txtnome">Nome:</label>
                <input type="text" required="" id="txtnome" value="${loja.nome ?loja.nome :''}">
                <br />
                <label for="txtnome">Endereco:</label>
                <input type="text" id="txtendereco" required="" value="${loja.endereco ?loja.endereco :''}">
                <br />
                <label for="txtTelefone">Telefone:</label>
                <input type="text" id="txtTelefone" required="" value="${loja.telefone ?loja.telefone :''}">
                <br />
                <br />
                <input type="submit" id="btnsalvar" value="Salvar">
                <input type="reset" value="Cancelar">
                <br />
            </div>
        </form>
        `;

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){
            if(!loja.id){
                self.lojaController.salvar(event);
            }
            else{
                self.lojaController.editar(loja.id,event);
            }
        }

        form.onreset = function(event){
            self.lojaController.limpar(event);
        }
    }

    limparFormulario(){
        document.querySelector("#txtnome").value="";
        document.querySelector("#txtendereco").value="";
        document.querySelector("#txtTelefone").value="";
    }

    getDataLoja(){
        let loja = new Loja();
        if(!document.querySelector("#idLoja").value)
            loja.id = document.querySelector("#idLoja").value;
        loja.nome = document.querySelector("#txtnome").value;
        loja.endereco = document.querySelector("#txtendereco").value;
        loja.telefone = document.querySelector("#txtTelefone").value;
        return loja;        
    }

}